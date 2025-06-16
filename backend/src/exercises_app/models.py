from django.db import models

# Create your models here.
class CategoryExercise(models.Model):
    name = models.CharField(max_length=150, blank=True, null=True, unique=True)

    class Meta:
        verbose_name = "Category Exercise"
        verbose_name_plural = "Category Exercises"
        ordering = ['name']

    def __str__(self):
        return self.name or "Unnamed Category"


class Exercise(models.Model):
    DIFFICULTY_LOW = "low"
    DIFFICULTY_MODERATE = "moderate"
    DIFFICULTY_HIGH = "high"

    DIFFICULTY_CHOICES = [
        (DIFFICULTY_LOW, "Low"),
        (DIFFICULTY_MODERATE, "Moderate"),
        (DIFFICULTY_HIGH, "High"),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    difficulty = models.CharField(
        max_length=10,
        choices=DIFFICULTY_CHOICES,
        default=DIFFICULTY_LOW
    )
    category = models.ForeignKey(
        CategoryExercise,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='exercises'
    )
    is_adaptive = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Exercise"
        verbose_name_plural = "Exercises"
        ordering = ['name']

    def __str__(self):
        return self.name
