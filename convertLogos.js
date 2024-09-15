const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Define the root directory of the cloned repository
const repoPath = path.resolve(__dirname, '../chain-registry');

// Define the output directory
const outputDir = path.join(__dirname, 'chain_icons');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Function to convert images using Sharp
async function convertImage(inputImage) {
  const outputImage = path.join(outputDir, `${path.basename(inputImage, path.extname(inputImage))}.webp`);
  try {
    await sharp(inputImage)
      .resize(100, 100, { fit: 'cover', background: { r: 0, g: 0, b: 0, alpha: 0 } }) // Resizes to 100x100 with a transparent background
      .toFormat('webp')
      .toFile(outputImage);
    console.log(`Converted and saved: ${outputImage}`);
  } catch (err) {
    console.error(`Failed to convert ${inputImage}: ${err.message}`);
  }
}

// Function to process directories and find images
async function processDirectories() {
  // Read the root directory
  const directories = fs.readdirSync(repoPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('_') && dirent.name !== 'testnets')
    .map(dirent => dirent.name);

  for (const networkName of directories) {
    const networkPath = path.join(repoPath, networkName);

    // Read JSON files for display and chain names
    const assetlistPath = path.join(networkPath, 'assetlist.json');
    const chainPath = path.join(networkPath, 'chain.json');
    let displayName, chainName;

    if (fs.existsSync(assetlistPath)) {
      const assetlist = JSON.parse(fs.readFileSync(assetlistPath, 'utf8'));
      displayName = assetlist.assets[0]?.display;
    }

    if (fs.existsSync(chainPath)) {
      const chain = JSON.parse(fs.readFileSync(chainPath, 'utf8'));
      chainName = chain.chain_name;
    }

    const imagesPath = path.join(networkPath, 'images');

    // Check if the images directory exists
    if (fs.existsSync(imagesPath)) {
      // Read all files in the images directory
      const files = fs.readdirSync(imagesPath);
      
      for (const file of files) {
        const fileNameWithoutExt = path.basename(file, path.extname(file));
        
        // Check if the file name matches the network name, display name, or chain name
        if (fileNameWithoutExt === networkName || fileNameWithoutExt === displayName || fileNameWithoutExt === chainName) {
          const filePath = path.join(imagesPath, file);
          await convertImage(filePath);
        }
      }
    }
  }
  console.log("Processing completed!");
}

// Run the script
processDirectories().catch(err => console.error(`Error processing directories: ${err.message}`));
