---
title: Troubleshooting
description: Fixes for the common problems. Start with monash doctor.
---

## Start here: `monash doctor`

```bash
monash doctor
```

It checks each part and prints how to fix anything that fails. If you need help, send the whole output; it contains no tokens or cookies. You can also tell your AI "monash isn't working" and it runs the same checks.

`monash doctor --deep` also fetches from Moodle and Ed and compares the results against a second source (due dates against the calendar feed, synced files against Moodle, and so on). It prints only counts, unit codes, dates and activity ids.

## monash does not show up in your AI app

- **Claude Desktop or Claude Code**: run `monash setup claude` to connect again. On Windows, **fully quit** Claude from the tray first. If it still fails, look for errors under Claude Desktop, **Settings**, **Developer**.
- **Codex, Cursor, VS Code, Windsurf or Gemini CLI**: run `monash connect` to see whether the app is connected. If not, run `monash connect codex` (or the app's name) and restart the app. If the config file has comments, it prints the entry for you to paste by hand; see [Other AI apps](/study-kit/other-clients/).

## "monash: command not found"

Open a new terminal window. The installer adds the tool folder to your PATH, but windows that were already open do not see the change. If it still fails, run `uv tool update-shell` and open another window.

## The login window will not open, or "no browser found"

Install Chrome or Edge. If your browser lives somewhere unusual, point to it:

```bash
monash config browser "C:\Program Files\...\chrome.exe"
```

If an earlier login window is still open, close it first.

## "Path too long" when syncing on Windows

Windows limits full paths to 260 characters by default, and unit name, week name and file name together can go over. Keep course files somewhere shorter:

```powershell
monash config files_dir C:\Monash
monash sync
```

## Wrong times on an Australian campus

Moodle shows times in your account's time zone, and Study Kit assumes UTC+8. Set yours:

```bash
monash config tz_offset 10
```

Use 11 during daylight saving.

## Where are Ed assignment deadlines?

Most Ed lessons have no due date. Moodle is the source of truth for deadlines. The Ed part of the weekly to-do follows your own progress: it lists unfinished lessons up to the week after the one you have reached.

## Windows says the file is in use during an update

A running program cannot be overwritten on Windows, and your AI app keeps `monash` running while it is open. Fully quit Claude Desktop from the tray (or close Codex, Cursor or whichever app you use), then run the update again in a new PowerShell window.

## No panel shows up

Panels need Study Kit 1.4.0 and an app that supports MCP Apps. Run `monash update` and restart the app. If the app does not support panels you still get the normal text answer, which has the same content.

## Still stuck

The MCP background log is `mcp.log` in the [data folder](/study-kit/privacy/#where-data-lives). Open an [issue](https://github.com/Waldo0926/monash-study-kit/issues) with the `monash doctor` output.
