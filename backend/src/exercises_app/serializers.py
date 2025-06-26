from .models import CategoryExercise, Exercise, WorkoutSession, ExerciseEntry
from rest_framework import serializers


class CategoryExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryExercise
        fields = ['id', 'name']


class ExerciseSerializer(serializers.ModelSerializer):
    category = CategoryExerciseSerializer(read_only=True)

    class Meta:
        model = Exercise
        fields = ['id', 'name', 'description', 'difficulty', 'category']


class CategoryExerciseDetailSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = CategoryExercise
        fields = ['id', 'name', 'exercises']


class ExerciseEntrySerializer(serializers.ModelSerializer):
    exercise_name = serializers.CharField(source='exercise.name', read_only=True)

    class Meta:
        model = ExerciseEntry

        fields = ['id', 'session', 'exercise', 'exercise_name', 'sets', 'reps', 'duration_minutes', 'notes']


class WorkoutSessionSerializer(serializers.ModelSerializer):
    exercise_entries = ExerciseEntrySerializer(many=True, read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = WorkoutSession
        fields = ['id', 'user', 'user_username', 'date', 'notes', 'exercise_entries']
        read_only_fields = ['user', 'date']
