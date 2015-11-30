import Promise from 'bluebird';
import request from 'superagent';
import url from 'url';

import {API_PREFIX} from '../config';
import {Category} from '../models/category';
import {MenuItem} from '../models/menu-item';

export class MenuService {
    fetchMenuItemsByRestaurantId(id) {
        const endpoint = url.resolve(API_PREFIX, `restaurants/${id}/items`);

        return Promise.try(() => {
            return request
                .get(endpoint)
                .accept('json')
                .withCredentials();
        }).then(res => {
            return res.body.map(MenuItem.parse);
        });
    }

    fetchCategoriesByRestaurantId(id) {
        const endpoint = url.resolve(API_PREFIX, `restaurants/${id}/categories`);

        return Promise.try(() => {
            return request
                .get(endpoint)
                .accept('json')
                .withCredentials();
        }).then(res => {
            return res.body.map(Category.parse);
        });
    }
}
