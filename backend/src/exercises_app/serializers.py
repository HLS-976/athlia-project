from .models import CategoryExercise, Exercise
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
