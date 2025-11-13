from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import JournalEntry
from .serializers import JournalEntrySerializer

class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    
    def list(self, request):
        """GET /api/entries/ - List all entries"""
        entries = JournalEntry.objects.all().order_by('-created_at')
        serializer = JournalEntrySerializer(entries, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        """POST /api/entries/ - Create a new entry"""
        serializer = JournalEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def retrieve(self, request, pk=None):
        """GET /api/entries/{id}/ - Get a single entry"""
        try:
            entry = JournalEntry.objects.get(pk=pk)
            serializer = JournalEntrySerializer(entry)
            return Response(serializer.data)
        except JournalEntry.DoesNotExist:
            return Response({'error': 'Entry not found'}, status=404)
