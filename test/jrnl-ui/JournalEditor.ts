import { DataTable } from "@cucumber/cucumber";
import { List, Task } from "@serenity-js/core";
import { By, Click, Enter, PageElement } from "@serenity-js/web";

export const JournalEditor = {
  createNote: (noteContent: DataTable) =>
    Task.where(
      "#actor creates a note",
      List.of(noteContent.hashes()).forEach(({ actor, item }) =>
        actor.attemptsTo(
          Enter.theValue(item["note"]).into(noteEditor.noteDetails()),
          Enter.theValue(item["source type"]).into(noteEditor.sourceType()),
          Enter.theValue(item["source"]).into(noteEditor.source()),
          Click.on(noteEditor.saveButton())
        )
      )
    ),
};

const noteEditor = {
  noteDetails: () =>
    PageElement.located(By.css(".note-input")).describedAs("Note details"),
  sourceType: () =>
    PageElement.located(By.css(".source-type-select")).describedAs(
      "Source type"
    ),
  source: () =>
    PageElement.located(By.css(".source-input")).describedAs("Source"),
  saveButton: () =>
    PageElement.located(By.css(".save-btn")).describedAs("Save button"),
};
