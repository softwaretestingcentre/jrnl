import React, { useState } from 'react';

import { useNotes } from './NotesContext';

export default function NoteEditor() {
    const { addNote } = useNotes();
    const [note, setNote] = useState('');
    const [source, setSource] = useState('');

    function handleSave() {
        if (note.trim()) {
            addNote({ note, source });
            setNote('');
            setSource('');
        }
    }

    return (
        <section className="note-editor">
            <textarea
                placeholder="What's on your mind?"
                value={note}
                onChange={e => setNote(e.target.value)}
                className="note-input"
            />
            <input
                type="text"
                placeholder="Source (e.g. IPCC report)"
                value={source}
                onChange={e => setSource(e.target.value)}
                className="source-input"
            />
            <button className="save-btn" onClick={handleSave}>Save Note</button>
        </section>
    );
}