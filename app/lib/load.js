import link from 'link-delegate';
import Promise from 'bluebird';
import 'babel-polyfill';

import {handleError} from './error';
import {getContextFromURL, renderPage, handleReroute} from './reroute';
import {ModalState} from './modal';

/**
 * The entry point for the client-side application.
 * This just sets up the inital page (by delegating
 * to the reroute module) and assigns listeners for
 * link events.
 */
export function load(element, currentContext = {}) {
    return Promise.try(() => {
        const href = window.location.href;

        const context = getContextFromURL(href, currentContext);
        const {route, injector, tokens, components} = context;

        return injector.get(tokens).then(values => {
            const dependencyCache = injector.dump();

            // Listen to change events to update the body
            if (dependencyCache.has(ModalState)) {
                let modals = dependencyCache.get(ModalState);
                modals.registerToBody(document.body);
            }

            return Promise.fromNode(cb => {
                renderPage({route, components, dependencyCache}, element, cb);
            });
        }).then(() => {
            // don't handle routing client-side for IE 7/8/9
            if ([7, 8, 9].indexOf(document.documentMode) === -1) {
                link(function(event) {
                    handleReroute(event, element, context);
                });

                window.addEventListener('popstate', () => {
                    load(element, context);
                });
            }
        });
    }).catch(err => handleError(err, element));
}
