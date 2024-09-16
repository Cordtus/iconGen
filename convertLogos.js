const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const readline = require('readline');

// Define the root directory of the cloned repository
const repoPath = path.resolve(__dirname, '../chain-registry');

// Define the output directories
const chainIconsDir = path.join(__dirname, 'chain_icons');
const customIconsDir = path.join(__dirname, 'custom_icons');
const jobsDir = path.join(__dirname, 'jobs');

// Create output directories if they don't exist
if (!fs.existsSync(chainIconsDir)) {
  fs.mkdirSync(chainIconsDir);
}
if (!fs.existsSync(customIconsDir)) {
  fs.mkdirSync(customIconsDir);
}

// Function to convert images using Sharp
async function convertImage(inputImage, outputDir) {
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

// Function to process directories and find images from the chain registry
async function processRegistryImages() {
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
          await convertImage(filePath, chainIconsDir);
        }
      }
    }
  }
  console.log("Registry images processing completed!");
}

// Function to process custom images from the jobs directory
async function processCustomImages() {
  if (!fs.existsSync(jobsDir)) {
    console.log("The jobs directory does not exist.");
    return;
  }

  const files = fs.readdirSync(jobsDir);
  for (const file of files) {
    const filePath = path.join(jobsDir, file);
    if (fs.lstatSync(filePath).isFile()) {
      await convertImage(filePath, customIconsDir);
    }
  }
  console.log("Custom images processing completed!");
}

// Function to display interactive prompt
function showMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Choose an option:\n1. Scan and create logos for each chain from the registry\n2. Convert images from the jobs directory\nEnter your choice (1 or 2): ", function (answer) {
    if (answer === '1') {
      processRegistryImages().catch(err => console.error(`Error processing registry images: ${err.message}`)).finally(() => rl.close());
    } else if (answer === '2') {
      processCustomImages().catch(err => console.error(`Error processing custom images: ${err.message}`)).finally(() => rl.close());
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      rl.close();
    }
  });
}

// Run the script
showMenu();
