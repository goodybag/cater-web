import Promise from 'bluebird';
import request from 'superagent';
import url from 'url';

import {API_PREFIX} from '../config';
import {User} from '../models/user';

export class UserService {
    fetchCurrent(id) {
        const endpoint = url.resolve(API_PREFIX, 'users/me');

        return Promise.try(() => {
            return request
                .get(endpoint)
                .accept('json')
                .withCredentials();
        }).then(res => {
            return User.parse(res.body);
        });
    }
}
