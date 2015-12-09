import {dependencies} from 'yokohama';

import {RouteParams} from '../lib/route';
import {MenuService} from '../services/menu';

@dependencies(RouteParams, MenuService)
export class MenuItemsResolver {
    constructor(params, menuService) {
        return menuService.fetchMenuItemsByRestaurantId(params.restaurant_id);
    }
}

@dependencies(RouteParams, MenuService)
export class CategoriesResolver {
    constructor(params, menuService) {
        return menuService.fetchCategoriesByRestaurantId(params.restaurant_id);
    }
}
