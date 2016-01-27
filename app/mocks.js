import {mocks as resolvers} from './resolvers/mocks';
import {mocks as services} from './services/mocks';
import {mocks as stores} from './stores/mocks';
import {mocks as lib} from './lib/mocks';
import {mocks as payloads} from './payloads/mocks';

export const mocks = [
    ...resolvers,
    ...services,
    ...stores,
    ...lib,
    ...payloads
];
