from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ChatRoom, Message, MessageReadStatus, UserStatus


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for Message model"""
    
    sender = UserSerializer(read_only=True)
    read_by = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'room', 'sender', 'content', 'message_type', 
                  'timestamp', 'is_read', 'read_by']
        read_only_fields = ['id', 'timestamp']

    def get_read_by(self, obj):
        """Get list of users who read this message"""
        read_statuses = obj.read_statuses.select_related('user')
        return [
            {
                'user_id': rs.user.id, 
                'username': rs.user.username, 
                'read_at': rs.read_at
            } 
            for rs in read_statuses
        ]


class ChatRoomSerializer(serializers.ModelSerializer):
    """Serializer for ChatRoom model"""
    
    participants = UserSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'participants', 'is_group', 'created_at', 
                  'updated_at', 'last_message', 'unread_count']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_last_message(self, obj):
        """Get the last message in the room"""
        last_msg = obj.get_last_message()
        if last_msg:
            return {
                'id': last_msg.id,
                'content': last_msg.content,
                'sender': last_msg.sender.username,
                'timestamp': last_msg.timestamp
            }
        return None

    def get_unread_count(self, obj):
        """Get count of unread messages for current user"""
        request = self.context.get('request')
        if request and request.user:
            return obj.messages.exclude(
                read_statuses__user=request.user
            ).exclude(sender=request.user).count()
        return 0


class UserStatusSerializer(serializers.ModelSerializer):
    """Serializer for UserStatus model"""
    
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserStatus
        fields = ['user', 'is_online', 'last_seen']
        read_only_fields = ['last_seen']