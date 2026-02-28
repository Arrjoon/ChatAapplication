# accounts/serializers.py
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group, Permission
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import User, UserSession, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'display_name'
        ]

    def validate_username(self, v):
        v = v.lower()
        if User.objects.filter(username=v).exists():
            raise ValidationError('Username already taken.')
        return v

    def validate_email(self, v):
        v = v.lower()
        if User.objects.filter(email=v).exists():
            raise ValidationError('Email already in use.')
        return v

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save(update_fields=['password'])
        return user


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(help_text="username or email")
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        ident = attrs.get('identifier', '').strip().lower()
        password = attrs.get('password')

        # find user by username OR email
        try:
            if '@' in ident:
                user = User.objects.get(email=ident)
            else:
                user = User.objects.get(username=ident)
        except User.DoesNotExist:
            raise ValidationError('Invalid credentials.')

        if not user.check_password(password):
            raise ValidationError('Invalid credentials.')

        if not user.is_active or user.is_banned:
            raise ValidationError('Account disabled.')

        # success
        attrs['user'] = user
        return attrs


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs['email'].lower()
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Do not leak existence; still act as success.
            attrs['user'] = None
            return attrs
        attrs['user'] = user
        return attrs


class PasswordResetConfirmSerializer(serializers.Serializer):
    username = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=6)

    def validate(self, attrs):
        username = attrs['username'].lower()
        token = attrs['token']
        new_pw = attrs['new_password']
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise ValidationError('Invalid token.')
        if not user.reset_password_with_token(token, new_pw):
            raise ValidationError('Invalid or expired token.')
        attrs['user'] = user
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    new_password = serializers.CharField(min_length=6)

    def validate(self, attrs):
        user = self.context['request'].user
        if not user.check_password(attrs['current_password']):
            raise ValidationError('Current password incorrect.')
        return attrs

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save(update_fields=['password'])
        return user


class ProfileSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'display_name', 'profile_picture',
            'groups', 'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login', 'groups']


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSession
        fields = ['id', 'user_agent', 'ip_address', 'created_at', 'last_seen_at', 'is_active', 'session_type', 'meta']
        read_only_fields = fields


# accounts/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(serializers.Serializer):
    identifier = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    
    refresh = serializers.CharField(read_only=True)
    access = serializers.CharField(read_only=True)

    def validate(self, attrs):
        identifier = attrs.get("identifier")
        password = attrs.get("password")

        # Lookup user
        if '@' in identifier:
            user = User.objects.filter(email__iexact=identifier).first()
        else:
            user = User.objects.filter(username__iexact=identifier).first()

        if not user:
            raise serializers.ValidationError({"message": "Invalid credentials."})

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials.")
        
        if not user.is_active:
            raise serializers.ValidationError("Account disabled.")
        
        if user.is_banned:
            raise serializers.ValidationError("Account is banned.")

        # Generate JWT
        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user_id": user.id,
        }

from rest_framework_simplejwt.exceptions import TokenError
class RefreshTokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        refresh = attrs['refresh']

        # 1️⃣ Validate token
        try:
            token = RefreshToken(refresh)
        except TokenError:
            raise serializers.ValidationError("Invalid refresh token")

        # 2️⃣ Blacklist check (adjust for your setup)
        if BlacklistedToken.objects.filter(token=refresh).exists():
            raise serializers.ValidationError("Token is blacklisted")

        # 3️⃣ Return a dict containing both access & refresh
        return {
            "access": str(token.access_token),
            "refresh": str(token)
        }


# ========== GROUP SERIALIZERS ==========

class PermissionSerializer(serializers.ModelSerializer):
    """Serializer for Permission model"""
    class Meta:
        model = Permission
        fields = ['id', 'name', 'codename', 'content_type']
        read_only_fields = ['id']


class GroupSerializer(serializers.ModelSerializer):
    """Serializer for Group model"""
    permissions = PermissionSerializer(many=True, read_only=True)
    permission_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Permission.objects.all(),
        source='permissions',
        write_only=True,
        required=False
    )
    user_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions', 'permission_ids', 'user_count']
    
    def get_user_count(self, obj):
        return obj.user_set.count()


class GroupListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for group list"""
    permission_count = serializers.SerializerMethodField()
    user_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Group
        fields = ['id', 'name', 'permission_count', 'user_count']
    
    def get_permission_count(self, obj):
        return obj.permissions.count()
    
    def get_user_count(self, obj):
        return obj.user_set.count()


# ========== USER SERIALIZERS ==========

class UserListSerializer(serializers.ModelSerializer):
    """Serializer for listing users"""
    groups = serializers.StringRelatedField(many=True, read_only=True)
    group_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Group.objects.all(),
        source='groups',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'display_name', 'profile_picture',
            'groups', 'group_ids', 'is_active', 'is_banned',
            'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login']


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating users"""
    password = serializers.CharField(write_only=True, min_length=6, required=True)
    group_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Group.objects.all(),
        source='groups',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'display_name', 'profile_picture',
            'group_ids', 'is_active', 'is_banned'
        ]
    
    def validate_username(self, value):
        value = value.lower()
        if User.objects.filter(username=value).exists():
            raise ValidationError('Username already taken.')
        return value
    
    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(email=value).exists():
            raise ValidationError('Email already in use.')
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        groups = validated_data.pop('groups', [])
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        
        # Assign groups
        if groups:
            user.groups.set(groups)
        
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating users"""
    password = serializers.CharField(write_only=True, min_length=6, required=False, allow_null=True)
    group_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Group.objects.all(),
        source='groups',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'display_name', 'profile_picture',
            'group_ids', 'is_active', 'is_banned'
        ]
    
    def validate_username(self, value):
        value = value.lower()
        # Allow same username for current user
        if self.instance and self.instance.username == value:
            return value
        if User.objects.filter(username=value).exists():
            raise ValidationError('Username already taken.')
        return value
    
    def validate_email(self, value):
        value = value.lower()
        # Allow same email for current user
        if self.instance and self.instance.email == value:
            return value
        if User.objects.filter(email=value).exists():
            raise ValidationError('Email already in use.')
        return value
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        groups = validated_data.pop('groups', None)
        
        # Update fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Update password if provided
        if password:
            instance.set_password(password)
        
        instance.save()
        
        # Update groups if provided
        if groups is not None:
            instance.groups.set(groups)
        
        return instance


class UserDetailSerializer(serializers.ModelSerializer):
    """Serializer for user detail view"""
    groups = GroupListSerializer(many=True, read_only=True)
    group_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Group.objects.all(),
        source='groups',
        write_only=True,
        required=False
    )
    permissions = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'display_name', 'profile_picture',
            'groups', 'group_ids', 'permissions', 'is_active', 'is_banned', 
            'is_staff', 'is_superuser',
            'date_joined', 'last_login'
        ]
        read_only_fields = [
            'id', 'date_joined', 'last_login',
            'is_staff', 'is_superuser'
        ]
    
    def get_permissions(self, obj):
        """Get all permissions for the user (from groups and direct)"""
        permissions = obj.user_permissions.all() | Permission.objects.filter(group__user=obj)
        return [{'id': p.id, 'name': p.name, 'codename': p.codename} for p in permissions.distinct()]
