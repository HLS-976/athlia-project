from django.db import models
from django.utils.http import MAX_URL_LENGTH
from django.utils.text import slugify
from django.contrib.postgres.fields import ArrayField

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
    adaptative_for = ArrayField(
        models.CharField(max_length=100),
        blank=True,
        null=True,
        default=list
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
