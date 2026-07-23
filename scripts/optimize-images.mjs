import { readFileSync, writeFileSync, readdirSync, renameSync, existsSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const assetsDir = join(distDir, '_astro');

if (!existsSync(assetsDir)) {
  console.log('No _astro directory found, skipping image optimization');
  process.exit(0);
}

const files = readdirSync(assetsDir);
const pngFiles = files.filter(f => f.endsWith('.png'));

console.log(`Found ${pngFiles.length} PNG files to optimize`);

const nameMap = new Map();

for (const file of pngFiles) {
  const inputPath = join(assetsDir, file);
  const webpName = file.replace(/\.png$/, '.webp');
  const outputPath = join(assetsDir, webpName);

  try {
    const img = sharp(inputPath);
    const metadata = await img.metadata();

    await img
      .resize({ width: Math.min(metadata.width || 1920, 1920), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    const oldSize = (await import('fs')).statSync(inputPath).size;
    const newSize = (await import('fs')).statSync(outputPath).size;
    const savings = ((1 - newSize / oldSize) * 100).toFixed(0);

    console.log(`  ✓ ${file} → ${webpName} (${(oldSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB, -${savings}%)`);

    nameMap.set(file, webpName);
    renameSync(inputPath, inputPath + '.bak');
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

// Update all HTML files to reference .webp instead of .png
function walkDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.js'))) {
      let content = readFileSync(fullPath, 'utf-8');
      let modified = false;
      for (const [oldName, newName] of nameMap) {
        if (content.includes(oldName)) {
          content = content.replaceAll(oldName, newName);
          modified = true;
        }
      }
      if (modified) {
        writeFileSync(fullPath, content, 'utf-8');
        console.log(`  ✓ Updated references in ${fullPath.replace(distDir, 'dist')}`);
      }
    }
  }
}

walkDir(distDir);

// Remove backup PNG files
for (const file of pngFiles) {
  const bakPath = join(assetsDir, file + '.bak');
  if (existsSync(bakPath)) {
    try {
      const { unlinkSync } = await import('fs');
      unlinkSync(bakPath);
    } catch { /* ignore */ }
  }
}

// Guarantee dist/sitemap.xml exists for Google Search Console compatibility
const sitemapIndex = join(distDir, 'sitemap-index.xml');
const sitemap0 = join(distDir, 'sitemap-0.xml');
const sitemapXml = join(distDir, 'sitemap.xml');

if (existsSync(sitemapIndex)) {
  copyFileSync(sitemapIndex, sitemapXml);
  console.log('  ✓ Created dist/sitemap.xml (copy of sitemap-index.xml)');
} else if (existsSync(sitemap0)) {
  copyFileSync(sitemap0, sitemapXml);
  console.log('  ✓ Created dist/sitemap.xml (copy of sitemap-0.xml)');
}

console.log('\n✅ Image & Sitemap optimization complete');
