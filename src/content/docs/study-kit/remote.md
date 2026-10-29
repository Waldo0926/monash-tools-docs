---
title: Host it yourself (advanced)
description: Optional remote mode from Study Kit 1.4.0. Run Study Kit on your own server so ChatGPT or Claude on the web and phone can reach your Moodle and Ed data.
---

Most people do not need this page. `monash mcp` on your own computer is enough for Claude Desktop, Claude Code, Codex, Cursor and the others.

Remote mode is for one person who wants the AI on the web or phone to reach **their own** data. It is not a shared service: you run it on a server you control, with your own domain and HTTPS. One server and one data folder serve one student. Never host it for friends with your account.

Needs Study Kit 1.4.0 or later.

## What you need

- A Linux server or always-on computer where Study Kit is installed and set up (`monash setup`) under its own user account
- A domain name with HTTPS, and a reverse proxy such as nginx or Caddy in front of Study Kit
- An AI app that can add a remote MCP server with OAuth, such as Claude custom connectors or ChatGPT connectors

## 1. Set up Study Kit on the server

Log in to Moodle and paste the Ed token in that server's own terminal, the same way as on a laptop. Never paste the Ed token or a Moodle cookie into a chat. If you need a separate data folder, set `MONASH_KIT_HOME` and use the same value for every command below.

## 2. Start the server

```bash
monash remote serve --public-url https://study.example.org --port 8765
```

Replace the address with your own domain. You can set `MONASH_KIT_REMOTE_URL` instead of `--public-url`. The server only listens on `127.0.0.1`. It does not touch DNS, certificates, nginx or system services, so keep it running with whatever you normally use (tmux, systemd and so on).

While it runs it also syncs every hour and keeps the Moodle login alive, like Claude Desktop does. Add `--no-background` if something else already does that.

## 3. Point your reverse proxy at it

Forward only the MCP and sign-in paths to the local port. An nginx example to adapt inside an existing HTTPS site:

```nginx
location ~ ^/(mcp|oauth/(register|authorize|token)|\.well-known/oauth-(protected-resource|authorization-server)(/mcp)?)$ {
    client_max_body_size 1m;
    proxy_pass http://127.0.0.1:8765;
    proxy_set_header Host $host;
    proxy_set_header Authorization $http_authorization;
    proxy_set_header X-Forwarded-Proto https;
}
```

Add your usual rate limits and timeouts. Do not forward `monash library` or the data folder through the proxy.

## 4. Connect your AI app

In the app, add a remote MCP server with the address `https://study.example.org/mcp`. The app opens a sign-in page that asks for a pairing code. In another terminal on the server, under the same account:

```bash
monash remote pair
```

Type the code it prints into that page. A code works once, expires after 10 minutes and locks after five wrong tries. Each app you connect needs its own code.

Claude and ChatGPT callbacks are allowed by default. For another app, add its exact callback address with `--redirect-uri` (repeat it for more than one). Use the address that app tells you, not a guess.

## 5. See and remove connected apps

```bash
monash remote clients
monash remote revoke --client CLIENT_ID
monash remote revoke --all
```

After `revoke` the app has to pair again.

## What remote mode can and cannot do

- It offers 16 read-only query tools and the same panels and prompts as the local server.
- Logging in to Moodle and starting a sync are left out. Do those on the server itself.
- There is no way to set credentials, submit assignments, attempt quizzes, post on Ed or download files over the internet.
- Sign-in uses OAuth with PKCE. Access tokens last one hour. Refresh tokens last 30 days and change every time they are used. Only hashes are stored, in `secrets/remote-mcp.db`.
- Changing the domain means every app has to pair again.
- On Windows, also restrict who can read the data folder.

## How it was checked

The test suite runs the whole flow with made-up data on one machine: discovery, a 401 without a token, registration, pairing, PKCE, token expiry and rotation, revocation and refusal of the login and sync tools. On 30 October 2026 the 1.4.0 package from PyPI also passed the same flow end to end in a clean environment, using the Claude and ChatGPT callback addresses.

That check did not use a real domain or a real ChatGPT or Claude account. After you deploy, check it yourself: the discovery URLs load over HTTPS, `/mcp` without a token returns 401, the app connects, a simple question such as "what units am I taking" works, and a second question still works after the app refreshes its token.

The full technical notes are in the [project repository](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/panels-library-remote.md).
