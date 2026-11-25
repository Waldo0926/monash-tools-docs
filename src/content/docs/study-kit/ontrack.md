---
title: OnTrack / Doubtfire
description: Optional since 1.18.0. Pure-Python OnTrack / Doubtfire support for units, tasks, task sheet PDFs, tutor chats and local to-do integration.
---

Optional and off until you sign in. Built in pure Python using the existing `pypdf` dependency, so it needs no Node.js or extra packages and runs only on your own computer.

- **Units and tasks.** List active or past units, view task statuses, grades and effective deadlines (including flexible dates, target-grade due dates and special consideration days).
- **Task sheets as Markdown.** `monash ontrack read UNIT TASK` fetches the task sheet PDF and extracts its text with Study Kit's built-in `pypdf` reader, ready for your AI app or terminal.
- **Downloads.** Save unit resource archives (`monash ontrack get UNIT`), individual task sheets or linked task resources.
- **Unread tutor chats.** `monash ontrack chats UNIT` lists unread comment counts per task without marking anything read.
- **Unified to-do and semester views.** Once you run `monash ontrack sync`, upcoming deadlines, overdue or action-required tasks (`fix_and_resubmit`, `redo`, `discuss`, `demonstrate`, `attention_required`, `rediscuss`) and unread tutor comments appear alongside Moodle and Ed in `monash todo`, `monash semester`, `monash status` and `monash doctor`.

## Sign in

```bash
monash ontrack login
monash ontrack sync
```

By default this connects to Monash's OnTrack site (`https://ontrack.infotech.monash.edu`). Pass `--url https://<host>` if you use a different OnTrack / Doubtfire instance.

Study Kit reuses its dedicated login browser profile (`browser-profile`). If Okta already remembers you from Moodle, signing in and silent renewal work without storing your password.

Tick **Remember me** when signing in so OnTrack issues a refresh cookie: Study Kit exchanges it over plain HTTPS (`POST /api/auth/access-token`) to renew short-lived access tokens without opening a browser.

If a browser window is not available, paste a Cookie header, cURL command, `/api/auth/access-token` JSON response or bare `refresh_token`:

```bash
monash ontrack login --paste
```

[Restart your AI app](/study-kit/troubleshooting/#fully-quit-and-reopen-your-ai-app) after signing in so the OnTrack MCP tools appear.

## Everyday commands

```bash
monash ontrack courses                   # active units (add --include-inactive for past units)
monash ontrack tasks FIT2004             # tasks with status, deadline, grade and unread count
monash ontrack task FIT2004 1.1P         # one task's details and upload requirements
monash ontrack read FIT2004 1.1P         # task sheet PDF as Markdown
monash ontrack get FIT2004               # download unit resources ZIP
monash ontrack get FIT2004 1.1P          # download task sheet PDF (--resources for task archive)
monash ontrack chats FIT2004             # unread comment counts (read-only)
monash ontrack sync --sheets             # refresh local cache and cache task sheet PDFs
```

Add `--json` for JSON output.

## Safety and confirmations

- **MCP is read-only by default.** Signing in registers `ontrack_units`, `ontrack_tasks`, `ontrack_task_sheet` and `ontrack_chats`. None of these mark comments read or change state on OnTrack.
- **Optional MCP writes require opt-in and confirmation.** Turning on `ontrack_write_enabled` (via `monash config ontrack_write_enabled true` or `monash ontrack login --allow-write`) adds `ontrack_prepare_action` for three actions: reading a task's chat history (which marks non-discussion comments read on OnTrack), sending a chat comment, and updating workflow state (`not_started`, `working_on_it`, `need_help`). Each returns a full preview and runs only after you explicitly confirm via `execute_student_action`. **File submission is never exposed through MCP.**
- **Terminal mutations.** `monash ontrack set`, `monash ontrack submit`, `monash ontrack chat-send` and reading a single task's chat (`monash ontrack chats UNIT TASK`) show a preview and require confirmation (`--confirm` / `--yes`, or `--dry-run` to inspect first).
- **Remote mode.** With [remote mode](/study-kit/remote/), each paired app chooses OnTrack permissions on the pairing page: `ontrack.read` starts ticked and `ontrack.write` starts unticked.
- **Materials-only profiles.** Isolated `--profile` accounts and `materials_only` mode refuse all OnTrack commands and tools.

## Settings

| Setting | Default | What it does |
| --- | --- | --- |
| `ontrack_enabled` | `false` | Turned on automatically by `monash ontrack login`; controls MCP tools and `todo`/`semester` integration |
| `ontrack_url` | `https://ontrack.infotech.monash.edu` | Monash's OnTrack HTTPS URL by default (override with `--url`, `MONASH_KIT_ONTRACK_URL` or `ONTRACK_BASE_URL`) |
| `ontrack_write_enabled` | `false` | Opt-in switch for preview-and-confirm MCP write actions (`chat_read`, `chat_send`, `task_state`) |

## Limits

- Live sign-in, task submission and flexible-date edge cases have not yet been verified against a real Monash OnTrack / Doubtfire deployment; current tests run offline against simulated OnTrack API contracts.
- Credentials stay in `secrets/ontrack-session.json` (owner-only) and are never sent across HTTP redirects.

## Credits

The OnTrack / Doubtfire integration is a pure-Python re-implementation inspired by and referencing [`bunizao/ontrack-cli`](https://github.com/bunizao/ontrack-cli) (MIT License, Copyright (c) 2026 bunizao).
