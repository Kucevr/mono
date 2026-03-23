import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const OPTIMIZE_DIR = './public/photo/herogalery';

async function optimizeImages(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const fullPath = path.join(dir, dirent.name);

    if (dirent.isDirectory()) {
      await optimizeImages(fullPath);
    } else if (dirent.isFile()) {
      const ext = path.extname(fullPath).toLowerCase();
      // Skip if it's already optimized or if it's not an image/standard format we want to convert
      if (['.jpg', '.jpeg', '.png', '.heic'].includes(ext)) {
        console.log(`Optimizing ${fullPath}...`);
        const nameWithoutExt = path.join(dir, path.basename(dirent.name, ext));

        // Create WebP
        const webpPath = `${nameWithoutExt}.webp`;
        try {
          await sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(webpPath);
          console.log(`  -> Created ${webpPath}`);
        } catch (e) {
          console.error(`  -> Failed webp for ${fullPath}:`, e.message);
        }

        // Create AVIF
        const avifPath = `${nameWithoutExt}.avif`;
        try {
          await sharp(fullPath)
            .avif({ quality: 75 })
            .toFile(avifPath);
          console.log(`  -> Created ${avifPath}`);
        } catch (e) {
          console.error(`  -> Failed avif for ${fullPath}:`, e.message);
        }
      }
    }
  }
}

optimizeImages(OPTIMIZE_DIR).then(() => {
  console.log('Optimization complete!');
}).catch(e => {
  console.error('Error during optimization:', e);
});
