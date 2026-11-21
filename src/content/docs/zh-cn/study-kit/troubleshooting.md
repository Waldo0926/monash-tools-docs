---
title: 常见问题
description: 常见问题的解决办法，先运行 monash doctor
---

## 先运行 `monash doctor`

```bash
monash doctor
```

它会一项项检查，并告诉你没通过的怎么修

需要别人帮忙时把整段输出发过去，里面没有令牌、cookie，也不显示邮箱地址

也可以直接跟 AI 说“monash 用不了了”，它会跑同样的检查

`monash doctor --deep` 还会去 Moodle 和 Ed 再拉一遍，用第二个来源核对结果（截止日期对日历订阅、本地课件对 Moodle 等），只输出数量、课号、日期和活动编号


## 打开终端

文档里说“在终端里运行”，就是打开下面这个窗口，把命令粘贴进去回车

- **macOS**：按 Command + 空格，输入“终端”或 Terminal，回车
- **Windows**：点开始菜单，输入 PowerShell，打开 **Windows PowerShell**  
  Windows 11 里的“终端”也可以
- **Linux**：一般按 Ctrl + Alt + T

## 完全退出再重开 AI 软件

很多步骤最后都要“重启 AI 软件”

只关窗口不算，很多软件关了窗口还在后台运行，改的设置就不会生效

- **macOS**：在软件里按 Command + Q，或者在程序坞（Dock）的图标上右键选“退出”
- **Windows**：关掉窗口后，看右下角托盘（时间旁边，可能要先点 ^ 展开）里还有没有它的图标，有的话右键选“退出”或 Quit
- **还是关不掉**：macOS 打开“活动监视器”，Windows 按 Ctrl + Shift + Esc 打开任务管理器，找到它结束掉

然后重新打开就行

## AI 软件里看不到 monash

- **Claude Desktop 或 Claude Code**：运行 `monash setup claude` 重新接一次  
  Windows 上一定先从托盘**完全退出** Claude  
  还不行的话，看 Claude Desktop 的 **Settings** 里 **Developer** 有没有报错
- **Codex、Cursor、VS Code、Windsurf 或 Gemini CLI**：运行 `monash connect` 看这个软件接上没有  
  没接上就运行 `monash connect codex`（换成你的软件名），再[重启软件](/zh-cn/study-kit/troubleshooting/#完全退出再重开-ai-软件)  
  配置文件里有注释的话，它会把要加的内容打印出来让你手动粘贴，见[其他 AI 软件](/zh-cn/study-kit/other-clients/)

## 提示 “monash: command not found”

新开一个终端窗口

安装脚本已经把工具目录加进 PATH，但之前开着的窗口看不到这个变化

还不行的话，运行 `uv tool update-shell` 再开一个新窗口

## 登录窗口打不开，或提示没找到浏览器

装一个 Chrome 或 Edge，浏览器装在不常见的位置的话，指定一下：

```bash
monash config browser "C:\Program Files\...\chrome.exe"
```

如果之前的登录窗口还开着，先把它关掉

## 想要的文件没下载下来

1.16.0 起，超过 300 MB 的文件、录像和 `skip_types` 里排除的类型都只记成链接

运行 `monash skipped` 看带编号的清单，只要一个就 `monash skipped --get 3`，想全部补齐就调大上限 `monash sync --max-mb 2000`

详细见[选择下载哪些文件](/zh-cn/study-kit/cli/#选择下载哪些文件)

## 提示“后台正在同步”

1.16.0 起，`monash sync FIT2109`、`monash export --sync` 和 `monash skipped --get` 会等 AI 软件里的后台同步跑完，免得两边同时写同一个文件夹

用 `monash status` 看进度，跑完再试一次

## Windows 同步时提示路径太长

Windows 默认限制完整路径 260 个字符，课名、周名、文件名加起来可能超

把课件放到短一点的地方：

```powershell
monash config files_dir C:\Monash
monash sync
```

叫 `CON`、`NUL`、`AUX.pdf` 这类名字的文件在 Windows 上根本存不了，1.16.0 起会在前面加个 `_`，比如 `_CON.pdf`

## 澳洲校区时间不对

Moodle 按你账号的时区显示时间，Study Kit 默认按 UTC+8，改成你的：

```bash
monash config timezone Australia/Melbourne
```

换成你所在的城市（`Australia/Perth`、`Australia/Brisbane` 等），夏令时会自动处理，改完[重启一下 AI 软件](/zh-cn/study-kit/troubleshooting/#完全退出再重开-ai-软件)

## Ed 上的作业截止日期在哪？

大部分 Ed lesson 没有截止日期，截止以 Moodle 为准

待办里 Ed 的部分按你自己的进度：列出到你做到的那一周的下一周为止没做完的 lesson

## Windows 更新时提示文件被占用

Windows 上正在运行的程序不能被覆盖，AI 软件开着时会一直开着 `monash`

先从托盘完全退出 Claude Desktop（用 Codex、Cursor 等就把它们关掉），再在新的 PowerShell 窗口里重新运行更新

## 没有出现面板

面板要 Study Kit 1.4.0，并且软件支持 MCP Apps

先 `monash update`，再[重启软件](/zh-cn/study-kit/troubleshooting/#完全退出再重开-ai-软件)

软件不支持面板的话，照样会收到普通的文字回答，内容是一样的

## 我的课不用 Ed

运行 `monash config use_ed false`，或者在 `monash setup` 里跳过 Ed 令牌，问你是不是不用 Ed 时选是

之后同步、待办和 `monash doctor` 都不会再提醒 Ed 令牌，AI 软件里也不再列 Ed 的工具

以后要用了，运行 `monash login ed` 就会重新打开

## Google 提示“尚未验证此应用”

自带的应用都会这样，点 **高级**，再点 **继续**

如果 Google 提示这个应用的用户已满，就按[设置教程](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/google-and-attendance-setup.md)改用你自己的 Google Cloud 应用

## 邮件或考勤不更新了

运行 `monash doctor`，接上以后它会各给一行，告诉你哪里要修

登录过期的话，让 AI 重新接一次，或者运行 `monash gmail login` / `monash attendance login`

## 还是不行

MCP 后台日志是[数据文件夹](/zh-cn/study-kit/privacy/#数据存在哪)里的 `mcp.log`

带上 `monash doctor` 的输出开个 [issue](https://github.com/Waldo0926/monash-study-kit/issues)

## 整课导出、Google 或 PDF 缺内容

先升级到 1.11.2，再查看[整课导出的排错步骤](/zh-cn/study-kit/materials/)

用 `--to "./exports"` 或 `--no-ask` 跳过目录弹窗；`--format md` 不需要 PDF 浏览器

`--refresh-google` 会联网同步，普通不带 `--sync` 的导出只读本地缓存

Google 权限/大小/管理员限制会记录在遗漏索引；重试不能绕过文件权限

登录窗口提前关闭时重新运行 `monash login`，无需重装浏览器
