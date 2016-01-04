import {mocks as resolvers} from './resolvers/mocks';
import {mocks as services} from './services/mocks';
import {mocks as stores} from './stores/mocks';
import {mocks as lib} from './lib/mocks';

export const mocks = [
    ...resolvers,
    ...services,
    ...stores,
    ...lib
];
