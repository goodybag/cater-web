import React, {Component, PropTypes} from 'react';
import {inject, dependencies} from 'yokohama';
import {Dispatcher, listeningTo} from 'tokyo';
import {chain, find} from 'lodash';
import cx from 'classnames';

import {OrderItemStore} from '../../../stores/order-item';
import {OrderStore} from '../../../stores/order';
import {EditItemStore} from '../../../stores/edit-item';
import {OrderItem} from '../../../models/order-item';
import {Order} from '../../../models/order';
import {OrderPaneItemComponent} from './item';
import {OrderPaneCheckoutComponent} from './checkout';
import {RemoveOrderItemAction} from '../../../actions/order-item';
import {OrderItemEditorComponent} from './item-editor';

@inject({
    editItemStore: EditItemStore
}, [OrderPaneItemComponent, OrderItemEditorComponent])
@listeningTo(['editItemStore'], ({editItemStore}) => {
    return {
        editOrderItemModalOpen: editItemStore.modalOpen,
        editOrderItem: editItemStore.orderItem
    };
})
export class OrderPaneItemsComponent extends Component {
    static propTypes = {
        dispatcher: PropTypes.instanceOf(Dispatcher),
        order: PropTypes.instanceOf(Order).isRequired,
        orderItems: PropTypes.arrayOf(PropTypes.instanceOf(OrderItem))
    };

    getRecipients() {
        const {orderItems} = this.props;

        return chain(orderItems)
            .groupBy(i => i.recipient.toLowerCase())
            .map((items, recipient) => ({items, recipient}))
            .value();
    }

    render() {
        const {order, orderItems, editOrderItem} = this.props;
        const {sub_total} = order;

        const recipients = this.getRecipients();
        var extras = find(recipients, {recipient: ''});

        if (extras) {
            extras = extras.items;
        } else {
            extras = [ ];
        }

        return (
            <div className="gb-order-pane-items">
                {
                    chain(recipients)
                        .filter('recipient')
                        .map(renderRecipient)
                        .value()
                }

                {
                    extras.length > 0 &&
                        <div className={cx('gb-order-pane-extra-items', {
                                'gb-order-pane-extra-items-line' : recipients.length !== 1
                            })}>
                            {extras.map(renderOrderItem)}
                        </div>
                }

                <OrderPaneCheckoutComponent subtotal={sub_total}/>
            </div>
        );

        function renderRecipient({recipient, items}) {
            return (
                <div className={cx('gb-order-pane-recipient-group', {
                        'gb-order-pane-recipient-group-line': extras.length > 0
                        })} key={recipient}>
                    <OrderPaneRecipientComponent
                        recipient={recipient}
                    />

                    {items.map(renderOrderItem)}
                </div>
            );
        };

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

export class OrderPaneRecipientComponent extends Component {
    static propTypes = {
        recipient: PropTypes.string
    };

    render() {
        return (
            <div className="gb-order-pane-recipient">
                <span className="icon-profile"></span>
                {this.props.recipient}
            </div>
        );
    }
}
