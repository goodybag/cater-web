import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {RestaurantResolver} from '../resolvers/restaurant';

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
