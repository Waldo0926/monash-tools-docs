#!/bin/sh
# Monash Study Kit installer for macOS and Linux.
#
#   curl -LsSf https://docs.secureview.tech/study-kit/install.sh | sh
#   curl -LsSf https://docs.secureview.tech/study-kit/install.sh | sh -s -- --no-setup
#
# 1. installs uv (https://docs.astral.sh/uv/) if it is missing
# 2. installs the monash command with uv, from PyPI or else from GitHub
# 3. adds uv's tool folder to PATH for new terminals
# 4. starts `monash setup`, unless --no-setup is given or there is no terminal to ask in
#
# It never asks for a password and never touches anything outside uv's own folders.
set -eu

PACKAGE="monash-study-kit"
FALLBACK="https://github.com/Waldo0926/monash-study-kit/archive/refs/heads/main.zip"
SETUP=1
for arg in "$@"; do
  case "$arg" in
    --no-setup) SETUP=0 ;;
    *) echo "Unknown option: $arg" >&2; exit 1 ;;
  esac
done
[ "${MONASH_NO_SETUP:-}" = "1" ] && SETUP=0

say() { printf '\033[1m==>\033[0m %s\n' "$*"; }

find_uv() {
  for c in "$(command -v uv 2>/dev/null || true)" "${XDG_BIN_HOME:-}/uv" "$HOME/.local/bin/uv" "$HOME/.cargo/bin/uv"; do
    if [ -n "$c" ] && [ -x "$c" ]; then echo "$c"; return 0; fi
  done
  return 1
}

if UV=$(find_uv); then
  say "Found uv: $UV"
else
  say "Installing uv (a Python tool manager, brings its own Python)"
  curl -LsSf https://astral.sh/uv/install.sh | env UV_NO_MODIFY_PATH=1 sh
  UV=$(find_uv) || { echo "uv did not install. See https://docs.astral.sh/uv/getting-started/installation/" >&2; exit 1; }
fi

say "Installing $PACKAGE"
if ! "$UV" tool install --reinstall --refresh "$PACKAGE"; then
  say "Not on PyPI yet, installing the latest version from GitHub"
  "$UV" tool install --reinstall --refresh "$FALLBACK"
fi

# New terminals find monash; this one uses the full path below.
"$UV" tool update-shell >/dev/null 2>&1 || true
BIN="$("$UV" tool dir --bin)/monash"
"$BIN" --version

if [ "$SETUP" = "1" ] && (exec </dev/tty) 2>/dev/null; then
  say "Starting setup: Ed token, Moodle login, units, Claude"
  "$BIN" setup </dev/tty
else
  say "Installed. Next, in a terminal of your own, run:"
  echo
  echo "    monash setup"
  echo
  echo "If 'monash' is not found, open a new terminal window first."
fi
