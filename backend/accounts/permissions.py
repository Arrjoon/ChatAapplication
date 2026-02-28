# permissions.py
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth.models import Permission


class IsSuperUser(BasePermission):
    """
    Permission check for superuser only
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser


class IsStaffOrSuperUser(BasePermission):
    """
    Permission check for staff or superuser
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser)


class HasGroupPermission(BasePermission):
    """
    Permission check based on user's groups
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # Superuser has all permissions
        if request.user.is_superuser:
            return True
        
        # Check if user has required group
        required_groups = getattr(view, 'required_groups', [])
        if not required_groups:
            return True
        
        user_groups = request.user.groups.values_list('name', flat=True)
        return any(group in user_groups for group in required_groups)


class HasPermission(BasePermission):
    """
    Permission check based on specific permission codename
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # Superuser has all permissions
        if request.user.is_superuser:
            return True
        
        # Check for specific permission
        required_permission = getattr(view, 'required_permission', None)
        if not required_permission:
            return True
        
        # Check if user has the permission directly or through groups
        return request.user.has_perm(required_permission)


class CanManageUsers(BasePermission):
    """
    Permission to manage users (create, update, delete)
    Users with 'accounts.can_manage_users' permission can manage users
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        if request.user.is_superuser:
            return True
        
        # Check for specific permission
        return request.user.has_perm('accounts.can_manage_users')


class CanManageGroups(BasePermission):
    """
    Permission to manage groups
    Only superuser can manage groups by default
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        if request.user.is_superuser:
            return True
        
        # Check for specific permission
        return request.user.has_perm('accounts.can_manage_groups')


class CanViewUsers(BasePermission):
    """
    Permission to view users list
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        if request.user.is_superuser:
            return True
        
        # Check for specific permission
        return request.user.has_perm('accounts.can_view_users')


class CanEditOwnProfile(BasePermission):
    """
    Users can edit their own profile
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        # Users can edit their own profile
        if obj.id == request.user.id:
            return True
        
        # Superuser and users with manage_users permission can edit any profile
        if request.user.is_superuser or request.user.has_perm('accounts.can_manage_users'):
            return True
        
        return False
