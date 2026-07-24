#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import process from "node:process";

const root = process.cwd();
const assets = path.join(root, "assets", "images");

let sharp;
let ffmpegPath;
try {
  ({ default: sharp } = await import("sharp"));
  ({ default: ffmpegPath } = await import("ffmpeg-static"));
} catch (error) {
  console.error("\nFalten les dependències d'optimització.");
  console.error("Executa des de l'arrel del portfolio:\n");
  console.error("  npm install --no-save sharp ffmpeg-static\n");
  console.error("I torna a executar:\n");
  console.error("  node tools/optimize-assets.mjs\n");
  process.exit(1);
}

const exists = async (file) => {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
};

const human = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

async function ensureSource(relativePath) {
  const file = path.join(root, relativePath);
  if (!(await exists(file))) {
    throw new Error(`No s'ha trobat el fitxer requerit: ${relativePath}`);
  }
  return file;
}

async function createWebpVariants(relativeInput, widths, quality = 80) {
  const input = await ensureSource(relativeInput);
  const parsed = path.parse(input);
  const base = parsed.name;
  const outputs = [];

  for (const width of widths) {
    const output = path.join(parsed.dir, `${base}-${width}.webp`);
    await sharp(input, { animated: false })
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toFile(output);
    outputs.push(path.relative(root, output));
  }

  return outputs;
}

async function createPoster(relativeInput, relativeOutput, width = 960) {
  const input = await ensureSource(relativeInput);
  const output = path.join(root, relativeOutput);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await sharp(input, { animated: false, page: 0 })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6, smartSubsample: true })
    .toFile(output);
  return path.relative(root, output);
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ["ignore", "inherit", "inherit"] });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg ha acabat amb el codi ${code}`));
    });
  });
}

async function optimizeMp4InPlace(relativeInput) {
  const input = await ensureSource(relativeInput);
  const parsed = path.parse(input);
  const temp = path.join(parsed.dir, `${parsed.name}.optimized-temp.mp4`);
  const before = (await fs.stat(input)).size;

  await runFfmpeg([
    "-y",
    "-i", input,
    "-map_metadata", "-1",
    "-an",
    "-vf", "scale=min(1280\\,iw):-2:force_original_aspect_ratio=decrease,fps=30",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "26",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    temp
  ]);

  const after = (await fs.stat(temp)).size;
  if (after < before) {
    await fs.rm(input);
    await fs.rename(temp, input);
    return { file: relativeInput, before, after, changed: true };
  }

  await fs.rm(temp);
  return { file: relativeInput, before, after: before, changed: false };
}

async function main() {
  console.log("\nOptimitzant imatges del portfolio...\n");

  const imageJobs = [
    ["assets/images/games/soma/soma-vanta.png", [640, 960, 1600], 80],
    ["assets/images/games/mecha/mecha-combat.png", [640, 960, 1600], 80],
    ["assets/images/games/monkey-island/monkey-image-3.png", [640, 960, 1600], 80]
  ];

  for (const [input, widths, quality] of imageJobs) {
    const outputs = await createWebpVariants(input, widths, quality);
    console.log(`Creat: ${outputs.join(", ")}`);
  }

  const posterJobs = [
    ["assets/images/3d/hoverbikes/hover-bike-1.gif", "assets/images/3d/hoverbikes/hover-bike-1-poster.webp"],
    ["assets/images/3d/malenia/malenia.gif", "assets/images/3d/malenia/malenia-poster.webp"],
    ["assets/images/3d/pokeitems/pokeitems.gif", "assets/images/3d/pokeitems/pokeitems-poster.webp"]
  ];

  for (const [input, output] of posterJobs) {
    const created = await createPoster(input, output);
    console.log(`Creat: ${created}`);
  }

  console.log("\nOptimitzant vídeos MP4 sense àudio i amb fast-start...\n");

  const videos = [
    "assets/images/games/shotgun/shotgun-gameplay.mp4",
    "assets/images/games/soma/soma.mp4",
    "assets/images/games/mecha/mecha.mp4",
    "assets/images/games/mario/mario.mp4",
    "assets/images/games/monkey-island/monkeyisland.mp4"
  ];

  for (const video of videos) {
    const result = await optimizeMp4InPlace(video);
    if (result.changed) {
      console.log(`${result.file}: ${human(result.before)} -> ${human(result.after)}`);
    } else {
      console.log(`${result.file}: ja era més petit; s'ha conservat l'original (${human(result.before)}).`);
    }
  }

  console.log("\nOptimització completada. Revisa la web localment abans de fer commit.\n");
}

main().catch((error) => {
  console.error(`\nError: ${error.message}\n`);
  process.exit(1);
});
