from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, ValidationError
from user_account.models import CustomUser
from .models import Exercise, CategoryExercise, ExerciseEntry
from .serializers import (
    ExerciseSerializer,
    CategoryExerciseSerializer,
    CategoryExerciseDetailSerializer,
    ExerciseEntrySerializer
)
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

class ExerciseAPIView(APIView):
    def get(self, request):
        exercise = Exercise.objects.filter(is_adaptive=False)
        serializer = ExerciseSerializer(exercise, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ExerciseEntryListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if request.user.is_superuser:
            exercise_entries = ExerciseEntry.objects.all()
        else:
            exercise_entries = ExerciseEntry.objects.filter(user=request.user)

        serializer = ExerciseEntrySerializer(exercise_entries, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ExerciseEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExerciseEntryDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        obj = get_object_or_404(ExerciseEntry, pk=pk)
        if obj.user != self.request.user and not self.request.user.is_superuser:
            raise PermissionDenied("Vous n'avez pas la permission d'accéder à cette entrée d'exercice.")
        return obj

    def get(self, request, pk, format=None):
        exercise_entry = self.get_object(pk)
        serializer = ExerciseEntrySerializer(exercise_entry)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        exercise_entry = self.get_object(pk)
        serializer = ExerciseEntrySerializer(exercise_entry, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        exercise_entry = self.get_object(pk)
        serializer = ExerciseEntrySerializer(exercise_entry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        exercise_entry = self.get_object(pk)
        exercise_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
