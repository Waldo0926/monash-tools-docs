---
title: Update and uninstall
description: Keep Study Kit current with one command, or remove it completely.
---

## Update

```bash
monash update
```

[Restart your AI app](/study-kit/troubleshooting/#fully-quit-and-reopen-your-ai-app) afterwards. On Windows it tells you to quit Claude first and which command to run, because a running program cannot be overwritten. If you use Codex, Cursor or another app, close it before updating.

When a new version is out you will hear about it: an extra line after terminal commands, and a short mention when you ask your AI for your to-dos. It checks GitHub at most once a day and sends no personal information. Turn it off with `monash config update_check false`.

`monash update` keeps the optional parts you installed (school mail, attendance, recordings).

The first sync after moving from 1.6 or earlier to 1.7.0 moves the Ed files you already have from numbered folders into folders named by unit, week and lesson. Nothing is downloaded again.

If you ever reinstall by hand with `uv tool install`, add `--refresh` so uv checks PyPI again instead of using an old list of versions. In the brackets, list the optional parts you installed (`gmail`, `attendance`, `media`), or drop them if you installed none:

```bash
uv tool install --reinstall --refresh "monash-study-kit[gmail,attendance]"
```

What changed in each version is in the [changelog](https://github.com/Waldo0926/monash-study-kit/blob/main/CHANGELOG.md).

## Uninstall

```bash
monash uninstall
uv tool uninstall monash-study-kit
```

`monash uninstall` removes it from Claude and the other AI apps and asks whether to delete all data. Before it deletes anything it revokes the Google Drive and Gmail access of the default account and of every named profile, so the grants do not stay active on Google's side. If revoking fails, nothing is deleted. Then delete the token on Ed's [API token page](https://edstem.org/au/settings/api-tokens).

## After upgrading to 1.11.1

What changed in export:

- 1.8: whole-course packages, and moving the data folder
- 1.9: Moodle page text, images, Google files, and a list of anything missing
- 1.10: separate profiles and a materials-only mode, then a fix for Ed images without a file extension
- 1.11: PDF became the default
- 1.11.1: fixes for closed login windows and leftover temporary profiles on Windows, plus progress, a folder picker and `--refresh-google`

Run `monash export --help`, then follow [whole-course export](/study-kit/materials/). Google files need separate authorization: an existing Gmail login does not grant Drive access.

## 1.11.2 is released

[Release 1.11.2](https://github.com/Waldo0926/monash-study-kit/releases/tag/v1.11.2) is published on PyPI and GitHub. Run `monash update`, then [restart the AI app using Study Kit](/study-kit/troubleshooting/#fully-quit-and-reopen-your-ai-app). On Windows, a failed PDF browser cold start is reaped and retried once with a fresh temporary profile; partially written port files and transient connections are retried too. The release also corrects Gmail/Drive permission and materials-isolation documentation. The release workflow passed cross-platform tests, packaging and installation from PyPI on all three platforms.

## 1.15.0 is released

[Release 1.15.0](https://github.com/Waldo0926/monash-study-kit/releases/tag/v1.15.0) is the first release on PyPI since 1.11.2. It also carries what 1.12.0 to 1.14.0 added, which was merged but never published; the [changelog](https://github.com/Waldo0926/monash-study-kit/blob/main/CHANGELOG.md) lists it. Run `monash update`, then [restart the AI app using Study Kit](/study-kit/troubleshooting/#fully-quit-and-reopen-your-ai-app).

The main change is in `monash uninstall`, which now revokes your Google Drive and Gmail access before it deletes the data folder. It used to delete only the local token files, which left the access active at Google. The README now starts with requirements, installation and everyday use, and the FAQ covers `monash: command not found`, a slow first sync, new units after a semester change, an invalid Ed token and removing everything.
