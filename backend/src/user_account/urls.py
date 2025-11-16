# users/urls.py

from django.urls import path
from .views import UserCreateView, UserDetailView, UserDeleteView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('user/', UserDetailView.as_view(), name='user'),
    path("user_delete/", UserDeleteView.as_view(), name="user_delete"),
]
