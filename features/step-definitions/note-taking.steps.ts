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

Then(
  "{actor} sees that the note has been saved with a timestamp and the correct keywords, themes, and source",
  async (actor: Actor, metaData: DataTable) =>
    actor
      .attemptsTo
      // Write code here that turns the phrase above into concrete actions
      ()
);
