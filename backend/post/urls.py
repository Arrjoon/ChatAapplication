# post/urls.py
from django.urls import path
from . import views

app_name = 'post'

urlpatterns = [
    # Post CRUD endpoints
    path('posts/', views.PostListView.as_view(), name='post-list'),
    path('posts/create/', views.PostCreateView.as_view(), name='post-create'),
    path('posts/<int:id>/', views.PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:post_id>/publish/', views.PostPublishView.as_view(), name='post-publish'),
    path('posts/stats/', views.PostStatsView.as_view(), name='post-stats'),
    
    # Category and Tag endpoints
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('tags/', views.TagListView.as_view(), name='tag-list'),
]

