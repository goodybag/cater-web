import {Store} from 'tokyo';
import {inject} from 'yokohama';
import {Dispatcher} from 'flux';
import {Params} from '../lib/injection';

import {OrderCollection} from '../models/order';

@inject(Params)
class OrdersResolver {
    constructor(params) {
        const orders = new OrderCollection([], {
            url: `${process.env.GOODYBAG_APP}/restaurants/${params.restaurant_id}/orders`
        });

        return orders.fetch().then(() => orders);
    }
}

@inject(Dispatcher, OrdersResolver)
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
