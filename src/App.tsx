import './App.css';

import React from 'react';

import NoteEditor from './NoteEditor';
import NoteList from './NoteList';
import { NotesProvider } from './NotesContext';

export default function App() {
    return (
        <NotesProvider>
            <div className="app-container">
                <header className="app-header">
                    <h1>JRNL</h1>
                    <p className="subtitle">A note taking app that understands what you write</p>
                </header>
                <main>
                    <NoteEditor />
                    <NoteList />
                </main>
            </div>
        </NotesProvider>
    );
}