import {dependencies} from 'yokohama';

import {ApiService} from '../lib/api';
import {OrderItem} from '../models/order-item';

@dependencies(ApiService)
export class OrderItemService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    fetchAllByOrderId(id) {
        return this.apiService.fetchEndpoint(`orders/${id}/items`)
            .then(items => items.map(OrderItem.parse));
    }
}
