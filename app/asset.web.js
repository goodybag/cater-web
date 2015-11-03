import url from 'url';

const isProd = process.env.NODE_ENV === 'production';

const prefix = process.env.GOODYBAG_CDN_PREFIX;

export function urlForAsset(assetName) {
    if (isProd) {
        return assetName;
    } else {
        return url.resolve(prefix, assetName);
    }
}
