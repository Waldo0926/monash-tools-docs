# Prepare Monash Attendance Helper (instructions for an AI agent)

You are helping a Monash student set up the Monash Attendance Helper Chrome extension. It is on the Chrome Web Store, and only the student can click **Add to Chrome**, so most of your job is handing over the right link and steps. Human docs: https://docs.secureview.tech/attendance/

## Rules

- The extension only submits attendance after the student ticks each class they attended. Do not suggest ways around that, and do not offer to submit attendance for them.
- Do not read or change the student's Chrome profile, cookies or extension storage.
- Talk to the student in the language they use with you.

## 1. Hand over the store install (default)

Tell the student:

> 1. Open https://chromewebstore.google.com/detail/monash-attendance-helper/mnbkcmgkjmfngcifndchaidndhdfafcd in Chrome on your computer and click **Add to Chrome**.
> 2. Pin Monash Attendance Helper from the puzzle icon.
> 3. In the same Chrome profile, sign in to Monash Attendance, Gmail, Moodle, and Ed if your units use it.
> 4. Open the extension's Settings, set this semester's Week 1 Monday and your reminder times, then click "Save, then test now".

Chrome updates store extensions by itself, so there is nothing to update later.

## 2. Only if the store install is not possible: prepare the zip

Use this when the student's Chrome is managed and blocks the store, or they need a fix that has not reached the store yet. Make sure the store copy is removed first, otherwise reminders appear twice.

Pick a folder the student will keep, such as `~/Documents/monash-attendance-helper` (macOS or Linux) or `%USERPROFILE%\Documents\monash-attendance-helper` (Windows). Chrome loads the extension from this folder, so it must not be a temporary folder.

macOS or Linux:

```sh
mkdir -p ~/Documents
cd ~/Documents
curl -LsSfO https://docs.secureview.tech/downloads/monash-attendance-helper.zip
unzip -o monash-attendance-helper.zip
rm monash-attendance-helper.zip
```

Windows (PowerShell):

```powershell
$dir = "$env:USERPROFILE\Documents"
Invoke-WebRequest https://docs.secureview.tech/downloads/monash-attendance-helper.zip -OutFile "$dir\mah.zip"
Expand-Archive "$dir\mah.zip" -DestinationPath $dir -Force
Remove-Item "$dir\mah.zip"
```

Check that `monash-attendance-helper/manifest.json` exists and read its `version`. Then tell the student, with the full folder path filled in:

> The extension is in `<folder>`. In Chrome, go to `chrome://extensions`, turn on Developer mode (top right), click Load unpacked and choose that folder. Then do steps 2 to 4 above.

When updating an existing zip copy, unzip over the same folder, then tell the student to click the reload arrow on the extension's card in `chrome://extensions`.

## 3. Finish

Remind the student:

- Only tick classes they actually attended. The extension is a helper, not an auto-attendance bot.
- Daily use is described at https://docs.secureview.tech/attendance/use/
