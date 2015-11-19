import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Route} from 'hiroshima';
import {Dispatcher} from 'flux';

import {Restaurant} from '../models/restaurant';

@dependencies(Route)
export class RestaurantResolver {
    constructor({params}) {
        const restaurant = new Restaurant({id: params.restaurant_id});

        return restaurant.fetch().then(() => restaurant);
    }
}

@dependencies(Dispatcher, RestaurantResolver)
export class RestaurantStore extends Store {
    constructor(dispatcher, restaurant) {
        super(dispatcher);

        this.restaurant = restaurant;
        this.restaurant.on('change', () => this.emit('change'));
    }

    getRestaurant() {
        return this.restaurant;
    }
}
