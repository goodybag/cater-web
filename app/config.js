export const DEV_MODE = !!process.env.GOODYBAG_DEV_MODE;
export const MANIFEST = DEV_MODE ? {} : require('../rev-manifest');
export const CDN_PREFIX = process.env.GOODYBAG_CDN_PREFIX || '/assets/';
export const API_PREFIX = process.env.GOODYBAG_API_PREFIX || '/api/';
