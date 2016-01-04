import {dependencies} from 'yokohama';

import {OrderItemService} from '../services/order-item';
import {RestaurantService} from '../services/restaurant';
import {RouteParams} from '../lib/route';

@dependencies(OrderItemService, RestaurantService, RouteParams)
export class OrderItemsResolver {
    constructor(orderItemService, restaurantService, params) {
        return restaurantService.getCurrentOrder(params.restaurant_id).then( order => {
            return order ? orderItemService.fetchAllByOrderId( order.id ) : [];
        });
    }
}
