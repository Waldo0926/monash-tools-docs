---
title: 自己托管（进阶）
description: Study Kit 1.4.0 起的可选远程模式。把 Study Kit 跑在你自己的服务器上，让网页版和手机上的 ChatGPT 或 Claude 也能查你的 Moodle 和 Ed。
---

大多数人用不到这一页。在自己电脑上跑 `monash mcp`，Claude Desktop、Claude Code、Codex、Cursor 这些都够用了。

远程模式是给一个人用的：想让网页版或手机上的 AI 查**你自己**的数据。它不是共享服务，要跑在你自己能管的服务器上，用你自己的域名和 HTTPS。一台服务器、一个数据目录只服务一个学生。不要用自己的账号给朋友托管。

要 Study Kit 1.4.0 以上。

## 需要准备

- 一台装好 Study Kit 并完成 `monash setup` 的 Linux 服务器或常开的电脑，最好单独用一个系统账户
- 一个配好 HTTPS 的域名，前面有 nginx 或 Caddy 之类的反向代理
- 能添加带 OAuth 的远程 MCP 服务器的 AI 软件，比如 Claude 的自定义连接器或 ChatGPT 的连接器

## 1. 在服务器上设置好 Study Kit

在服务器自己的终端里登录 Moodle、粘贴 Ed 令牌，和在笔记本上一样。不要把 Ed 令牌或 Moodle cookie 贴进任何聊天。需要单独的数据目录的话设 `MONASH_KIT_HOME`，下面每条命令都用同一个值。

## 2. 启动服务器

```bash
monash remote serve --public-url https://study.example.org --port 8765
```

把地址换成你自己的域名。也可以用 `MONASH_KIT_REMOTE_URL` 代替 `--public-url`。它只监听 `127.0.0.1`，不会动 DNS、证书、nginx 或系统服务，想让它一直跑的话用你平时的办法（tmux、systemd 等）。

运行期间它也会每小时同步一次、给 Moodle 登录续期，和 Claude Desktop 一样。已经有别的程序在做这些的话加 `--no-background`。

## 3. 配置反向代理

只把 MCP 和登录相关的路径转发到本机端口。下面是 nginx 的例子，放进已有的 HTTPS 站点里，按需修改：

```nginx
location ~ ^/(mcp|oauth/(register|authorize|token)|\.well-known/oauth-(protected-resource|authorization-server)(/mcp)?)$ {
    client_max_body_size 1m;
    proxy_pass http://127.0.0.1:8765;
    proxy_set_header Host $host;
    proxy_set_header Authorization $http_authorization;
    proxy_set_header X-Forwarded-Proto https;
}
```

记得加上你平时用的限流和超时设置。不要通过代理转发 `monash library` 或数据目录。

## 4. 接进 AI 软件

在软件里添加远程 MCP 服务器，地址填 `https://study.example.org/mcp`。软件会打开一个要你输入配对码的登录页。在服务器上用同一个账户开另一个终端：

```bash
monash remote pair
```

把打印出来的配对码填进那个页面。一个码只能用一次，10 分钟后失效，输错五次就锁住。每个要接的软件都要单独配对一次。

默认允许 Claude 和 ChatGPT 的回调地址。别的软件要用 `--redirect-uri` 加上它准确的回调地址，多个就写多次。用软件自己给出的地址，不要自己猜。

## 5. 查看和移除已连接的软件

```bash
monash remote clients
monash remote revoke --client CLIENT_ID
monash remote revoke --all
```

撤销之后，那个软件要重新配对。

## 远程模式能做什么、不能做什么

- 提供 16 个只读查询工具，面板和预设提示和本地版一样。
- 登录 Moodle 和手动同步不在里面，这些要在服务器上自己做。
- 不能通过网络设置凭据、交作业、做测验、在 Ed 发帖或下载文件。
- 登录用的是带 PKCE 的 OAuth。访问令牌有效 1 小时，刷新令牌有效 30 天，每用一次就换新的。只存哈希，放在 `secrets/remote-mcp.db`。
- 换了域名的话，所有软件都要重新配对。
- Windows 上还要自己限制谁能读数据目录。

## 怎么测过的

项目的自动测试用编造的数据在一台机器上走完整个流程：服务发现、没有令牌返回 401、注册、配对、PKCE、令牌过期和轮换、撤销，以及拒绝登录和同步工具。2026 年 10 月 30 日，PyPI 上的 1.4.0 包也在干净环境里用 Claude 和 ChatGPT 的回调地址把同样的流程完整跑通了一遍。

那次测试没有用真实域名，也没有用真实的 ChatGPT 或 Claude 账号。部署好之后请自己检查一遍：服务发现地址能通过 HTTPS 打开，不带令牌访问 `/mcp` 返回 401，软件能连上，问一句简单的“我这学期上哪些课”能回答，软件刷新令牌之后再问一句还能回答。

完整的技术说明见[项目仓库](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/panels-library-remote.md)（英文）。
