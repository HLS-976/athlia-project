from django.db import models
from django.utils.text import slugify
from django.contrib.postgres.fields import ArrayField
from user_account.models import CustomUser
from sport_profile.models import ConstraintField
from user_account.models import CustomUser
# Create your models here.
class CategoryExercise(models.Model):
    name = models.CharField(max_length=150, blank=True, null=True, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name = "Category Exercise"
        verbose_name_plural = "Category Exercises"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name or "Unnamed Category"


class Exercise(models.Model):
    DIFFICULTY_LOW = "beginner"
    DIFFICULTY_MODERATE = "intermediate"
    DIFFICULTY_HIGH = "advanced"
    DIFFICULTY_NULL = "null"

    DIFFICULTY_CHOICES = [
        (DIFFICULTY_LOW, "Beginner"),
        (DIFFICULTY_MODERATE, "Intermediate"),
        (DIFFICULTY_HIGH, "Advanced"),
        (DIFFICULTY_NULL, 'Null')
    ]

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    difficulty = models.CharField(
        max_length=50,
        choices=DIFFICULTY_CHOICES,
        default=DIFFICULTY_NULL
    )
    category = models.ForeignKey(
        CategoryExercise,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='exercises'
    )
    is_adaptive = models.BooleanField(default=False)
    adaptative_for = models.ManyToManyField(
        ConstraintField,
        blank=True,
        related_name='exercises_adaptive_for'
    )

    class Meta:
        verbose_name = "Exercise"
        verbose_name_plural = "Exercises"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


# class WorkoutSession(models.Model):
#     user = models.ForeignKey(
#         CustomUser,
#         on_delete=models.CASCADE,
#         related_name='workout_sessions',
#         verbose_name="Utilisateur"
#     )
#     date = models.DateField(auto_now_add=True, verbose_name="Date de la séance")
#     notes = models.TextField(blank=True, null=True, verbose_name="Notes de la séance")

#     class Meta:
#         ordering = ['-date']
#         verbose_name = "Training session"
#         verbose_name_plural = "Trainings sessions"

#     def __str__(self):
#         return f"Séance du {self.date} par {self.user.user_name}"


class ExerciseEntry(models.Model):

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='exercise_entries',
        verbose_name="utilisateur"
    )
    exercise = models.ForeignKey(
        Exercise,
        on_delete=models.CASCADE,
        verbose_name="Exercice"
    )
    sets = models.IntegerField(blank=True, null=True, verbose_name="Séries")
    reps = models.IntegerField(blank=True, null=True, verbose_name="Répétitions")
    duration_minutes = models.IntegerField(blank=True, null=True, verbose_name="Durée (minutes)")
    notes = models.TextField(blank=True, null=True, verbose_name="Notes spécifiques à l'exercice")

    class Meta:
        verbose_name = "Exercice entry"
        verbose_name_plural = "Exercises entries"

    def __str__(self):
        performance_details = []
        if self.sets is not None and self.reps is not None:
            performance_details.append(f"{self.sets}x{self.reps} reps")
        if self.duration_minutes is not None:
            performance_details.append(f"{self.duration_minutes}min")

        details_str = ", ".join(performance_details) if performance_details else "Détails non spécifiés"

        return f"{self.exercise.name} ({details_str})"
