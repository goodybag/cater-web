import {IncomingMessage} from 'http';
import {dependencies} from 'yokohama';
import {getPolyfillString} from 'polyfill-service';

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
