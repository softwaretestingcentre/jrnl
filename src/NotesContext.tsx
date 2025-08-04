import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Note {
  id: string;
  note: string;
  source: string;
  sourceType: string;
  timestamp: string;
  keywords: string[];
  themes: string[];
}

type NotesContextType = {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'timestamp' | 'keywords' | 'themes'>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  refresh: () => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const API_URL = 'http://localhost:4000/api/notes';

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  // Fetch notes from backend
  const refresh = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(setNotes)
      .catch(() => setNotes([]));
  };

  useEffect(() => {
    refresh();
  }, []);

  async function addNote({ note, source, sourceType }: { note: string; source: string; sourceType: string }) {
    // You may want to generate keywords/themes here or on the backend
    const keywords = extractKeywords(note);
    const themes = extractThemes(note);
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note, source, sourceType, keywords, themes }),
    });
    refresh();
  }

  async function deleteNote(id: string) {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    refresh();
  }

function extractKeywords(note: string): string[] {
  return note
    .toLowerCase()
    .split(/\W+/)
    .filter((word, index, array) => word && array.indexOf(word) === index && word.length > 3);
}

function extractThemes(note: string): string[] {
  if (note.toLowerCase().includes('environment')) {
      return ['environmental science', 'conservation'];
  }
  return [];
}

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, refresh }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within NotesProvider');
  return context;
}