import each from 'lodash/collection/each';
import {dependencies, provide} from 'yokohama';

import {CacheDump} from './config';
import {getSerializableDependencies} from '../serializable-deps';

export function generateParsingMocks(config) {
    const deps = getSerializableDependencies(config)

    return deps.map(({name, token, parser}) => {
        @provide(token)
        @dependencies(CacheDump)
        class DependencyParser {
            constructor(cache) {
                if (cache[name] != null) {
                    return parser(cache[name]);
                } else {
                    throw new TypeError(`Cached instance for ${name} not found. Is the server out of sync?`);
                }
            }
        }

        return DependencyParser;
    });
}