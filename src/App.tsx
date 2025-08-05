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
                <main className="main-3col">
                    <aside className="sidebar search-col">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search notes by keyword…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </aside>
                    <section className="editor-col">
                        <NoteEditor />
                    </section>
                    <aside className="sidebar notes-col">
                        <NoteList search={search} />
                    </aside>
                </main>
            </div>
        </NotesProvider>
    );
}