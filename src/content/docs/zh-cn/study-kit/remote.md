---
title: 远程模式（ChatGPT 聊天、手机）
description: 给 Study Kit 一个 HTTPS 地址，在 ChatGPT 聊天、网页版和手机上的 Claude 里也能用。三种办法：免费临时隧道、固定地址的 Cloudflare 隧道、自己的服务器
---

大多数人用不到这一页

在自己电脑上跑 `monash mcp`，Claude Desktop、Claude Code、Codex、Cursor 这些都够用了

这一页是给想在 **ChatGPT**，或者**网页版、手机上的 Claude** 里用 Study Kit 的人看的

这些软件是从它们自己的云端去连 MCP 服务器的，不是从你电脑上连，所以 Study Kit 要有一个它们能访问到的 HTTPS 地址

一个人跑一份，只查**自己**的数据，不要用自己的账号给朋友托管，每个人自己跑自己的

要 Study Kit 1.4.0 以上，先运行 `monash update`

## 让 AI 帮你搭

如果你用的 AI 能在电脑上跑命令（Claude Code、Codex 等），把这句发给它，剩下的它会带你做：

```text wrap
阅读 https://docs.secureview.tech/agents/remote.md ，帮我搭好 Study Kit 的远程模式。
```

它会先问你想在哪个 App 里用，再帮你弄好隧道或者服务器并检查一遍。在 ChatGPT 或 Claude 里加应用、输入配对码这两步要你自己来

## 三种拿到 HTTPS 地址的办法

<div class="compare-table">

| | 一：临时隧道 | 二：固定地址的隧道 | 三：自己的服务器 |
| --- | --- | --- | --- |
| 需要什么 | 只要你自己的电脑<br />不用注册，不用买域名 | 一台一直开着的电脑<br />免费的 Cloudflare 账号<br />一个自己的域名，交给 Cloudflare 管 | 一台服务器（比如 VPS）<br />配好 HTTPS 的域名、nginx 或 Caddy |
| 地址 | 随机的，比如 `https://some-words.trycloudflare.com` | 固定的，比如 `https://study.example.org` | 固定的 |
| 什么时候能用 | 电脑开着、没睡眠、两个终端都没关 | 那台电脑开着、没睡眠 | 服务器开着就行 |
| 重启以后 | 地址会变，要在 ChatGPT 里删掉重加、重新配对 | 地址不变，不用重加 | 地址不变 |
| 花费 | 免费 | 域名一年要交一点钱 | 服务器和域名的钱 |
| 适合 | 先试试，或者只在电脑旁边用 | 家里有台不关机的电脑，想手机上天天用 | 想随时都能用，不想管自己电脑开没开 |

</div>

怎么选：

- 只是想看看效果，用**办法一**，十分钟就能弄好
- 想在手机上天天用，又有一台不关机的电脑（比如家里的旧笔记本或者小主机），用**办法二**
- 已经有服务器，或者想要最稳的，用**办法三**

不确定的话，直接让 AI 帮你搭，它会先问你的情况再推荐

作者自己用的是 ChatGPT Plus 加自己的域名和服务器。遇到问题欢迎[提 issue](https://github.com/Waldo0926/monash-study-kit/issues)，或者[直接问我](/zh-cn/contact/)

不管用哪种，都要先在跑 Study Kit 的那台电脑上装好并完成 `monash setup`

登录 Moodle、粘贴 Ed 令牌都在那台电脑自己的终端里做

不要把 Ed 令牌或 Moodle cookie 贴进任何聊天

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

4. 按下面的[接进 AI 软件](#接进-ai-软件)，地址填 `https://some-words.trycloudflare.com/mcp`

每次重启 `cloudflared` 地址都会变

变了就用新地址重启 `monash remote serve`，再在 AI 软件里把连接器删掉重新加

用完在两个终端按 Ctrl-C，再运行 `monash remote revoke --all`

隧道开着的时候，知道地址的人都能打开登录页，但没有你终端里的配对码什么也做不了

## 办法二：固定地址的 Cloudflare 隧道

需要一个自己的域名，并且已经把它加进 Cloudflare、把域名的 nameserver 改成 Cloudflare 的。下面的 `study.example.org` 换成你自己的子域名，`monash` 是隧道的名字，可以随便起

1. 装 `cloudflared`（同办法一），然后登录，会打开浏览器让你选域名：

   ```bash
   cloudflared tunnel login
   ```

2. 建隧道，再把子域名指向它：

   ```bash
   cloudflared tunnel create monash
   cloudflared tunnel route dns monash study.example.org
   ```

   第一条命令会打印隧道的 UUID 和一个凭证文件（`.json`）的路径，记下来

3. 在 `~/.cloudflared/` 里新建 `config.yml`（Windows 是 `%USERPROFILE%\.cloudflared\`）：

   ```yaml
   tunnel: 你的隧道UUID
   credentials-file: /Users/你/.cloudflared/你的隧道UUID.json
   ingress:
     - hostname: study.example.org
       service: http://127.0.0.1:8765
     - service: http_status:404
   ```

   8765 端口只跑远程模式，别的路径 Study Kit 都会返回 404，所以整个子域名转过去就行

4. 开两个终端，一个跑隧道，一个跑 Study Kit：

   ```bash
   cloudflared tunnel run monash
   monash remote serve --public-url https://study.example.org
   ```

5. 按下面的[接进 AI 软件](#接进-ai-软件)，地址填 `https://study.example.org/mcp`

地址固定，重启电脑以后把这两条命令再跑一遍就行，ChatGPT 里不用重加。记得把电脑的自动睡眠关掉。想开机自动启动的话，`cloudflared` 可以装成系统服务，可以让 AI 帮你弄（它改系统设置前会先问你）

## 办法三：自己的服务器和域名

1. 在服务器上启动 Study Kit：

   ```bash
   monash remote serve --public-url https://study.example.org --port 8765
   ```

   也可以用 `MONASH_KIT_REMOTE_URL` 代替 `--public-url`  
   它只监听 `127.0.0.1`，不会动 DNS、证书、nginx 或系统服务，想让它一直跑的话用你平时的办法（tmux、systemd 等）  
   如果用 `MONASH_KIT_HOME` 换了数据目录，每条 `monash remote` 命令都要用同一个值

2. 只把 MCP 和登录相关的路径转发到这个端口  
   下面是 nginx 的例子，放进已有的 HTTPS 站点里，按需修改：

   ```nginx
   location ~ ^/(mcp|oauth/(register|authorize|token)|\.well-known/oauth-(protected-resource|authorization-server)(/mcp)?)$ {
       client_max_body_size 1m;
       proxy_pass http://127.0.0.1:8765;
       proxy_set_header Host $host;
       proxy_set_header Authorization $http_authorization;
       proxy_set_header X-Forwarded-Proto https;
   }
   ```

   记得加上你平时用的限流和超时设置  
   不要转发 `monash library` 或数据目录

3. 按下面的[接进 AI 软件](#接进-ai-软件)，地址填 `https://study.example.org/mcp`

`monash remote serve` 运行期间也会每小时同步一次、给 Moodle 登录续期，和 Claude Desktop 一样

已经有别的程序在做这些的话加 `--no-background`

## 接进 AI 软件

**ChatGPT**：在设置里打开开发者模式（Developer mode），新建一个连接器（app），地址填你那个以 `/mcp` 结尾的地址，登录方式选 OAuth

菜单名字时不时会变，以你的 ChatGPT 界面为准

作者的 ChatGPT Plus 可以用

哪些套餐有开发者模式由 OpenAI 决定，先看看你的账号里有没有

**Claude**：在设置的 Connectors 里点 **Add custom connector**，填同一个地址

加好之后网页版、电脑客户端和手机上都能用

免费版可以加一个自定义连接器

接着软件会打开一个要你输入配对码的页面

在跑 Study Kit 的那台电脑上再开一个终端：

```bash
monash remote pair
```

把打印出来的码填进去

一个码只能用一次，10 分钟后失效，输错五次就锁住

每个要接的软件都要单独配对一次

然后问一句“我这学期上哪些课？”和“这周我有什么要做的？”试试

默认允许 Claude 和 ChatGPT 的回调地址

别的软件要用 `--redirect-uri` 加上它准确的回调地址，多个就写多次

用软件自己给出的地址，不要自己猜

## 查看和移除已连接的软件

```bash
monash remote clients
monash remote revoke --client CLIENT_ID
monash remote revoke --all
```

撤销之后，那个软件要重新配对

## 远程模式能做什么、不能做什么

- 提供 16 个 Moodle 和 Ed 的只读查询工具，面板和预设提示和本地版一样
- 1.5.0 起，学校邮箱和考勤可以按软件单独给  
  配对时登录页会列出这台电脑上已经开了的部分：只读的邮箱和考勤默认勾上，操作（起草、改标签、签到）默认不勾  
  不想给这个软件的就取消勾选  
  之前配对的软件只有 Moodle 和 Ed，重新配对才会多出来；`monash remote clients` 能看到每个软件拿到了什么  
  以后在这台电脑上关掉某一项，配对过的软件也会跟着失去它
- 登录 Moodle 和手动同步不在里面，这些要在那台电脑上自己做
- 不能通过网络设置凭据、交作业、做测验、在 Ed 发帖或下载文件
- 登录用的是带 PKCE 的 OAuth  
  访问令牌有效 1 小时，刷新令牌有效 30 天，每用一次就换新的  
  只存哈希，放在 `secrets/remote-mcp.db`
- 换了地址的话，所有软件都要重新配对
- Windows 上还要自己限制谁能读数据目录

## 怎么测过的

项目的自动测试用编造的数据在一台机器上走完整个流程：服务发现、没有令牌返回 401、注册、配对、PKCE、令牌过期和轮换、撤销，以及拒绝登录和同步工具

2026 年 10 月 30 日，PyPI 上的 1.4.0 包也在干净环境里用 Claude 和 ChatGPT 的回调地址把同样的流程完整跑通了一遍

部署在自己服务器上的话，请自己检查一遍：服务发现地址能通过 HTTPS 打开，不带令牌访问 `/mcp` 返回 401，软件能连上，问一句简单的问题能回答，软件刷新令牌之后再问一句还能回答

完整的技术说明见[项目仓库](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/panels-library-remote.md)（英文）
