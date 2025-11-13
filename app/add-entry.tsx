import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createEntry } from '../store/journalSlice';

export default function AddEntryScreen() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.journal.loading);
  const error = useAppSelector(state => state.journal.error);

  const handleSave = async () => {
    if (!selectedEmotion) {
      Alert.alert('Error', 'Please select an emotion');
      return;
    }
    
    // Create new entry (without id - backend will generate it)
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      primaryEmotion: selectedEmotion,
      intensity: intensity,
      notes: notes,
    };
    
    try {
      // Save to backend via Redux thunk
      await dispatch(createEntry(newEntry)).unwrap();
      // Navigate back to home on success
      router.back();
    } catch (err) {
      Alert.alert('Error', error || 'Failed to save entry. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      
      {/* Simple Emotion Selector */}
      <View style={styles.emotionWheel}>
        <Text style={styles.sectionTitle}>Select an Emotion</Text>
        <View style={styles.emotionButtons}>
          {['HAPPY', 'SAD', 'ANGRY', 'FEAR', 'SURPRISE', 'DISGUST'].map(emotion => (
            <TouchableOpacity
              key={emotion}
              style={[
                styles.emotionButton,
                selectedEmotion === emotion && styles.selectedEmotionButton
              ]}
              onPress={() => setSelectedEmotion(emotion)}
            >
              <Text style={[
                styles.emotionButtonText,
                selectedEmotion === emotion && styles.selectedEmotionButtonText
              ]}>
                {emotion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Intensity Slider */}
      <View style={styles.intensitySection}>
        <Text style={styles.sectionTitle}>Intensity: {intensity}/10</Text>
        <View style={styles.intensityButtons}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
            <TouchableOpacity
              key={value}
              style={[
                styles.intensityButton,
                intensity === value && styles.selectedIntensityButton
              ]}
              onPress={() => setIntensity(value)}
            >
              <Text style={[
                styles.intensityButtonText,
                intensity === value && styles.selectedIntensityButtonText
              ]}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Notes */}
      <View style={styles.notesSection}>
        <Text style={styles.sectionTitle}>Notes (optional)</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="What happened? What are you thinking?"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}
      
      <TouchableOpacity 
        style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>Save Entry</Text>
        )}
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
  emotionWheel: {
    marginBottom: 30,
  },
  intensitySection: {
    marginBottom: 30,
  },
  notesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  notesInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  emotionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emotionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedEmotionButton: {
    backgroundColor: '#4CAF50',
  },
  emotionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  selectedEmotionButtonText: {
    color: 'white',
  },
  intensityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  intensityButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 15,
    minWidth: 30,
    alignItems: 'center',
  },
  selectedIntensityButton: {
    backgroundColor: '#2196F3',
  },
  intensityButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  selectedIntensityButtonText: {
    color: 'white',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
});
