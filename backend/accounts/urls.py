# accounts/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView
from .views import (
    # Authentication
    RegisterView,
    LoginView,
    UsernameCheckView,
    RefreshTokenView,
    LogoutView,
    LogoutAllView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    ChangePasswordView,
    ProfileRetrieveUpdateView,
    SessionListView,
    SessionRevokeView,
    # Group Management
    PermissionListView,
    GroupListView,
    GroupDetailView,
    GroupPermissionsUpdateView,
    # User Management
    UserListView,
    UserDetailView,
    UserGroupsUpdateView,
)
app_name='accounts'

urlpatterns = [
    # ========== AUTHENTICATION ==========
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('username/', UsernameCheckView.as_view(), name='check-username'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token-refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token-verify'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('logout/all/', LogoutAllView.as_view(), name='logout-all'),
    
    # ========== PASSWORD MANAGEMENT ==========
    path('password/reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('password/change/', ChangePasswordView.as_view(), name='password-change'),
    
    # ========== PROFILE ==========
    path('profile/', ProfileRetrieveUpdateView.as_view(), name='profile'),
    
    # ========== SESSIONS ==========
    path('sessions/', SessionListView.as_view(), name='session-list'),
    path('sessions/<int:session_id>/revoke/', SessionRevokeView.as_view(), name='session-revoke'),
    
    # ========== PERMISSIONS ==========
    path('permissions/', PermissionListView.as_view(), name='permission-list'),
    
    # ========== GROUPS ==========
    path('groups/', GroupListView.as_view(), name='group-list'),
    path('groups/<int:id>/', GroupDetailView.as_view(), name='group-detail'),
    path('groups/<int:group_id>/permissions/', GroupPermissionsUpdateView.as_view(), name='group-permissions'),
    
    # ========== USERS ==========
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:id>/', UserDetailView.as_view(), name='user-detail'),
    path('users/<int:user_id>/groups/', UserGroupsUpdateView.as_view(), name='user-groups'),
]
