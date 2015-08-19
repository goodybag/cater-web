import React, {Component} from 'react';

import {Order} from '../../../models/order';
import {OrderItemCollection} from '../../../models/order-item';

export class OrderPaneItemsComponent extends Component {
    static contextTypes = {
        order: Order.propType.isRequired,
        orderItems: OrderItemCollection.propType.isRequired
    }

    render() {
        return (
            <div className="gb-order-pane-items"></div>
        );
    }
}
