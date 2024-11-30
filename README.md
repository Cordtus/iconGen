# IconGen

Utility for extracting, converting, and formatting chain icons from the Cosmos chain-registry repository. Automates the process of fetching relevant logos/images for multiple networks and converting them to a specified format, resized for use in other applications.

## Overview

This script will scan through a locally cloned copy of the [Cosmos chain-registry](https://github.com/cosmos/chain-registry) repository, find images matching specific criteria, convert them to the desired format (`WEBP` with transparent backgrounds), and resize them to a square of 100x100 pixels.

### Structure

```
icongen/
├── convertImages.js     # Main script for processing and converting images
├── chain_icons/         # Output directory for converted registry icons
├── custom_icons/        # Output directory for converted custom icons
├── jobs/                # Directory for storing custom image conversion jobs
├── README.md            # Project documentation
└── .gitignore           # Git ignore file for excluding unnecessary files
```

- **chain_icons/**: Stores icons processed from the Cosmos chain-registry. These images are standardized to 100x100 pixels in `WEBP` format for consistent use across applications.
- **custom_icons/**: Stores icons generated from custom jobs, allowing for any additional images or custom use-cases outside of the chain-registry.
- **jobs/**: Contains custom images to be processed. You can add any image here that you want to convert, resize, and store in the `custom_icons` directory.

## Dependencies

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Yarn](https://yarnpkg.com/) for package management
- [Sharp](https://sharp.pixelplumbing.com/) library for image processing

## Process

1. **Directory Scanning**: The script scans each subdirectory in the `chain-registry` repository, ignoring any directories that start with `_` and the `testnets` directory.
2. **JSON Parsing**: For each directory, it checks for `assetlist.json` and `chain.json` files to extract key values such as `display` and `chain_name`.
3. **Image Matching**: The script searches for images in the `images` subdirectory that match either the parent directory name, the `display` name from `assetlist.json`, or the `chain_name` from `chain.json`.
4. **Image Conversion**: Matching images are converted to `WEBP` format, resized to 100x100 pixels, and saved in the `chain_icons` output directory.

## Installation

1. Clone the [Cosmos chain-registry](https://github.com/cosmos/chain-registry) repository into the same parent directory (a common "repos" directory, for example):
   ```bash
   git clone https://github.com/cosmos/chain-registry.git
   ```

2. Navigate to `icongen` directory:
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

Processed images will be saved in the `chain_icons` or `custom_icons` directories in `WEBP` format with a transparent background, at 100x100 pixels.

### Menu Options

When you run the script, you will be prompted to choose between:

1. **Process Registry Images**: Scan and create logos for each chain from the registry.
2. **Process Custom Images**: Convert images from the `jobs` directory. This is useful for any non-registry images you need processed.

## Customization

The script is simple and straightforward to modify. It uses the `sharp` library, which supports a large number of formats and additional processing options, allowing you to extend or adjust the image transformation as needed.

## Contributing

Feel free to open an issue or submit a pull request if you find a bug or have a feature request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cosmos Network](https://cosmos.network/) and its dedicated volunteer maintainers for providing the [chain-registry](https://github.com/cosmos/chain-registry) repository.
- [Sharp](https://sharp.pixelplumbing.com/) library for god tier image processing.

