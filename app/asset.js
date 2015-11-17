import url from 'url';
import {manifest, CDN_PREFIX} from './config';

export function urlForAsset(assetName) {
    return url.resolve(CDN_PREFIX, manifest[assetName] || assetName);
}
