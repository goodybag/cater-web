import {mocks as resolvers} from './resolvers/smocks';
import {mocks as services} from './services/smocks';
import {mocks as stores} from './stores/smocks';
import {mocks as lib} from './lib/smocks';
import {mocks as payloads} from './payloads/smocks';
import {mocks as generics} from './mocks';

export const mocks = [
    ...generics,
    ...resolvers,
    ...services,
    ...stores,
    ...lib,
    ...payloads
];
