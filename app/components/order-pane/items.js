import React, {Component} from 'react';

import {OrderItem, OrderItemCollection} from '../../models/order-item';

export class OrderPaneItemsComponent extends Component {
    static propTypes = {
        orderItems: OrderItemCollection.propType.isRequired
    }

    render() {
        const {orderItems} = this.props;

        return (
            <div className="gb-order-pane-items">
                {orderItems.map(renderOrderItem)}
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

export class OrderPaneItemComponent extends Component {
    static propTypes = {
        orderItem: OrderItem.propType.isRequired
    }

    render() {
        const {orderItem} = this.props;
        const {name, quantity, price} = orderItem.attributes;

        return (
            <div className="gb-order-pane-item">
                <div className="gb-order-pane-item-info">
                    <div className="gb-order-pane-item-name">{name}</div>
                    <div className="gb-order-pane-item-quantity">{quantity}</div>
                </div>

                <div className="gb-order-pane-item-price">
                    <div className="gb-order-pane-item-price-amount">{price}</div>
                </div>
            </div>
        );
    }
}
