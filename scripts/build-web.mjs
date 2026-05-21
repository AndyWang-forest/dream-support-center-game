import { mkdir, copyFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");

const files = [
  "index.html",
  "styles.css",
  "game.js",
];

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "assets", "icons"), { recursive: true });

for (const file of files) {
  await copyFile(join(root, file), join(dist, file));
}

for (const icon of ["icon.svg", "icon-192.png", "icon-512.png", "maskable-512.png"]) {
  await copyFile(join(root, "assets", "icons", icon), join(dist, "assets", "icons", icon));
}

console.log(`Built web distribution in ${dist}`);
