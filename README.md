# Monash Student Tools docs

[![Site](https://img.shields.io/badge/site-docs.secureview.tech-1e5eff)](https://docs.secureview.tech)
[![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FWaldo0926%2Fuptime%2FHEAD%2Fapi%2Ftool-docs%2Fuptime.json)](https://waldo0926.github.io/uptime/history/tool-docs)
[![Deploy](https://github.com/Waldo0926/monash-tools-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/Waldo0926/monash-tools-docs/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-Starlight-0d1117?logo=astro)](https://starlight.astro.build)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**English** · [中文](README.zh-CN.md)

Guides for the free tools I built for Monash students, in English and Chinese:

- **Study Kit**: ask the AI app on your computer (Claude, Codex, Cursor and others) about your own Moodle and Ed. One-command install. Since 1.4 it can also reach ChatGPT and Claude on the web through an optional remote mode.
- **Monash Hub**: units, degrees, course maps, WAM/GPA and official guides.
- **Ed Web**: read and search an Ed forum in the browser.
- **Attendance Helper**: Chrome extension that finds attendance codes and submits only the classes you confirm. On the [Chrome Web Store](https://chromewebstore.google.com/detail/monash-attendance-helper/mnbkcmgkjmfngcifndchaidndhdfafcd).
- **WeChat Q&A bot**: answers from official pages, with sources.

There is also a page on the two tools I keep private (ed-digest and moodle-sync) and which public tool to use instead.

![Home page of docs.secureview.tech: the Study Kit install command and links to the guides](docs/home.png)

The site also serves the Study Kit install scripts (`/study-kit/install.sh`, `/study-kit/install.ps1`), install guides written for AI agents (`/agents/*.md`) and `llms.txt`.

## Run locally

Needs Node 22.23.4 or newer (see `.nvmrc`).

```sh
npm ci
npm run dev
```

Pages live in `src/content/docs/` (Chinese under `zh-cn/`). The home page is `src/components/Landing.astro` with text in `src/i18n/landing.ts`.

## Deploy

Every push to `main` builds the site, packages the zip build of the Attendance Helper (for people who can't use the store) from [monash-attendance-reminder](https://github.com/Waldo0926/monash-attendance-reminder) into `/downloads/monash-attendance-helper.zip`, and publishes `dist/` to the `gh-pages` branch. It also runs once a day so the download stays current.

The live site is served from my VPS so it loads reliably from China. The VPS pulls the `gh-pages` branch every 10 minutes (`deploy/vps/sync.sh`) and nginx serves it (`deploy/vps/docs.secureview.tech.conf`). No credentials are stored on either side.

## Not affiliated

Not affiliated with Monash University, Ed or Anthropic. Icons by [Lucide](https://lucide.dev) (ISC).
