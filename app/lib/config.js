import {provide} from 'yokohama';
import {resolve as resolveURL} from 'url';

/**
 * The base config class which contains default
 * configuration values for the system.
 */
export class Config {
    static parse(data) {
        return new Config(data);
    }

    constructor(options) {
        const {
            env = 'development',
            manifest = {},
            cdnPrefix = '/assets/',
            apiPrefix = '/api/',
            serverRendering = true,
            gmapsKey = 'AIzaSyBbsgtm6Tqdh3ZyWfRj2Mg_eSZDW8ajLss',
            baseUrl
        } = options;

        this.env = env;
        this.manifest = manifest;
        this.cdnPrefix = cdnPrefix;
        this.apiPrefix = apiPrefix;
        this.serverRendering = serverRendering;
        this.gmapsKey = gmapsKey;
        this.baseUrl = baseUrl;
    }

    resolveAssetURL(assetName) {
        return resolveURL(this.cdnPrefix,
                          this.manifest[assetName] || assetName);
    }

    resolveResourceURL(resourcePath) {
        return resolveURL(this.apiPrefix, resourcePath);
    }

    getBundleNames() {
        if (this.env === 'production') {
            return ['runtime.js'];
        } else {
            return ['common.js', 'bundle.js'];
        }
    }
}

/**
 * An identifier (intended to be mocked)
 * for the JSON dump of the injector cache.
 */
export class CacheDump {}
