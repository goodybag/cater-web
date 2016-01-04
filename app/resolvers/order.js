import {dependencies} from 'yokohama';

import {OrderService} from '../services/order'
import {RestaurantService} from '../services/restaurant';
import {RouteParams} from '../lib/route';
import {Order} from '../models/order';

@dependencies(OrderService, RestaurantService, RouteParams)
export class OrderResolver {
    constructor(orderService, restaurantService, params) {
        return restaurantService.fetchCurrentOrder(params.restaurant_id).then( order => {
            return order ? orderService.fetchById( order.id ) : new Order({});
        });
    }
}
