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

从 1.6 或更早升到 1.7.0 后，第一次同步会把已经下载的 Ed 课件从数字编号的文件夹挪到按 课号/周/lesson 分的文件夹，不会重新下载。

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

## 升级到 1.11.1 后

1.8 增加整课包与数据目录移动；1.9 补齐 Moodle 正文、图片、Google 文件与遗漏索引；1.10 增加隔离 profile 和 materials-only，并修正 Ed 无扩展名图片；1.11 默认导出 PDF；1.11.1 修复登录窗口关闭、Windows 临时目录清理，增加进度、目录选择和 `--refresh-google`。更新后运行 `monash export --help`，再按[整课导出指南](/zh-cn/study-kit/materials/)同步课程。Google 文件需独立授权；原有 Gmail 登录不等于 Drive 授权。

## 1.11.2 已发布

[1.11.2 Release](https://github.com/Waldo0926/monash-study-kit/releases/tag/v1.11.2) 已在 PyPI 和 GitHub 正式发布。运行 `monash update`，然后重启使用 Study Kit 的 AI 软件。Windows PDF 浏览器冷启动失败时，会清理失败进程并用新的临时 profile 重试一次，也会容忍端口文件尚未写完和短暂连接失败。Gmail/Drive 权限和资料隔离说明同步修正。发布工作流已通过三平台测试、打包和从 PyPI 安装验证。
