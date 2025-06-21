# users/urls.py

from django.urls import path
from .views import MyTokenObtainPairView, UserCreateView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login')
]
