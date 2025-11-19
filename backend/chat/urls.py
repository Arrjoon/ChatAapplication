from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# API router
router = DefaultRouter()
router.register(r'rooms', views.ChatRoomViewSet, basename='chatroom')
router.register(r'user-status', views.UserStatusViewSet, basename='userstatus')

app_name = 'chat'

urlpatterns = [
    # API endpoints
    path('api/', include(router.urls)),
    
    # Template views
    path('room/<int:room_id>/', views.chat_room, name='chat_room'),
    path('', views.chat_list, name='chat_list'),
]