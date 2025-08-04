Feature: Note Taking
As a journaller, I want to record and edit time-stamped notes with sources
And have the app generate and track:
- keywords
- themes
So that I can connect notes and track the development of themes and ideas.

I want to be able to search and filter my notes by:
- keywords
- themes
- sources

Rules:
- Source type must be specified.
- Source type can be one of: "report", "article", "book", "website", "podcast", "audiobook", "conversation", "journey".

  Background:
    Given Journaller is on the note-taking page

  Scenario: Add a note with keywords, themes, and sources
    When Journaller enters a note with a source
      | note                                                   | source type | source      |
      | Exploring the impact of climate change on biodiversity | report      | IPCC report |
    Then Journaller sees that the note has been saved with a timestamp and the correct keywords and source
      | keywords                                         | source      |
      | exploring, impact, climate, change, biodiversity | IPCC report |

  Scenario: Search for notes by keyword
    When Journaller searches for notes with the keyword "climate"
    Then Journaller sees a list of notes that include the keyword "climate"

  Scenario: Edit a note
    When Journaller edits a note
      | note                                                                          | source type | source      |
      | Exploring the impact of climate change on biodiversity and the global economy | report      | IPCC report |
    Then Journaller sees that the note has been updated with a new timestamp and the correct keywords, themes, and source
      | keywords                                           | source      |
      | climate change, biodiversity, environment, economy | IPCC report |

  Scenario: Delete a note
    When Journaller deletes the "climate change" note
    Then Journaller sees that the "climate change" note has been removed
