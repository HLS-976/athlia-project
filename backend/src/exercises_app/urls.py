from django.urls import path, include
from .views import CategoryListAPIView, CategoryDetailAPIView, ExerciseAPIView

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('categories/<slug:slug>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('exercises/', ExerciseAPIView.as_view(), name='exercise-list')
]
