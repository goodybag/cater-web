import React, {Component} from 'react';

import {Restaurant} from '../../models/restaurant';
import {Order} from '../../models/order';
import {OrderPaneComponent} from '../order/pane';
import {RestaurantCoverComponent} from './cover.js';
import {RestaurantTabsComponent} from './tabs.js';

export class RestaurantComponent extends Component {
    static propTypes = {
        restaurant: Restaurant.propType,
        order: Order.propType
    }

    static childContextTypes = {
        restaurant: Restaurant.propType
    }

    getChildContext() {
        const {restaurant} = this.props;

        return {restaurant};
    }

    render() {
        const {order} = this.props;
        const tabs = [];

        return (
            <div className="gb-restaurant">
                <RestaurantCoverComponent/>

                <RestaurantTabsComponent tabs={tabs}/>
                <OrderPaneComponent order={order}/>
            </div>
        );
    }
}
