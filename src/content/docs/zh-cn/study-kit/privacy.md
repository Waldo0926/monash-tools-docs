---
title: 隐私和安全
description: Study Kit 把数据存在哪、存了哪些凭据、AI 软件能看到什么，以及怎么彻底删除。
---

## 数据存在哪

| 系统 | 文件夹 |
| --- | --- |
| macOS | `~/Library/Application Support/monash-study-kit` |
| Windows | `%LOCALAPPDATA%\monash-study-kit` |

里面有课件（`files`）、数据库（`data`）、登录凭据（`secrets`，只有你自己的账户能读）和登录窗口的配置（`browser-profile`）。运行 `monash open` 可以打开课件文件夹。

## 存了哪些凭据

- Moodle 的会话 cookie
- Ed 的 API 令牌
- Moodle 日历订阅链接

都只在你电脑上，只发给 Moodle 或 Ed 本身。**不要把 `secrets` 文件夹发给任何人。**

用了可选的[远程模式](/zh-cn/study-kit/remote/)的话，`secrets/remote-mcp.db` 里还会记下配对过的软件。只存令牌的哈希，不存令牌本身。

## 学校邮箱和考勤

只有[接上](/zh-cn/study-kit/mail-attendance/)以后才有。接上后 `secrets` 里还会有 Google 的授权令牌和考勤门户的登录状态，`data` 里有邮件和考勤记录的副本。不存任何密码。

安装包里自带一个 Google 应用，这样你不用自己建 Google Cloud 项目也能登录。它只是告诉 Google 是哪个应用在请求授权，邮件从 Google 直接到你电脑，不经过维护者。随时可以在 [myaccount.google.com/permissions](https://myaccount.google.com/permissions) 收回授权。完整的[隐私政策](https://github.com/Waldo0926/monash-study-kit/blob/main/PRIVACY.md)里写了 Google 用户数据的规定。

起草、发送草稿、改标签和签到，每一项都要你确认才执行。不会彻底删除任何邮件。只想让它读邮件，就用 `monash gmail login --read-only` 接，Google 只给读的权限。

## AI 能看到什么

只有你提问时工具返回的内容：截止日期列表、某个帖子的正文、某份课件的文字，接上邮箱的话还有你问到的邮件。令牌和 cookie 永远不会发给 AI。也不要把 Ed 令牌贴进聊天，只在终端里输入。

用[远程模式](/zh-cn/study-kit/remote/)时，配对的软件只有在你配对时勾选了，才拿得到邮件或考勤的结果。

## 课件浏览页

`monash library` 只监听 `127.0.0.1`，别的设备连不上。它只提供 `monash sync` 登记过的文件，课件文件夹以外的路径一律拒绝，也不会提供 `secrets` 文件夹或登录窗口的配置。页面没有密码，不要把它转发到公网。

## 对 Moodle 和 Ed 做什么

只读。请求之间有间隔，不会像爬虫一样猛打学校系统。

## 检查更新

每天最多问一次 GitHub 有没有新版本，不带任何个人信息。不想要的话：`monash config update_check false`。

## 彻底删除

```bash
monash uninstall
uv tool uninstall monash-study-kit
```

`monash uninstall` 会把它从 Claude 和其他 AI 软件里移除，并问你要不要删掉所有数据。最后到 Ed 的 [API 令牌页面](https://edstem.org/au/settings/api-tokens)删掉令牌。

## 怎么验证的

项目的[安全说明](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/security.md)写了保护了什么、怎么测试。要私下报告问题，见 [SECURITY.md](https://github.com/Waldo0926/monash-study-kit/blob/main/SECURITY.md)。
