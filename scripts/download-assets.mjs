/**
 * Downloads all images from the Webild S3 bucket used in the web-agency-2 template
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

const BASE_URL = 'https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2';

const ASSETS = [
  // Hero carousel shots
  'shot-1.webp', 'shot-2.webp', 'shot-3.webp', 'shot-4.webp',
  'shot-5.webp', 'shot-6.webp', 'shot-7.webp', 'shot-8.webp', 'shot-9.webp',
  // Dev portfolio shots
  'dev-1.webp', 'dev-2.webp', 'dev-3.webp',
  // Project screenshots
  'project-1.webp', 'project-2.webp', 'project-3.webp', 'project-4.webp', 'project-5.webp',
  // Team photos
  'team-1.webp', 'team-2.webp', 'team-3.webp',
];

const OUTPUT_DIR = join(PROJECT_ROOT, 'public/images/web-agency-2');

async function downloadAsset(filename) {
  const url = `${BASE_URL}/${filename}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  SKIP (${res.status}): ${filename}`);
    return false;
  }
  const buf = await res.arrayBuffer();
  const dest = join(OUTPUT_DIR, filename);
  writeFileSync(dest, Buffer.from(buf));
  console.log(`  ✓ ${filename} (${(buf.byteLength / 1024).toFixed(0)}KB)`);
  return true;
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Downloading ${ASSETS.length} assets to public/images/web-agency-2/\n`);

  // Download in parallel batches of 4
  const BATCH = 4;
  let ok = 0;
  for (let i = 0; i < ASSETS.length; i += BATCH) {
    const batch = ASSETS.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(downloadAsset));
    ok += results.filter(Boolean).length;
  }
  console.log(`\nDone: ${ok}/${ASSETS.length} downloaded.`);
}

main().catch(console.error);
