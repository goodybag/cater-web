import link from 'link-delegate';
import Promise from 'bluebird';

import {handleError} from './error';
import {getContextFromURL, renderPage, handleReroute} from './reroute';

/**
 * The entry point for the client-side application.
 * This just sets up the inital page (by delegating
 * to the reroute module) and assigns listeners for
 * link events.
 */
export function load(element) {
    return Promise.try(() => {
        const href = window.location.href;

        const context = getContextFromURL(href);
        const {route, injector, tokens, components} = context;

        return injector.get(tokens).then(values => {
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
        });
    }).catch(err => handleError(err, element));
}
