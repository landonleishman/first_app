import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { JournalEntry } from '../store/journalSlice';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export default function JournalEntryCard({ entry }: JournalEntryCardProps) {
  return (
    <Link href={`/entry/${entry.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.date}>{entry.date}</Text>
          <Text style={styles.intensity}>{entry.intensity}/10</Text>
        </View>
        <Text style={styles.emotion}>{entry.primaryEmotion}</Text>
        {entry.secondaryEmotion && (
          <Text style={styles.secondaryEmotion}>{entry.secondaryEmotion}</Text>
        )}
        {entry.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {entry.notes}
          </Text>
        )}
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  intensity: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  emotion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  secondaryEmotion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  notes: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

