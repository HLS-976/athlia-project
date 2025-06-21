from django.contrib import admin

from exercises_app.models import CategoryExercise, Exercise

# Register your models here.
admin.site.register(CategoryExercise)
admin.site.register(Exercise)
