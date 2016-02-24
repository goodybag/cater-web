import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {Restaurant} from '../models/restaurant';
import {RestaurantHours} from '../models/restaurant-hour';

@dependencies(Dispatcher, Restaurant, RestaurantHours)
export class RestaurantStore extends Store {
    constructor(dispatcher, restaurant, hours) {
        super(dispatcher);

        this.restaurant = restaurant;
        this.restaurantHours = hours;
    }

    getRestaurant() {
        return this.restaurant;
    }

    getRestaurantHours() {
        return this.restaurantHours;
    }
}
