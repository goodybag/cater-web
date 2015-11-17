import {Store} from 'tokyo';
import {inject} from 'yokohama';
import {Dispatcher} from 'flux';
import {Route} from 'hiroshima';

import {OrderCollection} from '../models/order';
import {API_PREFIX} from '../config';

@inject(Route)
class OrdersResolver {
    constructor({params}) {
        const orders = new OrderCollection([], {
            url: `${API_PREFIX}/restaurants/${params.restaurant_id}/orders`
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
