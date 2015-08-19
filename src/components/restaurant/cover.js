import React, {Component} from 'react';

import {Restaurant} from '../../models/restaurant';

export class RestaurantCoverComponent extends Component {
    static contextTypes = {
        restaurant: Restaurant.propType.isRequired
    }

    render() {
        const {restaurant} = this.context;
        const {name} = restaurant.attributes;

        return (
            <div className="gb-restaurant-cover">
                <div className="gb-restaurant-cover-text">{name}</div>
            </div>
        );
    }
}
