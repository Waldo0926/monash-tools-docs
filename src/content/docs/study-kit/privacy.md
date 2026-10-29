---
title: Privacy and security
description: Where Study Kit keeps your data, which credentials it stores, what your AI app can see, and how to remove everything.
---

## Where data lives

| System | Folder |
| --- | --- |
| macOS | `~/Library/Application Support/monash-study-kit` |
| Windows | `%LOCALAPPDATA%\monash-study-kit` |

Inside are your course files (`files`), the database (`data`), login credentials (`secrets`, readable only by your own user account) and the login window's profile (`browser-profile`). `monash open` opens the course-files folder.

## Credentials it stores

- the Moodle session cookie
- the Ed API token
- the Moodle calendar subscription link

They stay on your computer and are only sent to Moodle or Ed. **Never send the `secrets` folder to anyone.**

If you use the optional [remote mode](/study-kit/remote/), `secrets/remote-mcp.db` also holds the apps you paired. Only hashes of their tokens are stored, never the tokens themselves.

## What the AI sees

Only what a tool returns when you ask something: a list of deadlines, the text of a post, the text of a course file. Tokens and cookies are never sent to the AI. Do not paste your Ed token into a chat either; enter it in the terminal only.

## The course library page

`monash library` only listens on `127.0.0.1`, so other devices cannot reach it. It only serves files that `monash sync` registered, refuses paths outside the course-file folders and never serves the `secrets` folder or the login profile. It has no password, so do not forward it to the internet.

## What it does to Moodle and Ed

It only reads. Requests are spaced out, so it does not hammer university systems like a crawler.

## Update checks

Once a day at most it asks GitHub whether a new version exists, with no personal information. Turn it off with `monash config update_check false`.

## Remove everything

```bash
monash uninstall
uv tool uninstall monash-study-kit
```

`monash uninstall` removes it from Claude and the other AI apps and asks whether to delete all data. Last, delete the token on Ed's [API token page](https://edstem.org/au/settings/api-tokens).

## How it is checked

The project's [security notes](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/security.md) describe what is protected and how it is tested. To report a problem privately, see [SECURITY.md](https://github.com/Waldo0926/monash-study-kit/blob/main/SECURITY.md).
