import {dependencies} from 'yokohama';

import {ApiService} from '../lib/api';
import {Restaurant} from '../models/restaurant';
import {Order} from '../models/order';

@dependencies(ApiService)
export class RestaurantService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    fetchById(id) {
        return this.apiService.fetchEndpoint(`restaurants/${id}`)
            .then(Restaurant.parse);
    }

    fetchCurrentOrder(restaurant_id) {
        return this.apiService.fetchEndpoint(`restaurants/${restaurant_id}/orders/current`)
            .then(Order.parse, err => null );
    }
}
