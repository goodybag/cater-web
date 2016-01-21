import {dependencies} from 'yokohama';

import {OrderItemService} from '../services/order-item';
import {RouteParams} from '../lib/route';
import {OrderResolver} from './order';

@dependencies(OrderItemService, OrderResolver)
export class OrderItemsResolver {
    constructor(orderItemService, order) {
        if (order != null) {
            return orderItemService.fetchAllByOrderId(order.id);
        } else {
            return [];
        }
    }
}
