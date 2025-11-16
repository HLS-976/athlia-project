from django.contrib import admin

from exercises_app.models import CategoryExercise, Exercise, ExerciseEntry

# Register your models here.
admin.site.register(CategoryExercise)
admin.site.register(Exercise)
admin.site.register(ExerciseEntry)
