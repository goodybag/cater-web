import {Config} from './lib/config';
import {RestaurantPayload} from './payloads/restaurant';
import {MenuCategories} from './models/category';
import {OrderItems} from './models/order-item';

import {CurrentUser} from './models/user';
import {Order, PastOrders} from './models/order';

export const serializableDependencies = [
    {name: 'config', token: Config},
    {name: 'currentUser', token: CurrentUser},
    {name: 'restaurantPayload', token: RestaurantPayload},
    {name: 'order', token: Order},
    {name: 'orderItems', token: OrderItems},
    {name: 'menuCategories', token: MenuCategories},
    {name: 'pastOrders', token: PastOrders}
];

export function getSerializableDependencies(config) {
    if (config.serverRendering) {
        return serializableDependencies;
    } else {
        // If server rendering is disabled,
        // we only serialize the config.
        return [
            {name: 'config', token: Config}
        ];
    }
}
