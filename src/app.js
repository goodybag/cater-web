import express from 'express';
import React from 'react';
import Backbone from 'backbone';
import sync from 'backbone-super-sync';

import {MainComponent} from './components/main';
import {Restaurant} from './models/restaurant';
import {Order} from './models/order';
import {CurrentUser} from './models/user';

sync.editRequest = editRequest;

Backbone.sync = sync;

export const app = express();

app.get('/', function(req, res, next) {
    const restaurant = new Restaurant({id: 111});
    const user = new CurrentUser();

    Promise.all([restaurant.fetch(), user.fetch()]).then(function() {
        const order = new Order({
            user_id: user.id,
            restaurant_id: restaurant.id
        });

        const restaurantData = restaurant.toJSON();
        const userData = user.toJSON();
        const orderData = order.toJSON();
        const data = {restaurantData, userData, orderData};

        const main = (
            <MainComponent
                restaurant={restaurantData}
                user={userData}
                order={orderData}
                style={<link rel="stylesheet" href="main.css"/>}
                title="Goodybag"
            />
        );

        const markup = React.renderToString(main);

        res.send(`<!doctype html>${markup}<script>window.jQuery={};window.gbData=${JSON.stringify(data)};</script><script src="bundle.js"></script>`);
    }, next);
});

app.use(express.static(`${__dirname}/../build/`));

function editRequest(req) {
    req.cookies = `connect.sid=${process.env.GOODYBAG_SID}`;
}
