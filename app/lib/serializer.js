import {dependencies} from 'yokohama';

import {getSerializableDependencies} from '../serializable-deps';
import {Config} from './config';

@dependencies(Config)
export class DependencySerializer {
    constructor(config) {
        this.config = config;
    }

    serializeCache(cache) {
        const depTokens = getSerializableDependencies(this.config);

        const blob = {};

        depTokens.forEach(({name, token}) => {
            if (cache.has(token)) {
                blob[name] = cache.get(token);
            }
        });

        return blob;
    }
}
