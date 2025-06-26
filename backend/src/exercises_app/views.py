from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, ValidationError
from user_account.models import CustomUser
from .models import Exercise, CategoryExercise, ExerciseEntry, WorkoutSession
from .serializers import ExerciseSerializer, CategoryExerciseSerializer, CategoryExerciseDetailSerializer, WorkoutSessionSerializer, ExerciseEntrySerializer
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
        exercise = Exercise.objects.all()
        serializer = ExerciseSerializer(exercise, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class WorkoutSessionListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if request.user.is_superuser:
            workout_sessions = WorkoutSession.objects.all().order_by('-date')
        else:
            workout_sessions = WorkoutSession.objects.filter(user=request.user).order_by('-date')

        serializer = WorkoutSessionSerializer(workout_sessions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = WorkoutSessionSerializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data.get('user') and serializer.validated_data['user'] != request.user:
                raise PermissionDenied("Vous ne pouvez pas créer de session pour un autre utilisateur.")

            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkoutSessionDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        obj = get_object_or_404(WorkoutSession, pk=pk)
        if obj.user != self.request.user and not self.request.user.is_superuser:
            raise PermissionDenied("Vous n'avez pas la permission d'accéder à cette session.")
        return obj

    def get(self, request, pk, format=None):
        workout_session = self.get_object(pk)
        serializer = WorkoutSessionSerializer(workout_session)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        workout_session = self.get_object(pk)
        serializer = WorkoutSessionSerializer(workout_session, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        workout_session = self.get_object(pk)
        serializer = WorkoutSessionSerializer(workout_session, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        workout_session = self.get_object(pk)
        workout_session.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExerciseEntryListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if request.user.is_superuser:
            exercise_entries = ExerciseEntry.objects.all()
        else:
            exercise_entries = ExerciseEntry.objects.filter(session__user=request.user)

        serializer = ExerciseEntrySerializer(exercise_entries, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ExerciseEntrySerializer(data=request.data)
        if serializer.is_valid():
            session_id = serializer.validated_data.get('session')

            if not session_id:
                 raise ValidationError({"session": "L'ID de la session est requis pour créer une entrée d'exercice."})

            session = get_object_or_404(WorkoutSession, pk=session_id.id)
            if session.user != request.user:
                raise PermissionDenied("Vous ne pouvez pas ajouter une entrée à une session qui ne vous appartient pas.")

            serializer.save(session=session)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExerciseEntryDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        obj = get_object_or_404(ExerciseEntry, pk=pk)
        if obj.session.user != self.request.user and not self.request.user.is_superuser:
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
            new_session_id = serializer.validated_data.get('session')
            if new_session_id and new_session_id.id != exercise_entry.session.id:
                new_session = get_object_or_404(WorkoutSession, pk=new_session_id.id)
                if new_session.user != request.user:
                    raise PermissionDenied("Vous ne pouvez pas lier cette entrée à une session qui ne vous appartient pas.")

            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        exercise_entry = self.get_object(pk)
        serializer = ExerciseEntrySerializer(exercise_entry, data=request.data, partial=True)
        if serializer.is_valid():
            new_session_id = serializer.validated_data.get('session')
            if new_session_id and new_session_id.id != exercise_entry.session.id:
                new_session = get_object_or_404(WorkoutSession, pk=new_session_id.id)
                if new_session.user != request.user:
                    raise PermissionDenied("Vous ne pouvez pas lier cette entrée à une session qui ne vous appartient pas.")

            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        exercise_entry = self.get_object(pk)
        exercise_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
