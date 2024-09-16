### `README.md`

```markdown
# IconGen

A utility tool for extracting, converting, and formatting chain icons from the Cosmos chain-registry repository. This project automates the process of finding and downloading relevant images from multiple blockchain directories, converting them to a uniform format, and resizing them for use in applications.

## Overview

The `icongen` project is designed to scan through the [Cosmos chain-registry](https://github.com/cosmos/chain-registry) repository, find images matching specific criteria, convert them to the desired format (`WEBP` with transparent backgrounds), and resize them to a square of 100x100 pixels.

### Project Structure

```
icongen/
├── convertImages.js     # Main script for processing and converting images
├── chain_icons/         # Output directory for converted icons
├── README.md            # Project documentation
└── .gitignore           # Git ignore file for excluding unnecessary files
```

## How It Works

1. **Directory Scanning**: The script scans each subdirectory in the `chain-registry` repository, ignoring any directories that start with `_` or are named `testnets`.
2. **JSON Parsing**: For each directory, it checks for `assetlist.json` and `chain.json` files to extract key values such as `display` and `chain_name`.
3. **Image Matching**: The script searches for images in the `images` subdirectory that match either the parent directory name, the `display` name from `assetlist.json`, or the `chain_name` from `chain.json`.
4. **Image Conversion**: Matching images are converted to `WEBP` format, resized to 100x100 pixels, and saved in the `chain_icons` output directory.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Yarn](https://yarnpkg.com/) for package management
- [Sharp](https://sharp.pixelplumbing.com/) library for image processing

## Installation

1. Clone the [Cosmos chain-registry](https://github.com/cosmos/chain-registry) repository into the same parent directory, (a common "repos" directory for example):
   ```bash
   git clone https://github.com/cosmos/chain-registry.git
   ```

2. Navigate to the `icongen` directory:
   ```bash
   cd /path/to/icongen
   ```

3. Install the required dependencies:
   ```bash
   yarn add sharp
   ```

## Usage

To run the script and process the images:

```bash
node convertImages.js
```

### Output

All processed images will be saved in the `chain_icons` directory in `WEBP` format with a transparent background, sized at 100x100 pixels.

## Customization

If you want to modify the script to handle additional formats or make changes to the image processing logic, you can edit the `convertImages.js` file. The script uses the `sharp` library, which supports a variety of image formats and processing options.

## Contributing

Feel free to open an issue or submit a pull request if you find a bug or have a feature request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cosmos Network](https://cosmos.network/) for providing the [chain-registry](https://github.com/cosmos/chain-registry) repository.
- [Sharp](https://sharp.pixelplumbing.com/) library for fast and efficient image processing.
