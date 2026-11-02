---
title: 导出整门课资料
description: 把 Moodle、Ed Lessons 和课程链接的 Google 文件打成一个本地资料包，支持 PDF、Markdown 和遗漏索引。
---

Study Kit **1.11.1** 可以将 Moodle 和 Ed Lessons 合并为一个课程资料包，不需要 AI 软件。导出包含教学资料和作业说明，但不含个人提交、成绩、反馈、Ed 讨论区、邮件、私信和考勤。它是当前账号有权访问且已经同步的内容快照；是否完整，要先看索引。

## 第一次导出

完成[安装](/zh-cn/study-kit/install/)和[初次设置](/zh-cn/study-kit/setup/)后：

```bash
monash courses
monash export FIT2109 --sync --format both --to "./exports"
```

在 `monash courses` 勾选课程。`--sync` 会先刷新该课程的 Moodle 内容和 Ed Lessons，不会同步 Ed 论坛帖子。不加时只读本地缓存。`--to` 后面是目标文件夹，不是 zip 文件名；把 FIT2109 换成你的课号。

不写 `--to` 时，交互终端会先弹出文件夹选择框再同步，默认上次选择的位置或系统“下载”文件夹，也支持 Windows 移动过的下载目录。`--no-ask` 跳过弹窗；`monash config export_dir "./exports"` 可记住目标位置。`--dir` 输出文件夹而非 zip，`--open` 在访达或资源管理器里显示结果。macOS 和 Windows 上，带空格的路径都要加引号。

## 包含什么

| 来源 | 导出内容 |
| --- | --- |
| Moodle 文件和文件夹 | 保留原文件与子目录；优先整文件夹下载，失败时逐个获取 |
| Moodle Page、Book、作业 | 正文、学生可见的 rubric/marking guide 和附件；Book 使用打印视图 |
| Ed Lessons | 按 Ed 顺序排列模块和 lesson，含幻灯片、阅读页、正文内 Ed 托管附件和只有题目的测验页 |
| 图片 | Moodle/Ed 图片下载到 `assets/`，按内容去重并改为本地引用 |
| 课程链接的 Google 文件 | Docs/Slides 导出 PDF，Sheets 导出 XLSX，其他 Drive 文件保留原格式；Docs 可改 DOCX |
| 索引 | 内容、同步信息、未导出项目及原因、剩余远程图片和 Google 导出统计 |

课号目录下有 `Moodle/`、`Ed Lessons/` 和索引。正文页、链接列表、测验与索引的扩展名随格式设置变化；原有 PDF、notebook、压缩包等保持格式。不能下载的外部资源仍保留链接，它不会镜像整个网站。导出链接会去掉会议密码参数。

## Google 授权

安装可选 OAuth 依赖（extra 名称是 `gmail`，但 Drive 使用独立令牌）：

```bash
uv tool install --reinstall --refresh "monash-study-kit[gmail]"
monash google login
monash google status
monash export FIT2109 --refresh-google --format both --to "./exports"
```

如果还使用其他 extras，安装时保留它们。`--refresh-google` 隐含 `--sync`，重新导出 Google 文件；只同步不打包可运行 `monash sync --refresh-google`。`monash config google_docs_format docx` 只改变 Google Docs，不影响 Slides 或普通 Markdown 正文。

Drive 只申请 **`drive.readonly`**，但该权限允许读取账号有权访问的全部文件，导出器实际处理课程中链接的文件。它不能修改 Drive，也不授予 Gmail 权限。另行执行的 `monash gmail login` 默认申请 `gmail.modify`，加 `--read-only` 才申请 `gmail.readonly`。详见[隐私说明](/zh-cn/study-kit/privacy/)。

文件过大、Drive API 未启用、管理员限制或文件未共享给当前账号，都可能导致 API 导出失败。支持时会尝试专用登录浏览器的 Google 会话，无法绕过文件权限。Google Forms 不导出。`monash google logout` 先吊销再删除本机令牌，吊销失败会保留令牌供重试。

## PDF、Markdown 和缓存

```bash
monash export FIT2109 --format pdf --to "./exports"
monash export FIT2109 --format md --to "./exports"
monash export FIT2109 --format both --json --to "./exports"
monash config export_format both
```

初始默认是 `pdf`；`both` 同时保留可编辑 Markdown 和生成的 PDF。PDF 使用每次导出独立的临时 Chrome、Edge 或 Brave 进程，嵌入已有本地图片并阻止远程请求。没有支持的浏览器时退回 Markdown，在索引和终端说明原因。JSON 包含生成/命中缓存的 PDF 数量及回退原因。

PDF 缓存在 `data/pdf-cache/`，按打印 HTML 和嵌入图片内容计算键，超过 500 MB 时淘汰最旧项。Moodle 文件夹通常最多每周刷新一次；`--refresh-google` 刷新的是 Google 文件，并非强制刷新每个 Moodle 文件夹。下载失败后重跑同步，再检查新导出的遗漏索引；导出成功不代表每个链接都能下载。

## 单独的课程资料账号

```bash
monash --profile exchange setup
monash --profile exchange google login
monash --profile exchange export FIT2109 --sync --format both --to "./exports"
monash profile list
monash profile remove exchange
```

Google 登录前先安装上述 OAuth extra。`--profile NAME`、`--profile=NAME` 或 `MONASH_KIT_PROFILE` 选择默认数据根目录 `profiles/NAME` 下的隔离账号，各自保存凭据、数据库、课件和浏览器会话。命名 profile 强制 `materials_only`：只同步 Moodle、链接的 Google 资料和 Ed Lessons，跳过 Gmail、考勤、Ed 讨论区和个人日历设置。

命名 profile 不能运行远程服务、`monash connect` 或独立 `monash move`，setup 不配置 AI 软件。默认账号保留原设置。请从默认账号管理 profile；删除时先吊销 Google 令牌，吊销失败则保留本机文件，成功后清除登录会话，保留课件与数据库。只有也想删除资料时才加 `--all`；Ed 令牌需在 Ed 的 API-token 页面手动删除。分享导出包前请看[隐私说明](/zh-cn/study-kit/privacy/)。

## 缺内容时怎么办

- 确认课程已勾选并完成同步。匹配 Moodle 课号的 Ed 课程会自动跟踪，支持归档和合并课程；你在 `monash courses` 做过的明确选择会保留。
- Moodle 登录窗口提前关闭时重跑 `monash login` 再试。macOS 上 Chrome 最后一个窗口关闭后，进程可能仍在运行。
- Google 授权失败时运行 `monash google status`，重新登录正确账号，再加 `--refresh-google` 重试；共享权限和管理员限制仍然有效。
- 查看索引里的缺失文件、远程图片和 Google 失败原因；notebook 图片缺失或文件名大小写不匹配也会报告。
- PDF 回退时安装 Chrome、Edge 或 Brave，或用 `--format md`。1.11.1 会重试 Windows 临时浏览器目录清理，已生成的 PDF 不再因清理失败而报错。
- 自动同步和会话续期依赖 MCP 服务正在运行（通常是 AI 软件开着时）。只用终端或关闭软件后，请显式加 `--sync`；这条命令不会安装常驻系统定时器。
