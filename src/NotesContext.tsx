import React, { createContext, useContext, useState } from 'react';

export interface Note {
    id: string;
    note: string;
    source: string;
    timestamp: string;
    keywords: string[];
    themes: string[];
}

type NotesContextType = {
    notes: Note[];
    addNote: (note: Omit<Note, 'id' | 'timestamp' | 'keywords' | 'themes'>) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);

    function extractKeywords(note: string): string[] {
        // Simple keyword extraction (replace with NLP/GPT in production)
        return note
            .toLowerCase()
            .split(/\W+/)
            .filter((w, i, arr) => w && arr.indexOf(w) === i && w.length > 3);
    }

    function extractThemes(note: string): string[] {
        // Simple theme extraction (stub)
        if (note.toLowerCase().includes('environment')) return ['environmental science', 'conservation'];
        return [];
    }

    function addNote({ note, source }: { note: string; source: string }) {
        const keywords = extractKeywords(note);
        const themes = extractThemes(note);
        setNotes([
            ...notes,
            {
                id: Math.random().toString(36).slice(2),
                note,
                source,
                timestamp: new Date().toISOString(),
                keywords,
                themes,
            },
        ]);
    }

    return (
        <NotesContext.Provider value={{ notes, addNote }}>
            {children}
        </NotesContext.Provider>
    );
}

export function useNotes() {
    const ctx = useContext(NotesContext);
    if (!ctx) throw new Error('useNotes must be used within NotesProvider');
    return ctx;
}