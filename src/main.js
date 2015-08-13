import React from 'react';
import Backbone from 'backbone';
import $ from 'jquery';

import {MainComponent} from './components/main';
import {Restaurant} from './models/restaurant';
import {Order} from './models/order';
import {CurrentUser} from './models/user';

const originalAjax = Backbone.ajax;

Backbone.ajax = betterAjax;

// TODO: have a loading screen, but whatevs
const restaurant = new Restaurant({id: 111});
const user = new CurrentUser();

$.when(restaurant.fetch(), user.fetch()).then(function() {
    const order = new Order({
        user_id: user.id,
        restaurant_id: restaurant.id
    });

    const main = (
        <MainComponent
            restaurant={restaurant}
            user={user}
            order={order}
        />
    );

    React.render(main, document.body);
}, function() {
    const main = (
        <div>couldn't fetch user and restaurant data</div>
    );

    React.render(main, document.body);
});

function betterAjax(opts) {
    var fields = opts.xhrFields || {};
    fields.withCredentials = true;
    opts.xhrFields = fields;

    return originalAjax.call(this, opts);
}
