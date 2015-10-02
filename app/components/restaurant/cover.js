import React, {Component, PropTypes} from 'react';
import {depenencies} from 'yokohama';
import {listeningTo} from 'tokyo';

import {RestaurantStore} from '../../stores/restaurant';
import {Restaurant} from '../../models/restaurant';

@dependencies({
    restaurantStore: RestaurantStore
})
@listeningTo(['restaurantStore'], dependencies => {
    const {restaurantStore} = dependencies;

    return {
        restaurant: restaurantStore.getRestaurant();
    }
})

export class RestaurantCoverComponent extends Component {
    static propTypes = {
        restaurant: PropTypes.instanceOf(Restaurant)
    }

    render() {
        const {restaurant} = this.props;
        const {name} = restaurant.attributes;

        return (
            <div className="gb-restaurant-cover">
                <div className="gb-restaurant-cover-text">{name}</div>
            </div>
        );
    }
}
