import React, {Component, PropTypes} from 'react';
import {inject, dependencies} from 'yokohama';
import {Dispatcher, listeningTo} from 'tokyo';

import {OrderItemStore} from '../../../stores/order-item';
import {OrderStore} from '../../../stores/order';
import {OrderItem} from '../../../models/order-item';
import {Order} from '../../../models/order';
import {OrderPaneItemComponent} from './item';
import {OrderPaneCheckoutComponent} from './checkout';
import {RemoveOrderItemAction} from '../../../actions/order';

@inject({
    dispatcher: Dispatcher,
    orderItemStore: OrderItemStore,
    orderStore: OrderStore
})
@listeningTo(['orderItemStore', 'orderStore'], ({orderItemStore, orderStore}) => {
    return {
        orderItems: orderItemStore.getOrderItems(),
        order: orderStore.getOrder()
    };
})
export class OrderPaneItemsComponent extends Component {
    static propTypes = {
        dispatcher: PropTypes.instanceOf(Dispatcher),
        order: PropTypes.instanceOf(Order).isRequired,
        orderItems: PropTypes.arrayOf(PropTypes.instanceOf(OrderItem))
    };

    handleRemoveItem = ({orderItem}) => {
        const {dispatcher, order} = this.props;

        const action = new RemoveOrderItemAction({order, orderItem});
        dispatcher.dispatch(action);
    };

    render() {
        const {order, orderItems} = this.props;
        const {handleRemoveItem} = this;
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
                    onRemoveItem={handleRemoveItem}
                />
            );
        }
    }
}
