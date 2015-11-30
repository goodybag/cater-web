import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {OrderService} from '../services/order';

@dependencies(OrderService)
class OrderResolver {
    constructor(orderService) {
        return orderService.fetchById(process.env.GOODYBAG_ORDER_ID);
    }
}

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
