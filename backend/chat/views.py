from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db.models import Q, Count, Max
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import ChatRoom, Message, UserStatus
from .serializers import ChatRoomSerializer, MessageSerializer, UserStatusSerializer


class ChatRoomViewSet(viewsets.ModelViewSet):
    """
    ViewSet for ChatRoom operations
    """
    serializer_class = ChatRoomSerializer
    # permission_classes = [IsAuthenticated]
    print("ChatRoomViewSet initialized")

    def get_queryset(self):
        """
        Return chat rooms where current user is a participant
        """
        return ChatRoom.objects.filter(
            participants=self.request.user
        ).annotate(
            message_count=Count('messages'),
            last_message_time=Max('messages__timestamp')
        ).order_by('-last_message_time')

    def create(self, request):
        """
        Create a new chat room
        """
        participant_ids = request.data.get('participants', [])
        is_group = request.data.get('is_group', False)
        room_name = request.data.get('name', '')

        # Validate participants
        if not participant_ids:
            return Response(
                {'error': 'At least one participant is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # For private chat, check if room already exists
        if not is_group and len(participant_ids) == 1:
            existing_room = ChatRoom.objects.filter(
                is_group=False,
                participants=request.user
            ).filter(
                participants__id=participant_ids[0]
            ).first()

            if existing_room:
                serializer = self.get_serializer(existing_room)
                return Response(serializer.data)

        # Create new room
        if not room_name:
            if is_group:
                room_name = f"Group Chat"
            else:
                try:
                    other_user = User.objects.get(id=participant_ids[0])
                    room_name = f"{request.user.username} & {other_user.username}"
                except User.DoesNotExist:
                    return Response(
                        {'error': 'User not found'},
                        status=status.HTTP_404_NOT_FOUND
                    )

        room = ChatRoom.objects.create(name=room_name, is_group=is_group)
        room.participants.add(request.user)
        
        for participant_id in participant_ids:
            try:
                room.participants.add(participant_id)
            except User.DoesNotExist:
                pass

        serializer = self.get_serializer(room)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

    @action(detail=True, methods=['post'])
    def update_participants(self, request, pk=None):
        """
        Update participants of an existing group
        """
        room = self.get_object()
        
        if not room.is_group:
            return Response({"error": "Cannot modify participants of a private chat."}, status=status.HTTP_400_BAD_REQUEST)

        participant_ids = request.data.get('participant_ids', [])

        # Keep the current user in the group
        room.participants.set([request.user] + participant_ids)

        serializer = self.get_serializer(room)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        """
        Get all messages for a specific chat room
        """
        room = self.get_object()
        messages = room.messages.select_related('sender').order_by('-timestamp')
        
        # Pagination
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 50))
        start = (page - 1) * page_size
        end = start + page_size
        
        messages_page = messages[start:end]
        serializer = MessageSerializer(messages_page, many=True)
        
        return Response({
            'messages': serializer.data,
            'page': page,
            'page_size': page_size,
            'total': messages.count()
        })

    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        """
        Send a message to the chat room (alternative to WebSocket)
        """
        room = self.get_object()
        content = request.data.get('content', '')
        
        if not content.strip():
            return Response(
                {'error': 'Message content cannot be empty'},
                status=status.HTTP_400_BAD_REQUEST
            )

        message = Message.objects.create(
            room=room,
            sender=request.user,
            content=content
        )

        serializer = MessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'])
    def leave_room(self, request, pk=None):
        """
        Leave a chat room
        """
        room = self.get_object()
        room.participants.remove(request.user)
        
        return Response(
            {'message': 'Successfully left the room'},
            status=status.HTTP_200_OK
        )


class UserStatusViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for user online/offline status
    """
    serializer_class = UserStatusSerializer
    permission_classes = [IsAuthenticated]
    queryset = UserStatus.objects.all()

    @action(detail=False, methods=['get'])
    def friends_status(self, request):
        """
        Get online status of all friends/contacts
        """
        # Get all users in rooms with current user
        user_ids = ChatRoom.objects.filter(
            participants=request.user
        ).values_list('participants', flat=True).distinct()
        
        statuses = UserStatus.objects.filter(
            user_id__in=user_ids
        ).exclude(user=request.user)
        
        serializer = self.get_serializer(statuses, many=True)
        return Response(serializer.data)


# Template views
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