#!/usr/bin/env bash
set -euo pipefail

TOOL_ROOT="${HOME}/.codex/android-build-tools"
export JAVA_HOME="${TOOL_ROOT}/jdk21/Contents/Home"
export ANDROID_HOME="${TOOL_ROOT}/android-sdk"
export ANDROID_SDK_ROOT="${ANDROID_HOME}"
export PATH="${JAVA_HOME}/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/cmdline-tools/latest/bin:${PATH}"

if [ ! -x "${JAVA_HOME}/bin/java" ]; then
  echo "Missing portable JDK 21 at ${JAVA_HOME}" >&2
  exit 1
fi

if [ ! -x "${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager" ]; then
  echo "Missing Android command line tools at ${ANDROID_HOME}" >&2
  exit 1
fi
