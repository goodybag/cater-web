export var manifest = {};

if (process.env.NODE_ENV === 'production') {
    manifest = require('../rev-manifest');
}

export const CDN_PREFIX = process.env.GOODYBAG_CDN_PREFIX;
export const API_PREFIX = process.env.GOODYBAG_API_PREFIX;
