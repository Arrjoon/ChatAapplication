# post/admin.py
from django.contrib import admin
from .models import Post, Category, Tag, BreakingNews


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'status', 'is_featured', 'is_breaking', 'views', 'created_at', 'published_at']
    list_filter = ['status', 'is_featured', 'is_breaking', 'category', 'created_at', 'published_at']
    search_fields = ['title', 'content', 'excerpt']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['views', 'created_at', 'updated_at']
    filter_horizontal = ['tags']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'content', 'excerpt')
        }),
        ('Relationships', {
            'fields': ('author', 'category', 'tags')
        }),
        ('Media', {
            'fields': ('featured_image',)
        }),
        ('Status & Settings', {
            'fields': ('status', 'is_featured', 'is_breaking', 'published_at')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description')
        }),
        ('Analytics', {
            'fields': ('views',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(BreakingNews)
class BreakingNewsAdmin(admin.ModelAdmin):
    list_display = ['headline', 'post', 'is_active', 'expires_at', 'created_at']
    list_filter = ['is_active', 'created_at', 'expires_at']
    search_fields = ['headline', 'post__title']
    readonly_fields = ['created_at', 'updated_at']
