import {dependencies, provide} from 'yokohama';

import {RouteParams} from '../../lib/route';
import {ApiService} from '../../lib/api';
import {RestaurantPayload} from '../restaurant';
import {Restaurant} from '../../models/restaurant';

@provide(RestaurantPayload)
@dependencies(ApiService, RouteParams)
export class RestaurantPayloadResolver {
    constructor(apiService, params) {
        this.apiService = apiService;
        this.params = params;

        return this.resolve();
    }

    resolve() {
        const id = this.params.restaurant_id;

        return this.apiService.fetch(`restaurants/${id}`).then(body => {
            return RestaurantPayload.parseResp(body);
        });
    }
}

@provide(Restaurant)
@dependencies(RestaurantPayload)
export class RestaurantResolver {
    constructor(payload) {
        return payload.restaurant;
    }
}
