import {Store} from 'tokyo';
import {inject, injectPromise} from 'yokohama';
import {Dispatcher} from 'flux';

import {OrderItemCollection} from '../models/order-item';

@injectPromise()
class OrderItemsResolver {
    constructor() {
        const orderItems = new OrderItemCollection(null, {
            order_id: process.env.GOODYBAG_ORDER_ID
        });

        return orderItems.fetch().then(() => orderItems);
    }
}

@inject(Dispatcher, OrderItemsResolver)
export class OrderItemStore extends Store {
    constructor(dispatcher, orderItems) {
        super(dispatcher);

        this.orderItems = orderItems;
        this.orderItems.on('add change remove', () => this.emit('change'));
    }

    getOrderItems() {
        return this.orderItems;
    }
}
