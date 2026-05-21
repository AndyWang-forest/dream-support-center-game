import { chmod, mkdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { join } from "node:path";
import { homedir } from "node:os";

const signingDir = join(homedir(), ".codex", "android-signing");
const keystorePath = join(signingDir, "dream-support-upload.keystore");
const propertiesPath = join(signingDir, "dream-support-signing.properties");
const certificatePath = join(signingDir, "dream-support-upload-certificate.pem");
const alias = "dream-support-upload";
const javaHome = process.env.JAVA_HOME || join(homedir(), ".codex", "android-build-tools", "jdk21", "Contents", "Home");
const keytool = join(javaHome, "bin", "keytool");

await mkdir(signingDir, { recursive: true, mode: 0o700 });
await chmod(signingDir, 0o700);

if (!existsSync(keytool)) {
  throw new Error(`Missing keytool at ${keytool}. Run Android toolchain setup first.`);
}

if (!existsSync(keystorePath) || !existsSync(propertiesPath)) {
  const storePassword = makePassword();
  const keyPassword = makePassword();

  if (!existsSync(keystorePath)) {
    await run(keytool, [
      "-genkeypair",
      "-v",
      "-keystore",
      keystorePath,
      "-storetype",
      "JKS",
      "-alias",
      alias,
      "-keyalg",
      "RSA",
      "-keysize",
      "4096",
      "-validity",
      "10000",
      "-storepass",
      storePassword,
      "-keypass",
      keyPassword,
      "-dname",
      "CN=Dream Support Upload,O=Night Desk,C=CN",
    ]);
    await chmod(keystorePath, 0o600);
  }

  await writeFile(
    propertiesPath,
    [
      `storeFile=${keystorePath}`,
      `storePassword=${storePassword}`,
      `keyAlias=${alias}`,
      `keyPassword=${keyPassword}`,
      "",
    ].join("\n"),
    { mode: 0o600 },
  );
  await chmod(propertiesPath, 0o600);
}

const properties = await readProperties(propertiesPath);
await run(keytool, [
  "-exportcert",
  "-rfc",
  "-keystore",
  properties.storeFile,
  "-storepass",
  properties.storePassword,
  "-alias",
  properties.keyAlias,
  "-file",
  certificatePath,
]);
await chmod(certificatePath, 0o600);

await assertPrivateFile(keystorePath);
await assertPrivateFile(propertiesPath);
await assertPrivateFile(certificatePath);

console.log(`Android release signing is ready at ${signingDir}`);
console.log(`Upload certificate: ${certificatePath}`);

function makePassword() {
  return randomBytes(36).toString("base64url");
}

async function readProperties(path) {
  const text = await import("node:fs/promises").then((fs) => fs.readFile(path, "utf8"));
  return Object.fromEntries(
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index), line.slice(index + 1)];
      }),
  );
}

async function assertPrivateFile(path) {
  const mode = (await stat(path)).mode & 0o777;
  if ((mode & 0o077) !== 0) {
    await chmod(path, 0o600);
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} failed with exit ${code}: ${stderr}`));
      }
    });
  });
}
