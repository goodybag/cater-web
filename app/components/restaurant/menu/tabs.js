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

        const currentMenu = route.query.menu || 'catering';

        return (
            <div className="gb-restaurant-menu-tabs">
                <RestaurantMenuTabComponent
                    href={path}
                    type="catering"
                    active={currentMenu !== 'individual'}>
                    Catering Menu
                </RestaurantMenuTabComponent>

                <RestaurantMenuTabComponent
                    href={`${path}?menu=individual`}
                    type="individual"
                    active={currentMenu === 'individual'}>
                    Individual Menu
                </RestaurantMenuTabComponent>
            </div>
        );
    }
}
