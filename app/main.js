import './setup';

import React from 'react';
import {Dispatcher} from 'flux';
import Backbone from 'backbone';
import sync from 'backbone-super-sync';

import {MainComponent} from './components/main';
import {Restaurant} from './models/restaurant';
import {Order} from './models/order';
import {User} from './models/user';
import {OrderItemCollection} from './models/order-item';

sync.editRequest = editRequest;

Backbone.sync = sync;

const targets = JSON.parse(atob(document.getElementById('gb-data').textContent));

const restaurant = new Restaurant(targets.restaurant, {parse: true});
const user = new User(targets.user, {parse: true});
const order = new Order(targets.order, {parse: true});
const orderItems = new OrderItemCollection(targets.orderItems, {parse: true});

if (user.get('name') === 'Guest') {
    console.warn('User is not signed in!');
}

const main = (
    <MainComponent
        restaurant={restaurant}
        user={user}
        order={order}
        orderItems={orderItems}
        dispatcher={new Dispatcher()}
    />
);

React.render(main, document.getElementById('gb-body'));

function editRequest(req) {
    req.withCredentials();
}
