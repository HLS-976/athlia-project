from django.db import models

class ContextWord(models.Model):
    word = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.word

class Advice(models.Model):
    message = models.TextField(blank=True, null=True)
    context = models.ManyToManyField(ContextWord, blank=True)

    def __str__(self):
        return f"Advice #{self.pk}"
