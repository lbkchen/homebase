from django.db import models


class JournalEntry(models.Model):
    timestamp = models.BigIntegerField(db_index=True)
    text = models.TextField()
