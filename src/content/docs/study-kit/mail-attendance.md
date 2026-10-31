---
title: School mail and attendance
description: Optional since 1.5.0. Ask about your Monash inbox and your attendance, find check-in codes, and let the AI draft mail or check you in after you confirm.
---

Both parts are optional and stay off until you connect them. Everything runs on your own computer, like the rest of Study Kit.

- **School mail.** "Anything in my email I need to deal with?" lists recent unread school mail, without promotions and social updates. The AI can also search your mail offline, read whole threads and the text of attachments (PDF, Word, PowerPoint, images), draft a reply, send a draft you checked, and archive or mark mail as read.
- **Attendance.** "Which classes this week haven't I checked in to?" and "What's the code for today's FIT2102 workshop?" Codes are looked up in your synced Moodle, Ed and school mail, each shown with where it came from. The AI can check you in after you say you attended.

If you only want to ask about your inbox in Claude or ChatGPT, their built-in Gmail connectors are simpler. Study Kit's mail is for linking mail with attendance codes, offline search including attachments, and apps without a Gmail connector such as Codex or Cursor.

## Connect

The easiest way is to ask your AI app:

- "Connect my school email"
- "Connect my attendance"

It installs what is missing, then opens a sign-in window on your computer. You only sign in with your Monash account (Okta and MFA). Your password and codes stay in your browser and never go into the chat.

For mail, Google shows **"Google hasn't verified this app"**. Click **Advanced**, then **Continue**. The app is a small personal project, which Google does not review; your mail goes from Google straight to your computer and never through the maintainer.

The same in a terminal:

```bash
uv tool install --reinstall "monash-study-kit[gmail,attendance]"
monash gmail login
monash attendance login
```

Restart your AI app after connecting. With both connected, the tool descriptions your AI app reads at the start of every conversation come to about 5,132 tokens instead of 3,377.

A full step-by-step guide in Chinese, including using your own Google Cloud app instead of the bundled one, is in the [setup guide](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/google-and-attendance-setup.md).

## What runs by itself

- **Mail** syncs every 30 minutes while your AI app is open. The first download takes a few minutes; `monash gmail sync` shows its progress page by page.
- **Attendance** follows your timetable: weekday mornings at 8 and 15 minutes after each class you have not checked in to. Nothing runs at night, at weekends or between classes. A read is one request of a few KB and takes seconds, without opening a browser. If the portal page ever looks different, it falls back to a hidden browser page.

## Actions only after you confirm

Drafting, sending a draft, changing labels and checking in are on after you connect. Every one works the same way:

1. The AI prepares the action and shows you the full preview: recipients, Bcc, body and attachments, the label change, or the class and code.
2. You confirm that exact action. The AI cannot confirm for you.
3. Only then does it run, once. A draft that changed after the preview is refused. If something fails halfway, it is not retried by itself.

Check-in is only prepared when you say you actually attended, never for a future class or one already done. Nothing ever permanently deletes mail.

To keep mail read-only, connect with `monash gmail login --read-only`. To turn an action off:

```bash
monash config gmail_manage_enabled false
monash config attendance_submit_enabled false
```

## Settings

| Setting | Default | What it does |
| --- | --- | --- |
| `gmail_sync_minutes` | `30` | How often mail syncs while your AI app is open; `0` turns it off |
| `attendance_auto_sync` | `true` | Read attendance on your timetable |
| `attendance_fast_read` | `true` | Read without opening a browser; falls back by itself |
| `attendance_keepalive_minutes` | `0` | Light requests to keep the attendance login alive; off for now |

Change one with `monash config <setting> <value>` and restart your AI app.

## From ChatGPT or Claude on the web

With [remote mode](/study-kit/remote/), each app you pair chooses which of these it may use. Read-only mail and attendance start ticked, the actions start unticked. Apps paired before 1.5.0 keep Moodle and Ed only until you pair them again.

## Limits

- Attendance is checked only against the Malaysia campus portal.
- Check-in has not yet been tested on a real account.
- How long the attendance login lasts is still being measured; `monash attendance status` shows it. When it expires, ask the AI to connect attendance again or run `monash attendance login`.
- Google allows at most 100 users for an app it has not reviewed. If you see that limit, use your own Google Cloud app as the setup guide explains.
