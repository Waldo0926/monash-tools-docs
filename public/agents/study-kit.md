# Set up Monash Study Kit (instructions for an AI agent)

You are helping a Monash student install Monash Study Kit on their own computer. Study Kit is a local MCP server and CLI (`monash`) that reads the student's Moodle and Ed, read-only. Source: https://github.com/Waldo0926/monash-study-kit (MIT). Human docs: https://docs.secureview.tech/study-kit/

Follow these steps in order. Run commands yourself where it says so. Stop and hand over to the student where it says so.

## Rules

- **Never ask for, accept or store the student's Ed token, Monash password or MFA code.** If the student pastes an Ed token into the chat, do not use it. Tell them to delete that token at https://edstem.org/au/settings/api-tokens and create a new one during setup in their own terminal.
- Do not edit files under the Study Kit data folder (`~/Library/Application Support/monash-study-kit` on macOS, `%LOCALAPPDATA%\monash-study-kit` on Windows) and never print anything from its `secrets` folder.
- Do not run `monash setup` yourself. It is interactive and needs the student.
- Talk to the student in the language they use with you.

## 1. Check the system

Work out the OS. Supported: macOS, Windows, Linux. On Linux, Claude Desktop does not exist; Claude Code or another MCP client is needed.

Check for a Chromium browser, which the Moodle login window needs: Chrome, Edge or Brave. Windows always has Edge. If none is found on macOS or Linux, tell the student to install Chrome before step 4.

## 2. Install (you run this)

macOS or Linux:

```sh
curl -LsSf https://docs.secureview.tech/study-kit/install.sh | sh -s -- --no-setup
```

Windows (PowerShell):

```powershell
$env:MONASH_NO_SETUP = "1"; powershell -ExecutionPolicy ByPass -c "irm https://docs.secureview.tech/study-kit/install.ps1 | iex"
```

The script installs uv if needed, then `monash-study-kit` from PyPI, falling back to the GitHub main branch. It prints the version at the end.

If the script cannot be fetched, do the same by hand: install uv from https://docs.astral.sh/uv/getting-started/installation/, then `uv tool install monash-study-kit` (or, if that package is not found, `uv tool install https://github.com/Waldo0926/monash-study-kit/archive/refs/heads/main.zip`).

## 3. Verify the install (you run this)

```sh
monash --version
```

If `monash` is not on PATH in your shell, use the full path: `"$(uv tool dir --bin)/monash" --version` (on Windows, `monash.exe` in that folder). Expect `monash-study-kit` followed by a version number.

## 4. Hand over to the student for setup

Tell the student, in these words or close to them:

> Study Kit is installed. Now open a new terminal window (Terminal on macOS, PowerShell on Windows) and run `monash setup`. It will:
> 1. open Ed's token page: click Create Token, copy it, and paste it into that terminal (nothing shows while you paste),
> 2. open a separate browser window: log in to Monash with Okta and MFA, and the window closes by itself,
> 3. ask which units to track,
> 4. connect to Claude Desktop and Claude Code. On Windows, fully quit Claude Desktop from the tray first when it asks.
>
> Do not paste your token here. Tell me when it says setup is done.

Then wait.

## 5. Check it works (you run this)

When the student says setup is done:

```sh
monash doctor
monash todo
```

`monash doctor` prints a check per item with a fix for anything that failed. Its output contains no tokens or cookies, so it is safe to read. Summarise what passed, and walk the student through any fix it suggests.

`monash todo` prints this week's deadlines, possibly missed work, unfinished Ed lessons and announcements. Show the student a short summary so they see it working.

## 6. Finish

Tell the student:

- In Claude Desktop, the **+** button in the chat box, then **Connectors**, should list **monash**. Restart Claude Desktop if it does not.
- They can now ask things like "What's due this week?", "Anything new on Ed?" or "Which slide covers recursion?".
- `monash login` signs in to Moodle again when the session expires; `monash update` updates.

## If the student uses another MCP client

`monash setup` only configures Claude Desktop and Claude Code. After setup is done, run `monash connect <client>` with `codex`, `cursor`, `vscode`, `windsurf` or `gemini` (Study Kit 1.2.0 or later; run `monash update` first if the command is missing). It adds only the monash entry and backs up the file. If it prints an entry instead (the config file has comments), add that entry by hand without overwriting other servers. Details: https://docs.secureview.tech/study-kit/other-clients/

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `monash: command not found` | Open a new terminal, or run `uv tool update-shell` and open a new terminal |
| Windows install says a file is in use | Fully quit Claude Desktop from the tray, then run the install again |
| Login window does not open | Install Chrome or Edge, or `monash config browser "<path to chrome>"` |
| monash missing in Claude | `monash setup claude` (on Windows, quit Claude from the tray first) |
| Anything else | `monash doctor`, then https://docs.secureview.tech/study-kit/troubleshooting/ |
