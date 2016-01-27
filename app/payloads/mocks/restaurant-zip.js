import {dependencies, provide} from 'yokohama';

import {ApiService} from '../../lib/api';
import {RestaurantPayload} from '../restaurant';
import {RestaurantDeliveryZips} from '../../models/restaurant-zip';

@provide(RestaurantDeliveryZips)
@dependencies(RestaurantPayload)
export class RestaurantDeliveryZipsResolver {
    constructor(payload) {
        return payload.restaurantDeliveryZips;
    }
}
