export const MANIFEST = process.env.NODE_ENV === 'production'
    ? require('../rev-manifest') : {};

export const CDN_PREFIX = process.env.GOODYBAG_CDN_PREFIX || '/assets/';
export const API_PREFIX = process.env.GOODYBAG_API_PREFIX || '/api/';
