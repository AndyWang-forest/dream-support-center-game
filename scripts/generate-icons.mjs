import { mkdir, writeFile } from "node:fs/promises";
import { deflateSync } from "node:zlib";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const outDir = join(root, "assets", "icons");

await mkdir(outDir, { recursive: true });

await writeFile(
  join(outDir, "icon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#0b0d16"/>
  <circle cx="256" cy="164" r="74" fill="none" stroke="#f7d488" stroke-width="14"/>
  <path d="M220 154c14-26 58-26 72 0 10 18 4 38-14 50l-22 14-22-14c-18-12-24-32-14-50Z" fill="#7dd3fc"/>
  <rect x="114" y="224" width="284" height="160" rx="28" fill="#151a2a" stroke="#7dd3fc" stroke-width="16"/>
  <path d="M150 274h144M150 324h210" stroke="#f3f0ff" stroke-width="13" stroke-linecap="round" opacity="0.82"/>
  <path d="M338 264l14 28 28 14-28 14-14 28-14-28-28-14 28-14 14-28Z" fill="#f0abfc"/>
</svg>
`,
);

await writePng(join(outDir, "icon-192.png"), 192, false);
await writePng(join(outDir, "icon-512.png"), 512, false);
await writePng(join(outDir, "maskable-512.png"), 512, true);

function writePng(path, size, maskable) {
  const rgba = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const dx = (x - size / 2) / size;
      const dy = (y - size / 2) / size;
      const glow = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) * 2);
      rgba[i] = Math.round(11 + glow * 34);
      rgba[i + 1] = Math.round(13 + glow * 34);
      rgba[i + 2] = Math.round(22 + glow * 70);
      rgba[i + 3] = 255;
    }
  }

  drawRoundedRect(rgba, size, maskable ? 0 : Math.round(size * 0.08), Math.round(size * 0.08), size - Math.round(size * 0.16), size - Math.round(size * 0.16), Math.round(size * 0.18), [18, 21, 38, 255]);
  drawCircle(rgba, size, size * 0.5, size * 0.32, size * 0.14, [247, 212, 136, 255], false, Math.max(5, size * 0.035));
  drawRoundedRect(rgba, size, size * 0.22, size * 0.43, size * 0.56, size * 0.32, size * 0.05, [21, 26, 42, 255]);
  drawLine(rgba, size, size * 0.24, size * 0.43, size * 0.78, size * 0.43, [125, 211, 252, 255], Math.max(5, size * 0.04));
  drawLine(rgba, size, size * 0.3, size * 0.53, size * 0.58, size * 0.53, [243, 240, 255, 255], Math.max(4, size * 0.025));
  drawLine(rgba, size, size * 0.3, size * 0.63, size * 0.69, size * 0.63, [243, 240, 255, 255], Math.max(4, size * 0.025));
  drawCircle(rgba, size, size * 0.68, size * 0.57, size * 0.08, [240, 171, 252, 255], true);
  drawLine(rgba, size, size * 0.68, size * 0.47, size * 0.68, size * 0.67, [240, 171, 252, 255], Math.max(4, size * 0.02));
  drawLine(rgba, size, size * 0.58, size * 0.57, size * 0.78, size * 0.57, [240, 171, 252, 255], Math.max(4, size * 0.02));

  return writeFile(path, encodePng(rgba, size, size));
}

function setPixel(data, size, x, y, color) {
  const xi = Math.round(x);
  const yi = Math.round(y);
  if (xi < 0 || yi < 0 || xi >= size || yi >= size) return;
  const i = (yi * size + xi) * 4;
  data[i] = color[0];
  data[i + 1] = color[1];
  data[i + 2] = color[2];
  data[i + 3] = color[3];
}

function drawLine(data, size, x1, y1, x2, y2, color, width) {
  const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  for (let s = 0; s <= steps; s += 1) {
    const t = s / steps;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    drawCircle(data, size, x, y, width / 2, color, true);
  }
}

function drawCircle(data, size, cx, cy, r, color, fill = true, strokeWidth = 1) {
  for (let y = Math.floor(cy - r - strokeWidth); y <= Math.ceil(cy + r + strokeWidth); y += 1) {
    for (let x = Math.floor(cx - r - strokeWidth); x <= Math.ceil(cx + r + strokeWidth); x += 1) {
      const d = Math.hypot(x - cx, y - cy);
      if ((fill && d <= r) || (!fill && d >= r - strokeWidth && d <= r + strokeWidth)) {
        setPixel(data, size, x, y, color);
      }
    }
  }
}

function drawTriangle(data, size, a, b, c, color) {
  const minX = Math.floor(Math.min(a[0], b[0], c[0]));
  const maxX = Math.ceil(Math.max(a[0], b[0], c[0]));
  const minY = Math.floor(Math.min(a[1], b[1], c[1]));
  const maxY = Math.ceil(Math.max(a[1], b[1], c[1]));
  const area = edge(a, b, c);
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const p = [x, y];
      const w1 = edge(b, c, p) / area;
      const w2 = edge(c, a, p) / area;
      const w3 = edge(a, b, p) / area;
      if (w1 >= 0 && w2 >= 0 && w3 >= 0) setPixel(data, size, x, y, color);
    }
  }
}

function edge(a, b, c) {
  return (c[0] - a[0]) * (b[1] - a[1]) - (c[1] - a[1]) * (b[0] - a[0]);
}

function drawRoundedRect(data, size, x, y, w, h, r, color) {
  for (let py = y; py < y + h; py += 1) {
    for (let px = x; px < x + w; px += 1) {
      const dx = Math.max(x + r - px, 0, px - (x + w - r));
      const dy = Math.max(y + r - py, 0, py - (y + h - r));
      if (dx * dx + dy * dy <= r * r) setPixel(data, size, px, py, color);
    }
  }
}

function encodePng(rgba, width, height) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const chunks = [
    chunk("IHDR", Buffer.concat([uint(width), uint(height), Buffer.from([8, 6, 0, 0, 0])])),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ];
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), ...chunks]);
}

function uint(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32BE(value);
  return buffer;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  return Buffer.concat([uint(data.length), name, data, uint(crc32(Buffer.concat([name, data])))]);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let k = 0; k < 8; k += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}
