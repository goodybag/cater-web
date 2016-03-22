import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import express from 'express';
import 'intl';
import path from 'path';

import {ErrorComponent} from './components/error';
import {Config} from './lib/config';
import {loadPage} from './lib/sroute';
import {Route} from 'hiroshima';
import router from './router';

Intl.NumberFormat = IntlPolyfill.NumberFormat;

const staticDir = `dist/build`;

export function makeHandler(options) {
    const config = new Config(options);

    return function(req, res, next) {
        const {components, params} = router.match(req.path, {
            method: req.method,
            query: req.query
        });

        const route = new Route({
            href: req.url,
            path: req.path,
            params,
            query: req.query
        });

        if (components.length === 0) {
            next();
        } else {
            loadPage({
                req,
                res,
                route,
                config,
                components
            }).then(page => {
                res.send(`<!doctype html>${page.html}`);
            }).catch(err => {
                const markup = renderToStaticMarkup(
                    <ErrorComponent error={err}/>
                );

                res.status(500).send(`<!doctype html>${markup}`);
            }).catch(err => {
                next(err);
            });
        }
    };
}

export function mountStatic(app, dir = staticDir) {
    app.use('/assets', express.static(path.resolve(__dirname, '../../', dir)));
}
