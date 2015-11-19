import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {OrderItemCollection} from '../models/order-item';

@dependencies()
class OrderItemsResolver {
    constructor() {
        const orderItems = new OrderItemCollection(null, {
            order_id: process.env.GOODYBAG_ORDER_ID
        });

        return orderItems.fetch().then(() => orderItems);
    }
}

@dependencies(Dispatcher, OrderItemsResolver)
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
