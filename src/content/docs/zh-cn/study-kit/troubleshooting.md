---
title: 常见问题
description: 常见问题的解决办法。先运行 monash doctor。
---

## 先运行 `monash doctor`

```bash
monash doctor
```

它会一项项检查，并告诉你没通过的怎么修。需要别人帮忙时把整段输出发过去，里面没有令牌、cookie，也不显示邮箱地址。也可以直接跟 AI 说“monash 用不了了”，它会跑同样的检查。

`monash doctor --deep` 还会去 Moodle 和 Ed 再拉一遍，用第二个来源核对结果（截止日期对日历订阅、本地课件对 Moodle 等），只输出数量、课号、日期和活动编号。

## AI 软件里看不到 monash

- **Claude Desktop 或 Claude Code**：运行 `monash setup claude` 重新接一次。Windows 上一定先从托盘**完全退出** Claude。还不行的话，看 Claude Desktop 的 **Settings** 里 **Developer** 有没有报错。
- **Codex、Cursor、VS Code、Windsurf 或 Gemini CLI**：运行 `monash connect` 看这个软件接上没有。没接上就运行 `monash connect codex`（换成你的软件名），再重启软件。配置文件里有注释的话，它会把要加的内容打印出来让你手动粘贴，见[其他 AI 软件](/zh-cn/study-kit/other-clients/)。

## 提示 “monash: command not found”

新开一个终端窗口。安装脚本已经把工具目录加进 PATH，但之前开着的窗口看不到这个变化。还不行的话，运行 `uv tool update-shell` 再开一个新窗口。

## 登录窗口打不开，或提示没找到浏览器

装一个 Chrome 或 Edge。浏览器装在不常见的位置的话，指定一下：

```bash
monash config browser "C:\Program Files\...\chrome.exe"
```

如果之前的登录窗口还开着，先把它关掉。

## Windows 同步时提示路径太长

Windows 默认限制完整路径 260 个字符，课名、周名、文件名加起来可能超。把课件放到短一点的地方：

```powershell
monash config files_dir C:\Monash
monash sync
```

## 澳洲校区时间不对

Moodle 按你账号的时区显示时间，Study Kit 默认按 UTC+8。改成你的：

```bash
monash config tz_offset 10
```

夏令时用 11。

## Ed 上的作业截止日期在哪？

大部分 Ed lesson 没有截止日期，截止以 Moodle 为准。待办里 Ed 的部分按你自己的进度：列出到你做到的那一周的下一周为止没做完的 lesson。

## Windows 更新时提示文件被占用

Windows 上正在运行的程序不能被覆盖，AI 软件开着时会一直开着 `monash`。先从托盘完全退出 Claude Desktop（用 Codex、Cursor 等就把它们关掉），再在新的 PowerShell 窗口里重新运行更新。

## 没有出现面板

面板要 Study Kit 1.4.0，并且软件支持 MCP Apps。先 `monash update`，再重启软件。软件不支持面板的话，照样会收到普通的文字回答，内容是一样的。

## 我的课不用 Ed

运行 `monash config use_ed false`，或者在 `monash setup` 里跳过 Ed 令牌，问你是不是不用 Ed 时选是。之后同步、待办和 `monash doctor` 都不会再提醒 Ed 令牌，AI 软件里也不再列 Ed 的工具。以后要用了，运行 `monash login ed` 就会重新打开。

## Google 提示“尚未验证此应用”

自带的应用都会这样，点 **高级**，再点 **继续**。如果 Google 提示这个应用的用户已满，就按[设置教程](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/google-and-attendance-setup.md)改用你自己的 Google Cloud 应用。

## 邮件或考勤不更新了

运行 `monash doctor`，接上以后它会各给一行，告诉你哪里要修。登录过期的话，让 AI 重新接一次，或者运行 `monash gmail login` / `monash attendance login`。

## 还是不行

MCP 后台日志是[数据文件夹](/zh-cn/study-kit/privacy/#数据存在哪)里的 `mcp.log`。带上 `monash doctor` 的输出开个 [issue](https://github.com/Waldo0926/monash-study-kit/issues)。
