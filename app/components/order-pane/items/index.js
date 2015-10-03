import React, {Component, PropTypes} from 'react';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';

import {OrderItemStore} from '../../../stores/order-item';
import {OrderItemCollection} from '../../../models/order-item';
import {OrderPaneItemComponent} from './item';
import {OrderPaneCheckoutComponent} from './checkout';

@dependencies({
    orderItemStore: OrderItemStore
})
@listeningTo(['orderItemStore'], dependencies => {
    const {orderItemStore} = dependencies;

    return {
        orderItems: orderItemStore.getOrderItems()
    };
})

export class OrderPaneItemsComponent extends Component {
    static propTypes = {
        orderItems: PropTypes.instanceOf(OrderItemCollection)
    }

    returnAllPrices = (orderItems) => {
        let prices = [];

        orderItems.map(function(orderItem) {
            prices.push(orderItem.attributes.price);
        });

        return (
            prices
        );
    }

    render() {
        const {orderItems} = this.props;
        const {returnAllPrices} = this;

        return (
            <div className="gb-order-pane-items">
                {orderItems.map(renderOrderItem)}
                <OrderPaneCheckoutComponent
                    prices={returnAllPrices(orderItems)}
                />
            </div>
        );

        function renderOrderItem(orderItem) {
            return (
                <OrderPaneItemComponent
                    key={orderItem.id}
                    orderItem={orderItem}
                />
            );
        }
    }
}
