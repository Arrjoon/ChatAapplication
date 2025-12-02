import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from .models import ChatRoom, Message, MessageReadStatus, UserStatus,DirectMessage
from django.utils import timezone



class ChatConsumer(AsyncWebsocketConsumer):
    """
    WebSocket consumer for handling chat room connections and messages
    """
    
    async def connect(self):
        """
        Called when WebSocket connection is established
        """
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'chat_{self.room_id}'
        self.user = self.scope['user']

        # Reject connection if user is not authenticated
        if not self.user.is_authenticated:
            await self.close()
            return

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept WebSocket connection
        await self.accept()

        # Update user status to online
        await self.update_user_status(True)

        # Send connection success message
        await self.send(text_data=json.dumps({
            'type': 'connection_established successfully',
            'message': 'Connected to chat room',
            'room_id': self.room_id
        }))

        # Notify others that user joined
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'user_join',
                'user_id': str(self.user.id),
                'username': self.user.username
            }
        )

    async def disconnect(self, close_code):
        """
        Called when WebSocket connection is closed
        """
        # Update user status to offline
        await self.update_user_status(False)

        # Notify others that user left
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'user_leave',
                'user_id': str(self.user.id),
                'username': self.user.username
            }
        )

        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """
        Called when message is received from WebSocket
        """
        try:
            data = json.loads(text_data)
            message_type = data.get('type', 'chat_message')

            if message_type == 'chat_message':
                await self.handle_chat_message(data)
            elif message_type == 'typing':
                await self.handle_typing(data)
            elif message_type == 'read_receipt':
                await self.handle_read_receipt(data)
            elif message_type == 'ping':
                await self.handle_ping()

        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Invalid JSON format'
            }))
        except Exception as e:
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': str(e)
            }))

    async def handle_chat_message(self, data):
        """
        Handle incoming chat message
        """
        message_content = data.get('message', '')
        
        if not message_content.strip():
            return

        # Save message to database
        message = await self.save_message(message_content)

        if message:
            # Broadcast message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message_broadcast',
                    'message_id': message.id,
                    'message': message.content,
                    'sender_id': str(self.user.id),
                    'sender_username': self.user.username,
                    'timestamp': message.timestamp.isoformat(),
                    'message_type': message.message_type
                    
                }
            )

    async def handle_typing(self, data):
        """
        Handle typing indicator
        """
        is_typing = data.get('is_typing', False)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'typing_indicator',
                'user_id': str(self.user.id),
                'username': self.user.username,
                'is_typing': is_typing
            }
        )

    async def handle_read_receipt(self, data):
        """
        Handle message read receipt
        """
        message_id = data.get('message_id')
        
        if message_id:
            await self.mark_message_read(message_id)
            
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'read_receipt_broadcast',
                    'message_id': message_id,
                    'user_id': str(self.user.id),
                    'username': self.user.username
                }
            )

    async def handle_ping(self):
        """
        Handle ping/heartbeat
        """
        await self.send(text_data=json.dumps({
            'type': 'pong',
            'timestamp': timezone.now().isoformat()
        }))

    # Handlers for group messages (called via channel_layer.group_send)

    async def chat_message_broadcast(self, event):
        """
        Send message to WebSocket
        """
        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'message_id': event['message_id'],
            'message': event['message'],
            'sender_id': event['sender_id'],
            'sender_username': event['sender_username'],
            'timestamp': event['timestamp'],
            'message_type': event['message_type']
        }))

    async def typing_indicator(self, event):
        """
        Send typing indicator to WebSocket
        """
        # Don't send typing indicator to the user who is typing
        if event['user_id'] != self.user.id:
            await self.send(text_data=json.dumps({
                'type': 'typing',
                'user_id': event['user_id'],
                'username': event['username'],
                'is_typing': event['is_typing']
            }))

    async def user_join(self, event):
        """
        Send user join notification
        """
        if event['user_id'] != self.user.id:
            await self.send(text_data=json.dumps({
                'type': 'user_joined',
                'user_id': event['user_id'],
                'username': event['username']
            }))

    async def user_leave(self, event):
        """
        Send user leave notification
        """
        if event['user_id'] != self.user.id:
            await self.send(text_data=json.dumps({
                'type': 'user_left',
                'user_id': event['user_id'],
                'username': event['username']
            }))

    async def read_receipt_broadcast(self, event):
        """
        Send read receipt to WebSocket
        """
        await self.send(text_data=json.dumps({
            'type': 'read_receipt',
            'message_id': event['message_id'],
            'user_id': event['user_id'],
            'username': event['username']
        }))

    # Database operations (sync functions wrapped with database_sync_to_async)

    @database_sync_to_async
    def save_message(self, content):
        """
        Save message to database
        """
        try:
            room = ChatRoom.objects.get(id=self.room_id)
            message = Message.objects.create(
                room=room,
                sender=self.user,
                content=content,
                message_type='text'
            )
            return message
        except ChatRoom.DoesNotExist:
            return None

    @database_sync_to_async
    def mark_message_read(self, message_id):
        """
        Mark message as read by current user
        """
        try:
            message = Message.objects.get(id=message_id)
            MessageReadStatus.objects.get_or_create(
                message=message,
                user=self.user
            )
        except Message.DoesNotExist:
            pass

    @database_sync_to_async
    def update_user_status(self, is_online):
        """
        Update user online/offline status
        """
        status, created = UserStatus.objects.get_or_create(user=self.user)
        status.is_online = is_online
        status.last_seen = timezone.now()
        status.save()


class NotificationConsumer(AsyncWebsocketConsumer):
    """
    Consumer for global notifications (new messages, friend requests, etc.)
    """
    
    async def connect(self):
        self.user = self.scope['user']

        if not self.user.is_authenticated:
            await self.close()
            return

        self.user_group_name = f'user_{self.user.id}'

        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.user_group_name,
            self.channel_name
        )

    async def notification(self, event):
        """
        Send notification to WebSocket
        """
        await self.send(text_data=json.dumps({
            'type': 'notification',
            'notification_type': event['notification_type'],
            'message': event['message'],
            'data': event.get('data', {})
        }))



class DirectChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        self.other_user_id = self.scope['url_route']['kwargs']['user_id']  # user to chat with
        self.other_user = await database_sync_to_async(User.objects.get)(id=self.other_user_id)

        if not self.user.is_authenticated:
            await self.close()
            return

        # Create a unique group for the pair (smaller ID first to avoid duplicates)
        user_ids = sorted([str(self.user.id), str(self.other_user.id)])
        self.room_group_name = f"direct_{user_ids[0]}_{user_ids[1]}"

        # Join group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_content = data.get('message', '')

        if not message_content.strip():
            return

        # Save message to DB
        message = await self.save_message(message_content)

        # Send to both users in group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'direct_message_broadcast',
                'message_id': message.id,
                'sender_id': str(self.user.id),
                'sender_username': self.user.username,
                'receiver_id': str(self.other_user.id),
                'message': message.content,
                'timestamp': message.timestamp.isoformat(),
                'message_type': message.message_type
            }
        )

    async def direct_message_broadcast(self, event):
        await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def save_message(self, content):
        return DirectMessage.objects.create(
            sender=self.user,
            receiver=self.other_user,
            content=content
        )
