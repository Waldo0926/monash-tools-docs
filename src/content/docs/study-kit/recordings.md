---
title: Lecture recordings
description: Optional. Turn YouTube and Zoom lecture recordings into timestamped transcripts that Claude can search.
---

Want Claude to know what was said in class? Recordings can become timestamped transcripts:

- **YouTube** links in Ed "Week N … Recording" posts: the YouTube captions are fetched directly, which is fast.
- **Zoom** recordings: downloaded with the passcode from the post, then transcribed on your computer with Whisper. A two-hour lecture takes 20 to 30 minutes on an ordinary laptop.

These extras are large (about 1 GB), so they are not installed by default. To add them:

```bash
uv tool install --reinstall "monash-study-kit[media]"
```

Then run it when you want. It never runs in the background, so it will not slow your computer down.

```bash
monash media
```

A slow computer can use a smaller model: `monash media --model base.en`. To try only a few videos first: `monash media --limit 2`.

Videos uploaded straight to Moodle are not downloaded by default (they are often hundreds of MB) and are saved as links instead. To download them: `monash config download_videos true`.
