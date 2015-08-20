/**
 * This is only a temporarily hacked-together web
 * server to demonstrate server-side rendering
 * capabilities. This should not be used in the
 * long-term and eventually should become replaced
 * with a more stream-lined routing and
 * target-fetching system.
 */


import express from 'express';
import React from 'react';
import Backbone from 'backbone';
import sync from 'backbone-super-sync';
import {readFileSync} from 'fs';

import {MainComponent} from './components/main';
import {Restaurant} from './models/restaurant';
import {Order} from './models/order';
import {CurrentUser} from './models/user';

sync.editRequest = editRequest;

Backbone.sync = sync;

export const app = express();

const styles = readFileSync(`${__dirname}/../build/main.css`, 'utf-8');

export const restaurant = new Restaurant({id: 111});
export const user = new CurrentUser();
export const order = new Order({id: process.env.GOODYBAG_ORDER_ID});
export const orderItems = order.items();

app.get('/', function(req, res) {
    const markup = renderPage({restaurant, user, order, orderItems});
    res.send(`<!doctype html>${markup}`);
});

app.use(express.static(`${__dirname}/../build/`));

function editRequest(req) {
    req.cookies = `connect.sid=${process.env.GOODYBAG_SID}`;
}

function renderPage(targets) {
    // const {restaurant, user, order, orderItems} = targets;

    const data = new Buffer(JSON.stringify(targets)).toString('base64');

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
                <div id="gb-body">
                    <MainComponent
                        restaurant={restaurant}
                        user={user}
                        order={order}
                        orderItems={orderItems}
                    />
                </div>

                <script id="gb-data" type="text/base64.gbdata">{data}</script>
                <script src="bundle.js"/>
            </body>
        </html>
    );

    return React.renderToStaticMarkup(doc);
}
