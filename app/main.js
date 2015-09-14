import './setup';

import React from 'react';
import Backbone from 'backbone';
import {Dispatcher} from 'flux';
import sync from 'backbone-super-sync';
import {render} from 'react-dom';
import Router from 'hiroshima';
import link from 'link-delegate';
import url from 'url';

import Resolver, {mockParams, readDependencies} from './lib/resolver';
import {MainComponent, MainContainerComponent} from './components/main';

sync.editRequest = editRequest;

Backbone.sync = sync;

const rawData = document.getElementById('gb-data').textContent;

const data = JSON.parse(atob(rawData));

const dispatcher = new Dispatcher();

const router = new Router().call(function(router) {
    router.use(MainComponent);
});

initialLoad();

function initialLoad() {
    const {route, resolver, components} = getContext(window.location.href);

    const dependencies = {
        dispatcher,
        ...resolver.resolveFrom(data)
    };

    renderPage({route, components, dependencies}, function() {
        // don't handle routing client-side for IE 7/8/9
        if ([7, 8, 9].indexOf(document.documentMode) === -1) {
            link(handleReroute);
        }
    });
}

function getContext(href) {
    const path = url.parse(href).pathname;

    const {components, params} = router.match(path);

    const targets = readDependencies(components);

    const resolver = new Resolver(targets, {mocks: [mockParams(params)]});

    const route = {href, path, params};

    return {route, resolver, components};
}

function renderPage({route, components, dependencies}, cb) {
    const main = (
        <MainContainerComponent
            route={route}
            components={components}
            dependencies={dependencies}
        />
    );

    render(main, document.getElementById('gb-body'), cb);
}

function editRequest(req) {
    req.withCredentials();
}

function handleReroute(event) {
    const {href} = event.delegateTarget;
    const {route, components, resolver} = getContext(href);

    // Only handle reroute if the route matches
    // TODO: check domains instead of doing this
    if (components.length !== 0) {
        // DOM, what can I say?
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }

        if (event.stopPropogation) {
            event.stopPropogation();
        } else {
            event.cancelBubble = true;
        }

        window.history.pushState({}, '', href);

        resolver.resolve().then(function(dependencies) {
            renderPage({route, components, dependencies});
        });
    }
}
