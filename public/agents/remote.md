# Set up Study Kit remote mode for ChatGPT chat or Claude on the web and phone (instructions for an AI agent)

You are helping a Monash student reach their own Study Kit from **ChatGPT chat** (web, desktop app and phone) or **Claude on the web or phone**. Those apps connect from their own cloud, so Study Kit needs an HTTPS address on the internet. This is `monash remote serve`, available from Study Kit 1.4.0. Human docs: https://docs.secureview.tech/study-kit/remote/ and https://docs.secureview.tech/study-kit/chatgpt/

Follow the steps in order. Run commands yourself where it says so. Stop and hand over where it says so.

## Rules

- It is for **one person and their own data**. Never set it up to serve a friend, a group or another account.
- **Never ask for, accept or store the student's Ed token, Monash password, MFA code or cookies.** If they paste one into the chat, do not use it and tell them to replace it.
- Do not change DNS, certificates, firewall rules, nginx sites or system services without asking first and showing the exact change.
- Never expose port 8765 directly. Only the HTTPS tunnel or the reverse proxy may reach it, and only the paths listed below.
- Do not forward `monash library` or the data folder.
- Do not add the app inside ChatGPT or Claude for the student. They do that in their own account.
- Talk to the student in the language they use with you.

## 1. Check what they want

Ask, in one message:

- Which app: ChatGPT chat, or Claude on the web or phone? (For Codex in the ChatGPT desktop app, Claude Desktop, Claude Code, Cursor and similar, they don't need remote mode. Use https://docs.secureview.tech/agents/study-kit.md instead and stop here.)
- For ChatGPT: do they have a paid plan with developer mode? If they don't know, ask them to look for developer mode in ChatGPT's settings. Without it, ChatGPT chat can't add the app.
- Do they have their own server and domain with HTTPS? If not, use the Cloudflare quick tunnel. Tell them plainly: the tunnel stops when their computer sleeps or shuts down, and its address changes every time it restarts, so they have to add the app again.

## 2. Check Study Kit (you run this)

```bash
monash --version
monash status
```

The version must be 1.4.0 or later. If `monash` is missing, follow https://docs.secureview.tech/agents/study-kit.md first. If it is older, run `monash update`. If `monash status` shows Moodle not logged in or no Ed token, the student runs `monash setup` (or `monash login`) in their own terminal. Do not run setup for them.

Do the rest on the computer or server that will keep running Study Kit.

## 3a. Cloudflare quick tunnel (no account, no domain)

Install `cloudflared` if `cloudflared --version` fails:

```bash
brew install cloudflared                       # macOS
winget install --id Cloudflare.cloudflared     # Windows
```

Start the tunnel as a long-running background process and read the `https://….trycloudflare.com` address from its output:

```bash
cloudflared tunnel --url http://127.0.0.1:8765
```

Start Study Kit as a second long-running background process with that exact address:

```bash
monash remote serve --public-url https://THE-ADDRESS.trycloudflare.com
```

Both must keep running. If either stops, the app stops working.

## 3b. Their own server and domain

Start it under whatever they already use to keep services running (tmux, systemd and so on):

```bash
monash remote serve --public-url https://their.domain --port 8765
```

It only listens on `127.0.0.1`. Show them this nginx block to add inside their existing HTTPS site, and only apply it after they agree:

```nginx
location ~ ^/(mcp|oauth/(register|authorize|token)|\.well-known/oauth-(protected-resource|authorization-server)(/mcp)?)$ {
    client_max_body_size 1m;
    proxy_pass http://127.0.0.1:8765;
    proxy_set_header Host $host;
    proxy_set_header Authorization $http_authorization;
    proxy_set_header X-Forwarded-Proto https;
}
```

If they use Caddy or something else, forward the same paths and nothing more.

## 4. Check it works (you run this)

```bash
curl -s https://THE-ADDRESS/.well-known/oauth-protected-resource
curl -s -o /dev/null -w "%{http_code}\n" https://THE-ADDRESS/mcp
```

The first must return JSON. The second must print `401`. If not, fix the tunnel or proxy before going on.

## 5. Hand over: add the app

Tell the student the address to use: `https://THE-ADDRESS/mcp`.

- **ChatGPT:** Settings, turn on developer mode, create a new app with that address and OAuth as the sign-in method. Menu names change sometimes, so follow what their ChatGPT shows. Once added, it works in chat on the web, in the desktop app and on the phone.
- **Claude:** Settings, Connectors, Add custom connector, same address. Once added it works on the web, in the desktop app and on the phone.

The app then opens a page asking for a pairing code. Run this and show the code to the student only:

```bash
monash remote pair
```

The code works once, expires after 10 minutes and locks after five wrong tries. Each app needs its own code. On that page, mail and attendance (if connected on this computer) can be ticked or unticked for this app; let the student choose.

Then ask them to try "What units am I taking?" and "What do I need to do this week?" in that app.

## 6. Tell them how to stop it

```bash
monash remote clients                      # see connected apps
monash remote revoke --client CLIENT_ID    # remove one app
monash remote revoke --all                 # remove all apps
```

With the quick tunnel: when they are done, stop both processes and run `monash remote revoke --all`. Next time they need a new tunnel address, a restarted `monash remote serve` with it, and to add the app again.
