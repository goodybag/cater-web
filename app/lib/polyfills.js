import {IncomingMessage} from 'http';
import {dependencies} from 'yokohama';
import {getPolyfillString} from 'polyfill-service';

/**
 * Dependency-ized wrapper for the `polyfill-service`
 * module. It injects the HTTP request object and uses
 * the user agent from that.
 *
 * TODO: handle the case when the `user-agent` header
 *       is missing.
 */
@dependencies(IncomingMessage)
export class Polyfills {
    constructor(req) {
        const userAgent = req.headers['user-agent'];

        getPolyfillString({
            uaString: userAgent,
            minify: true,
            features: {
                'Intl.~locale.en': {flags: []},
                'atob': {flags: ['gated']}
            }
        }).then(polyfillScript => {
            return {script: polyfillScript};
        }).catch(err => next(err));
    }
}
