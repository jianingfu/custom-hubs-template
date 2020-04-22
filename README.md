# custom-hubs-template

## Setup

1) Fork this repository!
2) Install dependencies:  `npm install`
3) The `postinstall` script will automatically clone mozilla/hubs and apply patches to make customizations easier. 

## Development

This template is designed to make it easier to create and maintain a customized Hubs client. 

1) Register components/systems in `hub.inject.js`
2) Start a local development server: `npm run start`

To build and deploy for GitHub Pages (in a `gh-pages` branch):

1) `npm run build-gh`
2) `npm run deploy-gh` 

*Make sure GitHub Pages is configured appropriately in your fork*

## Making new patches

For more complex changes, you can patch Hubs directly without needing to fork it!

1) Make changes to Hubs source in the `hubs` directory (created during installation)
2) Execute `npm run makepatch` to create a new patch file 
3) Rename the patch file saved in `patches/RENAME_ME.patch`

## Notes for Added Features

*not able to find/locate the json files in the import statement in this template*

### Clock
implemented a digital & analog clock with Threejs.

### Construct Texture Atlas

To construct a texture atlas:

- `npm install -g gulp`
- `npm install gulp-free-tex-packer`
- `gulp`
- The image file and json file will be in the `dest` folder.
- add `export default` before the every first `{` in `atlas.json` and rename the file to `atlas.js`

The basic logic is mapping different parts of a texture atlas to poster boards, when the carema position is close to on poster, replace the texture with a high resolution picture.

### EventTree

used twison *https://github.com/lazerwalker/twison* to convert Twine story format to JSON.
The goal is to append each node with separate/independent animation, and users able to trigger events to go through the nodes according to the JSON data.





