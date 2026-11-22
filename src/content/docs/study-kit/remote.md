---
title: Remote mode (ChatGPT chat, phone)
description: "Give Study Kit an HTTPS address so ChatGPT chat and Claude on the web and phone can use it. Three ways: a free quick tunnel, a Cloudflare tunnel with a fixed address, or your own server."
---

Most people do not need this page. `monash mcp` on your own computer is enough for Claude Desktop, Claude Code, Codex, Cursor and the others.

This page is for when you want **ChatGPT**, or **Claude on the web or phone**, to use Study Kit. Those apps connect to MCP servers from their own cloud, not from your computer, so Study Kit needs an HTTPS address they can reach.

It is for one person and **their own** data. Never host it for friends with your account; each person runs their own.

Needs Study Kit 1.4.0 or later. Run `monash update` first.

## Set it up with AI

If you use an AI that can run commands on your computer (Claude Code, Codex and similar), send it this and it will walk you through the rest:

```text wrap
Set up Study Kit remote mode for me. The steps are here: https://docs.secureview.tech/agents/remote.md
```

It asks which app you want first, then sets up the tunnel or your server and checks it. You add the app in ChatGPT or Claude and type the pairing code yourself.

## Three ways to get an HTTPS address

<div class="compare-table">

| | A: quick tunnel | B: tunnel with a fixed address | C: your own server |
| --- | --- | --- | --- |
| What you need | Just your computer<br />No account, no domain | A computer that stays on<br />A free Cloudflare account<br />A domain of your own, managed by Cloudflare | A server (a VPS, say)<br />A domain with HTTPS, nginx or Caddy |
| Address | Random, e.g. `https://some-words.trycloudflare.com` | Fixed, e.g. `https://study.example.org` | Fixed |
| Works when | Your computer is on, awake, and both terminals are open | That computer is on and awake | The server is on |
| After a restart | New address, so remove and re-add the app and pair again | Same address, nothing to redo | Same address |
| Cost | Free | A domain, paid yearly | Server and domain |
| Good for | Trying it, or using it next to your computer | Daily use on your phone with a computer at home that stays on | Always available, whatever your laptop is doing |

</div>

How to pick:

- Just want to see it work? **Option A** takes about ten minutes.
- Want it on your phone every day and have a computer that never turns off (an old laptop or a mini PC at home)? **Option B**.
- Already have a server, or want the most reliable setup? **Option C**.

Not sure? Ask your AI to set it up. It asks about your situation first and suggests one.

The author uses ChatGPT Plus with their own domain and server. If something goes wrong, [open an issue](https://github.com/Waldo0926/monash-study-kit/issues) or [message me](/contact/).

Either way, first install Study Kit and finish `monash setup` on the computer that will run it. Log in to Moodle and paste the Ed token in that computer's own terminal. Never paste the Ed token or a Moodle cookie into a chat.

## Option A: Cloudflare quick tunnel

1. Install `cloudflared`:

   ```bash
   brew install cloudflared                       # macOS
   winget install --id Cloudflare.cloudflared     # Windows
   ```

2. In terminal 1, start the tunnel and copy the `https://….trycloudflare.com` address it prints:

   ```bash
   cloudflared tunnel --url http://127.0.0.1:8765
   ```

3. In terminal 2, start Study Kit with that address:

   ```bash
   monash remote serve --public-url https://some-words.trycloudflare.com
   ```

4. [Connect your AI app](#connect-your-ai-app) with `https://some-words.trycloudflare.com/mcp`.

Every time you restart `cloudflared` the address changes. Then restart `monash remote serve` with the new address, and remove and re-add the connector in your AI app. When you are done, press Ctrl-C in both terminals and run `monash remote revoke --all`.

While the tunnel is open, anyone with the address can reach the sign-in page, but nothing works without a pairing code from your terminal.

## Option B: Cloudflare tunnel with a fixed address

You need a domain of your own that is already added to Cloudflare, with its nameservers changed to Cloudflare's. Replace `study.example.org` with your own subdomain. `monash` is just the tunnel's name.

1. Install `cloudflared` (as in option A), then log in. A browser opens so you can pick your domain:

   ```bash
   cloudflared tunnel login
   ```

2. Create the tunnel and point your subdomain at it:

   ```bash
   cloudflared tunnel create monash
   cloudflared tunnel route dns monash study.example.org
   ```

   The first command prints the tunnel's UUID and the path of a credentials file (`.json`). Note both.

3. Create `config.yml` in `~/.cloudflared/` (`%USERPROFILE%\.cloudflared\` on Windows):

   ```yaml
   tunnel: YOUR-TUNNEL-UUID
   credentials-file: /Users/you/.cloudflared/YOUR-TUNNEL-UUID.json   # on Windows: C:/Users/you/.cloudflared/YOUR-TUNNEL-UUID.json
   ingress:
     - hostname: study.example.org
       service: http://127.0.0.1:8765
     - service: http_status:404
   ```

   Port 8765 only runs remote mode and Study Kit returns 404 for any other path, so sending the whole subdomain there is fine.

4. In two terminals, run the tunnel and Study Kit:

   ```bash
   cloudflared tunnel run monash
   monash remote serve --public-url https://study.example.org
   ```

5. [Connect your AI app](#connect-your-ai-app) with `https://study.example.org/mcp`.

The address stays the same. After a restart, run those two commands again and leave ChatGPT as it is. Turn off automatic sleep on that computer: on macOS in System Settings, Battery (Energy on a desktop Mac); on Windows in Settings, System, Power, set sleep to Never. To start it automatically, `cloudflared` can run as a system service; your AI can set that up and will ask before changing system settings.

## Option C: your own server and domain

1. Start Study Kit on the server:

   ```bash
   monash remote serve --public-url https://study.example.org --port 8765
   ```

   You can set `MONASH_KIT_REMOTE_URL` instead of `--public-url`. It only listens on `127.0.0.1` and does not touch DNS, certificates, nginx or system services, so keep it running with whatever you normally use (tmux, systemd and so on). If you use a separate data folder with `MONASH_KIT_HOME`, use the same value for every `monash remote` command.

2. Forward only the MCP and sign-in paths to that port. An nginx example to adapt inside an existing HTTPS site:

   ```nginx
   location ~ ^/(mcp|oauth/(register|authorize|token)|\.well-known/oauth-(protected-resource|authorization-server)(/mcp)?)$ {
       client_max_body_size 1m;
       proxy_pass http://127.0.0.1:8765;
       proxy_set_header Host $host;
       proxy_set_header Authorization $http_authorization;
       proxy_set_header X-Forwarded-Proto https;
   }
   ```

   Add your usual rate limits and timeouts. Do not forward `monash library` or the data folder.

3. [Connect your AI app](#connect-your-ai-app) with `https://study.example.org/mcp`.

While `monash remote serve` runs it also syncs every hour and keeps the Moodle login alive, like Claude Desktop does. Add `--no-background` if something else already does that.

## Connect your AI app

**ChatGPT**: in Settings, turn on developer mode, then create a new connector (app) with your address ending in `/mcp` and OAuth as the sign-in method. The menu names change from time to time; follow what your ChatGPT shows. The author's ChatGPT Plus account works. Which plans get developer mode is up to OpenAI, so check whether your account has it.

**Claude**: in Settings, Connectors, choose **Add custom connector** and enter the same address. Once added it works on the web, in the desktop app and on the phone. The free plan allows one custom connector.

The app then opens a page asking for a pairing code. On the computer running Study Kit, open another terminal and run:

```bash
monash remote pair
```

Type the code into that page. A code works once, expires after 10 minutes and locks after five wrong tries. Each app you connect needs its own code.

Then try "What units am I taking?" and "What do I need to do this week?".

Claude and ChatGPT callbacks are allowed by default. For another app, add its exact callback address with `--redirect-uri` (repeat it for more than one). Use the address that app tells you, not a guess.

## See and remove connected apps

```bash
monash remote clients
monash remote revoke --client CLIENT_ID
monash remote revoke --all
```

After `revoke` the app has to pair again.

## What remote mode can and cannot do

- It offers 16 read-only Moodle and Ed query tools and the same panels and prompts as the local server.
- From 1.5.0, school mail and attendance can be added per app. When you pair an app, the sign-in page lists the parts turned on on this computer: read-only mail and attendance start ticked, actions (drafting, labels, check-in) start unticked. Untick anything that app should not have. Apps paired earlier keep Moodle and Ed only until you pair them again, and `monash remote clients` shows what each app has. If you later turn a part off on this computer, paired apps lose it too.
- Logging in to Moodle and starting a sync are left out. Do those on the computer itself.
- There is no way to set credentials, submit assignments, attempt quizzes, post on Ed or download files over the internet.
- Sign-in uses OAuth with PKCE. Access tokens last one hour. Refresh tokens last 30 days and change every time they are used. Only hashes are stored, in `secrets/remote-mcp.db`.
- Changing the address means every app has to pair again.
- On Windows, also restrict who can read the data folder.

## How it was checked

The test suite runs the whole flow with made-up data on one machine: discovery, a 401 without a token, registration, pairing, PKCE, token expiry and rotation, revocation and refusal of the login and sync tools. On 30 October 2026 the 1.4.0 package from PyPI also passed the same flow end to end in a clean environment, using the Claude and ChatGPT callback addresses.

If you deploy it on your own server, check it once: the discovery URLs load over HTTPS, `/mcp` without a token returns 401, the app connects, a simple question works, and a second question still works after the app refreshes its token.

The full technical notes are in the [project repository](https://github.com/Waldo0926/monash-study-kit/blob/main/docs/panels-library-remote.md).
