import React, {Component} from 'react';

import {Restaurant} from '../../models/restaurant';
import {Order} from '../../models/order';
import {OrderPaneComponent} from '../order/pane';
import {RestaurantCoverComponent} from './cover.js';
import {RestaurantTabsComponent} from './tabs.js';
import {RestaurantMenuComponent} from './menu/index.js';
import {RestaurantInfoComponent} from './info.js';
import {RestaurantReviewsComponent} from './reviews.js';
import {RestaurantOrdersComponent} from './orders/index.js';

export class RestaurantComponent extends Component {
    static propTypes = {
        restaurant: Restaurant.propType.isRequired,
        order: Order.propType.isRequired
    }

    static childContextTypes = {
        restaurant: Restaurant.propType.isRequired
    }

    getChildContext() {
        const {restaurant} = this.props;

        return {restaurant};
    }

    render() {
        const {order} = this.props;
        const tabs = [
            {
                title: 'Menu',
                body: <RestaurantMenuComponent></RestaurantMenuComponent>
        },  {
                title: 'Info',
                body: <RestaurantInfoComponent></RestaurantInfoComponent>
        },  {
                title: 'Reviews',
                body: <RestaurantReviewsComponent></RestaurantReviewsComponent>
        },  {
                title: 'Past Orders',
                body: <RestaurantOrdersComponent></RestaurantOrdersComponent>
            }
        ];

        return (
            <div className="gb-restaurant">
                <RestaurantCoverComponent/>

                <RestaurantTabsComponent tabs={tabs}/>
                <OrderPaneComponent order={order}/>
            </div>
        );
    }
}
