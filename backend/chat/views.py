from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import ChatRoom, Message
from .serializers import (
    ChatRoomSerializer,
    MessageSerializer,
    UserSerializer,
    CreateGroupSerializer,
    AddMembersSerializer,
    ConvertToGroupSerializer,
)

User = get_user_model()


# 🔹 List all users
class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


# 🔹 List all user chat rooms
class ChatRoomListAPIView(generics.ListAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ChatRoom.objects.filter(participants=self.request.user).order_by("-updated_at")


# 🔹 Create 1-to-1 Chat Auto
class OneToOneChatAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data.get("user_id")
        other_user = get_object_or_404(User, id=user_id)

        # Check if 1-to-1 room exists
        room = ChatRoom.objects.filter(is_group=False, participants=request.user)\
                               .filter(participants=other_user).first()

        if room:
            return Response(ChatRoomSerializer(room).data)

        # Create new room
        room = ChatRoom.objects.create(
            name=f"{request.user.username}, {other_user.username}",
            is_group=False
        )
        room.participants.add(request.user, other_user)

        return Response(ChatRoomSerializer(room).data, status=201)


# 🔹 Create group
class CreateGroupAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateGroupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        group_name = serializer.validated_data["group_name"]
        user_ids = serializer.validated_data["user_ids"]
        picture = serializer.validated_data.get("picture", None)

        room = ChatRoom.objects.create(
            name=group_name,
            is_group=True,
            picture=picture
        )
        room.participants.add(*User.objects.filter(id__in=user_ids), request.user)

        return Response(ChatRoomSerializer(room).data, status=201)


# 🔹 Add members to existing group
class AddMembersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddMembersSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        group_id = serializer.validated_data["group_id"]
        user_ids = serializer.validated_data["user_ids"]

        room = get_object_or_404(ChatRoom, id=group_id, is_group=True)
        room.participants.add(*User.objects.filter(id__in=user_ids))
        room.save()

        return Response(ChatRoomSerializer(room).data)


# 🔹 Fetch messages in room
class MessageListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, room_id):
        room = get_object_or_404(ChatRoom, id=room_id, participants=request.user)
        messages = room.messages.all()
        return Response(MessageSerializer(messages, many=True).data)


class ConvertToGroupAPIView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ConvertToGroupSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        room_id = serializer.validated_data['room_id']
        room = get_object_or_404(ChatRoom, pk=room_id)

        # Only allow conversion if request.user is a member (you can tighten)
        if request.user not in room.members.all():
            return Response({"detail": "Not allowed"}, status=403)

        room.is_group = True
        name = serializer.validated_data.get("name")
        if name:
            room.name = name
        room.save()

        member_ids = serializer.validated_data.get("member_ids", [])
        if member_ids:
            users = User.objects.filter(id__in=member_ids)
            for u in users:
                room.members.add(u)

        return Response(ChatRoomSerializer(room).data)