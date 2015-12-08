import express from 'express';
import 'intl';

import {Config} from './lib/config';
import {loadPage} from './lib/sroute';
import {Route} from 'hiroshima';
import router from './router';

Intl.NumberFormat = IntlPolyfill.NumberFormat;

export function makeHandler(options) {
    const config = new Config(options);

    const app = express();

    // TODO: make this only happen in dev env
    app.use('/assets', express.static(`${__dirname}/../build`));

    app.use(function(req, res, next) {
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
                next(err);
            });
        }
    });

    return app;
}
