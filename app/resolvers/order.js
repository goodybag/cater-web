import {dependencies} from 'yokohama';

import {OrderService} from '../services/order'
import {RouteParams} from '../lib/route';
import {Order} from '../models/order';

@dependencies(OrderService, RouteParams)
export class OrderResolver {
    constructor(orderService, params) {
        return orderService.fetchCurrentByRestaurantId(params.restaurant_id);
    }
}
