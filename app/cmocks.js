import {mocks as resolvers} from './resolvers/cmocks';
import {mocks as services} from './services/cmocks';
import {mocks as stores} from './stores/cmocks';
import {mocks as lib} from './lib/cmocks';
import {mocks as payloads} from './payloads/cmocks';
import {mocks as generics} from './mocks';

export const mocks = [
    ...generics,
    ...resolvers,
    ...services,
    ...stores,
    ...lib,
    ...payloads
];
