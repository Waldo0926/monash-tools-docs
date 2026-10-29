---
title: 录播字幕
description: 可选。把 YouTube 和 Zoom 录播转成带时间戳的字幕稿，AI 就能搜到上课讲了什么。
---

想让 AI 知道老师上课讲了什么，可以把录播转成带时间戳的字幕稿：

- Ed 上 “Week N … Recording” 帖子里的 **YouTube** 链接：直接取 YouTube 字幕，很快。
- **Zoom** 录像：用帖子里的 Passcode 下载，再在你电脑上用 Whisper 转写。普通笔记本上一节两小时的课要二三十分钟。

这部分依赖比较大（约 1 GB），默认不装。想要的话：

```bash
uv tool install --reinstall "monash-study-kit[media]"
```

然后需要时手动运行。它不会在后台自动跑，不会拖慢电脑。

```bash
monash media
```

电脑比较慢可以用小一点的模型：`monash media --model base.en`。想先试几个视频：`monash media --limit 2`。

Moodle 上直接挂的视频默认也不下载（动辄几百 MB），只记成链接。想下载：`monash config download_videos true`。
