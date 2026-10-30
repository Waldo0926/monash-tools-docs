---
title: 只给自己用的工具
description: ed-digest 和 moodle-sync 是私有的。它们做什么，以及该用哪个公开工具代替。
---

我有两个工具是私有的，因为它们跑在我自己的服务器上，用的是我自己的课程数据。它们不能安装，但有用的部分已经放进公开工具里了。

## ed-digest

每天汇总我的 Ed 论坛：定时同步帖子、存进数据库、生成一个看板，需要时我手动触发一次 AI 整理，挑出重要的。

**代替它：** 在浏览器里看和搜用 [Ed Web](/zh-cn/ed-web/)，在 AI 软件里问 Ed 有什么新的用 [Study Kit](/zh-cn/study-kit/)。

## moodle-sync

Study Kit 的 Moodle 部分的服务器版。它保持我的课件同步，让我在任何设备上的 Claude 里都能查到。

**代替它：** [Study Kit](/zh-cn/study-kit/)。从 1.1.0 版起两者共用同一套代码，一边修好另一边也会好。1.4.0 起 Study Kit 也有了可选的远程模式，你也可以用同样的办法在 ChatGPT 或网页版、手机上的 Claude 里查自己的数据，见[自己托管](/zh-cn/study-kit/remote/)。

## 为什么不做成大家都能用的线上版？

线上版意味着要把每个同学的 Ed 令牌和 Moodle 登录都存在我的服务器上。万一服务器被攻破，所有人的账号都会暴露。Study Kit 跑在你自己的电脑上，登录信息不会离开它。
