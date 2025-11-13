import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from './api';

export interface JournalEntry {
  id: string;
  date: string;
  primaryEmotion: string;
  secondaryEmotion?: string;
  intensity: number;
  notes: string;
}

interface JournalState {
  entries: JournalEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: JournalState = {
  entries: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all entries
export const fetchEntries = createAsyncThunk(
  'journal/fetchEntries',
  async () => {
    const response = await fetch(API_ENDPOINTS.ENTRIES);
    if (!response.ok) {
      throw new Error('Failed to fetch entries');
    }
    const data = await response.json();
    // Convert id from number to string to match frontend interface
    return data.map((entry: any) => ({
      ...entry,
      id: entry.id.toString(),
    }));
  }
);

// Async thunk to create a new entry
export const createEntry = createAsyncThunk(
  'journal/createEntry',
  async (entry: Omit<JournalEntry, 'id'>) => {
    const response = await fetch(API_ENDPOINTS.ENTRIES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create entry');
    }
    const data = await response.json();
    // Convert id from number to string
    return {
      ...data,
      id: data.id.toString(),
    };
  }
);

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<JournalEntry>) => {
      state.entries.push(action.payload);
    },
    updateEntry: (state, action: PayloadAction<JournalEntry>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch entries
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch entries';
      });
    
    // Create entry
    builder
      .addCase(createEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entries.push(action.payload);
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create entry';
      });
  },
});

export const { addEntry, updateEntry, deleteEntry, clearError } = journalSlice.actions;
export default journalSlice.reducer;

