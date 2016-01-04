import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';

import {RestaurantStore} from '../../stores/restaurant';
import {Restaurant} from '../../models/restaurant';

@inject({
    restaurantStore: RestaurantStore
})
@listeningTo([RestaurantStore], props => {
    const {restaurantStore} = props;

    return {
        restaurant: restaurantStore.getRestaurant()
    }
})
export class RestaurantCoverComponent extends Component {
    static propTypes = {
        restaurant: PropTypes.instanceOf(Restaurant)
    }

    render() {
        const {restaurant} = this.props;
        const {name} = restaurant;

        return (
            <div className="gb-restaurant-cover">
                <div className="gb-restaurant-cover-text">{name}</div>
            </div>
        );
    }
}
