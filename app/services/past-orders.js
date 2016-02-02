import {dependencies} from 'yokohama';

import {ApiService} from '../lib/api';
import {Order} from '../models/order';

@dependencies(ApiService)
export class PastOrdersService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    fetchByRestaurantId(id) {
        return this.apiService.fetchEndpoint(`restaurants/${id}/orders`)
            .then(orders => orders.map(Order.parse))
            .catch(err => console.log(err));
    }

    duplicateOrderByOrderId(id) {
        return this.apiService.create(`orders/${id}/duplicates`)
            .then(Order.parse)
            .catch(err => console.log(err));
    }

    updateOrderStatusByOrderId(id, newStatus) {
        return this.apiService.update(`orders/silent/${id}`, { status: newStatus })
            .then(Order.parse)
            .catch(err => console.log(err));
    }
}
