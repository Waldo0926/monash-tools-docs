#!/bin/sh
# Pull the built site from the public gh-pages branch. No GitHub credentials needed.
# Cron (every 10 minutes): */10 * * * * /opt/monash-tools-docs/sync.sh
set -eu
DIR=/opt/monash-tools-docs/site
REPO=https://github.com/Waldo0926/monash-tools-docs.git

if [ ! -d "$DIR/.git" ]; then
  git clone --depth 1 --branch gh-pages "$REPO" "$DIR"
  exit 0
fi
git -C "$DIR" fetch --depth 1 --quiet origin gh-pages
git -C "$DIR" reset --hard --quiet FETCH_HEAD
