from django.db import models


class JournalEntry(models.Model):
    timestamp = models.BigIntegerField()
    text = models.TextField()
