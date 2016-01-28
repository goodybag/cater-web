import Promise from 'bluebird';
import request from 'superagent';
import {dependencies, provide} from 'yokohama';
import {IncomingMessage} from 'http';
import {resolve as resolveURL} from 'url';
import signature from 'cookie-signature';

import {Config} from '../config';
import {ApiService} from '../api';

@provide(ApiService)
@dependencies(Config, IncomingMessage)
export class ServerApiService {
    constructor(config, req) {
        this.config = config;
        this.req = req;
    }

    fetchEndpoint(path) {
        const url = resolveURL(`http://${this.req.headers.host}`,
                               this.config.resolveResourceURL(path));

        const cookie = signature.sign(this.req.session.id, 'rainbow kittens');

        return Promise.try(() => {
            return request
                .get(url)
                .accept('json')
                .set({Cookie: `connect.sid=s:${cookie}`});
        }).then(res => res.body);
    }

    fetch(path) {
        return this.fetchEndpoint(path);
    }
}
