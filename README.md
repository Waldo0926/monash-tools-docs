# Monash Student Tools docs

[![Site](https://img.shields.io/badge/site-docs.secureview.tech-1e5eff)](https://docs.secureview.tech)
[![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FWaldo0926%2Fuptime%2FHEAD%2Fapi%2Ftool-docs%2Fuptime.json)](https://waldo0926.github.io/uptime/history/tool-docs)
[![Deploy](https://github.com/Waldo0926/monash-tools-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/Waldo0926/monash-tools-docs/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-Starlight-0d1117?logo=astro)](https://starlight.astro.build)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

English | [中文](#中文)

Guides for the free tools I built for Monash students, in English and Chinese:

- **Study Kit**: ask Claude (or another MCP client) about your own Moodle and Ed. One-command install.
- **Monash Hub**: units, degrees, course maps, WAM/GPA and official guides.
- **Ed Web**: read and search an Ed forum in the browser.
- **Attendance Helper**: Chrome extension that finds attendance codes and submits only the classes you confirm.
- **WeChat Q&A bot**: answers from official pages, with sources.

The site also serves the Study Kit install scripts (`/study-kit/install.sh`, `/study-kit/install.ps1`), install guides written for AI agents (`/agents/*.md`) and `llms.txt`.

## Run locally

Needs Node 22.23.4 or newer (see `.nvmrc`).

```sh
npm ci
npm run dev
```

Pages live in `src/content/docs/` (Chinese under `zh-cn/`). The home page is `src/components/Landing.astro` with text in `src/i18n/landing.ts`.

## Deploy

Every push to `main` builds the site, packages the Attendance Helper from [monash-attendance-reminder](https://github.com/Waldo0926/monash-attendance-reminder) into `/downloads/monash-attendance-helper.zip`, and publishes `dist/` to the `gh-pages` branch. It also runs once a day so the download stays current.

The live site is served from my VPS so it loads reliably from China. The VPS pulls the `gh-pages` branch every 10 minutes (`deploy/vps/sync.sh`) and nginx serves it (`deploy/vps/docs.secureview.tech.conf`). No credentials are stored on either side.

## Not affiliated

Not affiliated with Monash University, Ed or Anthropic. Icons by [Lucide](https://lucide.dev) (ISC).

---

## 中文

给 Monash 学生用的几个免费工具的使用指南，中英双语：Study Kit（让 Claude 等 AI 读你自己的 Moodle 和 Ed，一条命令安装）、Monash Hub、Ed Web、签到助手 Chrome 扩展、公众号问答机器人。

网站同时提供 Study Kit 安装脚本、给 AI 看的安装说明（`/agents/*.md`）和 `llms.txt`。

本地运行需要 Node 22.23.4 以上：`npm ci` 后 `npm run dev`。文档在 `src/content/docs/`，中文在 `zh-cn/` 下；首页是 `src/components/Landing.astro`，文字在 `src/i18n/landing.ts`。

推到 `main` 会自动构建，从 monash-attendance-reminder 打包签到助手 zip，发布到 `gh-pages` 分支；每天也会自动跑一次。线上站点放在我的 VPS 上（国内打开更稳），VPS 每 10 分钟拉一次 `gh-pages`，nginx 配置和拉取脚本在 `deploy/vps/`。

本项目和 Monash University、Ed、Anthropic 没有关系。图标来自 Lucide（ISC）。
