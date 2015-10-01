import React, {Component} from 'react';
import {dependencies} from 'yokohama';

import {OrderPaneComponent} from '../order-pane';
import {RestaurantCoverComponent} from './cover';
import {RestaurantTabsComponent} from './tabs';
import {RestaurantMenuComponent} from './menu';
import {RestaurantInfoComponent} from './info';
import {RestaurantReviewsComponent} from './reviews';
import {RestaurantOrdersComponent} from './past-orders';

@dependencies({}, [
    RestaurantCoverComponent,
    RestaurantTabsComponent,
    OrderPaneComponent
])
export class RestaurantComponent extends Component {
    static propTypes = {
        children: React.PropTypes.node
    }

    static route(router) {
        router.dir('restaurants').param('restaurant_id').call(router => {
            router.use(RestaurantMenuComponent);
            router.dir('info').index(RestaurantInfoComponent);
            router.dir('reviews').index(RestaurantReviewsComponent);
            router.dir('orders').index(RestaurantOrdersComponent);
        });
    }

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
