import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useAppSelector } from '../store/hooks';
import JournalEntryCard from '../components/JournalEntryCard';

export default function HomeScreen() {
  const entries = useAppSelector(state => state.journal.entries);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Emotional Tracker</Text>
      <Text style={styles.subtitle}>Track your feelings and understand your emotions</Text>
      
      <ScrollView style={styles.entriesList}>
        <Text style={styles.sectionTitle}>Recent Entries</Text>
        {entries.length === 0 ? (
          <Text style={styles.emptyText}>No entries yet. Add your first entry!</Text>
        ) : (
          entries.map(entry => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))
        )}
      </ScrollView>
      
      <Link href="/add-entry" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Entry</Text>
        </TouchableOpacity>
      </Link>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  entriesList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
