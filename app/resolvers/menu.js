import {dependencies} from 'yokohama';

import {RouteParams} from '../lib/route';
import {MenuService} from '../services/menu';
import {RestaurantPayload} from '../payloads/restaurant';

@dependencies(RouteParams, RestaurantPayload)
export class MenuItemsResolver {
    constructor(params, {menuItems}) {
        return menuItems;
    }
}

@dependencies(RouteParams, MenuService)
export class CategoriesResolver {
    constructor(params, menuService) {
        return menuService.fetchCategoriesByRestaurantId(params.restaurant_id);
    }
}
