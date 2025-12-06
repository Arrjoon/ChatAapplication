from django.urls import path
from .views import (
    UserListAPIView,
    ChatRoomListAPIView,
    OneToOneChatAPIView,
    CreateGroupAPIView,
    AddMembersAPIView,
    MessageListAPIView,
    ConvertToGroupAPIView,
    RemoveMemberAPIView,
    LeaveGroupAPIView,
    chat_list,
    chat_room
)
app_name = 'chat'

urlpatterns = [
    path("users/", UserListAPIView.as_view(), name="user-list"),
    path("", ChatRoomListAPIView.as_view(), name="chatroom-list"),
    path("one-to-one/", OneToOneChatAPIView.as_view(), name="one-to-one"),
    path("group/create/", CreateGroupAPIView.as_view(), name="group-create"),
    path("group/add-members/", AddMembersAPIView.as_view(), name="add-members"),
    path("<int:room_id>/messages/", MessageListAPIView.as_view(), name="message-list"),
    path("convert-to-group/", ConvertToGroupAPIView.as_view(), name="convert-to-group"),

    path('remove-member/', RemoveMemberAPIView.as_view(), name='remove-member'),
    path('leave-group/', LeaveGroupAPIView.as_view(), name='leave-group'),

        # Template views
    path('room/<int:room_id>/', chat_room, name='chat_room'),
    path('list/',chat_list, name='chat_list'),
]
