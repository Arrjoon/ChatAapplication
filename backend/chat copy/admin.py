from django.contrib import admin
from .models import ChatRoom, Message, MessageReadStatus, UserStatus


@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    """Admin interface for ChatRoom model"""
    
    list_display = ['id', 'name', 'is_group', 'created_at', 'participant_count']
    list_filter = ['is_group', 'created_at']
    search_fields = ['name']
    filter_horizontal = ['participants']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Room Information', {
            'fields': ('name', 'is_group')
        }),
        ('Participants', {
            'fields': ('participants',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def participant_count(self, obj):
        """Display number of participants"""
        return obj.participants.count()
    participant_count.short_description = 'Participants'


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    """Admin interface for Message model"""
    
    list_display = ['id', 'sender', 'room', 'short_content', 'message_type', 'timestamp', 'is_read']
    list_filter = ['message_type', 'timestamp', 'is_read']
    search_fields = ['content', 'sender__username', 'room__name']
    readonly_fields = ['timestamp']
    
    fieldsets = (
        ('Message Details', {
            'fields': ('room', 'sender', 'content', 'message_type')
        }),
        ('Status', {
            'fields': ('is_read', 'timestamp')
        }),
    )
    
    def short_content(self, obj):
        """Display truncated message content"""
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    short_content.short_description = 'Content'


@admin.register(MessageReadStatus)
class MessageReadStatusAdmin(admin.ModelAdmin):
    """Admin interface for MessageReadStatus model"""
    
    list_display = ['id', 'message', 'user', 'read_at']
    list_filter = ['read_at']
    search_fields = ['user__username', 'message__content']
    readonly_fields = ['read_at']


@admin.register(UserStatus)
class UserStatusAdmin(admin.ModelAdmin):
    """Admin interface for UserStatus model"""
    
    list_display = ['user', 'is_online', 'last_seen']
    list_filter = ['is_online']
    search_fields = ['user__username']
    readonly_fields = ['last_seen']
    
    def get_readonly_fields(self, request, obj=None):
        """Make user field readonly when editing"""
        if obj:
            return self.readonly_fields + ['user']
        return self.readonly_fields