import {dependencies} from 'yokohama';

import {ApiService} from '../lib/api';
import {Restaurant} from '../models/restaurant';

@dependencies(ApiService)
export class RestaurantService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    fetchById(id) {
        return this.apiService.fetchEndpoint(`restaurants/${id}`)
            .then(Restaurant.parse);
    }
}
