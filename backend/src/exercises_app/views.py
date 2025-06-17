from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Exercise, CategoryExercise
from .serializers import ExerciseSerializer, CategoryExerciseSerializer, CategoryExerciseDetailSerializer
from django.shortcuts import get_list_or_404, get_object_or_404
# Create your views here.


class CategoryListAPIView(APIView):
    def get(self, request):
        categories = CategoryExercise.objects.all()
        serializer = CategoryExerciseSerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryDetailAPIView(APIView):
    def get(self, request, slug):
        category = get_object_or_404(CategoryExercise, slug=slug)
        serializer = CategoryExerciseDetailSerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)
