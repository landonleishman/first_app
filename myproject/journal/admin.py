from django.contrib import admin
from .models import JournalEntry

@admin.register(JournalEntry)
class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ['id', 'date', 'primary_emotion', 'intensity', 'created_at']
    list_filter = ['primary_emotion', 'date', 'created_at']
    search_fields = ['primary_emotion', 'notes']
    ordering = ['-created_at']
