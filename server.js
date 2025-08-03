const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./notes.db');

app.use(cors());
app.use(express.json());

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note TEXT,
    source TEXT,
    sourceType TEXT,
    timestamp TEXT,
    keywords TEXT,
    themes TEXT
  )
`);

// Get all notes
app.get('/api/notes', (req, res) => {
  db.all('SELECT * FROM notes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Parse keywords and themes from CSV
    rows.forEach(row => {
      row.keywords = row.keywords ? row.keywords.split(',') : [];
      row.themes = row.themes ? row.themes.split(',') : [];
    });
    res.json(rows);
  });
});

// Add a note
app.post('/api/notes', (req, res) => {
  const { note, source, sourceType, keywords, themes } = req.body;
  const timestamp = new Date().toISOString();
  db.run(
    `INSERT INTO notes (note, source, sourceType, timestamp, keywords, themes) VALUES (?, ?, ?, ?, ?, ?)`,
    [note, source, sourceType, timestamp, (keywords || []).join(','), (themes || []).join(',')],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: this.lastID,
        note,
        source,
        sourceType,
        timestamp,
        keywords,
        themes,
      });
    }
  );
});

// Search notes by keyword
app.get('/api/notes/search', (req, res) => {
  const { keyword } = req.query;
  db.all(
    `SELECT * FROM notes WHERE keywords LIKE ?`,
    [`%${keyword}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      rows.forEach(row => {
        row.keywords = row.keywords ? row.keywords.split(',') : [];
        row.themes = row.themes ? row.themes.split(',') : [];
      });
      res.json(rows);
    }
  );
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Notes backend listening on http://localhost:${PORT}`);
});