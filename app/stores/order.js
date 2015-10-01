import {Store} from 'tokyo';
import {inject, injectPromise} from 'yokohama';
import {Dispatcher} from 'flux';

import {Order} from '../models/order';

@injectPromise()
class OrderResolver {
    constructor() {
        const order = new Order({id: process.env.GOODYBAG_ORDER_ID});

        return order.fetch().then(() => order);
    }
}

@inject(Dispatcher, OrderResolver)
export class OrderStore extends Store {
    constructor(dispatcher, order) {
        super(dispatcher);

        this.order = order;
        this.order.on('change', () => this.emit('change'));
    }

    getOrder() {
        return this.order;
    }
}
