# IconGen

A utility tool for extracting, converting, and formatting chain icons from the Cosmos chain-registry repository. Automates the process of fetching relevant logos/images for multiple networks and converting them to a specified format, resized for use in other applications.

## Overview

This script will scan through a locally cloned copy of the [Cosmos chain-registry](https://github.com/cosmos/chain-registry) repository, find images matching specific criteria, convert them to the desired format (`WEBP` with transparent backgrounds), and resize them to a square of 100x100 pixels.

### Structure

```
icongen/
├── convertImages.js     # Main script for processing and converting images
├── chain_icons/         # Output directory for converted icons
├── README.md            # Project documentation
└── .gitignore           # Git ignore file for excluding unnecessary files
```

## Dependencies

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Yarn](https://yarnpkg.com/) for package management
- [Sharp](https://sharp.pixelplumbing.com/) library for image processing

## Process

1. **Mode 1**: The script scans each subdirectory in the `chain-registry` repository, ignoring any directories that start with `_`  and the `testnets` directory.
2. **JSON Parsing**: For each directory, it checks for `assetlist.json` and `chain.json` files to extract key values such as `display` and `chain_name`.
3. **Image Matching**: The script searches for images in the `images` subdirectory that match either the parent directory name, the `display` name from `assetlist.json`, or the `chain_name` from `chain.json`.
4. **Mode 2**: The script scans for valid image files in the local `jobs` directory.
6. **Image Conversion**: Matching images are converted to `WEBP` format, resized to 100x100 pixels, and saved in the `chain_icons` output directory.

## Installation

1. Clone the [Cosmos chain-registry](https://github.com/cosmos/chain-registry) repository into the same parent directory, (a common "repos" directory for example):
   ```bash
   git clone https://github.com/cosmos/chain-registry.git
   ```

2. Navigate to `icongen` dir:
   ```bash
   cd /path/to/icongen
   ```

3. Install dependencies:
   ```bash
   yarn add sharp
   ```

## Usage

To run and process images:

```bash
node convertImages.js
```

### Output

Processed images will be saved in the `chain_icons` directory in `WEBP` format with a transparent background, at 100x100 pixels.

## Customization

Simple and straightforward to modify, the script uses the `sharp` library which supports a large number of formats and additional processing options.

## Contributing

Feel free to open an issue or submit a pull request if you find a bug or have a feature request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cosmos Network](https://cosmos.network/) and its dedicated volunteer maintainers for providing the [chain-registry](https://github.com/cosmos/chain-registry) repository.
- [Sharp](https://sharp.pixelplumbing.com/) library for fast and efficient image processing.
