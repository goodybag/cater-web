import React, {Component} from 'react';

import {Restaurant} from '../../models/restaurant';
import {Order} from '../../models/order';
import {OrderItemCollection} from '../../models/order-item';
import {OrderPaneComponent} from '../order-pane';
import {RestaurantCoverComponent} from './cover.js';
import {RestaurantTabsComponent} from './tabs.js';

export class RestaurantComponent extends Component {
    static propTypes = {
        restaurant: Restaurant.propType.isRequired,
        order: Order.propType.isRequired,
        orderItems: OrderItemCollection.propType.isRequired
    }

    static childContextTypes = {
        restaurant: Restaurant.propType.isRequired
    }

    getChildContext() {
        const {restaurant} = this.props;

        return {restaurant};
    }

    render() {
        const {order, orderItems} = this.props;
        const tabs = [];

        return (
            <div className="gb-restaurant">
                <RestaurantCoverComponent/>

                <RestaurantTabsComponent tabs={tabs}/>
                <OrderPaneComponent order={order} orderItems={orderItems}/>
            </div>
        );
    }
}
