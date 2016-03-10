import {dependencies} from 'yokohama';

import {CurrentUser} from '../models/user';
import {RestaurantPayload} from '../payloads/restaurant';
import {
    fulfillabilitySchema,
    deadlineSchema,
    geocodingSchema
} from '../schemas/order-params';

@dependencies(CurrentUser, RestaurantPayload)
export class OrderParamsValidator {
    constructor(user, restaurantPayload) {
        this.user = user;
        this.restaurantPayload = restaurantPayload;
    }

    schema(params) {
        const {
            restaurant,
            restaurantDeliveryLeadTimes,
            restaurantPickupLeadTimes,
            restaurantDeliveryHours,
            restaurantPickupHours,
            restaurantDeliveryZips
        } = this.restaurantPayload;

        return fulfillabilitySchema(params, {
            timezone: this.user.region.timezone,

            restaurant: {
                ...restaurant,
                lead_times: restaurantDeliveryLeadTimes,
                pickup_lead_times: restaurantPickupLeadTimes,
                hours: restaurantPickupHours,
                delivery_hours: restaurantDeliveryHours,
                delivery_zips: restaurantDeliveryZips
            },

            now: new Date()
        });
    }

    geocodingSchema(address) {
        return geocodingSchema(address);
    }

    deadlineSchema(order, now) {
        return deadlineSchema(order, now);
    }
}
