---
title: Which tool do I need?
description: Compare the tools by what you want to do, what you need to install and where your data goes.
---

Start from what you want to do. Most people want Study Kit or Monash Hub.

| I want to | Use | Install | Works on |
| --- | --- | --- | --- |
| Ask Claude what is due, what is new on Ed, which slide covers a topic | [Study Kit](/study-kit/) | One command | macOS, Windows. Linux with Claude Code |
| Check a unit's assessments, requisites and offerings, plan a degree, work out WAM | [Monash Hub](/monash-hub/) | None. A website you can add to your home screen | Any browser, phone or computer |
| Skim an Ed forum quickly and download a unit's lesson files as one zip | [Ed Web](/ed-web/) | None | A desktop browser |
| Find attendance codes posted in Gmail, Ed or Moodle | [Attendance Helper](/attendance/) | A Chrome extension you load by hand | Chrome on a computer |
| Ask a question in Chinese and get the official link | [WeChat Q&A bot](/wechat-bot/) | None | WeChat |

## How they differ

**Study Kit and Ed Web both read Ed.** Study Kit keeps a synced copy of Moodle and Ed on your computer and lets Claude search it, so you can ask follow-up questions in plain language. Ed Web runs in one browser tab with nothing to install, and gives a quick rule-based summary of each post. If you already use Claude, take Study Kit. If you just want a faster way to read Ed, take Ed Web.

**Monash Hub is about the university, not your own units.** It answers "what is this unit like" and "what does my degree need" from the Handbook and official pages. Study Kit answers "what do I have to do this week" from your own Moodle and Ed.

**Only the attendance helper ever submits anything**, and only after you tick each class you attended and confirm a declaration.

## Where your data goes

| Tool | What it signs in with | Where that is kept | Who it talks to |
| --- | --- | --- | --- |
| Study Kit | Ed API token, Moodle session cookie | A folder on your computer readable only by your user | Moodle and Ed |
| Monash Hub | Nothing, unless you sign in to post in the community | Plans and marks stay in your browser | monashhub.secureview.tech |
| Ed Web | Your Ed token | That browser tab only, cleared when you close it | edstem.org directly |
| Attendance Helper | Your existing signed-in Chrome sessions | Chrome's local extension storage | Monash Attendance, Moodle, Ed, Gmail |
| WeChat bot | Nothing | Questions it cannot answer are passed to the account owner | WeChat and Monash Hub |
