import Promise from 'bluebird';
import request from 'superagent';
import {dependencies} from 'yokohama';

import {Config} from './config';

/**
 * Wraps superagent implementation to work with
 * json and provide cookies and stuff. This
 * uses the config to generate URLs or something.
 */
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

    fetch(path) {
        return this.fetchEndpoint(path);
    }

    create(path, data) {
        const url = this.config.resolveResourceURL(path);

        return Promise.try(() => {
            return request
                .post(url)
                .send(data)
                .accept('json')
                .withCredentials();
        }).then(res => res.body);
    }

    update(path, data) {
        const url = this.config.resolveResourceURL(path);

        return Promise.try(() => {
            return request
                .put(url)
                .send(data || {})
                .accept('json')
                .withCredentials();
        }).then(res => res.body);
    }

    delete(path, data) {
        const url = this.config.resolveResourceURL(path);

        return Promise.try(() => {
            return request
                .delete(url)
                .send(data || {})
                .accept('json')
                .withCredentials();
        }).then(res => res.body);
    }
}
