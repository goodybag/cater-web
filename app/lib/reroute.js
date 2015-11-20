import React from 'react';
import url from 'url';
import {Injector, provide} from 'yokohama';
import {Route} from 'hiroshima';
import {render} from 'react-dom';

import router from '../router';
import {preventDefault, stopPropogation} from './dom';
import {MainContainerComponent} from '../components/main';

export const sharedInjector = new Injector();

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

    const injector = sharedInjector.createChild([MockRoute]);

    const tokens = components.map(component => component.Dependency);

    return {route, injector, tokens, components};
}

export function renderPage({route, components, dependencyCache}, element, cb) {
    const main = (
        <MainContainerComponent
            route={route}
            components={components}
            dependencyCache={dependencyCache}
        />
    );

    render(main, element, cb);
}

export function handleReroute(event, element) {
    const {href} = event.delegateTarget;
    const {route, tokens, components, injector} = getContextFromURL(href);

    // Only handle reroute if the route matches
    // TODO: check domains in addition to doing this
    if (components.length !== 0) {
        preventDefault(event);
        stopPropogation(event);

        window.history.pushState({}, '', href);

        injector.get(tokens).then(values => {
            const dependencyCache = injector.dump();

            renderPage({route, components, dependencyCache}, element);
        });
    }
}
