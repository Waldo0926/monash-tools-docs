# Monash 学生工具文档

[![网站](https://img.shields.io/badge/网站-docs.secureview.tech-1e5eff)](https://docs.secureview.tech/zh-cn/)
[![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FWaldo0926%2Fuptime%2FHEAD%2Fapi%2Ftool-docs%2Fuptime.json)](https://waldo0926.github.io/uptime/history/tool-docs)
[![Deploy](https://github.com/Waldo0926/monash-tools-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/Waldo0926/monash-tools-docs/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-Starlight-0d1117?logo=astro)](https://starlight.astro.build)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[English](README.md) · **中文**

给 Monash 学生用的几个免费工具的使用指南，中英双语：

- **Study Kit 1.11.2**：Moodle、Ed Lessons 和课程链接中的 Google 文件整课导出，支持 PDF / Markdown、隔离账号和仅资料模式，也可接入 AI / MCP、全文搜索及可选邮箱和考勤。
- **Monash Hub**：课程、学位、选课规划、WAM/GPA 和官方指南。
- **Ed Web**：在浏览器里读和搜 Ed 论坛。
- **签到助手**：找签到码、只提交你确认过的课的 Chrome 扩展，已上架 [Chrome 应用商店](https://chromewebstore.google.com/detail/monash-attendance-helper/mnbkcmgkjmfngcifndchaidndhdfafcd?hl=zh-CN)。
- **公众号问答机器人**：按官方页面回答，附出处。

另外有一页讲我只给自己跑的两个工具（ed-digest 和 moodle-sync），以及该用哪个公开工具代替。

![docs.secureview.tech 首页：Study Kit 安装命令和各工具指南入口](docs/home.png)

网站同时提供 Study Kit 安装脚本、给 AI 看的安装说明（`/agents/*.md`）和 `llms.txt`。

本地运行需要 Node 22.23.4 以上：`npm ci` 后 `npm run dev`。文档在 `src/content/docs/`，中文在 `zh-cn/` 下；首页是 `src/components/Landing.astro`，文字在 `src/i18n/landing.ts`。

推到 `main` 会自动构建，从 monash-attendance-reminder 打包签到助手的 zip 版（给用不了应用商店的人），发布到 `gh-pages` 分支；每天也会自动跑一次。线上站点放在我的 VPS 上（国内打开更稳），VPS 每 10 分钟拉一次 `gh-pages`，nginx 配置和拉取脚本在 `deploy/vps/`。

本项目和 Monash University、Ed、Anthropic 没有关系。图标来自 Lucide（ISC）。

## 同步维护示例

Study Kit 指南和工具页覆盖 **1.11.2**。**2026-11-03** 更新了当前线上 Hub 成绩/搜索页、1.11.2 本地资料库、文档首页与合成资料的实际离线导出截图。示例成绩和资料不含个人账号数据；导出截图故意保留缺失附件及未授权 Google 链接，不代表所有课程都能完整导出。合成数据脚本与重现步骤见 [Study Kit 截图说明](https://github.com/Waldo0926/monash-study-kit/tree/main/docs/screenshots)。

工具功能变更时，一起检查双语指南、工具页文字和选项卡、截图、README 介绍及 Blog 项目/文章说明；只改版本号不会更新图片。
