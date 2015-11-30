import Promise from 'bluebird';
import request from 'superagent';
import url from 'url';

import {API_PREFIX} from '../config';
import {OrderItem} from '../models/order-item';

export class OrderItemService {
    fetchAllByOrderId(id) {
        const endpoint = url.resolve(API_PREFIX, `orders/${id}/items`);

        return Promise.try(() => {
            return request
                .get(endpoint)
                .accept('json')
                .withCredentials();
        }).then(res => {
            return res.body.map(OrderItem.parse);
        });
    }
}
