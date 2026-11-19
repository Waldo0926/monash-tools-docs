---
title: Which tool do I need?
description: Compare the tools by your device, what you want to do, what you need to install and where your data goes.
---

Most people want Study Kit (your own Moodle and Ed) or Monash Hub (public info about units and degrees).

## By device

<div class="devices">
<div class="device-row"><a class="device-tool" href="/study-kit/">Study Kit</a><p class="device-note">Installs on a computer. On a phone, ask through the ChatGPT or Claude app</p><ul class="device-chips"><li class="ok"><span aria-hidden="true">✓</span>Windows</li><li class="ok"><span aria-hidden="true">✓</span>Mac</li><li class="ok"><span aria-hidden="true">✓</span>Linux</li><li class="mid"><span aria-hidden="true">◐</span>iPhone / iPad · remote mode</li><li class="mid"><span aria-hidden="true">◐</span>Android · remote mode</li></ul></div>
<div class="device-row"><a class="device-tool" href="/monash-hub/">Monash Hub</a><p class="device-note">Any browser. On a phone you can add it to the home screen</p><ul class="device-chips"><li class="ok"><span aria-hidden="true">✓</span>Windows</li><li class="ok"><span aria-hidden="true">✓</span>Mac</li><li class="ok"><span aria-hidden="true">✓</span>Linux</li><li class="ok"><span aria-hidden="true">✓</span>iPhone / iPad</li><li class="ok"><span aria-hidden="true">✓</span>Android</li></ul></div>
<div class="device-row"><a class="device-tool" href="/ed-web/">Ed Web</a><p class="device-note">Made for a computer screen</p><ul class="device-chips"><li class="ok"><span aria-hidden="true">✓</span>Windows</li><li class="ok"><span aria-hidden="true">✓</span>Mac</li><li class="ok"><span aria-hidden="true">✓</span>Linux</li><li class="no"><span aria-hidden="true">✕</span>iPhone / iPad (not supported)</li><li class="no"><span aria-hidden="true">✕</span>Android (not supported)</li></ul></div>
<div class="device-row"><a class="device-tool" href="/attendance/">Attendance Helper</a><p class="device-note">A Chrome extension for computers. Chrome on phones can't install extensions</p><ul class="device-chips"><li class="ok"><span aria-hidden="true">✓</span>Windows</li><li class="ok"><span aria-hidden="true">✓</span>Mac</li><li class="ok"><span aria-hidden="true">✓</span>Linux</li><li class="no"><span aria-hidden="true">✕</span>iPhone / iPad (not supported)</li><li class="no"><span aria-hidden="true">✕</span>Android (not supported)</li></ul></div>
<div class="device-row"><a class="device-tool" href="/wechat-bot/">WeChat Q&A bot</a><p class="device-note">Works wherever you have WeChat</p><ul class="device-chips"><li class="ok"><span aria-hidden="true">✓</span>Windows</li><li class="ok"><span aria-hidden="true">✓</span>Mac</li><li class="ok"><span aria-hidden="true">✓</span>Linux</li><li class="ok"><span aria-hidden="true">✓</span>iPhone / iPad</li><li class="ok"><span aria-hidden="true">✓</span>Android</li></ul></div>
</div>

<p class="device-legend"><span class="ok">✓ works</span><span class="mid">◐ needs <a href="/study-kit/remote/">remote mode</a> running on a computer or server</span><span class="no">✕ not supported</span></p>

## By what you want to do

| I want to | Use | Install | Works on |
| --- | --- | --- | --- |
| Ask your AI app (Claude, ChatGPT, Codex, Cursor and others) what is due, what is new on Ed, which slide covers a topic | [Study Kit](/study-kit/) | One command | macOS, Windows, Linux |
| Check a unit's assessments, requisites and offerings, plan a degree, work out WAM | [Monash Hub](/monash-hub/) | None. A website you can add to your home screen | Any browser, phone or computer |
| Find an elective with no exam or no prerequisite | [Monash Hub electives page](/monash-hub/) | None | Any browser |
| Go through the marker's feedback on an assignment you submitted | [Study Kit](/study-kit/ask-claude/#grades-and-messages) | One command | macOS, Windows, Linux |
| Skim an Ed forum quickly | [Ed Web](/ed-web/) | None | A desktop browser |
| Download a unit's Ed lesson files as one zip | [Ed Web](/ed-web/) if you'd rather install nothing; [`monash ed export`](/study-kit/cli/#download-a-units-ed-materials-as-one-zip) if you already use Study Kit | None for Ed Web; one command for Study Kit | A desktop browser; macOS, Windows, Linux |
| Find attendance codes posted in Gmail, Ed or Moodle | [Attendance Helper](/attendance/), or ask your AI app with [Study Kit](/study-kit/mail-attendance/) | A Chrome extension from the Chrome Web Store, or Study Kit's optional attendance part | Chrome on a computer, or your AI app |
| Ask your AI app about your school mail | [Study Kit](/study-kit/mail-attendance/) (optional) | Say "connect my school email" in your AI app | macOS, Windows, Linux |
| Ask a question in Chinese and get the official link | [WeChat Q&A bot](/wechat-bot/) | None | WeChat |

## How they differ

**Study Kit and Ed Web both read Ed.** Study Kit keeps a synced copy of Moodle and Ed on your computer and lets your AI app search it, so you can ask follow-up questions in plain language. Ed Web runs in one browser tab with nothing to install, and gives a quick rule-based summary of each post. If you already use an AI app, take Study Kit. If you just want a faster way to read Ed, take Ed Web. Both can zip a unit's Ed materials into week folders. Ed Web does it in the browser. Study Kit uses the copy already on your computer, also includes files attached inside Ed pages, and can do it when you ask your AI app.

**Monash Hub is about the university, not your own units.** It answers "what is this unit like" and "what does my degree need" from the Handbook and official pages. Study Kit answers "what do I have to do this week" from your own Moodle and Ed.

**Study Kit can also find attendance codes**, from your AI app instead of Chrome, and uses the same parser as the attendance helper. Pick whichever you already use.

**Nothing submits or sends without you.** The attendance helper submits only after you tick each class you attended and confirm a declaration. Study Kit never writes to Moodle or Ed; its optional mail and attendance actions show a full preview and run only after you confirm that exact action.

## Where your data goes

| Tool | What it signs in with | Where that is kept | Who it talks to |
| --- | --- | --- | --- |
| Study Kit | Ed API token, Moodle session cookie; if connected, a Google sign-in token and the attendance portal login | A folder on your computer readable only by your user | Moodle and Ed; if connected, Gmail and Monash Attendance |
| Monash Hub | Nothing, unless you sign in to post in the community | Plans and marks stay in your browser | monashhub.secureview.tech |
| Ed Web | Your Ed token | That browser tab only, cleared when you close it | edstem.org directly |
| Attendance Helper | Your existing signed-in Chrome sessions | Chrome's local extension storage | Monash Attendance, Moodle, Ed, Gmail |
| WeChat bot | Nothing | Questions it cannot answer are passed to the account owner | WeChat and Monash Hub |
