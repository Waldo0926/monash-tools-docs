---
title: Tools I only run for myself
description: ed-digest and moodle-sync are private. What they do, and which public tool to use instead.
---

Two of my tools are private because they run on my own server with my own course data. They are not available to install, but the useful parts are already in the public tools.

## ed-digest

A daily digest of my Ed forums: it syncs posts on a schedule, stores them in a database and builds a dashboard, with an optional AI pass I trigger by hand to sort what matters.

**Use instead:** [Ed Web](/ed-web/) for reading and searching in the browser, or [Study Kit](/study-kit/) to ask Claude what is new on Ed.

## moodle-sync

The server version of Study Kit's Moodle side. It keeps my course files synced and lets me reach them from Claude on any device.

**Use instead:** [Study Kit](/study-kit/). Since version 1.1.0 both share the same code, so fixes in one reach the other.

## Why not host them for everyone?

A hosted version would mean keeping every student's Ed token and Moodle login on my server. If that server were ever broken into, everyone's accounts would be exposed. Study Kit runs on your own computer instead, so your login never leaves it.
