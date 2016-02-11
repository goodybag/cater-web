import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {Restaurant} from '../models/restaurant';

@dependencies(Dispatcher, Restaurant)
export class RestaurantStore extends Store {
    constructor(dispatcher, restaurant) {
        super(dispatcher);

        this.restaurant = restaurant;
    }

    getRestaurant() {
        return this.restaurant;
    }
}
