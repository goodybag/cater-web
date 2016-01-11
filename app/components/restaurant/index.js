import React, {Component} from 'react';
import {router} from 'hiroshima';
import {inject} from 'yokohama';

import {OrderPaneComponent} from '../order-pane';
import {RestaurantCoverComponent} from './cover';
import {RestaurantTabsComponent} from './tabs';
import {RestaurantMenuComponent} from './menu';
import {RestaurantInfoComponent} from './info';
import {RestaurantReviewsComponent} from './reviews';
import {RestaurantOrdersComponent} from './past-orders';

@router(route => {
    route.dir('restaurants').param('restaurant_id').call(route => {
        route.use(RestaurantMenuComponent);
        route.dir('info').index(RestaurantInfoComponent);
        route.dir('reviews').index(RestaurantReviewsComponent);
        route.dir('orders').index(RestaurantOrdersComponent);
    });
})
@inject({}, [
    RestaurantCoverComponent,
    RestaurantTabsComponent,
    OrderPaneComponent
])
export class RestaurantComponent extends Component {
    static propTypes = {
        children: React.PropTypes.node
    };

    render() {
        const {children} = this.props;

        return (
            <div className="gb-restaurant">
                <RestaurantCoverComponent/>
                <OrderPaneComponent/>
                <RestaurantTabsComponent/>

                {children}
            </div>
        );
    }
}
