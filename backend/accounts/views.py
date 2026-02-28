# accounts/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from django.db import transaction, models
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError

from .models import UserSession, BlacklistedToken
from .serializers import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    RefreshTokenSerializer,
    ProfileSerializer,
    SessionSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
    ChangePasswordSerializer,
    # Group serializers
    GroupSerializer,
    GroupListSerializer,
    PermissionSerializer,
    # User serializers
    UserListSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
    UserDetailSerializer,
)
from .permissions import (
    IsSuperUser,
    IsStaffOrSuperUser,
    CanManageUsers,
    CanManageGroups,
    CanViewUsers,
    CanEditOwnProfile,
)

User = get_user_model()

# ========== AUTHENTICATION VIEWS ==========

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # Ensure the request data uses 'identifier' instead of 'username'
        if 'username' in request.data:
            request.data['identifier'] = request.data.pop('username')
            
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            user = User.objects.get(id=response.data['user_id'])
            # Create session record
            session = UserSession.objects.create(
                user=user,
                user_agent=request.META.get('HTTP_USER_AGENT', ''),
                ip_address=request.META.get('REMOTE_ADDR', ''),
                meta={
                    'login_method': 'jwt',
                    'device': request.META.get('HTTP_USER_AGENT', '')[:255],
                    'login_with': 'email' if '@' in request.data.get('identifier') else 'username'
                }
            )
            
            # Enhance response
            response.data.update({
                'user': ProfileSerializer(user).data,
                'session': SessionSerializer(session).data
            })
            response.data.pop('user_id', None)

            # ✅ Set tokens in HttpOnly cookies
            access_token = response.data['access']
            refresh_token = response.data['refresh']

            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=False,  
                samesite="Lax",
                max_age=60 * 5,
            )
            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=60 * 60 * 24 * 7,
            )

        
        return response


class UsernameCheckView(APIView):
    def get(self, request, *args, **kwargs):
        username = request.GET.get("username")
        if User.objects.filter(username=username).exists():
            return Response({"message": "this username already present"})
        return Response({"message": "user with this username  not found"})


class RegisterView(generics.CreateAPIView):
    """
    User registration endpoint
    """
    serializer_class = RegisterSerializer
    permission_classes = [] 

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.save()
        
        return Response({
            'detail': 'Registration successful.',
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
            }
        }, status=status.HTTP_201_CREATED)


class RefreshTokenView(TokenRefreshView):
    """
    Refresh JWT access token using refresh token stored in cookies
    """
    serializer_class = RefreshTokenSerializer

    def post(self, request, *args, **kwargs):
        # 1️⃣ Read refresh token from cookie
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token not found in cookies"},
                status=400
            )

        # 2️⃣ Inject refresh token into request.data
        request.data["refresh"] = refresh_token

        # 3️⃣ Call SimpleJWT's built-in refresh logic
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            # 4️⃣ Get new access token
            access_token = response.data["access"]

            # 5️⃣ Update access_token cookie
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=60 * 5,  # 5 minutes
            )

            # 6️⃣ Update last_seen_at for the session (optional)
            if hasattr(request, 'session_id'):
                UserSession.objects.filter(
                    id=request.session_id
                ).update(last_seen_at=timezone.now())

        return response


class LogoutView(generics.GenericAPIView):
    """
    Logout from current session:
    1. Blacklists the refresh token
    2. Marks session as inactive
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RefreshTokenSerializer

    def post(self, request, *args, **kwargs):
        # 1️⃣ Try to get refresh token from cookie first
        refresh_token = request.COOKIES.get("refresh_token")

        # 2️⃣ If not in cookies, fallback to request body
        if not refresh_token:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            refresh_token = serializer.validated_data['refresh']

        # 3️⃣ Validate token
        try:
            token = RefreshToken(refresh_token)
        except TokenError:
            return Response({"detail": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)

        # 4️⃣ Blacklist token
        BlacklistedToken.objects.create(token=str(token))

        # 5️⃣ Mark session inactive
        if hasattr(request, "session_id"):
            UserSession.objects.filter(id=request.session_id, user=request.user).update(is_active=False)

        # 6️⃣ Optionally clear the cookies
        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response


class LogoutAllView(generics.GenericAPIView):
    """
    Logout from all devices:
    1. Blacklists all user's refresh tokens
    2. Marks all sessions as inactive
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Get all unexpired refresh tokens for user
        from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
        
        tokens = OutstandingToken.objects.filter(
            user=request.user,
            expires_at__gt=timezone.now()
        )
        
        # Blacklist all tokens
        for token in tokens:
            BlacklistedToken.objects.get_or_create(token=token.token)
        
        # Mark all sessions as inactive
        UserSession.objects.filter(
            user=request.user,
            is_active=True
        ).update(is_active=False)
        
        return Response(
            {'detail': 'Successfully logged out from all devices.'},
            status=status.HTTP_200_OK
        )


class PasswordResetRequestView(APIView):
    """
    Initiate password reset process
    Note: Password reset functionality can be implemented later if needed
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # TODO: Implement password reset email sending
        if user:
            # send_password_reset(request, user)
            pass
        
        return Response({
            'detail': 'If an account exists with this email, a password reset link has been sent.'
        })


class PasswordResetConfirmView(APIView):
    """
    Confirm password reset with token
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # Generate new tokens after password change
        refresh = RefreshToken.for_user(user)
        return Response({
            'detail': 'Password successfully reset.',
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })


class ChangePasswordView(APIView):
    """
    Change password for authenticated users
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate new tokens after password change
        refresh = RefreshToken.for_user(user)
        return Response({
            'detail': 'Password successfully changed.',
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })


class ProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    """
    Get or update user profile
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()


class SessionListView(generics.ListAPIView):
    """
    List all active sessions for current user
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SessionSerializer

    def get_queryset(self):
        return UserSession.objects.filter(
            user=self.request.user,
            is_active=True
        ).order_by('-last_seen_at')


class SessionRevokeView(generics.DestroyAPIView):
    """
    Revoke a specific session by ID
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SessionSerializer
    queryset = UserSession.objects.all()
    lookup_field = 'id'
    lookup_url_kwarg = 'session_id'

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def perform_destroy(self, instance):
        # Mark session as inactive instead of deleting
        instance.is_active = False
        instance.save()
        
        # If this is the current session, blacklist the token
        if hasattr(self.request, 'session_id') and str(instance.id) == self.request.session_id:
            refresh_token = self.request.data.get('refresh')
            if refresh_token:
                BlacklistedToken.objects.create(token=refresh_token)


# ========== GROUP MANAGEMENT VIEWS ==========

class PermissionListView(generics.ListAPIView):
    """
    List all available permissions
    Only superuser can view all permissions
    """
    permission_classes = [IsSuperUser]
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all().order_by('content_type__app_label', 'codename')
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Filter by app if provided
        app_label = self.request.query_params.get('app', None)
        if app_label:
            queryset = queryset.filter(content_type__app_label=app_label)
        return queryset


class GroupListView(generics.ListCreateAPIView):
    """
    List all groups or create a new group
    """
    permission_classes = [CanManageGroups]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GroupListSerializer
        return GroupSerializer
    
    def get_queryset(self):
        return Group.objects.all().prefetch_related('permissions', 'user_set').order_by('name')


class GroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a group
    """
    permission_classes = [CanManageGroups]
    serializer_class = GroupSerializer
    queryset = Group.objects.all().prefetch_related('permissions', 'user_set')
    lookup_field = 'id'
    
    def perform_destroy(self, instance):
        # Don't allow deletion of groups that have users
        if instance.user_set.exists():
            from rest_framework.exceptions import ValidationError
            raise ValidationError('Cannot delete group with assigned users. Remove users first.')
        instance.delete()


class GroupPermissionsUpdateView(APIView):
    """
    Update permissions for a group
    POST: Add permissions
    DELETE: Remove permissions
    """
    permission_classes = [CanManageGroups]
    
    def post(self, request, group_id):
        """Add permissions to group"""
        group = get_object_or_404(Group, id=group_id)
        permission_ids = request.data.get('permission_ids', [])
        
        if not permission_ids:
            return Response(
                {'detail': 'permission_ids is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        permissions = Permission.objects.filter(id__in=permission_ids)
        group.permissions.add(*permissions)
        
        return Response({
            'detail': 'Permissions added successfully',
            'group': GroupSerializer(group).data
        })
    
    def delete(self, request, group_id):
        """Remove permissions from group"""
        group = get_object_or_404(Group, id=group_id)
        permission_ids = request.data.get('permission_ids', [])
        
        if not permission_ids:
            return Response(
                {'detail': 'permission_ids is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        permissions = Permission.objects.filter(id__in=permission_ids)
        group.permissions.remove(*permissions)
        
        return Response({
            'detail': 'Permissions removed successfully',
            'group': GroupSerializer(group).data
        })


# ========== USER MANAGEMENT VIEWS ==========

class UserListView(generics.ListCreateAPIView):
    """
    List all users or create a new user
    """
    permission_classes = [CanViewUsers]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserListSerializer
        return UserCreateSerializer
    
    def get_queryset(self):
        queryset = User.objects.all().prefetch_related('groups').order_by('-date_joined')
        
        # Filter by group if provided
        group_id = self.request.query_params.get('group', None)
        if group_id:
            queryset = queryset.filter(groups__id=group_id)
        
        # Filter by search query
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(username__icontains=search) |
                Q(email__icontains=search) |
                Q(display_name__icontains=search)
            )
        
        return queryset.distinct()
    
    def get_permissions(self):
        """
        Allow viewing for CanViewUsers, but require CanManageUsers for creation
        """
        if self.request.method == 'GET':
            return [CanViewUsers()]
        return [CanManageUsers()]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a user
    """
    permission_classes = [CanEditOwnProfile]
    serializer_class = UserDetailSerializer
    queryset = User.objects.all().prefetch_related('groups', 'user_permissions')
    lookup_field = 'id'
    lookup_url_kwarg = 'id'
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserUpdateSerializer
        return UserDetailSerializer
    
    def get_permissions(self):
        """
        Different permissions for different actions
        """
        if self.request.method == 'GET':
            return [CanViewUsers()]
        elif self.request.method == 'DELETE':
            return [CanManageUsers()]
        return [CanEditOwnProfile()]
    
    def perform_destroy(self, instance):
        # Don't allow deletion of superuser
        if instance.is_superuser:
            from rest_framework.exceptions import ValidationError
            raise ValidationError('Cannot delete superuser account.')
        instance.delete()


class UserGroupsUpdateView(APIView):
    """
    Update groups for a user
    POST: Add user to groups
    DELETE: Remove user from groups
    PUT: Replace all groups
    """
    permission_classes = [CanManageUsers]
    
    def post(self, request, user_id):
        """Add user to groups"""
        user = get_object_or_404(User, id=user_id)
        group_ids = request.data.get('group_ids', [])
        
        if not group_ids:
            return Response(
                {'detail': 'group_ids is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        groups = Group.objects.filter(id__in=group_ids)
        user.groups.add(*groups)
        
        return Response({
            'detail': 'User added to groups successfully',
            'user': UserDetailSerializer(user).data
        })
    
    def delete(self, request, user_id):
        """Remove user from groups"""
        user = get_object_or_404(User, id=user_id)
        group_ids = request.data.get('group_ids', [])
        
        if not group_ids:
            return Response(
                {'detail': 'group_ids is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        groups = Group.objects.filter(id__in=group_ids)
        user.groups.remove(*groups)
        
        return Response({
            'detail': 'User removed from groups successfully',
            'user': UserDetailSerializer(user).data
        })
    
    def put(self, request, user_id):
        """Replace all groups for user"""
        user = get_object_or_404(User, id=user_id)
        group_ids = request.data.get('group_ids', [])
        
        groups = Group.objects.filter(id__in=group_ids) if group_ids else []
        user.groups.set(groups)
        
        return Response({
            'detail': 'User groups updated successfully',
            'user': UserDetailSerializer(user).data
        })
