import {Store} from 'tokyo';
import {inject} from 'yokohama';
import {Route} from 'hiroshima';
import {Dispatcher} from 'flux';

import {Restaurant} from '../models/restaurant';

@inject(Route)
export class RestaurantResolver {
    constructor({params}) {
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
