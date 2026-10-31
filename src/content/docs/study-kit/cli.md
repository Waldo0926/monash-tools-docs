---
title: Use it without AI
description: The monash command answers the same questions in your terminal and uses no AI usage at all.
---

The `monash` command does not use any AI, so it works when you are out of AI usage or just want a quick look. Run `monash sync` first, then:

| I want to know | Command |
| --- | --- |
| What to do this week | `monash todo` |
| Deadlines | `monash due` or `monash due FIT2102` |
| Which file or page covers a topic | `monash grep "git rebase"` |
| New Ed posts and replies | `monash ed new` |
| Replies to my own posts | `monash ed following` |
| Read a full post | `monash ed show FIT2102#42` |
| Grades | `monash moodle grades FIT2102` |
| Assignments I may have missed | `monash moodle assignments --missing` |
| Unread school mail (if [connected](/study-kit/mail-attendance/)) | `monash gmail todo` |
| Classes I haven't checked in to (if connected) | `monash attendance overview` |
| Attendance codes (if connected) | `monash attendance codes` |

You get the raw information without a summary. You can paste the output into any AI if you want one.

Background sync and session refresh run while your AI app is open, because that is when the MCP server runs. They keep going even if your usage runs out. If the app is closed, run `monash sync` before you query, and `monash login` if Moodle has expired.

Every command is listed on [Command reference](/study-kit/commands/).

## Browse your course files

```bash
monash library --open
```

This opens a page in your browser that lists every Moodle and Ed lesson file already synced. Filter by unit, week or file name and click a file to download it. It is handy when you just want the week 7 slides without asking an AI.

- It only shows what `monash sync` has already downloaded. It does not sync by itself.
- It listens on `127.0.0.1` only, so other devices on your Wi-Fi cannot open it. The default port is 8766; use `--port` to pick another one.
- It has no login, so do not forward it to the internet. Stop it with Ctrl-C.

Needs Study Kit 1.4.0 or later.

## What search covers

`monash grep` and the AI's course-file search look at:

- Moodle course files: PDF, Word, PowerPoint, text and code, including text files inside `.zip` archives
- PDFs in Ed Lessons, and pages written directly in Ed
- **Course-notes websites** that a unit links to, such as tgdwyer.github.io for FIT2102. Only pages the unit links directly are fetched, never a whole site, and each page at most once a week. Turn it off with `monash config web_notes false`
- Lecture-recording transcripts, if you set up [recordings](/study-kit/recordings/)
