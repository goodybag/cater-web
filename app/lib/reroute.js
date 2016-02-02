import React from 'react';
import Promise from 'bluebird';
import url from 'url';
import {Injector, provide} from 'yokohama';
import {Route} from 'hiroshima';
import {render} from 'react-dom';
import {isEqual} from 'lodash';

import {generateParsingMocks} from './parser';
import {handleError} from './error';
import router from '../router';
import {mocks} from '../cmocks';
import {RouteParams} from './route';
import {preventDefault, stopPropogation} from './dom';
import {MainContainerComponent} from '../components/main';

export const sharedInjector = generateInitialInjector();

/**
 * @typedef {} AppContext
 * @property {*} route - The "route" object (includes param data)
 * @property {*} injector - The injector instance
 * @property {*[]} tokens - The array of tokens for resolving component dependencies
 * @property {*[]} components - The array of components from the match result
 */

/**
 * Given a URL, and possibly an existing context
 * (for re-evaluating the dependency tree), it
 * runs the router and creates all of the context
 * data needed to load the page.
 * @returns {AppContext}
 */
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

/**
 * A hacky way for re-evaluating the dependency
 * tree so that `route params -> route` instead
 * of `route -> route params`
 */
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

/**
 * Given some application context and
 * dependency cache, it renders the
 * `MainContainerComponent` on the given
 * element.
 */
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

/**
 * Called when a click event is intercepted
 * and the route needs to be changed locally.
 *
 * It recomputes the context and loads a
 * new page from scratch.
 */
export function handleReroute(event, element, currentContext) {
    return Promise.try(() => {
        const {href} = event.delegateTarget;
        const {route, tokens, components, injector} = getContextFromURL(href, currentContext);

        // Only handle reroute if the route matches
        // TODO: check domains in addition to doing this
        if (components.length !== 0) {
            preventDefault(event);
            stopPropogation(event);

            window.history.pushState({}, '', href);

            return injector.get(tokens).then(values => {
                const dependencyCache = injector.dump();

                return Promise.fromNode(cb => {
                    renderPage({route, components, dependencyCache}, element, cb);
                });
            });

        }
    }).catch(err => {
        handleError(err, element);
    }).finally(() => {
        preventDefault(event);
        stopPropogation(event);
    });
}

function generateInitialInjector() {
    return new Injector([
        ...mocks,
        ...generateParsingMocks(__GBDATA__.config)
    ]);
}
