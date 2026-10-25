---
title: Command reference
description: Every monash command, output formats and exit codes.
---

| Command | What it does |
| --- | --- |
| `monash setup` | First-time setup. `monash setup claude` only reconnects Claude |
| `monash status` | Login status and last sync time |
| `monash help` | Everything it can do, each with an example question and the matching command |
| `monash doctor` | Health check that tells you how to fix each problem |
| `monash doctor --deep` | Also cross-checks results against a second source on Moodle and Ed |
| `monash todo` | This week: deadlines, possibly missed work, unfinished Ed lessons, announcements, unread replies |
| `monash due [FIT2102]` | Deadlines |
| `monash grep "monad" [FIT2102]` | Full-text search with page numbers or timestamps |
| `monash sync` | Sync now. `--dry-run` lists what Moodle would download |
| `monash login` / `monash login ed` | Log in to Moodle / replace the Ed token |
| `monash courses` | Pick tracked units again |
| `monash open` | Open the course-files folder |
| `monash moodle grades [FIT2102]` | Grades and feedback |
| `monash moodle assignments --missing` | Possibly missed assignments |
| `monash moodle news` / `find` / `get` / `messages` / `calendar` | Announcements / find an activity / download one file / messages / calendar subscription link |
| `monash moodle ls FIT2109 5` | Files already synced for a unit or week |
| `monash ed new` / `following` / `search` / `show FIT2102#42` | Ed updates / replies to my posts / search / read a post |
| `monash ed lessons FIT2109` / `quiz FIT2109` | Ed lesson progress / quiz questions for revision |
| `monash ed read FIT2109 "W3 Pre-Class"` | A whole lesson as Markdown with its quiz questions |
| `monash media` | Transcribe lecture recordings (needs the [media extra](/study-kit/recordings/)) |
| `monash config [key] [value]` | View or change settings. Restart Claude Desktop afterwards |
| `monash connect [app]` | Connect to Codex, Cursor, VS Code, Windsurf or Gemini CLI ([Other AI apps](/study-kit/other-clients/)) |
| `monash update` | Update to the latest version |
| `monash uninstall` | Remove it from Claude and other AI apps, and optionally delete all data |

Every command has `--help`.

## Output

Add `--json` for JSON. Output is JSON automatically when piped to another program; `--text` forces text.

## Exit codes

| Code | Meaning |
| --- | --- |
| 0 | Success |
| 1 | Bad arguments |
| 2 | Login required (`monash login` or `monash login ed`) |
| 3 | Cannot reach Moodle or Ed, or the server returned an error |
| 4 | Unit or post not found |
| 130 | Interrupted with Ctrl-C |
