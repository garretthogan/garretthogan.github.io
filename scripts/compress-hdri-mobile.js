#!/usr/bin/env node
/**
 * Resize and compress the skybox image for mobile.
 * Reads public/hdri.jpg (or first CLI arg), outputs public/hdri-mobile.jpg.
 *
 * Usage: node scripts/compress-hdri-mobile.js [input.jpg]
 * Or:   npm run compress-hdri-mobile
 */

import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const defaultInput = join(root, 'public', 'hdri.jpg');
const defaultOutput = join(root, 'public', 'hdri-mobile.jpg');

const MOBILE_WIDTH = 1024;
const MOBILE_HEIGHT = 512;
const JPEG_QUALITY = 82;

const inputPath = process.argv[2] ? join(process.cwd(), process.argv[2]) : defaultInput;
const outputPath = defaultOutput;

if (!existsSync(inputPath)) {
  console.error('Input image not found:', inputPath);
  console.error('Usage: node scripts/compress-hdri-mobile.js [input.jpg]');
  process.exit(1);
}

let sharp;
try {
  const mod = await import('sharp');
  sharp = mod.default;
} catch (e) {
  console.error('sharp is required. Install with: npm install -D sharp');
  process.exit(1);
}

async function run() {
  const pipeline = sharp(inputPath);
  const meta = await pipeline.metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  if (w === 0 || h === 0) {
    console.error('Could not read image dimensions:', inputPath);
    process.exit(1);
  }

  console.log('Input:', inputPath, `(${w}×${h})`);
  console.log('Output:', outputPath, `(${MOBILE_WIDTH}×${MOBILE_HEIGHT}, quality ${JPEG_QUALITY})`);

  const info = await pipeline
    .resize(MOBILE_WIDTH, MOBILE_HEIGHT, { fit: 'fill' })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outputPath);

  console.log('Done. Size:', ((info.size ?? 0) / 1024).toFixed(1), 'KB');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
