import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {RouteParams} from '../lib/route';
import {RestaurantService} from '../services/restaurant';

@dependencies(RestaurantService, RouteParams)
export class RestaurantResolver {
    constructor(restaurantService, params) {
        return restaurantService.fetchById(params.restaurant_id);
    }
}

@dependencies(Dispatcher, RestaurantResolver)
export class RestaurantStore extends Store {
    constructor(dispatcher, restaurant) {
        super(dispatcher);

        this.restaurant = restaurant;
    }

    getRestaurant() {
        return this.restaurant;
    }
}
