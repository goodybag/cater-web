import React from 'react';
import url from 'url';
import {Resolver, provide} from 'yokohama';
import {Route} from 'hiroshima';
import {render} from 'react-dom';
import {Injector} from 'di';

import router from '../router';
import {preventDefault, stopPropogation} from './dom';
import {MainContainerComponent} from '../components/main';

export function getContextFromURL(href) {
    const {
        pathname: path,
        query
    } = url.parse(href, true);

    const {components, params} = router.match(path, {method: 'get', query});

    const route = new Route({href, path, params, query});

    @provide(Route)
    class MockRoute {
        constructor() {
            return route;
        }
    }

    const injector = new Injector([MockRoute]);

    const resolver = Resolver.from(components, injector);

    return {route, resolver, components};
}

export function renderPage({route, components, dependencies}, element, cb) {
    const main = (
        <MainContainerComponent
            route={route}
            components={components}
            dependencies={dependencies}
        />
    );

    render(main, element, cb);
}

export function handleReroute(event, element) {
    const {href} = event.delegateTarget;
    const {route, components, resolver} = getContextFromURL(href);

    // Only handle reroute if the route matches
    // TODO: check domains in addition to doing this
    if (components.length !== 0) {
        preventDefault(event);
        stopPropogation(event);

        window.history.pushState({}, '', href);

        resolver.resolve().then(function(dependencies) {
            renderPage({route, components, dependencies}, element);
        });
    }
}
