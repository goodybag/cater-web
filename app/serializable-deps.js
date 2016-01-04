import {Config} from './lib/config';
import {CurrentUserResolver} from './resolvers/user';
import {RestaurantResolver} from './resolvers/restaurant';
import {OrderResolver} from './resolvers/order';

import {User} from './models/user';
import {Restaurant} from './models/restaurant';
import {Order} from './models/order';

export const serializableDependencies = [
    {name: 'config', token: Config, parser: Config.parse},
    {name: 'currentUser', token: CurrentUserResolver, parser: User.parse},
    {name: 'restaurant', token: RestaurantResolver, parser: Restaurant.parse},
    {name: 'order', token: OrderResolver, parser: Order.parse}
];

export function getSerializableDependencies(config) {
    if (config.serverRendering) {
        return serializableDependencies;
    } else {
        // If server rendering is disabled,
        // we only serialize the config.
        return [
            {name: 'config', token: Config, parser: Config.parse}
        ];
    }
}
