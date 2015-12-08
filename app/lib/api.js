import Promise from 'bluebird';
import request from 'superagent';
import {resolve as resolveURL} from 'url';

import {API_PREFIX} from '../config';

export function fetchEndpoint(path) {
    const url = resolveURL(API_PREFIX, path);

    return Promise.try(() => {
        return request
            .get(url)
            .accept('json')
            .withCredentials();
    }).then(res => res.body);
}
