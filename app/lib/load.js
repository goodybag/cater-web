import link from 'link-delegate';
import Promise from 'bluebird';

import {handleError} from './error';
import {getContextFromURL, renderPage, handleReroute} from './reroute';

export function load(element) {
    const href = window.location.href;

    const {route, resolver, components} = getContextFromURL(href);

    resolver.resolve().then(dependencies => {
        return Promise.fromNode(cb => {
            renderPage({route, components, dependencies}, element, cb);
        });
    }).then(() => {
        // don't handle routing client-side for IE 7/8/9
        if ([7, 8, 9].indexOf(document.documentMode) === -1) {
            link(function(event) {
                handleReroute(event, element);
            });
        }
    }).catch(handleError);
}
