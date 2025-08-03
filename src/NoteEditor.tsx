import React, { useState } from 'react';
import { useNotes } from './NotesContext';

const SOURCE_TYPES = [
    "report", "article", "book", "website", "podcast", "audiobook", "conversation", "journey"
];

export default function NoteEditor() {
    const { addNote } = useNotes();
    const [note, setNote] = useState('');
    const [source, setSource] = useState('');
    const [sourceType, setSourceType] = useState(SOURCE_TYPES[0]);

    function handleSave() {
        if (note.trim() && source.trim() && sourceType) {
            addNote({ note, source, sourceType });
            setNote('');
            setSource('');
            setSourceType(SOURCE_TYPES[0]);
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
            <select
                value={sourceType}
                onChange={e => setSourceType(e.target.value)}
                className="source-type-select"
            >
                {SOURCE_TYPES.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Source (e.g. IPCC report)"
                value={source}
                onChange={e => setSource(e.target.value)}
                className="source-input"
            />
            <button className="save-btn" onClick={handleSave} disabled={!note.trim() || !source.trim() || !sourceType}>
                Save Note
            </button>
        </section>
    );
}