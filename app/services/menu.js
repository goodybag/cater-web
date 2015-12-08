import {fetchEndpoint} from '../lib/api';
import {Category} from '../models/category';
import {MenuItem} from '../models/menu-item';

export class MenuService {
    fetchMenuItemsByRestaurantId(id) {
        return fetchEndpoint(`restaurants/${id}/items`)
            .then(rawItems => rawItems.map(MenuItem.parse));
    }

    fetchCategoriesByRestaurantId(id) {
        return fetchEndpoint(`restaurants/${id}/categories`)
            .then(rawCats => rawCats.map(Category.parse));
    }
}
