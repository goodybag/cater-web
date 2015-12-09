import {dependencies} from 'yokohama';

import {RouteParams} from '../lib/route';
import {RestaurantService} from '../services/restaurant';

@dependencies(RestaurantService, RouteParams)
export class RestaurantResolver {
    constructor(restaurantService, params) {
        return restaurantService.fetchById(params.restaurant_id);
    }
}
