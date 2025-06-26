from django.urls import path
from .views import (
    ConstraintFieldListAPIView,
    ConstraintFieldDetailAPIView,
    SportProfileListCreateAPIView,
    SportProfileDetailAPIView
)

urlpatterns = [
    path('constraints/', ConstraintFieldListAPIView.as_view(), name='constraint-list'),
    path('constraints/<int:pk>/', ConstraintFieldDetailAPIView.as_view(), name='constraint-detail'),

    path('sport-profiles/', SportProfileListCreateAPIView.as_view(), name='sportprofile-list-create'),
    path('sport-profiles/<int:pk>/', SportProfileDetailAPIView.as_view(), name='sportprofile-detail'),
]