---
title: Update and uninstall
description: Keep Study Kit current with one command, or remove it completely.
---

## Update

```bash
monash update
```

Restart Claude Desktop afterwards. On Windows it tells you to quit Claude first and which command to run, because a running program cannot be overwritten.

When a new version is out you will hear about it: an extra line after terminal commands, and a short mention when you ask Claude for your to-dos. It checks GitHub at most once a day and sends no personal information. Turn it off with `monash config update_check false`.

What changed in each version is in the [changelog](https://github.com/Waldo0926/monash-study-kit/blob/main/CHANGELOG.md).

## Uninstall

```bash
monash uninstall
uv tool uninstall monash-study-kit
```

`monash uninstall` removes it from Claude and asks whether to delete all data. Then delete the token on Ed's [API token page](https://edstem.org/au/settings/api-tokens).
