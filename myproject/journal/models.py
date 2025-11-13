from django.db import models

class JournalEntry(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField()
    primary_emotion = models.CharField(max_length=50)
    secondary_emotion = models.CharField(max_length=50, blank=True, null=True)
    intensity = models.IntegerField()
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Journal Entries'
    
    def __str__(self):
        return f"{self.date} - {self.primary_emotion} ({self.intensity}/10)"
