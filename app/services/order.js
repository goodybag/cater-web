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
}
