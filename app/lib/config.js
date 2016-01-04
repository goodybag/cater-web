import {provide} from 'yokohama';
import {memoize} from 'lodash-decorators';
import {resolve as resolveURL} from 'url';

/**
 * The base config class which contains default
 * configuration values for the system.
 */
export class Config {
    static uuid = 'ed4a2cc0-9dec-11e5-9a6b-7066be0520a2';

    static parse(data) {
        return new Config(data);
    }

    constructor(options) {
        const {
            env = 'development',
            manifest = {},
            cdnPrefix = '/assets/',
            apiPrefix = '/api/'
        } = options;

        this.env = env;
        this.manifest = manifest;
        this.cdnPrefix = cdnPrefix;
        this.apiPrefix = apiPrefix;
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
 * A mock implementation that parses configuration
 * information from the server-generated JSON cache;
 * in order to configure the bundle at runtime.
 */
@provide(Config)
export class ParseConfig {
    constructor() {
        return Config.parse(window.__GBDATA__[Config.uuid]);
    }
}
