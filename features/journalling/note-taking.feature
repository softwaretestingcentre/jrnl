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

  Scenario: Add a note with keywords, themes, and sources
    Given Journaller is on the note-taking page
    When Journaller enters a note with a source
      | note                                                   | source type | source      |
      | Exploring the impact of climate change on biodiversity | report      | IPCC report |
    Then Journaller sees that the note has been saved with a timestamp and the correct keywords, themes, and source
      | keywords                                  | themes                              | source      |
      | climate change, biodiversity, environment | environmental science, conservation | IPCC report |

  Scenario: Search for notes by keyword
    Given Journaller has notes with various keywords
    When Journaller searches for notes with the keyword "climate change"
    Then Journaller sees a list of notes that include the keyword "climate change"

  Scenario: Filter notes by theme
    Given Journaller has notes categorized under various themes
    When Journaller filters notes by the theme "environmental science"
    Then Journaller sees a list of notes that belong to the theme "environmental science"

  Scenario: Edit a note
    Given Journaller is on the note-taking page
    When Journaller edits a note
      | note                                                                          | source type | source      |
      | Exploring the impact of climate change on biodiversity and the global economy | report      | IPCC report |
    Then Journaller sees that the note has been updated with a new timestamp and the correct keywords, themes, and source
      | keywords                                           | themes                                             | source      |
      | climate change, biodiversity, environment, economy | environmental science, conservation, globalisation | IPCC report |
