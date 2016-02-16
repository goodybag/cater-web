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

    fetchAllForCurrentOrderByRestaurantId(restaurantId) {
        return this.apiService.fetchEndpoint(`restaurants/${restaurantId}/orders/current/items`)
            .then(items => items.map(OrderItem.parse))
            .catch(err => console.log(err));
    }

    createOrderItem(orderId, data) {
        return this.apiService.create(`orders/${orderId}/items`, data)
            .then(OrderItem.parse);
    }

    updateOrderItem(id, orderId, data) {
        return this.apiService.update(`orders/${orderId}/items/${id}`, data)
            .then(OrderItem.parse);
    }

    removeOrderItem(id, orderId) {
        return this.apiService.delete(`orders/${orderId}/items/${id}`)
            .catch(err => console.log(err));
    }
}
