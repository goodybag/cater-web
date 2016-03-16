import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {Route} from 'hiroshima';

import {RestaurantMenuTabComponent} from './tab';
import {RestaurantMenuBarComponent} from './bar';

@inject({
    route: Route
}, [
    RestaurantMenuTabComponent
])
export class RestaurantMenuTabsComponent extends Component {
    static propTypes = {
        route: PropTypes.instanceOf(Route).isRequired
    };

    render() {
        const {route} = this.props;
        const {restaurant_id} = route.params;
        const path = `/restaurants/${restaurant_id}`;

        return (
            <div className="gb-restaurant-menu-tabs">
                <RestaurantMenuTabComponent
                    href={path}
                    type="catering">
                    Catering Menu
                </RestaurantMenuTabComponent>

                <RestaurantMenuTabComponent
                    href={`${path}/individual`}
                    type="individual">
                    Individual Menu
                </RestaurantMenuTabComponent>
            </div>
        );
    }
}
