import React from 'react';
import Backbone from 'backbone';

import {MainComponent} from './components/main';
import {Restaurant} from './models/restaurant';

const originalAjax = Backbone.ajax;

Backbone.ajax = betterAjax;

// TODO: have a loading screen, but whatevs
new Restaurant({id: 111}).fetch({
    success: function(restaurant) {
        React.render(<MainComponent restaurant={restaurant}/>, document.body);
    },

    error: function() {
        React.render(<span>Couldn't fetch the resource...</span>, document.body);
    }
});

function betterAjax(opts) {
    var fields = opts.xhrFields || {};
    fields.withCredentials = true;
    opts.xhrFields = fields;

    return originalAjax.call(this, opts);
}
