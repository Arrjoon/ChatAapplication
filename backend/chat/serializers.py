from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import ChatRoom, Message

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "display_name", "profile_picture"]


class ChatRoomSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = [
            "id",
            "name",
            "is_group",
            "participants",
            "picture",
            "last_message",
            "created_at",
            "updated_at",
        ]

    def get_last_message(self, obj):
        last_msg = obj.messages.order_by("-timestamp").first()
        if last_msg:
            return MessageSerializer(last_msg).data
        return None


class MessageSerializer(serializers.ModelSerializer):

    sender = UserSerializer()

    class Meta:
        model = Message
        fields = [
            "id",
            "sender",
            "message_type",
            "content",
            "timestamp",
            "is_read",
        ]


# CREATE GROUP
class CreateGroupSerializer(serializers.Serializer):
    group_name = serializers.CharField(max_length=255)
    picture = serializers.ImageField(required=False)
    user_ids = serializers.ListField(child=serializers.UUIDField(), allow_empty=False)


# ADD MEMBERS
class AddMembersSerializer(serializers.Serializer):
    group_id = serializers.IntegerField()
    user_ids = serializers.ListField(child=serializers.UUIDField(), allow_empty=False)



class ConvertToGroupSerializer(serializers.Serializer):
    room_id = serializers.IntegerField()
    name = serializers.CharField(required=False, allow_blank=True)
    member_ids = serializers.ListField(child=serializers.UUIDField(), required=False)