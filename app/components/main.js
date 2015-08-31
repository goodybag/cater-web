import React, {Component} from 'react';
import {Dispatcher} from 'flux';

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
        orderItems: OrderItemCollection.propType.isRequired,
        user: User.propType.isRequired,
        dispatcher: React.PropTypes.instanceOf(Dispatcher).isRequired
    }

    static childContextTypes = {
        user: User.propType,
        dispatcher: React.PropTypes.instanceOf(Dispatcher)
    }

    getChildContext() {
        const {user, dispatcher} = this.props;

        return {user, dispatcher};
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
