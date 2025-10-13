import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function EntryDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // TODO: Get entry from Redux store using the id
  const entry = {
    id: id,
    date: '2024-01-15',
    emotion: 'SAD',
    intensity: 7,
    notes: 'Feeling disconnected from friends'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entry Details</Text>
      
      <View style={styles.entryCard}>
        <Text style={styles.date}>{entry.date}</Text>
        <Text style={styles.emotion}>Emotion: {entry.emotion}</Text>
        <Text style={styles.intensity}>Intensity: {entry.intensity}/10</Text>
        <Text style={styles.notes}>Notes: {entry.notes}</Text>
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
});

