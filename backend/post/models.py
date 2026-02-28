# post/models.py
from django.db import models
from django.conf import settings
from django.utils.text import slugify


class Category(models.Model):
    """Category model for organizing news posts"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_active']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Tag(models.Model):
    """Tag model for tagging news posts"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['slug']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Post(models.Model):
    """Post/News model for news articles"""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending', 'Pending Review'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    content = models.TextField()
    excerpt = models.TextField(max_length=500, blank=True, null=True, help_text="Brief summary of the article")
    
    # Relationships
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='posts'
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name='posts')
    
    # Media
    featured_image = models.ImageField(
        upload_to='media/posts/featured/',
        blank=True,
        null=True
    )
    
    # Status and metadata
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    is_featured = models.BooleanField(default=False)
    is_breaking = models.BooleanField(default=False)
    
    # SEO
    meta_title = models.CharField(max_length=200, blank=True, null=True)
    meta_description = models.TextField(max_length=300, blank=True, null=True)
    
    # Analytics
    views = models.PositiveIntegerField(default=0)
    
    # Timestamps
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['status']),
            models.Index(fields=['author']),
            models.Index(fields=['category']),
            models.Index(fields=['is_featured']),
            models.Index(fields=['is_breaking']),
            models.Index(fields=['published_at']),
        ]
        permissions = [
            ('can_create_post', 'Can create posts'),
            ('can_edit_post', 'Can edit posts'),
            ('can_publish_post', 'Can publish posts'),
            ('can_delete_post', 'Can delete posts'),
            ('can_view_all_posts', 'Can view all posts'),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            # Ensure uniqueness
            base_slug = self.slug
            counter = 1
            while Post.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{base_slug}-{counter}"
                counter += 1
        
        # Auto-set published_at when status changes to published
        if self.status == 'published' and not self.published_at:
            from django.utils import timezone
            self.published_at = timezone.now()
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class BreakingNews(models.Model):
    """Breaking News model for urgent news items"""
    id = models.AutoField(primary_key=True)
    post = models.OneToOneField(
        Post,
        on_delete=models.CASCADE,
        related_name='breaking_news'
    )
    headline = models.CharField(max_length=200, help_text="Short headline for breaking news")
    is_active = models.BooleanField(default=True)
    expires_at = models.DateTimeField(blank=True, null=True, help_text="When to stop showing as breaking news")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Breaking News"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['is_active']),
            models.Index(fields=['expires_at']),
        ]

    def __str__(self):
        return f"Breaking: {self.headline}"
