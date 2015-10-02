import {Store} from 'tokyo';
import {inject} from 'yokohama';
import {Params} from '../lib/injection';
import {Dispatcher} from 'flux';

import {Restaurant} from '../models/restaurant';

@inject(Params)
export class RestaurantResolver {
    static parse(restaurant) {
        return new Restaurant(restaurant, {parse: true});
    }

    constructor(params) {
        const restaurant = new Restaurant({id: params.restaurant_id});

        return restaurant.fetch().then(() => restaurant);
    }
}

@inject(Dispatcher, RestaurantResolver)
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
