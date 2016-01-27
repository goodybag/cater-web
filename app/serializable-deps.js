import {Config} from './lib/config';
import {CurrentUserResolver} from './resolvers/user';
import {OrderResolver} from './resolvers/order';
import {RestaurantPayload} from './payloads/restaurant';
import {MenuCategories} from './models/category';

import {User} from './models/user';
import {Order} from './models/order';

export const serializableDependencies = [
    {name: 'config', token: Config},
    {name: 'currentUser', token: CurrentUserResolver, parser: User.parse},
    {name: 'restaurantPayload', token: RestaurantPayload},
    {name: 'order', token: OrderResolver, parser: Order.parse},
    {name: 'menuCategories', token: MenuCategories}
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
