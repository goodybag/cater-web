import {dependencies} from 'yokohama';

import {ApiService} from '../lib/api';
import {Category} from '../models/category';
import {MenuItem} from '../models/menu-item';

@dependencies(ApiService)
export class MenuService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    fetchMenuItemsByRestaurantId(id) {
        return this.apiService.fetchEndpoint(`restaurants/${id}/items`)
            .then(rawItems => rawItems.map(MenuItem.parse));
    }

    fetchCategoriesByRestaurantId(id) {
        return this.apiService.fetchEndpoint(`restaurants/${id}/categories`)
            .then(rawCats => rawCats.map(Category.parse));
    }
}
