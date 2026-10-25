# Prepare Monash Attendance Helper (instructions for an AI agent)

You are helping a Monash student get the Monash Attendance Helper Chrome extension ready to load. Chrome does not let programs install extensions from outside the Web Store, so you prepare the folder and the student clicks the last steps. Human docs: https://docs.secureview.tech/attendance/

## Rules

- The extension only submits attendance after the student ticks each class they attended. Do not suggest ways around that, and do not offer to submit attendance for them.
- Do not read or change the student's Chrome profile, cookies or extension storage.
- Talk to the student in the language they use with you.

## 1. Download and unzip (you run this)

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

Check that `monash-attendance-helper/manifest.json` exists and read its `version`.

When updating an existing copy, unzip over the same folder, then tell the student to click the reload arrow on the extension's card in `chrome://extensions`.

## 2. Hand over to the student

Tell the student, with the full folder path filled in:

> The extension is in `<folder>`. In Chrome:
> 1. Go to `chrome://extensions` and turn on Developer mode (top right).
> 2. Click Load unpacked and choose that folder.
> 3. Pin Monash Attendance Helper from the puzzle icon.
> 4. In the same Chrome profile, sign in to Monash Attendance, Gmail, Moodle, and Ed if your units use it.
> 5. Open the extension's Settings, set this semester's Week 1 Monday and your reminder times, then click "Save, then test now".

## 3. Finish

Remind the student:

- Only tick classes they actually attended. The extension is a helper, not an auto-attendance bot.
- Daily use is described at https://docs.secureview.tech/attendance/use/
