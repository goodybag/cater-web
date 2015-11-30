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
    constructor(dispatcher, menuItems, categories) {
        super(dispatcher);

        this.menuItems = menuItems;
        this.categories = categories;
    }

    getMenuItems() {
        return this.menuItems;
    }

    getCategories() {
        return this.categories;
    }
}
