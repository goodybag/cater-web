import url from 'url';
import {MANIFEST, CDN_PREFIX} from './config';

const cache = {};

export function urlForAsset(assetName) {
    return cache[assetName] || (cache[assetName] = genURL(assetName));
}

function genURL(assetName) {
    return url.resolve(CDN_PREFIX, MANIFEST[assetName] || assetName);
}
