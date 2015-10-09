import React, {Component, PropTypes} from 'react';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';

import {OrderItemStore} from '../../../stores/order-item';
import {OrderStore} from '../../../stores/order';
import {OrderItemCollection} from '../../../models/order-item';
import {Order} from '../../../models/order';
import {OrderPaneItemComponent} from './item';
import {OrderPaneCheckoutComponent} from './checkout';

@dependencies({
    orderStore: OrderStore,
    orderItemStore: OrderItemStore
})
@listeningTo(['orderItemStore'], dependencies => {
    const {orderStore, orderItemStore} = dependencies;

    return {
        order: orderStore.getOrder(),
        orderItems: orderItemStore.getOrderItems()
    };
})
export class OrderPaneItemsComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order).isRequired,
        orderItems: PropTypes.instanceOf(OrderItemCollection).isRequired
    }

    render() {
        const {order, orderItems} = this.props;
        const {total} = order.attributes;

        return (
            <div className="gb-order-pane-items">
                {orderItems.map(renderOrderItem)}

                <OrderPaneCheckoutComponent total={total}/>
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
