from rest_framework import serializers
from .models import JournalEntry

class JournalEntrySerializer(serializers.ModelSerializer):
    # Map Django model fields to frontend interface (camelCase)
    primaryEmotion = serializers.CharField(source='primary_emotion', max_length=50)
    secondaryEmotion = serializers.CharField(source='secondary_emotion', required=False, allow_blank=True, allow_null=True)
    
    class Meta:
        model = JournalEntry
        fields = ['id', 'date', 'primaryEmotion', 'secondaryEmotion', 'intensity', 'notes']
    
    def create(self, validated_data):
        # DRF's source parameter automatically handles the mapping
        # primaryEmotion (from request) -> primary_emotion (to model)
        return JournalEntry.objects.create(**validated_data)

