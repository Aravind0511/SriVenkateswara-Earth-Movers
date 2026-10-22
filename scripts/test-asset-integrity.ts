import fs from 'node:fs';
import path from 'node:path';
import { EQUIPMENT_LIST } from '../src/data/equipmentData.ts';
import { GALLERY_ITEMS } from '../src/data/galleryData.ts';

console.log('=== ASSET INTEGRITY & BINARY VALIDATION SUITE ===\n');

let failures = 0;
let passed = 0;

function assert(condition: boolean, desc: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${desc}`);
    failures++;
  } else {
    console.log(`✅ PASSED: ${desc}`);
    passed++;
  }
}

function checkImageFile(filePath: string, expectedType: 'jpeg' | 'png' | 'webp' | 'svg') {
  const relPath = path.relative(process.cwd(), filePath);
  if (!fs.existsSync(filePath)) {
    assert(false, `File exists on disk: ${relPath}`);
    return;
  }

  const stat = fs.statSync(filePath);
  assert(stat.size > 1000, `File size is healthy (${stat.size} bytes): ${relPath}`);

  const buffer = fs.readFileSync(filePath);

  if (expectedType === 'jpeg') {
    const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8;
    assert(isJpeg, `Valid JPEG magic bytes (FF D8): ${relPath}`);
  } else if (expectedType === 'png') {
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
    assert(isPng, `Valid PNG magic bytes (89 50 4E 47): ${relPath}`);
  } else if (expectedType === 'webp') {
    const riff = buffer.subarray(0, 4).toString('ascii');
    const webp = buffer.subarray(8, 12).toString('ascii');
    const isWebp = riff === 'RIFF' && webp === 'WEBP';
    assert(isWebp, `Valid WebP RIFF/WEBP header: ${relPath}`);
  } else if (expectedType === 'svg') {
    const text = buffer.toString('utf8');
    assert(text.includes('<svg'), `Valid SVG XML content: ${relPath}`);
  }
}

// 1. Official Logo Test
checkImageFile(path.resolve('public/logo.jpg'), 'jpeg');

// 2. Equipment Fleet Images
for (const eq of EQUIPMENT_LIST) {
  const cleanPath = eq.image.split('?')[0].replace(/^\/SriVenkateswara-Earth-Movers\//, '').replace(/^\//, '');
  const absPath = path.resolve('public', cleanPath);
  const ext = path.extname(absPath).toLowerCase();
  const type = ext === '.png' ? 'png' : ext === '.webp' ? 'webp' : 'jpeg';
  checkImageFile(absPath, type);
}

// 3. Worksite Gallery Images
for (const item of GALLERY_ITEMS) {
  const cleanPath = item.image.split('?')[0].replace(/^\/SriVenkateswara-Earth-Movers\//, '').replace(/^\//, '');
  const absPath = path.resolve('public', cleanPath);
  const ext = path.extname(absPath).toLowerCase();
  const type = ext === '.png' ? 'png' : ext === '.webp' ? 'webp' : 'jpeg';
  checkImageFile(absPath, type);
}

// 4. Dedicated Services Assets
const dedicatedServiceImages = [
  'public/services/50ft-long-reach-service.jpg',
  'public/services/50ft-long-reach-service.webp',
  'public/equipment/hitachi-50ft-long-reach-v2.jpg',
  'public/equipment/hitachi-50ft-long-reach-v2.webp',
  'public/equipment/hitachi-long-reach-50ft.jpg',
  'public/equipment/hitachi-long-reach-50ft.webp',
  'public/about/earth-excavation.jpg',
  'public/about/earth-filling.jpg',
  'public/about/road-work.jpg',
  'public/about/land-development.jpg'
];

for (const p of dedicatedServiceImages) {
  const absPath = path.resolve(p);
  const ext = path.extname(absPath).toLowerCase();
  const type = ext === '.webp' ? 'webp' : 'jpeg';
  checkImageFile(absPath, type);
}

console.log(`\nAsset Integrity Summary: ${passed} passed, ${failures} failed.`);
if (failures > 0) {
  process.exit(1);
}
