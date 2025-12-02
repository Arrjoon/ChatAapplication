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
    participants = serializers.StringRelatedField(many=True)
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    participant_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )

    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'participants', 'is_group', 
                  'created_at', 'updated_at', 'last_message', 
                  'unread_count', 'participant_ids']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_last_message(self, obj):
        last_msg = getattr(obj, 'get_last_message', lambda: None)()
        if last_msg:
            return {
                'id': last_msg.id,
                'content': last_msg.content,
                'sender': last_msg.sender.username,
                'timestamp': last_msg.timestamp
            }
        return None

    def get_unread_count(self, obj):
        request = self.context.get('request')
        if request and request.user:
            return getattr(obj, 'messages', obj).exclude(
                read_statuses__user=request.user
            ).exclude(sender=request.user).count()
        return 0

    def create(self, validated_data):
        participant_ids = validated_data.pop('participant_ids', [])
        room = ChatRoom.objects.create(**validated_data)
        request = self.context.get('request')
        if request and request.user:
            room.participants.add(request.user)
        if participant_ids:
            room.participants.add(*participant_ids)
        return room

    def update(self, instance, validated_data):
        participant_ids = validated_data.pop('participant_ids', [])
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        instance.participants.clear()
        request = self.context.get('request')
        if request and request.user:
            instance.participants.add(request.user)
        if participant_ids:
            instance.participants.add(*participant_ids)
        return instance



class UserStatusSerializer(serializers.ModelSerializer):
    """Serializer for UserStatus model"""
    
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserStatus
        fields = ['user', 'is_online', 'last_seen']
        read_only_fields = ['last_seen']