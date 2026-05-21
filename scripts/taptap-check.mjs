#!/usr/bin/env node
import { existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const shouldCheckPrivacyUrl = args.has("--privacy-url");

const checks = [];

function check(name, ok, detail = "") {
  checks.push({ name, ok, detail });
}

function rel(filePath) {
  return path.resolve(root, filePath);
}

function commandExists(command) {
  const result = spawnSync("sh", ["-lc", `command -v ${command}`], { encoding: "utf8" });
  return result.status === 0;
}

function run(command, args) {
  return spawnSync(command, args, { encoding: "utf8" });
}

function imageInfo(path) {
  if (!existsSync(path) || !commandExists("sips")) return null;
  const result = run("sips", ["-g", "pixelWidth", "-g", "pixelHeight", path]);
  if (result.status !== 0) return null;
  const width = Number(result.stdout.match(/pixelWidth:\s+(\d+)/)?.[1]);
  const height = Number(result.stdout.match(/pixelHeight:\s+(\d+)/)?.[1]);
  return Number.isFinite(width) && Number.isFinite(height) ? { width, height } : null;
}

function mediaInfo(path) {
  if (!existsSync(path) || !commandExists("avmediainfo")) return null;
  const result = run("avmediainfo", [path]);
  if (result.status !== 0) return null;
  const text = result.stdout;
  const duration = Number(text.match(/Duration:\s+([\d.]+)\s+seconds/)?.[1]);
  const dimensions = text.match(/Dimensions:\s+(\d+)\s+x\s+(\d+)/);
  const format = text.match(/Format:\s+([^\n]+)/)?.[1]?.trim() || "";
  const trackCount = Number(text.match(/Track count:\s+(\d+)/)?.[1]);
  const hasAudio = /Track \d+: Audio/.test(text);
  return {
    duration,
    width: dimensions ? Number(dimensions[1]) : NaN,
    height: dimensions ? Number(dimensions[2]) : NaN,
    format,
    trackCount,
    hasAudio,
    raw: text,
  };
}

async function textIncludes(path, labels) {
  if (!existsSync(path)) return { ok: false, missing: labels };
  const text = await readFile(path, "utf8");
  const missing = labels.filter((label) => !text.includes(label));
  return { ok: missing.length === 0, missing };
}

const requiredFiles = [
  "tap-game.config.json",
  "store-listing.md",
  "privacy.html",
  "docs/taptap-release-checklist.md",
  "artifacts/store-assets/icon-1024.png",
  "artifacts/store-assets/promo-16x9.png",
  "artifacts/store-assets/screenshots/01-opening.png",
  "artifacts/store-assets/screenshots/02-core-gameplay.png",
  "artifacts/store-assets/screenshots/03-result.png",
  "artifacts/store-assets/video/gameplay.mp4",
  "artifacts/store-assets/video/gameplay-cover.png",
];

for (const file of requiredFiles) {
  check(`exists: ${file}`, existsSync(rel(file)));
}

const icon = imageInfo(rel("artifacts/store-assets/icon-1024.png"));
check("icon is 1024 x 1024", icon?.width === 1024 && icon?.height === 1024, icon ? `${icon.width}x${icon.height}` : "missing or unreadable");

const promo = imageInfo(rel("artifacts/store-assets/promo-16x9.png"));
const promoRatioOk = promo ? Math.abs(promo.width / promo.height - 16 / 9) < 0.02 : false;
check("promo image is 16:9", promoRatioOk, promo ? `${promo.width}x${promo.height}` : "missing or unreadable");

for (const name of ["01-opening", "02-core-gameplay", "03-result"]) {
  const info = imageInfo(rel(`artifacts/store-assets/screenshots/${name}.png`));
  check(`screenshot readable: ${name}.png`, Boolean(info), info ? `${info.width}x${info.height}` : "missing or unreadable");
}

const videoPath = rel("artifacts/store-assets/video/gameplay.mp4");
const video = mediaInfo(videoPath);
check("video readable by avmediainfo", Boolean(video), video ? `${video.width}x${video.height}, ${video.duration}s, ${video.format}` : "missing or unreadable");
check("video duration >= 15s", video?.duration >= 15, video ? `${video.duration}s` : "");
check("video short side >= 540px", Math.min(video?.width || 0, video?.height || 0) >= 540, video ? `${video.width}x${video.height}` : "");
check("video codec is H.264 or HEVC", /H\.264|avc1|HEVC|H\.265|hvc1/i.test(video?.format || ""), video?.format || "");
check("video has no audio track", video ? !video.hasAudio : false, video ? `tracks=${video.trackCount}` : "");
if (existsSync(videoPath)) {
  const size = statSync(videoPath).size;
  check("video file < 5GB", size < 5 * 1024 * 1024 * 1024, `${(size / 1024 / 1024).toFixed(1)}MB`);
}

const listing = await textIncludes(rel("store-listing.md"), ["游戏名称", "一句话简介", "核心玩法", "AI 内容说明", "隐私说明短文案", "年龄分级说明"]);
check("store-listing has required sections", listing.ok, listing.missing.length ? `missing: ${listing.missing.join(", ")}` : "");

const privacy = await textIncludes(rel("privacy.html"), ["隐私政策", "运营主体", "在线 AI 合成服务", "TapTap"]);
check("privacy.html has required content", privacy.ok, privacy.missing.length ? `missing: ${privacy.missing.join(", ")}` : "");

if (shouldCheckPrivacyUrl) {
  const url = process.env.PRIVACY_URL;
  if (!url) {
    check("PRIVACY_URL is set", false, "set PRIVACY_URL=https://...");
  } else {
    const result = run("curl", ["-L", "-s", "-o", "/tmp/taptap-privacy-check.html", "-w", "%{http_code}", url]);
    check("privacy URL returns 200", result.stdout.trim() === "200", `${url} -> ${result.stdout.trim() || "no status"}`);
  }
}

let failed = 0;
for (const item of checks) {
  const mark = item.ok ? "OK " : "ERR";
  if (!item.ok) failed += 1;
  console.log(`${mark} ${item.name}${item.detail ? ` (${item.detail})` : ""}`);
}

if (failed) {
  console.error(`\n${failed} TapTap release check(s) failed.`);
  process.exit(1);
}

console.log("\nAll TapTap release checks passed.");
