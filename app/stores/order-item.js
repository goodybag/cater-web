import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {OrderItemsResolver} from '../resolvers/order-item';

@dependencies(Dispatcher, OrderItemsResolver)
export class OrderItemStore extends Store {
    constructor(dispatcher, orderItems) {
        super(dispatcher);

        this.orderItems = orderItems;
    }

    getOrderItems() {
        return this.orderItems;
    }
}
