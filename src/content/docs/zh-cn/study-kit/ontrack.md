---
title: OnTrack / Doubtfire
description: 1.18.0 起可选，纯 Python 实现 OnTrack / Doubtfire 课程、任务、任务书 PDF、导师评论与本地待办整合
---

默认关闭，纯 Python 实现，直接复用已有的 `pypdf` 依赖，不需要 Node.js 或任何额外安装包，只在你自己的电脑上运行

- **课程和任务**：列出当前或往期课程，查看每个任务的状态、等级和实际截止日期（包含弹性日期、按目标等级的截止时间和 special consideration 顺延）
- **任务书转 Markdown**：`monash ontrack read 课程 任务` 拉取任务书 PDF 并用内置 `pypdf` 提取正文，方便直接看或交给 AI
- **下载资源**：保存整门课资源包（`monash ontrack get 课程`）、单个任务书 PDF 或任务附件包
- **未读导师评论**：`monash ontrack chats 课程` 只读列出各任务的未读评论数，不会把消息标为已读
- **并入待办与学期概览**：运行 `monash ontrack sync` 缓存后，近期截止、已逾期或待处理任务（`fix_and_resubmit`、`redo`、`discuss`、`demonstrate`、`attention_required`、`rediscuss`）以及未读评论会和 Moodle、Ed 一起出现在 `monash todo`、`monash semester`、`monash status` 和 `monash doctor` 中

## 登录

```bash
monash ontrack login
monash ontrack sync
```

默认连接 Monash 的 OnTrack 站点（`https://ontrack.infotech.monash.edu`），如需连接其他 OnTrack / Doubtfire 站点可加 `--url https://<域名>`

Study Kit 会直接复用专用登录窗口的浏览器配置（`browser-profile`），如果之前登录 Moodle 时 Okta 已经记住你，登录和静默续期都不需要再次输入密码，也不会保存密码

登录时请勾选 **Remember me**，这样 OnTrack 会签发刷新 Cookie：短期访问令牌到期前会走纯 HTTPS（`POST /api/auth/access-token`）自动续期，不需要每次开浏览器

如果不方便弹浏览器窗口，也可以用 `--paste` 粘贴 Cookie 头、cURL 命令、`/api/auth/access-token` 的 JSON 返回或裸 `refresh_token`：

```bash
monash ontrack login --paste
```

登录完[重启 AI 软件](/zh-cn/study-kit/troubleshooting/#完全退出再重开-ai-软件)，OnTrack 的 MCP 工具就会出现

## 常用命令

```bash
monash ontrack courses                   # 当前课程（加 --include-inactive 看往期）
monash ontrack tasks FIT2004             # 查看任务状态、截止、等级和未读数
monash ontrack task FIT2004 1.1P         # 单个任务详情和文件提交要求
monash ontrack read FIT2004 1.1P         # 把任务书 PDF 转成 Markdown
monash ontrack get FIT2004               # 下载整门课资源 ZIP
monash ontrack get FIT2004 1.1P          # 下载任务书 PDF（加 --resources 下附件包）
monash ontrack chats FIT2004             # 只读查看各任务未读评论数
monash ontrack sync --sheets             # 刷新本地缓存并缓存任务书 PDF
```

查询类命令加 `--json` 输出 JSON

## 安全与确认边界

- **MCP 默认只读**：登录后只注册 `ontrack_units`、`ontrack_tasks`、`ontrack_task_sheet` 和 `ontrack_chats`，均不会把评论标为已读或改动 OnTrack 上的状态
- **MCP 可选写操作须显式开启并确认**：运行 `monash config ontrack_write_enabled true`（或登录时加 `--allow-write`）后才注册 `ontrack_prepare_action`，仅覆盖三项操作：读取单任务评论历史（OnTrack 服务端会把非讨论类评论标为已读）、发送评论、修改进度状态（`not_started`、`working_on_it`、`need_help`），每项都先返回完整预览，必须由你明确确认后才通过 `execute_student_action` 执行；**MCP 绝不暴露交作业文件接口**
- **终端写操作**：`monash ontrack set`、`monash ontrack submit`、`monash ontrack chat-send` 以及读取单任务评论的 `monash ontrack chats 课程 任务` 均会先给预览，要求交互确认或加 `--confirm` / `--yes`（也可先加 `--dry-run` 查看计划）
- **远程模式**：使用[远程模式](/zh-cn/study-kit/remote/)时，配对页上 `ontrack.read` 默认勾选，`ontrack.write` 默认不勾
- **只导课程资料模式**：命名 `--profile` 账号和 `materials_only` 模式会一律拒绝 OnTrack 命令和工具

## 设置

| 设置项 | 默认值 | 作用 |
| --- | --- | --- |
| `ontrack_enabled` | `false` | `monash ontrack login` 成功后自动打开；控制 MCP 工具和 `todo`/`semester` 整合 |
| `ontrack_url` | `https://ontrack.infotech.monash.edu` | 默认连接 Monash 的 OnTrack 站点（可用 `--url`、`MONASH_KIT_ONTRACK_URL` 或 `ONTRACK_BASE_URL` 覆盖） |
| `ontrack_write_enabled` | `false` | 是否开启 MCP 预览确认写操作（`chat_read`、`chat_send`、`task_state`） |

## 已知限制

- 真实 Monash OnTrack / Doubtfire 站点上的实机登录、作业提交与弹性日期边界情况尚未实测，目前基于 OnTrack API 契约完成离线测试
- 凭据保存在仅本人可读的 `secrets/ontrack-session.json`，且 HTTP 客户端禁止跨重定向携带凭据

## 致谢

OnTrack / Doubtfire 集成参考并以纯 Python 重新实现了 [`bunizao/ontrack-cli`](https://github.com/bunizao/ontrack-cli)（MIT License, Copyright (c) 2026 bunizao）
