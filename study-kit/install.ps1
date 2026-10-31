# Monash Study Kit installer for Windows.
#
#   powershell -ExecutionPolicy ByPass -c "irm https://docs.secureview.tech/study-kit/install.ps1 | iex"
#
# 1. installs uv (https://docs.astral.sh/uv/) if it is missing
# 2. installs the monash command with uv, from PyPI or else from GitHub
# 3. adds uv's tool folder to PATH for new windows
# 4. starts `monash setup`, unless $env:MONASH_NO_SETUP is "1"
#
# It never asks for a password and never touches anything outside uv's own folders.

$ErrorActionPreference = 'Stop'
$Package = 'monash-study-kit'
$Fallback = 'https://github.com/Waldo0926/monash-study-kit/archive/refs/heads/main.zip'

function Say($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }

function Find-Uv {
  $cmd = Get-Command uv -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  foreach ($p in @("$env:USERPROFILE\.local\bin\uv.exe", "$env:USERPROFILE\.cargo\bin\uv.exe")) {
    if (Test-Path $p) { return $p }
  }
  return $null
}

$uv = Find-Uv
if ($uv) {
  Say "Found uv: $uv"
} else {
  Say 'Installing uv (a Python tool manager, brings its own Python)'
  # In a child process, so the uv installer cannot end this window.
  powershell -NoProfile -ExecutionPolicy ByPass -Command "irm https://astral.sh/uv/install.ps1 | iex"
  $uv = Find-Uv
  if (-not $uv) { throw 'uv did not install. See https://docs.astral.sh/uv/getting-started/installation/' }
}

Say "Installing $Package"
& $uv tool install --reinstall --refresh $Package
if ($LASTEXITCODE -ne 0) {
  Say 'Not on PyPI yet, installing the latest version from GitHub'
  & $uv tool install --reinstall --refresh $Fallback
  if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host 'Install failed. If it says a file is in use, fully quit Claude Desktop (tray icon, right-click, Quit) and run this again.' -ForegroundColor Yellow
    return
  }
}

try { & $uv tool update-shell *> $null } catch {}
$bin = Join-Path (& $uv tool dir --bin) 'monash.exe'
& $bin --version

if ($env:MONASH_NO_SETUP -eq '1') {
  Say 'Installed. Next, in a PowerShell window of your own, run:'
  Write-Host ''
  Write-Host '    monash setup'
  Write-Host ''
} else {
  Say 'Starting setup: Ed token, Moodle login, units, Claude'
  & $bin setup
}
