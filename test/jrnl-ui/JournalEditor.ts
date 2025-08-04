import { DataTable } from "@cucumber/cucumber";
import { Ensure, includes, not } from "@serenity-js/assertions";
import { List, Task } from "@serenity-js/core";
import {
  By,
  Click,
  Enter,
  PageElement,
  PageElements,
  Select,
  Text,
} from "@serenity-js/web";

export const JournalEditor = {
  createNote: (noteContent: DataTable) =>
    Task.where(
      "#actor creates a note",
      List.of(noteContent.hashes()).forEach(({ actor, item }) =>
        actor.attemptsTo(
          Enter.theValue(item["note"]).into(noteEditor.noteDetails()),
          Select.value(item["source type"]).from(noteEditor.sourceType()),
          Enter.theValue(item["source"]).into(noteEditor.source()),
          Click.on(noteEditor.saveButton())
        )
      )
    ),
  searchNotes: (keywords: string) =>
    Task.where(
      "#actor searches for notes",
      Enter.theValue(keywords).into(noteEditor.search())
    ),
  allNotesMatch: (keyword: string) =>
    Task.where(
      "#actor checks if all notes match the keyword",
      List.of(noteEditor.noteKeywords()).forEach(({ actor, item }) =>
        actor.attemptsTo(Ensure.that(item.text(), includes(keyword)))
      )
    ),
  deleteNote: (noteText: string) =>
    Task.where(
      "#actor deletes a note",
      Click.on(noteEditor.deleteNote(noteText))
    ),
  noNotesMatch: (noteText: string) =>
    Task.where(
      "#actor checks if no notes match the text",
      List.of(noteEditor.noteCard()).forEach(({ actor, item }) =>
        actor.attemptsTo(Ensure.that(item.text(), not(includes(noteText))))
      )
    ),
  checkTimestamp: () =>
    Task.where(
      "#actor checks if the note has a timestamp",
      Ensure.that(
        Text.of(noteEditor.timeStamp().first()),
        includes(new Date().toLocaleString())
      )
    ),
  checkMetadata: (metadata: DataTable) =>
    Task.where(
      "#actor checks the metadata of the note",
      List.of(metadata.hashes()).forEach(({ actor, item }) =>
        actor.attemptsTo(
          Ensure.that(
            Text.of(noteEditor.noteKeywords().first()),
            includes(item["keywords"])
          ),
          Ensure.that(
            Text.of(noteEditor.noteSource().first()),
            includes(item["source"])
          )
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
  search: () =>
    PageElement.located(By.css(".search-input")).describedAs("Search input"),
  noteCard: () =>
    PageElements.located(By.css(".note-card")).describedAs("Note card"),
  noteKeywords: () =>
    PageElements.located(By.css(".note-keywords")).describedAs("Note keywords"),
  deleteNote: (noteText: string) =>
    PageElement.located(
      By.xpath(
        `//div[contains(text(), "${noteText}")]/..//button[contains(@class, 'delete-btn')]`
      )
    ).describedAs(`Delete button for note containing "${noteText}"`),
  timeStamp: () =>
    PageElements.located(By.css(".note-timestamp")).describedAs(
      "Note timestamp"
    ),
  noteSource: () =>
    PageElements.located(By.css(".note-source")).describedAs("Note source"),
};
