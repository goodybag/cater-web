import Promise from 'bluebird';
import each from 'lodash';
import {dependencies, provide} from 'yokohama';

import {CacheDump} from './config';
import {getSerializableDependencies} from '../serializable-deps';

export function generateParsingMocks(config) {
    const deps = getSerializableDependencies(config);

    return deps.map(({name, token, parser = token.parse}) => {
        @provide(token)
        @dependencies(CacheDump)
        class DependencyParser {
            constructor(cache) {
                if (cache.hasOwnProperty(name)) {
                    if (cache[name] == null) {
                        return Promise.resolve(null);
                    } else {
                        return parser(cache[name]);
                    }
                } else {
                    throw new TypeError(`Cached instance for ${name} not found. Is the server out of sync?`);
                }
            }
        }

        return __GBDATA__.hasOwnProperty(name) && DependencyParser;
    }).filter(x => x);
}
