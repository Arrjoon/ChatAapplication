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
        queryset=ChatRoom.objects.filter(participants=self.request.user).order_by("-updated_at")
        search = self.request.query_params.get('name', None)
        if search:
            queryset =queryset.filter(name__icontains=search)
        return queryset

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
    """
    Create a NEW group from an existing 1-to-1 chat
    Optionally copy messages from the original chat
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ConvertToGroupSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        room_id = serializer.validated_data['room_id']
        original_room = get_object_or_404(ChatRoom, pk=room_id, is_group=False)
        
        # Verify user is part of the original chat
        if request.user not in original_room.participants.all():
            return Response(
                {"detail": "You are not a member of this chat"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get the other participant from 1-to-1 chat
        other_participants = original_room.participants.exclude(id=request.user.id)
        
        # Create NEW group (not modifying existing chat)
        group_name = serializer.validated_data.get("name") or f"Group with {', '.join([p.username for p in other_participants])}"
        
        new_group = ChatRoom.objects.create(
            name=group_name,
            is_group=True,
            picture=serializer.validated_data.get("picture", None),
            created_by=request.user 
        )
        
        # Add all participants from original chat + new members
        all_participants = list(original_room.participants.all())
        
        # Add new members if specified
        member_ids = serializer.validated_data.get("member_ids", [])
        if member_ids:
            new_users = User.objects.filter(id__in=member_ids)
            for user in new_users:
                if user not in all_participants:
                    all_participants.append(user)
        
        new_group.participants.add(*all_participants)
        
        # Optionally copy messages (with user consent/notification)
        copy_messages = serializer.validated_data.get("copy_messages", False)
        if copy_messages:
            # You might want to limit which messages are copied
            messages_to_copy = original_room.messages.all()[:50]  # Last 50 messages
            
            for message in messages_to_copy:
                Message.objects.create(
                    room=new_group,
                    sender=message.sender,
                    content=message.content,
                    is_copy=True  # Add this flag if needed
                )
        
        # Send notification to all participants about new group
        self._send_group_creation_notification(new_group, request.user)
        
        return Response(
            {
                "detail": "Group created successfully",
                "original_chat": ChatRoomSerializer(original_room).data,
                "new_group": ChatRoomSerializer(new_group).data
            },
            status=status.HTTP_201_CREATED
        )
    
    def _send_group_creation_notification(self, group, creator):
        """Helper to send notifications about group creation"""
        # You can implement email/push notifications here
        pass
    
class RemoveMemberAPIView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data.get('user_id')
        room_id = request.data.get('room_id')

        room = get_object_or_404(ChatRoom, pk=room_id, is_group=True)
        
        if not room.is_group:
            return Response(
                {"detail": "Cannot remove users from 1-to-1 chat"},
                status=400
            )


        # Only allow if request.user is a member
        if request.user not in room.participants.all():
            return Response({"detail": "Not allowed"}, status=403)

        user_to_remove = get_object_or_404(User, pk=user_id)
        room.participants.remove(user_to_remove)
        room.save()

        return Response(ChatRoomSerializer(room).data)
    
class LeaveGroupAPIView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        room_id = request.data.get('room_id')

        room = get_object_or_404(ChatRoom, pk=room_id, is_group=True)

        if not room.is_group:
            return Response(
                {"detail": "You cannot leave a 1-to-1 chat"},
                status=400
            )


        # Only allow if request.user is a member
        if request.user not in room.participants.all():
            return Response({"detail": "Not allowed"}, status=403)

        room.participants.remove(request.user)
        room.save()

        return Response(ChatRoomSerializer(room).data)
    

# GET /api/chat/rooms/<id>/messages/?before=<msg_id>&limit=20
class MessageListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, room_id):
        room = get_object_or_404(ChatRoom, id=room_id, participants=request.user)

        limit = int(request.GET.get("limit", 20))
        before_id = request.GET.get("before")

        qs = room.messages.order_by("-timestamp") 

        # If loading older messages
        if before_id:
            qs = qs.filter(id__lt=before_id)

        messages = qs[:limit]
        
        # room.messages.exclude(sender=request.user).filter(is_seen=False).update(is_seen=True)

        # Return in ascending order for UI
        messages = sorted(messages, key=lambda m: m.timestamp)

        return Response({
            "messages": MessageSerializer(messages, many=True).data,
            "has_more": qs.count() > limit,
        })

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
@login_required
def chat_room(request, room_id):
    """
    Render chat room template
    """
    try:
        room = ChatRoom.objects.get(id=room_id, participants=request.user)
        return render(request, 'chat/room.html', {
            'room': room,
            'room_id': room_id
        })
    except ChatRoom.DoesNotExist:
        return render(request, 'chat/error.html', {
            'message': 'Room not found or you do not have access'
        })


@login_required
def chat_list(request):
    """
    List all chat rooms for current user
    """
    rooms = ChatRoom.objects.filter(participants=request.user).order_by('-updated_at')
    return render(request, 'chat/list.html', {
        'rooms': rooms
    })