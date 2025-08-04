import React from "react";
import { useNotes } from "./NotesContext";

interface NoteListProps {
  search: string;
}

export default function NoteList({ search }: NoteListProps) {
  const { notes, deleteNote } = useNotes();

  // Sort notes by timestamp descending (most recent first)
  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const filteredNotes = search.trim()
    ? sortedNotes.filter((note) =>
        note.keywords.some((k) =>
          k.toLowerCase().includes(search.trim().toLowerCase())
        )
      )
    : sortedNotes;

  return (
    <section className="note-list">
      {filteredNotes.length === 0 && (
        <p className="empty-state">No notes found.</p>
      )}
      {filteredNotes.map((note) => (
        <div className="note-card" key={note.id}>
          <div className="note-content">{note.note}</div>
          <div className="note-meta">
            <span className="note-source-type">{note.sourceType}</span>
            <span className="note-source">{note.source}</span>
            <span className="note-timestamp">
              {new Date(note.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="note-tags">
            <span className="note-keywords">{note.keywords.join(", ")}</span>
          </div>
          <button
            className="delete-btn"
            onClick={() => deleteNote(note.id)}
            title="Delete note"
            style={{
              marginTop: 8,
              background: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "4px 12px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}
