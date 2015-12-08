import link from 'link-delegate';
import Promise from 'bluebird';

import {handleError} from './error';
import {getContextFromURL, renderPage, handleReroute} from './reroute';

export function load(element) {
    const href = window.location.href;

    const context = getContextFromURL(href);
    const {route, injector, tokens, components} = context;

    injector.get(tokens).then(values => {
        const dependencyCache = injector.dump();

        return Promise.fromNode(cb => {
            renderPage({route, components, dependencyCache}, element, cb);
        });
    }).then(() => {
        // don't handle routing client-side for IE 7/8/9
        if ([7, 8, 9].indexOf(document.documentMode) === -1) {
            link(function(event) {
                handleReroute(event, element, context);
            });
        }
    }).catch(handleError);
}
