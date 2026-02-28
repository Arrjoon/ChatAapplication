# post/permissions.py
from rest_framework.permissions import BasePermission


class CanCreatePost(BasePermission):
    """Permission to create posts"""
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.is_superuser:
            return True
        return request.user.has_perm('post.can_create_post')


class CanEditPost(BasePermission):
    """Permission to edit posts"""
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.is_superuser:
            return True
        return request.user.has_perm('post.can_edit_post')
    
    def has_object_permission(self, request, view, obj):
        # Users can always edit their own posts
        if obj.author == request.user:
            return True
        # Check permission for editing others' posts
        return request.user.has_perm('post.can_edit_post')


class CanPublishPost(BasePermission):
    """Permission to publish posts"""
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.is_superuser:
            return True
        return request.user.has_perm('post.can_publish_post')


class CanDeletePost(BasePermission):
    """Permission to delete posts"""
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.is_superuser:
            return True
        return request.user.has_perm('post.can_delete_post')
    
    def has_object_permission(self, request, view, obj):
        # Users can delete their own posts
        if obj.author == request.user:
            return True
        # Check permission for deleting others' posts
        return request.user.has_perm('post.can_delete_post')


class CanViewAllPosts(BasePermission):
    """Permission to view all posts (including drafts)"""
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.is_superuser:
            return True
        return request.user.has_perm('post.can_view_all_posts')
    
    def has_object_permission(self, request, view, obj):
        # Users can always view their own posts
        if obj.author == request.user:
            return True
        # Check permission for viewing others' posts
        if obj.status == 'published':
            return True  # Published posts are public
        return request.user.has_perm('post.can_view_all_posts')

