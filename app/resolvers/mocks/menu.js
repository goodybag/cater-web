import {dependencies, provide} from 'yokohama';

import {RouteParams} from '../../lib/route';
import {MenuService} from '../../services/menu';
import {MenuCategories} from '../../models/category';

@provide(MenuCategories)
@dependencies(RouteParams, MenuService)
export class MenuCategoriesResolver {
    constructor(params, menuService) {
        return menuService.fetchCategoriesByRestaurantId(params.restaurant_id);
    }
}
