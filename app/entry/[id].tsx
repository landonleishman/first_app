import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppSelector } from '../../store/hooks';

export default function EntryDetailScreen() {
  const { id } = useLocalSearchParams();
  const entries = useAppSelector(state => state.journal.entries);
  
  // Find the entry by id
  const entry = entries.find(e => e.id === id?.toString());

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Entry Not Found</Text>
        <Text style={styles.errorText}>The entry you're looking for doesn't exist.</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back to Journal</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entry Details</Text>
      
      <View style={styles.entryCard}>
        <Text style={styles.date}>{entry.date}</Text>
        <Text style={styles.emotion}>Emotion: {entry.primaryEmotion}</Text>
        {entry.secondaryEmotion && (
          <Text style={styles.secondaryEmotion}>Secondary: {entry.secondaryEmotion}</Text>
        )}
        <Text style={styles.intensity}>Intensity: {entry.intensity}/10</Text>
        {entry.notes && (
          <Text style={styles.notes}>Notes: {entry.notes}</Text>
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back to Journal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  entryCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  emotion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  intensity: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  notes: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryEmotion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#c62828',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
});

