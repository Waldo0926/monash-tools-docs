---
title: What to ask your AI
description: Example questions for deadlines, course files, Ed, grades and upkeep. Use your own words; the AI picks the tool by meaning.
---

Ask in your own words. The AI picks tools by meaning, not keywords, so "anything due this week" and "did I forget to submit something" both reach the to-do list. These are only examples.

## This week

| You can ask | What it checks |
| --- | --- |
| "What do I need to do this week?" | Deadlines, work you may have missed, unfinished Ed lessons, latest announcements |
| "What's due for FIT2102 in the next two weeks?" | Moodle deadlines. Works even when your Moodle login has expired |
| "Did I forget to submit anything?" | Assignment submission status |

## Course files

| You can ask | What it checks |
| --- | --- |
| "Which week covered monads? Which slides, which page?" | Full-text search over course files, course-notes websites, Ed lesson pages and recording transcripts, with page numbers or timestamps |
| "What does the A2 spec ask for?" | Finds the spec and reads the pages it needs |
| "What's in week 5 of FIT2109?" | That week's files and links |
| "Where is the week 7 workshop on Moodle?" | Finds Moodle sections and activities by name and gives the link. Needs a Moodle login |

## Ed

| You can ask | What it checks |
| --- | --- |
| "Anything new on Ed?" | New posts and replies since you last looked |
| "Has anyone replied to my question?" | Posts you wrote or follow |
| "Has anyone asked whether A1 can use lodash?" | Searches threads and reads them in full |
| "Walk me through the FIT2109 week 3 pre-class" | A whole lesson in order: text, readings, PDFs and its quiz questions |
| "Quiz me on week 3" | Ed lesson quiz questions, one at a time |
| "Show my FIT2109 lesson progress" | Done and unfinished lessons, grouped by module |

## Grades and messages

| You can ask | What it checks |
| --- | --- |
| "What's my grade in FIT2109 so far?" | Totals, each item's mark and feedback |
| "Any recent announcements for FIT2102?" | Moodle announcements |
| "Has anyone messaged me on Moodle?" | Moodle messages, read-only |

## Upkeep

| You can ask | What happens |
| --- | --- |
| "Log me in to Moodle again" | Opens the login window on your computer |
| "Sync the latest" | Runs a sync now |
| "monash isn't working" | Runs the same checks as `monash doctor` |

## Panels

From Study Kit 1.4.0, three answers can also show up as a small panel in apps that support MCP Apps:

- **To-dos**: "What do I need to do this week?" shows deadline cards and lessons you have not started.
- **Lesson progress**: "Show my FIT2109 lesson progress" shows each module with how many lessons are done.
- **Quiz practice**: "Help me practise the FIT2109 week 3 quiz" shows the questions with clickable options. When you finish, **交给 AI 批改** sends your choices back to the chat and the AI explains them from the lesson text.

Your answers stay in the panel until you send them. Nothing is submitted to Ed and no lesson is marked as done. Ed does not show students the answer key, so the AI works the answers out from the lesson and says when it is unsure.

Apps without panel support still get the same text answer as before. Whether a panel appears, and whether its buttons can send messages or open links, is up to the app. The panel labels are in Chinese.

## Ready-made prompts

In Claude's **+** menu, monash offers seven presets: a feature overview, this week's to-dos, Ed catch-up, find a topic, quiz review, grades with feedback, and **作业要求** (assignment requirements). Give the last one an assignment name: it reads the brief, rubric and staff answers on Ed, then lists what to submit, marking criteria, deadlines, format and Ed clarifications, each with its source. Their titles are in Chinese. A preset is only sent when you click it, so it costs nothing otherwise.

In a terminal, `monash help` prints every feature with an example question and the matching command.

## Rules for assignment questions

Study Kit reads the Moodle brief and marking rubric first. On Ed, only replies from teaching staff and answers they endorse count as requirements. Other students' replies are leads. A later staff correction takes priority. If the brief and Ed disagree, the answer lists both with their dates and suggests asking staff, rather than choosing one. Each rule names its source.

These rules are in the server instructions. There is nothing to configure.

## What happens in the background

While Claude is open, Study Kit:

- syncs Ed and Moodle every hour (new posts, replies and course files) and refreshes the search index;
- refreshes your Moodle session every 20 minutes, because Moodle logs you out after 4 idle hours.

## When the Moodle login expires

After a shutdown or a long sleep the Moodle session expires. Claude tells you and asks whether to log in. If you agree, it opens the login window on your computer. If Okta still remembers you, it logs in silently without showing a window. You can also run `monash login` yourself.

While the login is expired, **deadlines still work** (they come from Moodle's calendar subscription link, which needs no login) and Ed is not affected.

## It cannot

Submit assignments, attempt quizzes or post on Ed. Do those on the website yourself.
