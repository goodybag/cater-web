import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {Dispatcher, listeningTo} from 'tokyo';

import {RestaurantStore} from '../../../stores/restaurant';
import {Restaurant} from '../../../models/restaurant';
import {PastOrdersStore} from '../../../stores/past-orders';
import {Order} from '../../../models/order';
import {RestaurantOrdersRowComponent} from './row';
import {RestaurantPastOrdersModalComponent} from './modal';

@inject({
    restaurantStore: RestaurantStore,
    pastOrdersStore: PastOrdersStore,
    dispatcher: Dispatcher
}, [RestaurantPastOrdersModalComponent, RestaurantOrdersRowComponent])
@listeningTo(['restaurantStore', 'pastOrdersStore'], props => {
    const {pastOrdersStore, restaurantStore} = props;

    return {
        restaurant: restaurantStore.getRestaurant(),
        orders: pastOrdersStore.getPastOrders()
    };
})
export class RestaurantOrdersComponent extends Component {
    static propTypes = {
        dispatcher: PropTypes.instanceOf(Dispatcher),
        restaurant: PropTypes.instanceOf(Restaurant),
        orders: PropTypes.arrayOf(PropTypes.instanceOf(Order))
    };

    render() {
        const {restaurant, orders, dispatcher} = this.props;

        return (
            <div className="gb-restaurant-orders">
                <div className="gb-restaurant-orders-title">
                    Past Orders at {restaurant.name}
                </div>

                <div className="gb-restaurant-orders-table">
                    <div className="gb-restaurant-orders-row-head">
                        <div className="gb-restaurant-orders-row-group-first">
                            <div className="gb-restaurant-orders-col-status">Status</div>
                            <div className="gb-restaurant-orders-col-date">Delivery Date</div>
                            <div className="gb-restaurant-orders-col-time">Delivery Time</div>
                            <div className="gb-restaurant-orders-col-total">Total</div>
                        </div>
                    </div>

                    <div className="gb-restaurant-orders-table-body">
                        {orders.map(renderPastOrderItem)}
                    </div>
                </div>
            </div>
        );

        function renderPastOrderItem(order) {
            return (
                <RestaurantOrdersRowComponent
                    key={order.id}
                    order={order}
                    dispatcher={dispatcher}
                />
            );
        }
    }
}
