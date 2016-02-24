import {dependencies, provide} from 'yokohama';

import {ApiService} from '../../lib/api';
import {RestaurantPayload} from '../restaurant';
import {RestaurantHours} from '../../models/restaurant-hour';

@provide(RestaurantHours)
@dependencies(RestaurantPayload)
export class RestaurantHoursResolver {
    constructor(payload) {
        return payload.restaurantDeliveryHours;
    }
}
