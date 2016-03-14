import {dependencies, provide} from 'yokohama';

import {RouteParams} from '../../lib/route';
import {PastOrdersService} from '../../services/past-orders';
import {PastOrders} from '../../models/order';

@provide(PastOrders)
@dependencies(PastOrdersService, RouteParams)
export class PastOrdersResolver {
    constructor(pastOrdersService, params) {
        return pastOrdersService.fetchByRestaurantId(params.restaurant_id);
    }
}
