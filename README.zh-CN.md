# Monash 学生工具文档

[![网站](https://img.shields.io/badge/网站-docs.secureview.tech-1e5eff)](https://docs.secureview.tech/zh-cn/)
[![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FWaldo0926%2Fuptime%2FHEAD%2Fapi%2Ftool-docs%2Fuptime.json)](https://waldo0926.github.io/uptime/history/tool-docs)
[![Deploy](https://github.com/Waldo0926/monash-tools-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/Waldo0926/monash-tools-docs/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-Starlight-0d1117?logo=astro)](https://starlight.astro.build)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[English](README.md) · **中文**

给 Monash 学生用的几个免费工具的使用指南，中英双语：

- **Study Kit**：让 Claude 等 AI 读你自己的 Moodle 和 Ed，一条命令安装。
- **Monash Hub**：课程、学位、选课规划、WAM/GPA 和官方指南。
- **Ed Web**：在浏览器里读和搜 Ed 论坛。
- **签到助手**：找签到码、只提交你确认过的课的 Chrome 扩展。
- **公众号问答机器人**：按官方页面回答，附出处。

![docs.secureview.tech 首页：Study Kit 安装命令和各工具指南入口](docs/home.png)

网站同时提供 Study Kit 安装脚本、给 AI 看的安装说明（`/agents/*.md`）和 `llms.txt`。

本地运行需要 Node 22.23.4 以上：`npm ci` 后 `npm run dev`。文档在 `src/content/docs/`，中文在 `zh-cn/` 下；首页是 `src/components/Landing.astro`，文字在 `src/i18n/landing.ts`。

推到 `main` 会自动构建，从 monash-attendance-reminder 打包签到助手 zip，发布到 `gh-pages` 分支；每天也会自动跑一次。线上站点放在我的 VPS 上（国内打开更稳），VPS 每 10 分钟拉一次 `gh-pages`，nginx 配置和拉取脚本在 `deploy/vps/`。

本项目和 Monash University、Ed、Anthropic 没有关系。图标来自 Lucide（ISC）。
