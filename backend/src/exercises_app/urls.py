from django.urls import path, include
from .views import (
CategoryListAPIView,
CategoryDetailAPIView,
ExerciseAPIView,
WorkoutSessionListCreateAPIView,
WorkoutSessionDetailAPIView,
ExerciseEntryListCreateAPIView,
ExerciseEntryDetailAPIView
)

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('categories/<slug:slug>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('exercises/', ExerciseAPIView.as_view(), name='exercise-list'),
    path('sessions/', WorkoutSessionListCreateAPIView.as_view(), name='workoutsession-list-create'),
    path('sessions/<int:pk>/', WorkoutSessionDetailAPIView.as_view(), name='workoutsession-detail'),
    path('entries/', ExerciseEntryListCreateAPIView.as_view(), name='exerciseentry-create'),
    path('entries/<int:pk>/', ExerciseEntryDetailAPIView.as_view(), name='exerciseentry-detail'),
]
