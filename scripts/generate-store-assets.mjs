import { execFile } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "artifacts", "store-assets");
const screenshotSourceDir = path.join(outDir, "screenshots", "source");
const screenshotOutDir = path.join(outDir, "screenshots");

function run(command, args) {
  return new Promise((resolve, reject) => {
    execFile(command, args, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`${command} ${args.join(" ")}\n${stdout}${stderr}`));
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function iconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset="0.52" stop-color="#17162e"/>
      <stop offset="1" stop-color="#2b1737"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7dd3fc" stop-opacity="0.32"/>
      <stop offset="0.55" stop-color="#1b2440"/>
      <stop offset="1" stop-color="#f0abfc" stop-opacity="0.34"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="18" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="1024" height="1024" rx="196" fill="url(#bg)"/>
  <circle cx="512" cy="336" r="156" fill="none" stroke="#f7d488" stroke-width="26" opacity="0.95" filter="url(#glow)"/>
  <path d="M436 312c28-48 124-48 152 0 18 32 9 70-26 92l-50 32-50-32c-35-22-44-60-26-92Z" fill="#7dd3fc" opacity="0.92"/>
  <rect x="232" y="438" width="560" height="316" rx="42" fill="url(#screen)" stroke="#7dd3fc" stroke-width="24" filter="url(#glow)"/>
  <path d="M306 528h284M306 608h392M306 688h238" stroke="#f3f0ff" stroke-width="26" stroke-linecap="round" opacity="0.84"/>
  <path d="M698 538l30 58 58 30-58 30-30 58-30-58-58-30 58-30 30-58Z" fill="#f0abfc"/>
  <path d="M512 778v86M402 862h220" stroke="#f7d488" stroke-width="28" stroke-linecap="round"/>
  <path d="M250 218l18 36 36 18-36 18-18 36-18-36-36-18 36-18 18-36Z" fill="#7dd3fc"/>
</svg>`;
}

function promoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#070b18"/>
      <stop offset="0.48" stop-color="#16182d"/>
      <stop offset="1" stop-color="#2b1737"/>
    </linearGradient>
    <radialGradient id="blue" cx="28%" cy="24%" r="48%">
      <stop offset="0" stop-color="#7dd3fc" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="pink" cx="76%" cy="18%" r="46%">
      <stop offset="0" stop-color="#f0abfc" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#f0abfc" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <rect width="1920" height="1080" fill="url(#blue)"/>
  <rect width="1920" height="1080" fill="url(#pink)"/>
  <g opacity="0.25" stroke="#7dd3fc" stroke-width="2">
    ${Array.from({ length: 31 }, (_, index) => `<path d="M${80 + index * 62} 0v1080"/>`).join("")}
    ${Array.from({ length: 15 }, (_, index) => `<path d="M0 ${88 + index * 64}h1920"/>`).join("")}
  </g>
  <g opacity="0.32" stroke="#f3f0ff" stroke-width="2" stroke-linecap="round">
    ${Array.from({ length: 70 }, (_, index) => {
      const x = (index * 181) % 1880 + 20;
      const y = (index * 103) % 1000 + 24;
      const len = 28 + (index % 5) * 10;
      return `<path d="M${x} ${y}c${len} ${-len * 0.8} ${len * 1.4} ${len * 0.8} ${len * 2} 0"/>`;
    }).join("")}
  </g>
  <g transform="translate(122 146)">
    <text x="0" y="146" fill="#f3f0ff" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="150" font-weight="900">梦境客服中心</text>
  </g>
  <g transform="translate(1110 268)" filter="url(#glow)">
    <rect x="0" y="0" width="520" height="340" rx="34" fill="#141a31" stroke="#7dd3fc" stroke-opacity="0.56" stroke-width="5"/>
    <path d="M64 92h246M64 168h390M64 244h270" stroke="#f3f0ff" stroke-width="22" stroke-linecap="round" opacity="0.78"/>
    <path d="M402 72l24 48 48 24-48 24-24 48-24-48-48-24 48-24 24-48Z" fill="#f0abfc"/>
    <circle cx="116" cy="410" r="78" fill="none" stroke="#f7d488" stroke-width="18"/>
    <path d="M304 390c82-74 192-20 224 66" fill="none" stroke="#7dd3fc" stroke-width="18" stroke-linecap="round"/>
  </g>
</svg>`;
}

async function renderSvg(svgPath, pngPath) {
  await run("/usr/bin/sips", ["-s", "format", "png", svgPath, "--out", pngPath]);
}

async function resizeScreenshot(input, output) {
  await run("/usr/bin/sips", ["-z", "1920", "1080", input, "--out", output]);
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

await mkdir(outDir, { recursive: true });
await mkdir(screenshotOutDir, { recursive: true });

const iconSvgPath = path.join(outDir, "icon-1024.svg");
const promoSvgPath = path.join(outDir, "promo-16x9.svg");
const iconPngPath = path.join(outDir, "icon-1024.png");
const promoPngPath = path.join(outDir, "promo-16x9.png");

await writeFile(iconSvgPath, iconSvg(), "utf8");
await writeFile(promoSvgPath, promoSvg(), "utf8");
await renderSvg(iconSvgPath, iconPngPath);
await renderSvg(promoSvgPath, promoPngPath);

const captureHtmlPath = path.join(outDir, "capture.html");
const captureHtml = (await readFile(path.join(root, "dist", "index.html"), "utf8"))
  .replace("./styles.css", "../../dist/styles.css")
  .replace("./game.js", "../../dist/game.js")
  .replace(
    "</head>",
    `<style>
      html,
      body {
        width: 1080px;
        height: 1920px;
        min-height: 1920px;
        overflow: hidden;
      }

      .app {
        width: 1080px !important;
        max-width: 1080px !important;
        margin: 0 !important;
      }
    </style>
  </head>`,
  );
await writeFile(captureHtmlPath, captureHtml, "utf8");

const screenshots = [
  ["01-opening-source.png", "01-opening.png"],
  ["02-core-gameplay-source.png", "02-core-gameplay.png"],
  ["03-result-source.png", "03-result.png"],
];

for (const [source, target] of screenshots) {
  const sourcePath = path.join(screenshotSourceDir, source);
  const targetPath = path.join(screenshotOutDir, target);
  if (!(await exists(targetPath)) && (await exists(sourcePath))) {
    await resizeScreenshot(sourcePath, targetPath);
  }
}

console.log(iconPngPath);
console.log(path.join(screenshotOutDir, "01-opening.png"));
console.log(path.join(screenshotOutDir, "02-core-gameplay.png"));
console.log(path.join(screenshotOutDir, "03-result.png"));
console.log(promoPngPath);
console.log(captureHtmlPath);
