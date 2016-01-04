import {provide} from 'yokohama';

import {CacheDump} from '../config';

@provide(CacheDump)
export class ClientCacheDump {
    constructor() {
        return __GBDATA__;
    }
}
