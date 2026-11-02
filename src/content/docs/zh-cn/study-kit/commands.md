---
title: 命令速查
description: 所有 monash 命令、输出格式和退出码。
---

| 命令 | 作用 |
| --- | --- |
| `monash setup` | 第一次设置。`monash setup claude` 只重新接进 Claude |
| `monash status` | 登录状态、上次同步时间；接上的话也包括邮箱和考勤 |
| `monash help` | 能做的所有事，每条附示例问法和对应命令 |
| `monash doctor` | 体检，告诉你每个问题怎么修 |
| `monash doctor --deep` | 再用 Moodle 和 Ed 上的第二个来源核对结果 |
| `monash todo` | 本周：截止、可能漏交、Ed 没做完的 lesson、公告、未读回复 |
| `monash semester [--days 7] [--ics [路径]]` | 1.6.0 起：截止、Ed lesson 和回复、本地考勤缓存放在一页；`--ics` 把截止日期导出成私有日历文件（一次性快照，不会自动更新） |
| `monash due [FIT2102]` | 截止日期 |
| `monash grep "monad" [FIT2102]` | 全文搜索，带页码或时间戳 |
| `monash export FIT2109 [--sync] [--refresh-google] [--format pdf\|both\|md] [--to 文件夹] [--no-ask] [--dir] [--open] [--json]` | 1.11.1 整课资料包；[参数和前置条件](/zh-cn/study-kit/materials/) |
| `monash google login [--client JSON]` / `status` / `logout` | 课程 Google 文件独立 Drive 只读授权、状态、吊销 |
| `monash --profile NAME setup` / `sync` / `export FIT2109` | 选择隔离的课程资料账号；命名账号强制 materials-only |
| `monash profile list` / `remove NAME [--all] [--yes]` | 从默认账号查看或清理 profile；`--all` 包含课件与数据库 |
| `monash move "D:\MonashStudyKit"` | 移动默认账号的资料、数据库、凭据和设置；命名账号不能独立移动 |
| `monash sync [FIT2109] [--refresh-google]` | 马上同步。`--dry-run` 只列出 Moodle 会下载什么 |
| `monash login` / `monash login ed` | 登录 Moodle / 换 Ed 令牌 |
| `monash courses` | 重新选要跟踪的课 |
| `monash open [ed]` | 打开课件文件夹；`ed`：Ed Lessons 的课件，按 课号/周/lesson 分好（1.7.0 起） |
| `monash library [--open] [--port 8766]` | 在浏览器里翻和下载已同步的课件（[说明](/zh-cn/study-kit/cli/#在浏览器里翻课件)） |
| `monash moodle grades [FIT2102]` | 成绩和反馈 |
| `monash moodle assignments --missing` | 可能漏交的作业 |
| `monash moodle news` / `find` / `get` / `messages` / `calendar` | 公告 / 找活动 / 下载单个文件 / 私信 / 日历订阅链接 |
| `monash moodle ls FIT2109 5` | 某门课或某周已同步的文件 |
| `monash ed new` / `following` / `search` / `show FIT2102#42` | Ed 新动态 / 我的帖子有没有新回复 / 搜索 / 读帖子 |
| `monash ed lessons FIT2109` / `quiz FIT2109` | Ed lesson 进度 / 复习用的测验题 |
| `monash ed read FIT2109 "W3 Pre-Class"` | 整节 lesson 转成 Markdown，附测验题 |
| `monash ed export FIT2109 [--module "Week 3"] [--to 文件夹] [--open]` | 1.7.0 起：整门课的 Ed 课件按周打包成 zip，默认存到“下载”（[说明](/zh-cn/study-kit/cli/#把整门课的-ed-课件打包)） |
| `monash media` | 转写录播（要装[录播字幕](/zh-cn/study-kit/recordings/)） |
| `monash config [key] [value]` | 看或改设置，改完重启 AI 软件 |
| `monash connect [软件]` | 接进 Codex、Cursor、VS Code、Windsurf 或 Gemini CLI（[其他 AI 软件](/zh-cn/study-kit/other-clients/)） |
| `monash remote serve` / `pair` / `clients` / `revoke` | 可选：自己托管远程 MCP 服务器（[自己托管](/zh-cn/study-kit/remote/)） |
| `monash gmail login` / `sync` / `todo` / `search` / `thread` | 可选的学校邮箱：接上 / 同步（显示进度）/ 未读邮件待办 / 离线搜索 / 读对话（[详细](/zh-cn/study-kit/mail-attendance/)） |
| `monash gmail draft` / `send-draft` / `labels` | 预览邮箱操作；加 `--confirm` 才执行 |
| `monash attendance login` / `status` / `sync` / `overview` / `codes` / `probe` | 可选的考勤：接上 / 状态和登录时长 / 读门户 / 已保存的班次 / 找签到码 / 对照两种读法 |
| `monash update` | 更新到最新版，保留你装过的可选部分 |
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
