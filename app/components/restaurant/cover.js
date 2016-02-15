import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';

import {RestaurantStore} from '../../stores/restaurant';
import {Restaurant} from '../../models/restaurant';

@inject({
    restaurantStore: RestaurantStore
})
@listeningTo(['restaurantStore'], props => {
    const {restaurantStore} = props;

    return {
        restaurant: restaurantStore.getRestaurant()
    };
})
export class RestaurantCoverComponent extends Component {
    static propTypes = {
        restaurant: PropTypes.instanceOf(Restaurant)
    };

    render() {
        const {restaurant} = this.props;
        const {name, cover_photo_url} = restaurant;

        return (
            <div className="gb-restaurant-cover" style={{backgroundImage: 'url(' + cover_photo_url + ')'}}>
                <div className="gb-restaurant-cover-text">{name}</div>
            </div>
        );
    }
}
