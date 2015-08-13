import React from 'react';
import Backbone from 'backbone';
import sync from 'backbone-super-sync';

import {MainComponent} from './components/main';
import {Restaurant} from './models/restaurant';
import {Order} from './models/order';
import {CurrentUser} from './models/user';

sync.editRequest = editRequest;

Backbone.sync = sync;

// TODO: have a loading screen, but whatevs
const restaurant = new Restaurant({id: 111});
const user = new CurrentUser();

Promise.all([restaurant.fetch(), user.fetch()]).then(function() {
    const order = new Order({
        user_id: user.id,
        restaurant_id: restaurant.id
    });

    const main = (
        <MainComponent
            restaurant={restaurant.toJSON()}
            user={user.toJSON()}
            order={order.toJSON()}
            style={<link rel="stylesheet" href="main.css"/>}
            title="Goodybag"
        />
    );

    React.render(main, document.body);
}, function() {
    const main = (
        <div>couldn't fetch user and restaurant data</div>
    );

    React.render(main, document.body);
});

function editRequest(req) {
    req.withCredentials();
}
