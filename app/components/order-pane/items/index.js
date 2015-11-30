import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';

import {OrderItemStore} from '../../../stores/order-item';
import {OrderStore} from '../../../stores/order';
import {OrderItem} from '../../../models/order-item';
import {Order} from '../../../models/order';
import {OrderPaneItemComponent} from './item';
import {OrderPaneCheckoutComponent} from './checkout';

export class OrderPaneItemsComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order).isRequired,
        orderItems: PropTypes.arrayOf(PropTypes.instanceOf(OrderItem))
    }

    render() {
        const {order, orderItems} = this.props;
        const {total} = order;

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
