import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';
import url from 'url';

import {RouteParams} from '../lib/route';
import {OrderCollection} from '../models/order';
import {API_PREFIX} from '../config';

@dependencies(RouteParams)
class OrdersResolver {
    constructor(params) {
        const orders = new OrderCollection([], {
            url: url.resolve(API_PREFIX,
                             `restaurants/${params.restaurant_id}/orders`)
        });

        return orders.fetch().then(() => orders);
    }
}

@dependencies(Dispatcher, OrdersResolver)
export class PastOrdersStore extends Store {
    constructor(dispatcher, orders) {
        super(dispatcher);

        this.orders = orders;
        this.orders.on('change', () => this.emit('change'));
    }

    getOrders() {
        return this.orders;
    }
}
