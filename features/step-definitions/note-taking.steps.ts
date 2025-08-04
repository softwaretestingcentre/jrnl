import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Navigate } from "@serenity-js/web";

import { JournalEditor } from "../../test/jrnl-ui/JournalEditor";

Given("{actor} is on the note-taking page", async (actor: Actor) =>
  actor.attemptsTo(Navigate.to("/"))
);

When(
  "{actor} enters a note with a source",
  async (actor: Actor, note: DataTable) =>
    actor.attemptsTo(JournalEditor.createNote(note))
);

Then('{actor} sees that the note has been saved with a timestamp and the correct keywords and source', async (actor: Actor, metadata: DataTable) => 
  actor.attemptsTo(
    JournalEditor.checkTimestamp(),
    JournalEditor.checkMetadata(metadata),
  )
);

When('{actor} searches for notes with the keyword {string}', async (actor: Actor, keyword: string) =>
  actor.attemptsTo(JournalEditor.searchNotes(keyword))
);

Then('{actor} sees a list of notes that include the keyword {string}', async (actor: Actor, keyword: string) => {
  actor.attemptsTo(
    JournalEditor.allNotesMatch(keyword)
  );
})

When('{actor} deletes the {string} note', async (actor: Actor, noteText: string) => 
  actor.attemptsTo(JournalEditor.deleteNote(noteText))
)

Then('{actor} sees that the {string} note has been removed', async (actor: Actor, noteText: string) => {
  actor.attemptsTo(
    JournalEditor.noNotesMatch(noteText)
  );
})

