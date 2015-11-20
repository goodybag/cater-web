import React from 'react';
import url from 'url';
import {Injector, provide} from 'yokohama';
import {Route} from 'hiroshima';
import {render} from 'react-dom';
import isEqual from 'lodash/lang/isEqual';

import router from '../router';
import {RouteParams} from './route';
import {preventDefault, stopPropogation} from './dom';
import {MainContainerComponent} from '../components/main';

export const sharedInjector = new Injector();

export function getContextFromURL(href, currentContext = {}) {
    const {
        pathname: path,
        query
    } = url.parse(href, true);

    const {components, params} = router.match(path, {method: 'get', query});

    const route = new Route({href, path, params, query});

    const injector = makeInjector(route, currentContext);

    const tokens = components.map(component => component.Dependency);

    return {route, injector, tokens, components};
}

// This is pretty hacky
function makeInjector(route, currentContext) {
    @provide(RouteParams)
    class MockParams {
        constructor() {
            return route.params;
        }
    }

    @provide(Route)
    class MockRoute {
        constructor() {
            return route;
        }
    }

    if (currentContext.route) {
        if (isEqual(currentContext.route, route)) {
            return currentContext.injector;
        } else if (isEqual(currentContext.route.params, route.params)) {
            const {parent} = currentContext.injector;

            return parent.createChild([MockRoute]);
        }
    }

    return sharedInjector
        .createChild([MockParams])
        .createChild([MockRoute]);
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

export function handleReroute(event, element, currentContext) {
    const {href} = event.delegateTarget;
    const {route, tokens, components, injector} = getContextFromURL(href, currentContext);

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
