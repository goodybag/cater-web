import React, {Component} from 'react';

import {RestaurantResolver} from '../../models/restaurant';

export class RestaurantCoverComponent extends Component {
    static contextTypes = {
        dependencies: React.PropTypes.object.isRequired
    }

    static dependencies = {restaurant: RestaurantResolver}

    render() {
        const {dependencies} = this.context;
        const {restaurant} = dependencies;
        const {name} = restaurant.attributes;

        return (
            <div className="gb-restaurant-cover">
                <div className="gb-restaurant-cover-text">{name}</div>
            </div>
        );
    }
}
