---
title: Update and uninstall
description: Keep Study Kit current with one command, or remove it completely.
---

## Update

```bash
monash update
```

Restart your AI app afterwards. On Windows it tells you to quit Claude first and which command to run, because a running program cannot be overwritten. If you use Codex, Cursor or another app, close it before updating.

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

`monash uninstall` removes it from Claude and the other AI apps and asks whether to delete all data. Then delete the token on Ed's [API token page](https://edstem.org/au/settings/api-tokens).

## After upgrading to 1.11.1

1.8 added whole-course packages and data-home moves; 1.9 added Moodle bodies, images, Google files and missing-item reporting; 1.10 added isolated profiles and materials-only mode, followed by extensionless Ed image fixes; 1.11 made PDF the export default; 1.11.1 fixed closed login windows and Windows temporary-profile cleanup, and added progress, folder selection and `--refresh-google`. Run `monash export --help`, then follow [whole-course export](/study-kit/materials/). Google files need separate authorization: an existing Gmail login does not grant Drive access.

## 1.11.2 is released

[Release 1.11.2](https://github.com/Waldo0926/monash-study-kit/releases/tag/v1.11.2) is published on PyPI and GitHub. Run `monash update`, then restart the AI app using Study Kit. On Windows, a failed PDF browser cold start is reaped and retried once with a fresh temporary profile; partially written port files and transient connections are retried too. The release also corrects Gmail/Drive permission and materials-isolation documentation. The release workflow passed cross-platform tests, packaging and installation from PyPI on all three platforms.
