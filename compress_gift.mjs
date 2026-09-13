import sharp from "sharp";
import fs from "fs";

async function compressGift() {
  const inputPath = "public/gift.png";
  const outputPath = "public/gift.webp";

  console.log("Starting compression...");
  
  try {
    await sharp(inputPath)
      .resize({ width: 200 }) // small floating icon
      .webp({ quality: 60, effort: 6 })
      .toFile(outputPath);
      
    const stats = fs.statSync(outputPath);
    console.log(`Successfully compressed to ${outputPath}. Size: ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (err) {
    console.error("Error compressing image:", err);
  }
}

compressGift();
