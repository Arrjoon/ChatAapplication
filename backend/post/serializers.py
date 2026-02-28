# post/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post, Category, Tag, BreakingNews

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""
    post_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'is_active', 'post_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at', 'post_count']
    
    def get_post_count(self, obj):
        return obj.posts.count()


class TagSerializer(serializers.ModelSerializer):
    """Serializer for Tag model"""
    post_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'post_count', 'created_at']
        read_only_fields = ['id', 'slug', 'created_at', 'post_count']
    
    def get_post_count(self, obj):
        return obj.posts.count()


class PostListSerializer(serializers.ModelSerializer):
    """Serializer for listing posts"""
    author_name = serializers.CharField(source='author.display_name', read_only=True)
    author_username = serializers.CharField(source='author.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'excerpt', 'author_name', 'author_username',
            'category', 'category_name', 'tags', 'featured_image', 'status',
            'is_featured', 'is_breaking', 'views', 'published_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'slug', 'views', 'created_at', 'updated_at']


class PostCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating posts"""
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        source='tags',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Post
        fields = [
            'title', 'content', 'excerpt', 'category', 'tag_ids',
            'featured_image', 'status', 'is_featured', 'is_breaking',
            'meta_title', 'meta_description', 'published_at'
        ]
    
    def validate_title(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters long.")
        return value
    
    def validate_content(self, value):
        if not value or len(value.strip()) < 50:
            raise serializers.ValidationError("Content must be at least 50 characters long.")
        return value
    
    def validate_excerpt(self, value):
        if value and len(value) > 500:
            raise serializers.ValidationError("Excerpt must be less than 500 characters.")
        return value
    
    def create(self, validated_data):
        # Set author to current user
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)


class PostUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating posts"""
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        source='tags',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Post
        fields = [
            'title', 'content', 'excerpt', 'category', 'tag_ids',
            'featured_image', 'status', 'is_featured', 'is_breaking',
            'meta_title', 'meta_description', 'published_at'
        ]
    
    def validate_title(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters long.")
        return value
    
    def validate_content(self, value):
        if not value or len(value.strip()) < 50:
            raise serializers.ValidationError("Content must be at least 50 characters long.")
        return value
    
    def validate_excerpt(self, value):
        if value and len(value) > 500:
            raise serializers.ValidationError("Excerpt must be less than 500 characters.")
        return value


class PostDetailSerializer(serializers.ModelSerializer):
    """Serializer for post detail view"""
    author_name = serializers.CharField(source='author.display_name', read_only=True)
    author_username = serializers.CharField(source='author.username', read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(source='category.id', read_only=True, allow_null=True)
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        source='tags',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt',
            'author', 'author_id', 'author_name', 'author_username',
            'category', 'category_id', 'tags', 'tag_ids',
            'featured_image', 'status', 'is_featured', 'is_breaking',
            'meta_title', 'meta_description', 'views',
            'published_at', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'slug', 'author', 'views', 'created_at', 'updated_at'
        ]


class BreakingNewsSerializer(serializers.ModelSerializer):
    """Serializer for BreakingNews model"""
    post = PostListSerializer(read_only=True)
    post_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = BreakingNews
        fields = [
            'id', 'post', 'post_id', 'headline', 'is_active',
            'expires_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

