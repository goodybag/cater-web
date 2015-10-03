import React, {Component, PropTypes} from 'react';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';

import {OrderStore} from '../../stores/order';
import {OrderItemStore} from '../../stores/order-item';
import {Order} from '../../models/order';
import {OrderItemCollection} from '../../models/order-item';
import {OrderPaneInfoComponent} from './info';
import {OrderPaneShareComponent} from './share';
import {OrderPaneItemsComponent} from './items';
import {OrderPaneTimeLeftComponent} from './timeleft';

@dependencies({
    orderStore: OrderStore,
    orderItemStore: OrderItemStore
}, [OrderPaneInfoComponent])
@listeningTo(['orderStore', 'orderItemStore'], dependencies => {
    const {orderStore, orderItemStore} = dependencies;

    return {
        order: orderStore.getOrder(),
        orderItems: orderItemStore.getOrderItems()
    };
})
export class OrderPaneComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order).isRequired,
        orderItems: PropTypes.instanceOf(OrderItemCollection).isRequired
    }

    render() {
        const {order, orderItems} = this.props;
        const {datetime, timezone} = order.attributes;

        return (
            <div className="gb-order-pane">

                <OrderPaneTimeLeftComponent
                    datetime={datetime}
                    timezone={timezone}
                />

                <OrderPaneHeaderComponent
                    title={order.isNew() ? 'Order Info' : `Order – #${order.id}`}
                />

                <OrderPaneInfoComponent
                    order={order}
                />

                <OrderPaneHeaderComponent
                    title="Share Order (Optional)"
                />

                <OrderPaneShareComponent
                    order={order}
                />

                <OrderPaneHeaderComponent
                    title="Order Items"
                />

                <OrderPaneItemsComponent
                    orderItems={orderItems}
                />

                <div className="gb-order-pane-endcap"></div>
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
