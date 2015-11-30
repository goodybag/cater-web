import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {OrderItemService} from '../services/order-item';

@dependencies(OrderItemService)
class OrderItemsResolver {
    constructor(orderItemService) {
        return orderItemService.fetchAllByOrderId(process.env.GOODYBAG_ORDER_ID);
    }
}

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
