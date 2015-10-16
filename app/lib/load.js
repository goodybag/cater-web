import link from 'link-delegate';

import {getContextFromURL, renderPage, handleReroute} from './reroute';

export function load(element) {
    const href = window.location.href;

    const {route, resolver, components} = getContextFromURL(href);

    resolver.resolve().then(function(dependencies) {
        renderPage({route, components, dependencies}, element, function() {
            // don't handle routing client-side for IE 7/8/9
            if ([7, 8, 9].indexOf(document.documentMode) === -1) {
                link(function(event) {
                    handleReroute(event, element);
                });
            }
        });
    });
}
