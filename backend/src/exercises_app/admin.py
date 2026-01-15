from django.contrib import admin

from exercises_app.models import CategoryExercise, Exercise, ExerciseEntry, WorkoutSession

# Register your models here.
admin.site.register(CategoryExercise)
admin.site.register(Exercise)

@admin.register(WorkoutSession)
class WorkoutSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'notes')
    list_filter = ('date', 'user')
    search_fields = ('user__username', 'notes')
    date_hierarchy = 'date'

@admin.register(ExerciseEntry)
class ExerciseEntryAdmin(admin.ModelAdmin):
    list_display = ('session', 'exercise', 'sets', 'reps', 'duration_minutes')
    list_filter = ('exercise', 'session__date', 'session__user')
    search_fields = ('exercise__name', 'notes')
    raw_id_fields = ('session', 'exercise')
