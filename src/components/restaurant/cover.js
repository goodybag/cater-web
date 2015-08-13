import React, {Component} from 'react';

import {Restaurant} from '../../models/restaurant';

export class RestaurantCoverComponent extends Component {
    static contextTypes = {
        restaurant: React.PropTypes.instanceOf(Restaurant).isRequired
    }

    render() {
        const {restaurant} = this.context;
        const {name} = restaurant.toJSON();

        return (
            <div className="gb-restaurant-cover">
                <div className="gb-restaurant-cover-text">{name}</div>
            </div>
        );
    }
}