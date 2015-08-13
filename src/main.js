import React from 'react';
import Backbone from 'backbone';
import sync from 'backbone-super-sync';

import {MainComponent} from './components/main';
import {Restaurant} from './models/restaurant';
import {Order} from './models/order';
import {User} from './models/user';

sync.editRequest = editRequest;

Backbone.sync = sync;

const {restaurantData, userData, orderData} = window.gbData;

const restaurant = new Restaurant(restaurantData, {parse: true});
const user = new User(userData, {parse: true});
const order = new Order(orderData, {parse: true});

const main = (
    <MainComponent
        restaurant={restaurant.toJSON()}
        user={user.toJSON()}
        order={order.toJSON()}
        title="Goodybag"
    />
);

React.render(main, document);

function editRequest(req) {
    req.withCredentials();
}
