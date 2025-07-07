from django.db import models
from django.utils.text import slugify
from django.contrib.postgres.fields import ArrayField
from user_account.models import CustomUser
from sport_profile.models import ConstraintField
from user_account.models import CustomUser
from django.utils.timezone import now
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
    DIFFICULTY_LOW = "facile"
    DIFFICULTY_MODERATE = "modéré"
    DIFFICULTY_HIGH = "difficile"
    DIFFICULTY_NULL = "adaptatif"

    DIFFICULTY_CHOICES = [
        (DIFFICULTY_LOW, "Facile"),
        (DIFFICULTY_MODERATE, "Modéré"),
        (DIFFICULTY_HIGH, "Difficile"),
        (DIFFICULTY_NULL, 'Adaptatif')
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
    created_at = models.DateField(default=now)

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
