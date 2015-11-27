import Promise from 'bluebird';
import request from 'superagent';
import url from 'url';

import {API_PREFIX} from '../config';
import {Restaurant} from '../models/restaurant';

export class RestaurantService {
    fetchById(id) {
        const endpoint = url.resolve(API_PREFIX, `restaurants/${id}`);

        return Promise.try(() => {
            return request
                .get(endpoint)
                .accept('json')
                .withCredentials();
        }).then(res => {
            return Restaurant.parse(res.body);
        });
    }
}
