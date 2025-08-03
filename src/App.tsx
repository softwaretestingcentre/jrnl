import './App.css';
import React, { useState } from 'react';

import NoteEditor from './NoteEditor';
import NoteList from './NoteList';
import { NotesProvider } from './NotesContext';

export default function App() {
    const [search, setSearch] = useState('');

    return (
        <NotesProvider>
            <div className="app-container">
                <header className="app-header">
                    <h1>JRNL</h1>
                    <p className="subtitle">A note taking app that understands what you write</p>
                </header>
                <main>
                    <NoteEditor />
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search notes by keyword…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{marginBottom: 24, width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e0e0e0'}}
                    />
                    <NoteList search={search} />
                </main>
            </div>
        </NotesProvider>
    );
}