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

// First pass: generate WebP + responsive sizes
const nameMap = new Map();
const srcsetMap = new Map(); // file -> [{url, width}]

for (const file of pngFiles) {
  const inputPath = join(assetsDir, file);
  const baseName = file.replace(/\.png$/, '');
  const webpName = `${baseName}.webp`;
  const outputPath = join(assetsDir, webpName);

  try {
    const img = sharp(inputPath);
    const metadata = await img.metadata();
    const originalWidth = metadata.width || 1920;
    const isHeadshot = file.includes('mine') || file.includes('croped-mine');

    // Determine sizes to generate
    const sizes = isHeadshot
      ? [
          { label: '40w', width: 40 },
          { label: '120w', width: 120 },
        ]
      : [
          { label: '800w', width: Math.min(800, originalWidth) },
          { label: '1600w', width: Math.min(1600, originalWidth) },
        ];

    // Generate main WebP (with max-width constraint)
    const maxWidth = isHeadshot ? 120 : 1920;
    await img
      .resize({ width: Math.min(originalWidth, maxWidth), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    const oldSize = (await import('fs')).statSync(inputPath).size;
    const newSize = (await import('fs')).statSync(outputPath).size;
    const savings = ((1 - newSize / oldSize) * 100).toFixed(0);
    console.log(`  ✓ ${file} → ${webpName} (${(oldSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB, -${savings}%)`);

    // Generate responsive variants
    const variants = [];
    for (const size of sizes) {
      if (size.width >= originalWidth) continue;
      const variantName = `${baseName}@${size.label}.webp`;
      const variantPath = join(assetsDir, variantName);
      await sharp(inputPath)
        .resize({ width: size.width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(variantPath);
      variants.push({ url: variantName, width: size.width });
      console.log(`    ↳ ${variantName} (${size.width}px)`);
    }

    nameMap.set(file, webpName);
    srcsetMap.set(webpName, variants);
    renameSync(inputPath, inputPath + '.bak');
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

// Update all HTML/JS files: .png → .webp + fix srcset attributes
function walkDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.js'))) {
      let content = readFileSync(fullPath, 'utf-8');
      let modified = false;

      // Replace .png → .webp in all references (including srcset with @size variants)
      for (const [oldName, newName] of nameMap) {
        if (content.includes(oldName)) {
          content = content.replaceAll(oldName, newName);
          modified = true;
        }
      }
      // Fix srcSet URLs: replace @size.png → @size.webp (missed by exact name match above)
      content = content.replace(/@(\d+w)\.png/g, '@$1.webp');
      content = content.replace(/\.png/g, '.webp');

      // For HTML files, add/fix srcset on img tags
      if (entry.name.endsWith('.html')) {
        for (const [webpName, variants] of srcsetMap) {
          if (variants.length === 0) continue;
          const srcAttr = `src="/_astro/${webpName}"`;
          const srcsetEntries = variants.map(v => `/_astro/${v.url} ${v.width}w`).join(', ');
          const imgRegex = new RegExp(`<img[^>]*${escapeRegex(srcAttr)}[^>]*>`, 'g');
          content = content.replace(imgRegex, (match) => {
            // Fix existing srcset by replacing plain URLs with @variant URLs
            let fixed = match;
            for (const variant of variants) {
              const oldUrl = `/_astro/${webpName}`;
              const newUrl = `/_astro/${variant.url}`;
              fixed = fixed.replaceAll(`${oldUrl} ${variant.width}w`, `${newUrl} ${variant.width}w`);
            }
            // If no srcset existed, add one
            if (!fixed.includes('srcset=') && !fixed.includes('srcSet=')) {
              fixed = fixed.replace(srcAttr, `${srcAttr} srcset="${srcsetEntries}"`);
            }
            return fixed;
          });
          modified = true;
        }
      }

      if (modified) {
        writeFileSync(fullPath, content, 'utf-8');
        console.log(`  ✓ Updated ${fullPath.replace(distDir, 'dist')}`);
      }
    }
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

// Guarantee dist/sitemap.xml exists
const sitemapIndex = join(distDir, 'sitemap-index.xml');
const sitemapXml = join(distDir, 'sitemap.xml');
if (existsSync(sitemapIndex)) {
  copyFileSync(sitemapIndex, sitemapXml);
  console.log('  ✓ Created dist/sitemap.xml (copy of sitemap-index.xml)');
}

console.log('\n✅ Image & Sitemap optimization complete');
