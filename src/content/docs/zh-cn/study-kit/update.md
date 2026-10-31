---
title: 更新和卸载
description: 一条命令更新到最新版，或者彻底删除。
---

## 更新

```bash
monash update
```

更新后重启你用的 AI 软件。Windows 上它会告诉你先退出 Claude、再运行哪条命令，因为正在运行的程序没法被覆盖。用 Codex、Cursor 等的话，更新前先把它们关掉。

有新版本时会提醒你：终端命令后面多一行提示，在 AI 里问待办时也会顺带说一句。每天最多查一次 GitHub，不带任何个人信息。不想要的话：`monash config update_check false`。

`monash update` 会保留你装过的可选部分（学校邮箱、考勤、录播字幕）。

如果自己用 `uv tool install` 重新安装，记得加 `--refresh`，让 uv 重新查一次 PyPI，不然它可能用缓存里旧的版本列表。方括号里写你装过的可选部分（`gmail`、`attendance`、`media`），没装就去掉：

```bash
uv tool install --reinstall --refresh "monash-study-kit[gmail,attendance]"
```

每个版本改了什么见[更新日志](https://github.com/Waldo0926/monash-study-kit/blob/main/CHANGELOG.md)。

## 卸载

```bash
monash uninstall
uv tool uninstall monash-study-kit
```

`monash uninstall` 会把它从 Claude 和其他 AI 软件里移除，并问你要不要删掉所有数据。最后到 Ed 的 [API 令牌页面](https://edstem.org/au/settings/api-tokens)删掉令牌。
