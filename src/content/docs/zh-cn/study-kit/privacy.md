---
title: 隐私和安全
description: Study Kit 把数据存在哪、存了哪些凭据、Claude 能看到什么，以及怎么彻底删除。
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

## Claude 能看到什么

只有你提问时工具返回的内容：截止日期列表、某个帖子的正文、某份课件的文字。令牌和 cookie 永远不会发给 Claude。也不要把 Ed 令牌贴进聊天，只在终端里输入。

## 对 Moodle 和 Ed 做什么

只读。请求之间有间隔，不会像爬虫一样猛打学校系统。

## 检查更新

每天最多问一次 GitHub 有没有新版本，不带任何个人信息。不想要的话：`monash config update_check false`。

## 彻底删除

```bash
monash uninstall
uv tool uninstall monash-study-kit
```

`monash uninstall` 会把它从 Claude 里移除，并问你要不要删掉所有数据。最后到 Ed 的 [API 令牌页面](https://edstem.org/au/settings/api-tokens)删掉令牌。

## 怎么验证的

项目的[安全说明](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/security.md)写了保护了什么、怎么测试。要私下报告问题，见 [SECURITY.md](https://github.com/Waldo0926/monash-study-kit/blob/main/SECURITY.md)。
