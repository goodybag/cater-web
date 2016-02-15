import {dependencies} from 'yokohama';

import {ApiService} from '../lib/api';
import {Order} from '../models/order';

@dependencies(ApiService)
export class OrderService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    fetchById(id) {
        return this.apiService.fetchEndpoint(`orders/${id}`)
            .then(Order.parse);
    }

    fetchCurrentByRestaurantId(restaurantId) {
        return this.apiService.fetchEndpoint(`restaurants/${restaurantId}/orders/current`)
        .then(body => {
            if (body != null) {
                return Order.parse(body);
            } else {
                return null;
            }
        }).catch(err => {
            if (err.status === 404) {
                return null;
            } else {
                throw err;
            }
        });
    }

    updateById(id, body) {
        return this.apiService.update(`orders/${id}`, body)
            .then(Order.parse);
    }
}
