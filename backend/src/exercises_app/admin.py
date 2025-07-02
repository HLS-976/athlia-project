from django.contrib import admin

from exercises_app.models import CategoryExercise, Exercise, ExerciseEntry

# Register your models here.
admin.site.register(CategoryExercise)
admin.site.register(Exercise)

# @admin.register(WorkoutSession)
# class WorkoutSessionAdmin(admin.ModelAdmin):
#     list_display = ('user', 'date', 'notes')
#     list_filter = ('date', 'user')
#     search_fields = ('user__username', 'notes')
#     date_hierarchy = 'date'

@admin.register(ExerciseEntry)
class ExerciseEntryAdmin(admin.ModelAdmin):
    list_display = ('exercise', 'sets', 'reps', 'duration_minutes')
    # list_filter = ('exercise')
    search_fields = ('exercise__name', 'notes')
    # raw_id_fields = ('exercise')
