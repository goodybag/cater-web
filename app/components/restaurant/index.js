import React, {Component} from 'react';

import {Restaurant} from '../../models/restaurant';
import {Order} from '../../models/order';
import {OrderItemCollection} from '../../models/order-item';
import {OrderPaneComponent} from '../order-pane';
import {RestaurantCoverComponent} from './cover';
import {RestaurantTabsComponent} from './tabs';
import {RestaurantMenuComponent} from './menu';
import {RestaurantInfoComponent} from './info';
import {RestaurantReviewsComponent} from './reviews';
import {RestaurantOrdersComponent} from './past-orders';

export class RestaurantComponent extends Component {
    static propTypes = {
        restaurant: Restaurant.propType.isRequired,
        order: Order.propType.isRequired,
        orderItems: OrderItemCollection.propType.isRequired
    }

    static childContextTypes = {
        restaurant: Restaurant.propType.isRequired
    }

    state = {
        currentTabIndex: 0
    }

    handleNewTabIndex = (index) => {
        this.setState({currentTabIndex: index});
    }

    getChildContext() {
        const {restaurant} = this.props;

        return {restaurant};
    }

    render() {
        const {order, orderItems} = this.props;
        const {currentTabIndex} = this.state;

        const tabs = [
            {
                title: 'Menu',
                body: <RestaurantMenuComponent/>
            },

            {
                title: 'Info',
                body: <RestaurantInfoComponent/>
            },

            {
                title: 'Reviews',
                body: <RestaurantReviewsComponent/>
            },

            {
                title: (
                    <span>
                        Past Orders
                        <div className="gb-restaurant-tab-ncount">3</div>
                    </span>
                ),
                body: <RestaurantOrdersComponent/>
            }
        ];

        return (
            <div className="gb-restaurant">
                <RestaurantCoverComponent/>

                <OrderPaneComponent
                    order={order}
                    orderItems={orderItems}
                />

                <RestaurantTabsComponent
                    tabs={tabs}
                    onNewTabIndex={this.handleNewTabIndex}
                    currentTabIndex={currentTabIndex}
                />

                {tabs[currentTabIndex].body}
            </div>
        );
    }
}
