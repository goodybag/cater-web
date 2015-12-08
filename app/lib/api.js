import Promise from 'bluebird';
import request from 'superagent';
import {dependencies} from 'yokohama';

import {Config} from './config';

@dependencies(Config)
export class ApiService {
    constructor(config) {
        this.config = config;
    }

    fetchEndpoint(path) {
        const url = this.config.resolveResourceURL(path);

        return Promise.try(() => {
            return request
                .get(url)
                .accept('json')
                .withCredentials();
        }).then(res => res.body);
    }
}
