from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, ValidationError
from user_account.models import CustomUser
from .models import Exercise, CategoryExercise, ExerciseEntry
import datetime
from .serializers import (
    ExerciseSerializer,
    CategoryExerciseSerializer,
    CategoryExerciseDetailSerializer,
    ExerciseEntrySerializer
)
from django.shortcuts import get_list_or_404, get_object_or_404
from sport_profile.models import SportProfile, ConstraintField
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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        exercises_to_display_ids = set()
        zones_covered_by_adaptive = set()
        user_has_relevant_adaptive_exercises = False

        try:
            sport_profile = SportProfile.objects.prefetch_related('constraints').get(user=user)

            if sport_profile.constraints.exists():
                adaptive_exercises = Exercise.objects.filter(
                    is_adaptive=True,
                    adaptative_for__in=sport_profile.constraints.all()
                ).distinct()

                if adaptive_exercises.exists():
                    exercises_to_display_ids.update(adaptive_exercises.values_list('id', flat=True))
                    zones_covered_by_adaptive.update(adaptive_exercises.values_list('category__id', flat=True))
                    user_has_relevant_adaptive_exercises = True

        except SportProfile.DoesNotExist:
            pass

        if user_has_relevant_adaptive_exercises:
            normal_exercises_query = Exercise.objects.filter(is_adaptive=False)

            if exercises_to_display_ids:
                normal_exercises_query = normal_exercises_query.exclude(id__in=list(exercises_to_display_ids))

            if zones_covered_by_adaptive:
                normal_exercises_query = normal_exercises_query.exclude(category__id__in=list(zones_covered_by_adaptive))
        else:
            normal_exercises_query = Exercise.objects.filter(is_adaptive=False)

        exercises_to_display_ids.update(normal_exercises_query.values_list('id', flat=True))

        final_exercises_list = Exercise.objects.filter(id__in=list(exercises_to_display_ids)).order_by('name')

        serializer = ExerciseSerializer(final_exercises_list, many=True)

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
