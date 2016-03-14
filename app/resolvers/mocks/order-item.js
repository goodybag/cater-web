import {dependencies, provide} from 'yokohama';

import {OrderItemService} from '../../services/order-item';
import {OrderItems} from '../../models/order-item';
import {Order} from '../../models/order';

@provide(OrderItems)
@dependencies(OrderItemService, Order)
export class OrderItemsResolver {
    constructor(orderItemService, order) {
        if (order != null) {
            return orderItemService.fetchAllByOrderId(order.id);
        } else {
            return [];
        }
    }
}
