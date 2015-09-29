import React, {Component} from 'react';

import {OrderResolver} from '../../models/order';
import {OrderItemCollectionResolver} from '../../models/order-item';
import {OrderPaneInfoComponent} from './info';
import {OrderPaneShareComponent} from './share';
import {OrderPaneItemsComponent} from './items';
import {OrderPaneTimeLeftComponent} from './timeleft';

export class OrderPaneComponent extends Component {
    static contextTypes = {
        dependencies: React.PropTypes.object.isRequired
    }

    static dependencies = {
        order: OrderResolver,
        orderItems: OrderItemCollectionResolver,
        ...OrderPaneInfoComponent.dependencies
    }

    render() {
        const {dependencies} = this.context;
        const {order, orderItems} = dependencies;
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
