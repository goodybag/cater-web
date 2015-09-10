/**
 * This is only a temporarily hacked-together web
 * server to demonstrate server-side rendering
 * capabilities. This should not be used in the
 * long-term and eventually should become replaced
 * with a more stream-lined routing and
 * target-fetching system.
 */

import './setup';

import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import express from 'express';
import Backbone from 'backbone';
import sync from 'backbone-super-sync';
import {readFileSync} from 'fs';
import Router from 'hiroshima';

import {MainContainerComponent, MainComponent} from './components/main';
import Resolver, {mockParams, readDependencies} from './lib/resolver';

sync.editRequest = editRequest;

Backbone.sync = sync;

export const app = express();

const styles = readFileSync(`${__dirname}/../build/main.css`, 'utf-8');

app.use(express.static(`${__dirname}/../build/`));

const router = new Router().call(function(router) {
    router.use(MainComponent);
});

app.use(function(req, res, next) {
    const {components, params} = router.match(req.path);
    const route = {
        href: req.url,
        path: req.path,
        params: params
    };

    // TODO
    if (components.length === 0) {
        return next();
    }

    const targets = readDependencies(components);

    const resolver = new Resolver(targets, {mocks: [mockParams(params)]});

    resolver.resolve().then(respond).catch(next);

    function respond(dependencies) {
        const main = (
            <MainContainerComponent
                dependencies={dependencies}
                components={components}
                route={route}
            />
        );

        const markup = renderPage(main, dependencies);
        res.send(`<!doctype html>${markup}`);
    }
});

function editRequest(req) {
    req.cookies = `connect.sid=${process.env.GOODYBAG_SID}`;
}

function renderPage(body, deps) {
    const data = new Buffer(JSON.stringify(deps)).toString('base64');

    const doc = (
        <html>
            <head>
                <title>Goodybag</title>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>

                <style dangerouslySetInnerHTML={{__html: styles}}/>
            </head>

            <body>
                <div
                    id="gb-body"
                    dangerouslySetInnerHTML={{__html: renderToString(body)}}
                />

                <script
                    id="gb-data"
                    type="text/base64.gbdata"
                    dangerouslySetInnerHTML={{__html: data}}
                />

                <script src="/bundle.js"/>
            </body>
        </html>
    );

    return renderToStaticMarkup(doc);
}
