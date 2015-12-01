import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

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

@dependencies(Dispatcher, MenuItemsResolver, CategoriesResolver)
export class MenuStore extends Store {
    constructor(dispatcher, items, categories) {
        super(dispatcher);

        this.items = items;
        this.categories = categories;
    }

    getItems() {
        return this.items;
    }

    getCategories() {
        return this.categories;
    }
}
