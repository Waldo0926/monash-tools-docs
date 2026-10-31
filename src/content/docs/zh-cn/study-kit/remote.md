---
title: 自己托管（进阶）
description: Study Kit 1.4.0 起的可选远程模式。给 Study Kit 一个 HTTPS 地址，让 ChatGPT 或网页版、手机上的 Claude 也能查你的 Moodle 和 Ed。可以用自己的服务器和域名，也可以用 Cloudflare 免费的临时隧道先试试。
---

大多数人用不到这一页。在自己电脑上跑 `monash mcp`，Claude Desktop、Claude Code、Codex、Cursor 这些都够用了。

这一页是给想在 **ChatGPT**，或者**网页版、手机上的 Claude** 里用 Study Kit 的人看的。这些软件是从它们自己的云端去连 MCP 服务器的，不是从你电脑上连，所以 Study Kit 要有一个它们能访问到的 HTTPS 地址。

一个人跑一份，只查**自己**的数据。不要用自己的账号给朋友托管，每个人自己跑自己的。

要 Study Kit 1.4.0 以上，先运行 `monash update`。

## 两种拿到 HTTPS 地址的办法

| | 自己的服务器和域名 | Cloudflare 临时隧道 |
| --- | --- | --- |
| 需要什么 | 一台服务器或常开的电脑、配好 HTTPS 的域名、nginx 或 Caddy | 只要你自己的电脑。不用注册账号，也不用买域名 |
| 地址 | 固定的，比如 `https://study.example.org` | 随机的，比如 `https://some-words.trycloudflare.com` |
| 什么时候能用 | 服务器开着就行 | 电脑开着、两个终端都没关 |
| 适合 | 日常用 | 先试试 |

作者自己用的是 ChatGPT Plus 加自己的域名和服务器。临时隧道是为了让大家不花钱也能试一下；用的时候遇到问题，欢迎[提 issue](https://github.com/Waldo0926/monash-study-kit/issues)。

不管用哪种，都要先在跑 Study Kit 的那台电脑上装好并完成 `monash setup`。登录 Moodle、粘贴 Ed 令牌都在那台电脑自己的终端里做。不要把 Ed 令牌或 Moodle cookie 贴进任何聊天。

## 办法一：Cloudflare 临时隧道

1. 装 `cloudflared`：

   ```bash
   brew install cloudflared                       # macOS
   winget install --id Cloudflare.cloudflared     # Windows
   ```

2. 在终端 1 开隧道，记下它打印出来的 `https://….trycloudflare.com` 地址：

   ```bash
   cloudflared tunnel --url http://127.0.0.1:8765
   ```

3. 在终端 2 用这个地址启动 Study Kit：

   ```bash
   monash remote serve --public-url https://some-words.trycloudflare.com
   ```

4. 按下面的[接进 AI 软件](#接进-ai-软件)，地址填 `https://some-words.trycloudflare.com/mcp`。

每次重启 `cloudflared` 地址都会变。变了就用新地址重启 `monash remote serve`，再在 AI 软件里把连接器删掉重新加。用完在两个终端按 Ctrl-C，再运行 `monash remote revoke --all`。

隧道开着的时候，知道地址的人都能打开登录页，但没有你终端里的配对码什么也做不了。

## 办法二：自己的服务器和域名

1. 在服务器上启动 Study Kit：

   ```bash
   monash remote serve --public-url https://study.example.org --port 8765
   ```

   也可以用 `MONASH_KIT_REMOTE_URL` 代替 `--public-url`。它只监听 `127.0.0.1`，不会动 DNS、证书、nginx 或系统服务，想让它一直跑的话用你平时的办法（tmux、systemd 等）。如果用 `MONASH_KIT_HOME` 换了数据目录，每条 `monash remote` 命令都要用同一个值。

2. 只把 MCP 和登录相关的路径转发到这个端口。下面是 nginx 的例子，放进已有的 HTTPS 站点里，按需修改：

   ```nginx
   location ~ ^/(mcp|oauth/(register|authorize|token)|\.well-known/oauth-(protected-resource|authorization-server)(/mcp)?)$ {
       client_max_body_size 1m;
       proxy_pass http://127.0.0.1:8765;
       proxy_set_header Host $host;
       proxy_set_header Authorization $http_authorization;
       proxy_set_header X-Forwarded-Proto https;
   }
   ```

   记得加上你平时用的限流和超时设置。不要转发 `monash library` 或数据目录。

3. 按下面的[接进 AI 软件](#接进-ai-软件)，地址填 `https://study.example.org/mcp`。

`monash remote serve` 运行期间也会每小时同步一次、给 Moodle 登录续期，和 Claude Desktop 一样。已经有别的程序在做这些的话加 `--no-background`。

## 接进 AI 软件

**ChatGPT**：在设置里打开开发者模式（Developer mode），新建一个连接器（app），地址填你那个以 `/mcp` 结尾的地址，登录方式选 OAuth。菜单名字时不时会变，以你的 ChatGPT 界面为准。作者的 ChatGPT Plus 可以用。哪些套餐有开发者模式由 OpenAI 决定，先看看你的账号里有没有。

**Claude**：在设置的 Connectors 里点 **Add custom connector**，填同一个地址。加好之后网页版、电脑客户端和手机上都能用。免费版可以加一个自定义连接器。

接着软件会打开一个要你输入配对码的页面。在跑 Study Kit 的那台电脑上再开一个终端：

```bash
monash remote pair
```

把打印出来的码填进去。一个码只能用一次，10 分钟后失效，输错五次就锁住。每个要接的软件都要单独配对一次。

然后问一句“我这学期上哪些课？”和“这周我有什么要做的？”试试。

默认允许 Claude 和 ChatGPT 的回调地址。别的软件要用 `--redirect-uri` 加上它准确的回调地址，多个就写多次。用软件自己给出的地址，不要自己猜。

## 查看和移除已连接的软件

```bash
monash remote clients
monash remote revoke --client CLIENT_ID
monash remote revoke --all
```

撤销之后，那个软件要重新配对。

## 远程模式能做什么、不能做什么

- 提供 16 个只读查询工具，面板和预设提示和本地版一样。
- 1.5.0 起，学校邮箱和考勤可以按软件单独给。配对时登录页会列出这台电脑上已经开了的部分：只读的邮箱和考勤默认勾上，操作（起草、改标签、签到）默认不勾。不想给这个软件的就取消勾选。之前配对的软件只有 Moodle 和 Ed，重新配对才会多出来；`monash remote clients` 能看到每个软件拿到了什么。
- 登录 Moodle 和手动同步不在里面，这些要在那台电脑上自己做。
- 不能通过网络设置凭据、交作业、做测验、在 Ed 发帖或下载文件。
- 登录用的是带 PKCE 的 OAuth。访问令牌有效 1 小时，刷新令牌有效 30 天，每用一次就换新的。只存哈希，放在 `secrets/remote-mcp.db`。
- 换了地址的话，所有软件都要重新配对。
- Windows 上还要自己限制谁能读数据目录。

## 怎么测过的

项目的自动测试用编造的数据在一台机器上走完整个流程：服务发现、没有令牌返回 401、注册、配对、PKCE、令牌过期和轮换、撤销，以及拒绝登录和同步工具。2026 年 10 月 30 日，PyPI 上的 1.4.0 包也在干净环境里用 Claude 和 ChatGPT 的回调地址把同样的流程完整跑通了一遍。

部署在自己服务器上的话，请自己检查一遍：服务发现地址能通过 HTTPS 打开，不带令牌访问 `/mcp` 返回 401，软件能连上，问一句简单的问题能回答，软件刷新令牌之后再问一句还能回答。

完整的技术说明见[项目仓库](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/panels-library-remote.md)（英文）。
