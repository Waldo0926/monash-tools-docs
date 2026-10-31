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

## School mail and attendance

Only if you [connect them](/study-kit/mail-attendance/). Then `secrets` also holds the Google sign-in token and the attendance portal's login state, and `data` holds a copy of your mail and attendance records. Passwords are never stored.

The package includes a Google app so you can sign in without a Google Cloud project of your own. It only tells Google which app is asking. Your mail goes from Google straight to your computer and never passes through the maintainer. Revoke access any time at [myaccount.google.com/permissions](https://myaccount.google.com/permissions). The full [privacy policy](https://github.com/Waldo0926/monash-study-kit/blob/main/PRIVACY.md) covers the Google user data rules.

Drafting, sending a draft, changing labels and checking in run only after you confirm each action. Nothing permanently deletes mail.

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
