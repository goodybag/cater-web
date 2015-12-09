import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {OrderResolver} from '../resolvers/order';

@dependencies(Dispatcher, OrderResolver)
export class OrderStore extends Store {
    constructor(dispatcher, order) {
        super(dispatcher);

        this.order = order;
    }

    getOrder() {
        return this.order;
    }
}
