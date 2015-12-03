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
import {getPolyfillString} from 'polyfill-service';

import {urlForAsset} from './asset';
import * as config from './config';
import router from './router';

export const app = express();

if (config.DEV_MODE) {
    app.use('/assets', express.static(`${__dirname}/../build`));
}

app.use(function(req, res, next) {
    const {components} = router.match(req.path, {
        method: req.method,
        query: req.query
    });

    if (components.length === 0) {
        next();
    } else {
        const userAgent = req.headers['user-agent'];

        getPolyfillString({
            uaString: userAgent,
            minify: true,
            features: {
                'Intl.~locale.en': {flags: []},
                'atob': {flags: ['gated']}
            }
        }).then(polyfills => {
            const markup = renderPage({config}, polyfills);

            res.send(`<!doctype html>${markup}`);
        }).catch(err => next(err));
    }
});

function renderPage(data, polyfills) {
    const encodedData = new Buffer(JSON.stringify(data)).toString('base64');
    const script = `window.__GBDATA__=JSON.parse(atob('${encodedData}'))`;

    const doc = (
        <html>
            <head>
                <title>Goodybag</title>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
                <link rel="stylesheet" href={urlForAsset('main.css')}/>
            </head>

            <body>
                <div id="gb-body"/>

                <script dangerouslySetInnerHTML={{__html: polyfills}}/>
                <script dangerouslySetInnerHTML={{__html: script}}/>
                <script src={urlForAsset('bundle.js')}/>
            </body>
        </html>
    );

    return renderToStaticMarkup(doc);
}
