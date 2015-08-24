import React, {Component} from 'react';

import {Restaurant} from '../models/restaurant';
import {Order} from '../models/order';
import {OrderItemCollection} from '../models/order-item';
import {User} from '../models/user';
import {NavbarComponent} from './navbar';
import {RestaurantComponent} from './restaurant';

export class MainComponent extends Component {
    static propTypes = {
        restaurant: Restaurant.propType.isRequired,
        order: Order.propType.isRequired,
        user: User.propType.isRequired
    }

    static childContextTypes = {
        user: User.propType.isRequired
    }

    getChildContext() {
        const {user} = this.props;

        return {user};
    }

    render() {
        const {restaurant, order, orderItems} = this.props;

        return (
            <div className="gb-main" ref="gbMain">
                <NavbarComponent/>

                <RestaurantComponent
                    restaurant={restaurant}
                    order={order}
                    orderItems={orderItems}
                />
            </div>
        );
    }
}
