import React from 'react';

import { useNotes } from './NotesContext';

export default function NoteList() {
    const { notes } = useNotes();

    return (
        <section className="note-list">
            {notes.length === 0 && <p className="empty-state">No notes yet.</p>}
            {notes.map(note => (
                <div className="note-card" key={note.id}>
                    <div className="note-content">{note.note}</div>
                    <div className="note-meta">
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