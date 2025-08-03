import React from 'react';
import { useNotes } from './NotesContext';

interface NoteListProps {
    search: string;
}

export default function NoteList({ search }: NoteListProps) {
    const { notes } = useNotes();

    const filteredNotes = search.trim()
        ? notes.filter(note =>
            note.keywords.some(k =>
                k.toLowerCase().includes(search.trim().toLowerCase())
            )
        )
        : notes;

    return (
        <section className="note-list">
            {filteredNotes.length === 0 && <p className="empty-state">No notes found.</p>}
            {filteredNotes.map(note => (
                <div className="note-card" key={note.id}>
                    <div className="note-content">{note.note}</div>
                    <div className="note-meta">
                        <span className="note-source-type">{note.sourceType}</span>
                        <span className="note-source">{note.source}</span>
                        <span className="note-timestamp">{new Date(note.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="note-tags">
                        <span className="note-keywords">{note.keywords.join(', ')}</span>
                        <span className="note-themes">{note.themes.join(', ')}</span>
                    </div>
                </div>
            ))}
        </section>
    );
}