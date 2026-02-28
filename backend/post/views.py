# post/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.db.models import Q, Sum
from django.utils import timezone

from .models import Post, Category, Tag, BreakingNews
from .serializers import (
    PostListSerializer,
    PostCreateSerializer,
    PostUpdateSerializer,
    PostDetailSerializer,
    CategorySerializer,
    TagSerializer,
    BreakingNewsSerializer,
)
from .permissions import (
    CanCreatePost,
    CanEditPost,
    CanPublishPost,
    CanDeletePost,
    CanViewAllPosts,
)


class PostCreateView(generics.CreateAPIView):
    """
    Create a new post
    POST: Create new post
    """
    permission_classes = [CanCreatePost]
    serializer_class = PostCreateSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostListView(generics.ListAPIView):
    """
    List all posts
    GET: List posts (filtered by permissions)
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostListSerializer
    
    def get_queryset(self):
        queryset = Post.objects.select_related('author', 'category').prefetch_related('tags')
        
        # Check if user can view all posts
        can_view_all = (
            self.request.user.is_superuser or
            self.request.user.has_perm('post.can_view_all_posts')
        )
        
        if not can_view_all:
            # Users can only see published posts or their own posts
            queryset = queryset.filter(
                Q(status='published') | Q(author=self.request.user)
            )
        
        # Filter by status
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by category
        category_id = self.request.query_params.get('category', None)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        # Filter by author
        author_id = self.request.query_params.get('author', None)
        if author_id:
            queryset = queryset.filter(author_id=author_id)
        
        # Filter by tag
        tag_id = self.request.query_params.get('tag', None)
        if tag_id:
            queryset = queryset.filter(tags__id=tag_id)
        
        # Filter by featured
        is_featured = self.request.query_params.get('featured', None)
        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Filter by breaking
        is_breaking = self.request.query_params.get('breaking', None)
        if is_breaking == 'true':
            queryset = queryset.filter(is_breaking=True)
        
        # Search
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(excerpt__icontains=search) |
                Q(content__icontains=search)
            )
        
        return queryset.distinct().order_by('-created_at')


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a post
    """
    permission_classes = [CanViewAllPosts]
    queryset = Post.objects.select_related('author', 'category').prefetch_related('tags')
    lookup_field = 'id'
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return PostUpdateSerializer
        return PostDetailSerializer
    
    def get_permissions(self):
        """
        Different permissions for different actions
        """
        if self.request.method == 'GET':
            return [CanViewAllPosts()]
        elif self.request.method == 'DELETE':
            return [CanDeletePost()]
        return [CanEditPost()]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Check if user can view all posts
        can_view_all = (
            self.request.user.is_superuser or
            self.request.user.has_perm('post.can_view_all_posts')
        )
        
        if not can_view_all:
            # Users can only see published posts or their own posts
            queryset = queryset.filter(
                Q(status='published') | Q(author=self.request.user)
            )
        
        return queryset
    
    def perform_update(self, serializer):
        # Check if trying to publish
        if serializer.validated_data.get('status') == 'published':
            if not (self.request.user.is_superuser or 
                    self.request.user.has_perm('post.can_publish_post')):
                from rest_framework.exceptions import PermissionDenied
                raise PermissionDenied("You don't have permission to publish posts.")
        
        serializer.save()
    
    def perform_destroy(self, instance):
        # Additional check in permission class
        instance.delete()


class PostPublishView(APIView):
    """
    Publish a post (change status to published)
    """
    permission_classes = [CanPublishPost]
    
    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        
        # Check if user can publish this post
        if not (request.user.is_superuser or 
                request.user.has_perm('post.can_publish_post')):
            return Response(
                {'detail': 'You do not have permission to publish posts.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        post.status = 'published'
        if not post.published_at:
            post.published_at = timezone.now()
        post.save()
        
        return Response({
            'detail': 'Post published successfully.',
            'post': PostDetailSerializer(post).data
        })


class PostStatsView(APIView):
    """
    Get post statistics
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Check if user can view all stats
        can_view_all = (
            user.is_superuser or
            user.has_perm('post.can_view_all_posts')
        )
        
        if can_view_all:
            total_posts = Post.objects.count()
            published = Post.objects.filter(status='published').count()
            draft = Post.objects.filter(status='draft').count()
            pending = Post.objects.filter(status='pending').count()
            total_views = Post.objects.aggregate(
                total=Sum('views')
            )['total'] or 0
        else:
            total_posts = Post.objects.filter(author=user).count()
            published = Post.objects.filter(author=user, status='published').count()
            draft = Post.objects.filter(author=user, status='draft').count()
            pending = Post.objects.filter(author=user, status='pending').count()
            total_views = Post.objects.filter(author=user).aggregate(
                total=Sum('views')
            )['total'] or 0
        
        return Response({
            'total_posts': total_posts,
            'published': published,
            'draft': draft,
            'pending': pending,
            'total_views': total_views,
        })


# Category and Tag views (simple list views for now)
class CategoryListView(generics.ListAPIView):
    """List all categories"""
    queryset = Category.objects.filter(is_active=True).order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class TagListView(generics.ListAPIView):
    """List all tags"""
    queryset = Tag.objects.all().order_by('name')
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]
