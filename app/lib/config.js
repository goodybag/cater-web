import {provide} from 'yokohama';
import {memoize} from 'lodash-decorators';
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
            serverRendering = true
        } = options;

        this.env = env;
        this.manifest = manifest;
        this.cdnPrefix = cdnPrefix;
        this.apiPrefix = apiPrefix;
        this.serverRendering = serverRendering;
    }

    @memoize()
    resolveAssetURL(assetName) {
        return resolveURL(this.cdnPrefix,
                          this.manifest[assetName] || assetName);
    }

    @memoize()
    resolveResourceURL(resourcePath) {
        return resolveURL(this.apiPrefix, resourcePath);
    }
}

/**
 * An identifier (intended to be mocked)
 * for the JSON dump of the injector cache.
 */
export class CacheDump {}
