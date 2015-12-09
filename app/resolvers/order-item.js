import {dependencies} from 'yokohama';

import {OrderItemService} from '../services/order-item';

@dependencies(OrderItemService)
export class OrderItemsResolver {
    constructor(orderItemService) {
        return orderItemService.fetchAllByOrderId(process.env.GOODYBAG_ORDER_ID);
    }
}
