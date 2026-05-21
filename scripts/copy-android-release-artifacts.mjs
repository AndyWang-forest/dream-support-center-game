import { copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const outDir = join(root, "artifacts", "android", "release");
const versionName = "1.0";
const versionCode = "1";
const certificateSource = join(homedir(), ".codex", "android-signing", "dream-support-upload-certificate.pem");

const artifacts = [
  {
    source: join(root, "android", "app", "build", "outputs", "bundle", "release", "app-release.aab"),
    target: join(outDir, `dream-support-v${versionName}-${versionCode}-release.aab`),
  },
  {
    source: join(root, "android", "app", "build", "outputs", "apk", "release", "app-release.apk"),
    target: join(outDir, `dream-support-v${versionName}-${versionCode}-release.apk`),
  },
  {
    source: certificateSource,
    target: join(outDir, "dream-support-upload-certificate.pem"),
  },
];

await mkdir(outDir, { recursive: true });

for (const artifact of artifacts) {
  if (existsSync(artifact.source)) {
    await copyFile(artifact.source, artifact.target);
    console.log(artifact.target);
  }
}
