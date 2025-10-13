# HW3 - Emotional Tracker App

This is an Expo React Native app for tracking emotions and feelings, built for a software development class.

## About the App

The Emotional Tracker is a feelings journal app that helps users:
- Track daily emotions using an emotion wheel
- Record emotional intensity levels
- Add notes about what triggered certain feelings
- View emotional patterns over time

## Features

- **Multi-page Navigation**: Home, Add Entry, Entry Detail pages
- **Redux State Management**: Centralized state for journal entries
- **Parent-Child Components**: Reusable UI components
- **React Hooks**: useState, useEffect, and Redux hooks
- **Emotion Tracking**: 6 basic emotions with intensity levels

## Technical Requirements Met

✅ **React Hooks**: useState, useAppSelector, useAppDispatch  
✅ **Parent-Child Components**: HomeScreen → JournalEntryCard  
✅ **Multi-page Navigation**: expo-router implementation  
✅ **Redux Store**: Actions, reducers, and dispatch functionality  

## Get Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npm run web
   ```

3. Open your browser to `http://localhost:8081`

## Project Structure

```
app/
├── index.tsx          # Home page (journal entries list)
├── add-entry.tsx      # Add new emotion entry
└── entry/[id].tsx      # Entry detail page

components/
└── JournalEntryCard.tsx  # Individual entry display

store/
├── index.ts           # Redux store configuration
├── journalSlice.ts    # Journal entries reducer
└── hooks.ts           # Typed Redux hooks
```

## Previous Projects

This repository also contains:
- `data5570_mycode/` - Python code examples
- `myproject/` - Django web application