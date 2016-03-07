import {dependencies, provide} from 'yokohama';

import {RouteParams} from '../../lib/route';
import {MenuService} from '../../services/menu';
import {RestaurantPayload} from '../../payloads/restaurant';
import {MenuItems} from '../../models/menu-item';

@provide(MenuItems)
@dependencies(RestaurantPayload)
export class MenuItemsResolver {
    constructor(payload) {
        return payload.menuItems;
    }
}
