---
title: 命令速查
description: 所有 monash 命令、输出格式和退出码。
---

| 命令 | 作用 |
| --- | --- |
| `monash setup` | 第一次设置。`monash setup claude` 只重新接进 Claude |
| `monash status` | 登录状态、上次同步时间 |
| `monash help` | 能做的所有事，每条附示例问法和对应命令 |
| `monash doctor` | 体检，告诉你每个问题怎么修 |
| `monash doctor --deep` | 再用 Moodle 和 Ed 上的第二个来源核对结果 |
| `monash todo` | 本周：截止、可能漏交、Ed 没做完的 lesson、公告、未读回复 |
| `monash due [FIT2102]` | 截止日期 |
| `monash grep "monad" [FIT2102]` | 全文搜索，带页码或时间戳 |
| `monash sync` | 马上同步。`--dry-run` 只列出 Moodle 会下载什么 |
| `monash login` / `monash login ed` | 登录 Moodle / 换 Ed 令牌 |
| `monash courses` | 重新选要跟踪的课 |
| `monash open` | 打开课件文件夹 |
| `monash moodle grades [FIT2102]` | 成绩和反馈 |
| `monash moodle assignments --missing` | 可能漏交的作业 |
| `monash moodle news` / `find` / `get` / `messages` / `calendar` | 公告 / 找活动 / 下载单个文件 / 私信 / 日历订阅链接 |
| `monash moodle ls FIT2109 5` | 某门课或某周已同步的文件 |
| `monash ed new` / `following` / `search` / `show FIT2102#42` | Ed 新动态 / 我的帖子有没有新回复 / 搜索 / 读帖子 |
| `monash ed lessons FIT2109` / `quiz FIT2109` | Ed lesson 进度 / 复习用的测验题 |
| `monash ed read FIT2109 "W3 Pre-Class"` | 整节 lesson 转成 Markdown，附测验题 |
| `monash media` | 转写录播（要装[录播字幕](/zh-cn/study-kit/recordings/)） |
| `monash config [key] [value]` | 看或改设置，改完重启 Claude Desktop |
| `monash connect [软件]` | 接进 Codex、Cursor、VS Code、Windsurf 或 Gemini CLI（[其他 AI 软件](/zh-cn/study-kit/other-clients/)） |
| `monash update` | 更新到最新版 |
| `monash uninstall` | 从 Claude 和其他 AI 软件移除，可选删除所有数据 |

每个命令都有 `--help`。

## 输出

加 `--json` 输出 JSON。输出被管道接到别的程序时自动是 JSON，`--text` 强制文本。

## 退出码

| 码 | 意思 |
| --- | --- |
| 0 | 成功 |
| 1 | 参数不对 |
| 2 | 需要登录（`monash login` 或 `monash login ed`） |
| 3 | 连不上 Moodle 或 Ed，或对方出错 |
| 4 | 找不到课程或帖子 |
| 130 | 被 Ctrl-C 中断 |
