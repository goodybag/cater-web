import React, {Component, PropTypes} from 'react';
import {inject, dependencies} from 'yokohama';
import {Dispatcher, listeningTo} from 'tokyo';

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

    render() {
        const {order, orderItems, editOrderItemModalOpen, editOrderItem} = this.props;
        const {sub_total} = order;

        return (
            <div className="gb-order-pane-items">
                {orderItems.map(renderOrderItem)}

                <OrderPaneCheckoutComponent subtotal={sub_total}/>

                {
                    editOrderItemModalOpen ?
                        <OrderItemEditorComponent
                            orderItem={editOrderItem}
                        /> : null
                }
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
