from django.db import models
from django.utils.text import slugify
from user_account.models import CustomUser


class ConstraintField(models.Model):
    name = models.CharField(max_length=300, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name = "constraint"
        verbose_name_plural = "constraints"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class SportProfile(models.Model):
    LEVEL_USER_CHOICE = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced')
    ]

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    age = models.IntegerField(blank=True, null=True)
    goals = models.CharField(max_length=100, blank=True, null=True)
    level_user = models.CharField(
        max_length=100,
        choices=LEVEL_USER_CHOICE,
        blank=True,
        null=True
    )
    constraints = models.ManyToManyField(
        ConstraintField,
        blank=True,
        related_name="sport_profiles"
    )

    def __str__(self):
        return f"{self.user.user_name}"
