import {dependencies} from 'yokohama';

import {OrderService} from '../services/order';

@dependencies(OrderService)
export class OrderResolver {
    constructor(orderService) {
        return orderService.fetchById(process.env.GOODYBAG_ORDER_ID);
    }
}
