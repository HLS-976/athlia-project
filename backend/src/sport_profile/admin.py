from django.contrib import admin
from .models import SportProfile, ConstraintField

@admin.register(SportProfile)
class SportProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'level_user', 'age')
    filter_horizontal = ('constraints',)

@admin.register(ConstraintField)
class ConstraintFieldAdmin(admin.ModelAdmin):
    list_display = ('name',)
