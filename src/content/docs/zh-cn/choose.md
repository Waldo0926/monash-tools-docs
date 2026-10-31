---
title: 我该用哪个工具？
description: 按你想做的事、要不要安装、数据去哪儿，对比这几个工具。
---

先看你想解决什么问题。查学校公开信息用Monash Hub；查自己的Moodle和Ed用Study Kit。

| 我想 | 用 | 安装 | 能在哪用 |
| --- | --- | --- | --- |
| 在 AI 软件（Claude、Codex、Cursor 等）里问这周要交什么、Ed 上有什么新消息、某个知识点在哪页 | [Study Kit](/zh-cn/study-kit/) | 一条命令 | macOS、Windows、Linux |
| 查课程的考核、先修、开课学期，规划学位，算 WAM | [Monash Hub](/zh-cn/monash-hub/) | 不用装，是网站，可以加到主屏幕 | 任何浏览器，手机电脑都行 |
| 快速过一遍 Ed 论坛，把整门课的课件打包下载 | [Ed Web](/zh-cn/ed-web/) | 不用装 | 电脑浏览器 |
| 找老师发在 Gmail、Ed、Moodle 里的签到码 | [签到助手](/zh-cn/attendance/)，或者用 [Study Kit](/zh-cn/study-kit/mail-attendance/) 在 AI 里问 | Chrome 扩展，从应用商店添加；或者 Study Kit 可选的考勤部分 | 电脑上的 Chrome，或者你的 AI 软件 |
| 在 AI 软件里问学校邮箱 | [Study Kit](/zh-cn/study-kit/mail-attendance/)（1.5.0 起可选） | 在 AI 里说“帮我接上学校邮箱” | macOS、Windows、Linux |
| 用中文提问，拿到官网链接 | [公众号问答](/zh-cn/wechat-bot/) | 不用装 | 微信 |

## 它们有什么不同

**Study Kit 和 Ed Web 都能看 Ed。** Study Kit 把 Moodle 和 Ed 同步一份到你电脑上，让你的 AI 软件去搜，可以用大白话追问。Ed Web 是浏览器里的一个页面，什么都不用装，每个帖子给一句按规则提取的概括。平时用 Claude 的选 Study Kit，只想更快地看 Ed 的选 Ed Web。

**Monash Hub 讲的是学校，不是你自己的课。** 它回答“这门课怎么样”“我的学位要修什么”，来源是 Handbook 和官网。Study Kit 回答“我这周要做什么”，来源是你自己的 Moodle 和 Ed。

**Study Kit 1.5 也能找签到码**，在 AI 软件里问就行，用的是和签到助手同一套解析逻辑。你平时用哪个就用哪个。

**没有你的确认，什么都不会提交或发出。** 签到助手要你逐节勾选上过的课、再勾选声明之后才提交。Study Kit 不会改 Moodle 和 Ed 上的任何东西；可选的邮箱和考勤操作会先给完整预览，你确认了这一项才执行。

## 你的数据去哪儿

| 工具 | 用什么登录 | 存在哪 | 会访问谁 |
| --- | --- | --- | --- |
| Study Kit | Ed API令牌、Moodle会话cookie；接上的话还有Google授权令牌和考勤门户登录状态 | 默认存储在你自己的设备 | Moodle和Ed；可选Gmail、Monash Attendance；查询结果还会交给你使用的AI客户端 |
| Monash Hub | 不用登录，除非你要在社区发帖 | 规划和成绩只存在你的浏览器里 | monashhub.secureview.tech |
| Ed Web | 你的 Ed 令牌 | 只在那个标签页里，关掉就清除 | 直接访问 edstem.org |
| 签到助手 | Chrome 里已经登录的账号 | Chrome 本地的扩展存储 | Monash Attendance、Moodle、Ed、Gmail |
| 公众号问答 | 不用登录 | 答不上的问题会转给公众号作者 | 微信和 Monash Hub |

> 隐私提示：Study Kit不会把你的登录凭据交给AI，但你提问时返回的课程、邮件或考勤内容会被所选AI服务处理。远程MCP由使用者自行托管，具体权限取决于配对时的授权。详情见[隐私与安全](/zh-cn/study-kit/privacy/)。
