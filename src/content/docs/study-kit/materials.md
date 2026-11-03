---
title: Export a whole unit
description: Moodle, Ed Lessons and linked Google files in one local package, with PDF or Markdown pages and an index of missing materials.
---

Study Kit **1.11.2** combines Moodle and Ed Lessons in one course package. You can use it without an AI app. It exports teaching materials, including assignment instructions, but leaves out submissions, grades, feedback, Ed discussions, mail, messages and attendance. A package is a snapshot of what your account can access and has synced; check the index before relying on it as complete.

## First export

After [installation](/study-kit/install/) and [setup](/study-kit/setup/):

```bash
monash courses
monash export FIT2109 --sync --format both --to "./exports"
```

Select the unit in `monash courses`. `--sync` refreshes that unit's Moodle content and Ed Lessons before packaging; it does not sync Ed forum threads. Without it, export reads only the local cache. `--to` is a destination folder, not a zip filename. Replace FIT2109 with your unit code.

When you leave out `--to`, an interactive terminal opens a folder picker before syncing. The initial folder is your last choice or the system Downloads folder, including a relocated Windows Downloads folder. Use `--no-ask` to skip the picker, or remember a destination with `monash config export_dir "./exports"`. `--dir` writes a directory instead of a zip; `--open` reveals the result in Finder or Explorer. Quote paths containing spaces on both macOS and Windows.

## What is included

| Source | Exported content |
| --- | --- |
| Moodle files and folders | Original files and subfolders; folders use the whole-folder download with individual-file fallback |
| Moodle Page, Book and assignment | Body text, visible rubric/marking guide and attachments; Book uses the print view |
| Ed Lessons | Modules and lessons in Ed order, slides, reading pages, embedded Ed-hosted files and question-only quiz pages |
| Images | Downloaded Moodle/Ed images in `assets/`, deduplicated by content and linked locally |
| Course-linked Google files | Docs/Slides as PDF, Sheets as XLSX, other Drive files in their original format; Docs can instead use DOCX |
| Index | Contents, sync information, unavailable items with reasons, remaining remote images and Google export statistics |

The top-level unit directory has `Moodle/`, `Ed Lessons/` and an index. Page, link-list, quiz and index filenames depend on the selected format. Original PDFs, notebooks, archives and other course files keep their formats. External links that cannot be downloaded remain links; this is not a general website mirror. Meeting-password parameters are removed from exported links.

## Google authorization

Install the optional OAuth dependency (the extra is named `gmail`, but Drive uses a separate token):

```bash
uv tool install --reinstall --refresh "monash-study-kit[gmail]"
monash google login
monash google status
monash export FIT2109 --refresh-google --format both --to "./exports"
```

If you already use other extras, keep them in the install command. `--refresh-google` implies `--sync` and re-exports Google files. For sync without packaging, use `monash sync --refresh-google`. `monash config google_docs_format docx` changes only Google Docs, not Slides or ordinary Markdown pages.

Drive requests **`drive.readonly`**, which permits reading all files the account can access. The exporter uses course-linked files. It cannot edit Drive and does not grant Gmail access. `monash gmail login` separately defaults to `gmail.modify`; `--read-only` requests `gmail.readonly`. See [privacy](/study-kit/privacy/).

API export can fail because a file is too large, the Drive API is disabled, an administrator blocks it, or the file is not shared with the account. Where supported, the dedicated login browser's Google session is tried as a fallback; it cannot bypass file permissions. Google Forms are not exported. `monash google logout` revokes before removing the local token; failed revocation preserves it for retry.

## PDF, Markdown and cache

```bash
monash export FIT2109 --format pdf --to "./exports"
monash export FIT2109 --format md --to "./exports"
monash export FIT2109 --format both --json --to "./exports"
monash config export_format both
```

The initial default is `pdf`. `both` keeps editable Markdown alongside generated PDFs. PDF printing uses one isolated temporary Chrome, Edge or Brave process per export, embeds available local images and blocks remote requests. Without a supported browser, it falls back to Markdown and explains why in the index and terminal. JSON includes generated/cached PDF counts and any fallback reason.

PDFs are cached by printable HTML and embedded image contents under `data/pdf-cache/`; the oldest entries are evicted above 500 MB. Moodle folders are normally refreshed at most weekly; `--refresh-google` refreshes Google files, not every Moodle folder. Re-run sync after a download failure, then inspect the next export's missing-file index. An export does not guarantee every link was downloadable.

## A separate materials-only account

```bash
monash --profile exchange setup
monash --profile exchange google login
monash --profile exchange export FIT2109 --sync --format both --to "./exports"
monash profile list
monash profile remove exchange
```

Install the OAuth extra above before using Google login. `--profile NAME`, `--profile=NAME` and `MONASH_KIT_PROFILE` select an isolated local account under the default home’s `profiles/NAME`. Each has its own credentials, databases, files and browser session. Named profiles always use `materials_only`: Moodle and linked Google materials plus Ed Lessons, without Gmail, attendance, Ed discussions or personal-calendar setup.

Named profiles cannot use remote serving, `monash connect`, or independent `monash move`; setup does not configure an AI app. The default account retains its existing settings. Run profile management from the default account. Removal first revokes Google tokens, preserves local files if revocation fails, and otherwise clears sessions while retaining materials and databases. Add `--all` only if you also want those deleted; delete the Ed token manually on Ed's API-token page. See [privacy](/study-kit/privacy/) before sharing any export.

## When something is missing

- Check that the unit is selected and synced. A matching Ed unit is auto-tracked unless you explicitly chose otherwise in `monash courses`; archived and combined units are supported.
- Re-run `monash login` if the Moodle window closed before sign-in finished, then retry. On macOS Chrome can remain running after its last window closes.
- For Google authorization failures, run `monash google status`, reconnect the correct account and retry with `--refresh-google`. File-sharing and administrator restrictions still apply.
- Check missing files, remote images and Google failure reasons in the index. Missing notebook image references, including case mismatches, are reported.
- For PDF fallback, install Chrome, Edge or Brave, or use `--format md`. Windows temporary-profile cleanup retries no longer turn a completed PDF export into an error in 1.11.1.
- Sync/session refresh runs while the MCP server is running (usually while your AI app is open). For terminal-only use or when the app is closed, request `--sync` explicitly. There is no always-on system scheduler installed by this command.
