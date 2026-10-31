---
title: 学校邮箱和考勤
description: 1.5.0 起可选。问学校邮箱和考勤，找签到码；你确认之后，AI 可以帮你起草邮件或签到。
---

两部分都是可选的，接上之前都不会打开。和 Study Kit 其他部分一样，全在你自己的电脑上运行。

- **学校邮箱。** 问“我邮箱里有什么要处理的？”，列出最近几天还没读的学校邮件（推广和社交类已经去掉）。AI 还能离线搜邮件、读整个对话和附件里的文字（PDF、Word、PPT、图片），帮你起草回复、发送你看过的草稿、归档或标成已读。
- **考勤。** 问“这周还有哪节课没签到？”“今天 FIT2102 workshop 的签到码是多少？”。签到码从已同步的 Moodle、Ed 和学校邮件里找，每个都标出处。你说自己到课了，AI 可以帮你签到。

如果只是想在 Claude 或 ChatGPT 里问问邮箱，用它们自带的 Gmail 连接器更简单。Study Kit 的邮箱适合想把邮件和考勤签到码连在一起、离线搜邮件和附件，或者在 Codex、Cursor 这些没有自带 Gmail 的软件里用的人。

## 接上

最简单的是直接在 AI 软件里说：

- “帮我接上学校邮箱”
- “帮我接上考勤”

缺的组件会自动安装，然后在你电脑上打开登录窗口。你只要用 Monash 账号登录（Okta 和 MFA）。密码和验证码只在你自己的浏览器里输入，不会进聊天。

接邮箱时 Google 会提示 **“Google 尚未验证此应用”**，点 **高级**，再点 **继续**。这是个人的小项目，Google 不审核这类应用；邮件从 Google 直接到你电脑，不经过维护者。

用终端也可以：

```bash
uv tool install --reinstall "monash-study-kit[gmail,attendance]"
monash gmail login
monash attendance login
```

接好后重启一下 AI 软件。两样都接上以后，AI 软件每次对话开头读到的工具说明从约 3,377 个 token 变成约 5,132 个。

完整的分步教程（包括改用你自己的 Google Cloud 应用）见[设置教程](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/google-and-attendance-setup.md)。

## 自己会跑的部分

- **邮件**：AI 软件开着的时候每 30 分钟同步一次。第一次下载要几分钟，`monash gmail sync` 会一页一页显示进度。
- **考勤**：按课表读，不是按钟点。工作日早上 8 点一次，每节还没签到的课开始 15 分钟后再一次；晚上、周末和课间都不跑。每次只是几 KB 的一次请求，几秒钟，不开浏览器。门户页面要是哪天变了，会自动改用一个看不见的浏览器页面读。

## 操作都要你确认

起草、发送草稿、改标签和签到，接上以后就能用，每一项都是同样的流程：

1. AI 先准备好，把完整预览给你看：收件人、密送、正文和附件，或者要改的标签，或者是哪节课、哪个签到码。
2. 你确认这一项。AI 不能替你确认。
3. 确认后才执行，而且只执行一次。预览之后草稿被改过，会拒绝发送；中途出错不会自己重试。

签到只有在你说自己实际到课了才会准备，不会给还没开始或已经签过的课提交。不会彻底删除任何邮件。

只想让它读邮件，就用 `monash gmail login --read-only` 接。想关掉某项操作：

```bash
monash config gmail_manage_enabled false
monash config attendance_submit_enabled false
```

## 设置

| 设置 | 默认 | 作用 |
| --- | --- | --- |
| `gmail_sync_minutes` | `30` | AI 软件开着时多久同步一次邮件；`0` 关掉 |
| `attendance_auto_sync` | `true` | 按课表自动读考勤 |
| `attendance_fast_read` | `true` | 不开浏览器读；页面不对会自己退回浏览器 |
| `attendance_keepalive_minutes` | `0` | 用轻量请求让考勤登录保持有效；暂时关着 |

用 `monash config <设置> <值>` 修改，改完重启 AI 软件。

## 在 ChatGPT 或网页版 Claude 里用

用[远程模式](/zh-cn/study-kit/remote/)时，每个配对的软件自己选能用哪些。只读的邮箱和考勤默认勾上，操作默认不勾。1.5.0 之前配对的软件只有 Moodle 和 Ed，重新配对才会多出来。

## 限制

- 考勤只在马来西亚校区的门户上验证过。
- 签到提交还没在真实账号上测过。
- 考勤登录能维持多久还在测，`monash attendance status` 里能看到。过期了就让 AI 重新接一次考勤，或者运行 `monash attendance login`。
- Google 对没审核的应用最多允许 100 个用户。遇到这个上限，就按设置教程改用你自己的 Google Cloud 应用。
