import Promise from 'bluebird';
import request from 'superagent';
import url from 'url';

import {API_PREFIX} from '../config';
import {Order} from '../models/order';

export class OrderService {
    fetchById(id) {
        const endpoint = url.resolve(API_PREFIX, `orders/${id}`);

        return Promise.try(() => {
            return request
                .get(endpoint)
                .accept('json')
                .withCredentials();
        }).then(res => {
            return Order.parse(res.body);
        });
    }
}
