import React, {Component} from 'react';

import {Order} from '../../models/order';
import {OrderItemCollection} from '../../models/order-item';
import {OrderPaneInfoComponent} from './info';
import {OrderPaneShareComponent} from './share';
import {OrderPaneItemsComponent} from './items';

export class OrderPaneComponent extends Component {
    static propTypes = {
        order: Order.propType.isRequired,
        orderItems: OrderItemCollection.propType.isRequired
    }

    render() {
        const {order, orderItems} = this.props;

        return (
            <div className="gb-order-pane">
                <OrderPaneHeaderComponent
                    title={order.isNew() ? 'Order' : `Order – #${order.id}`}
                />

                <OrderPaneInfoComponent
                    order={order}
                />

                <OrderPaneHeaderComponent
                    title="Share"
                />

                <OrderPaneShareComponent
                    order={order}
                />

                <OrderPaneHeaderComponent
                    title="Items"
                />

                <OrderPaneItemsComponent
                    orderItems={orderItems}
                />
            </div>
        );
    }
}

class OrderPaneHeaderComponent extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired
    }

    render() {
        const {title} = this.props;

        return (
            <div className="gb-order-pane-header">
                <div className="gb-order-pane-header-text">{title}</div>
            </div>
        );
    }
}
