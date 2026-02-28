# accounts/models.py
from django.conf import settings
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.core.validators import RegexValidator, MinLengthValidator


USERNAME_REGEX = r'^[A-Za-z0-9_\.]+$' 


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("The username must be set")
        if not email:
            raise ValueError("The email must be set")
        
        username = username.lower()
        email = self.normalize_email(email)

        user = self.model(username=username, email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Simple User model for news portal application
    """
    id = models.AutoField(primary_key=True)
    username = models.CharField(
        max_length=30,
        unique=True,
        db_index=True,
        validators=[
            RegexValidator(USERNAME_REGEX, "Enter a valid username."),
            MinLengthValidator(3),
        ],
        help_text="Unique username (lowercased)."
    )
    email = models.EmailField(unique=True, db_index=True)
    display_name = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.ImageField(
        blank=True, 
        null=True,
        upload_to='media/profile_pictures/'
    )
    
    # Account flags
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_banned = models.BooleanField(default=False)

    # Timestamps
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        ordering = ("-date_joined",)
        indexes = [
            models.Index(fields=["username"], name="user_username_idx"),
            models.Index(fields=["email"], name="user_email_idx"),
        ]
        permissions = [
            ('can_manage_users', 'Can create, update, and delete users'),
            ('can_view_users', 'Can view users list'),
            ('can_manage_groups', 'Can manage groups and permissions'),
        ]

    def token(self):
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def __str__(self):
        return self.username or self.email


class BlacklistedToken(models.Model):
    """Store blacklisted JWT tokens"""
    token = models.CharField(max_length=500, unique=True)
    blacklisted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Blacklisted token {self.token}"


class UserSession(models.Model):
    """
    Track active sessions for users
    """
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name="sessions", 
        on_delete=models.CASCADE
    )
    user_agent = models.CharField(max_length=512, blank=True, null=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_seen_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    session_type = models.CharField(max_length=50, default="web")  # web, mobile, api
    meta = models.JSONField(blank=True, null=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [models.Index(fields=["user", "is_active"])]

    def __str__(self):
        return f"Session {self.id} for {self.user.username}"
