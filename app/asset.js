import url from 'url';

var manifest;

if (process.env.NODE_ENV === 'production') {
    manifest = require('../rev-manifest');
}

function fromManifest(assetName) {
    if (manifest) {
        return manifest(assetName);
    } else {
        return assetName;
    }
}

const prefix = process.env.GOODYBAG_CDN_PREFIX;

export function urlForAsset(assetName) {
    return url.resolve(prefix, fromManifest(assetName));
}
