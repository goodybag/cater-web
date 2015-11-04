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
import {renderToStaticMarkup} from 'react-dom/server';
import express from 'express';

import router from './router';

export const app = express();

app.use(function(req, res, next) {
    const {components} = router.match(req.path, {
        method: req.method,
        query: req.query
    });

    if (components.length === 0) {
        next();
    } else {
        const markup = renderPage();
        res.send(`<!doctype html>${markup}`);
    }
});

function renderPage() {
    const doc = (
        <html>
            <head>
                <title>Goodybag</title>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
                <link rel="stylesheet" href="/main.css"/>
            </head>

            <body>
                <div id="gb-body"/>

                <script src="https://cdn.polyfill.io/v1/polyfill.min.js?features=Intl.~locale.en"/>
                <script src="/bundle.js"/>
            </body>
        </html>
    );

    return renderToStaticMarkup(doc);
}
