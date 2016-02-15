import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {find} from 'lodash';
import {inject} from 'yokohama';
import {Dispatcher, listeningTo} from 'tokyo';

import {MenuItem} from '../../../models/menu-item';
import {AddItemToOrderAction} from '../../../actions/menu';
import {OrderStore} from '../../../stores/order';
import {OrderItemComponent} from '../../order-pane/items/item-edit';

@inject({
    dispatcher: Dispatcher,
    orderStore: OrderStore
})
@listeningTo(['orderStore'], ({orderStore}) => {
    return {
        order: orderStore.getOrder()
    };
})
export class RestaurantMenuItemMenuComponent extends Component {
    static propTypes = {
        item: PropTypes.instanceOf(MenuItem).isRequired,
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
        onClose: PropTypes.func.isRequired
    };

    render() {
        const {item, onClose, dispatcher, order} = this.props;

        return (
            <OrderItemComponent
                orderId={order.id}
                orderItem={item}
                dispatcher={dispatcher}
                onClose={onClose}
                menuView={true}
            />
        );
    }
}

export class RestaurantMenuItemMenuWrapperComponent extends Component {
    componentWillEnter(done) {
        const {wrapper, child} = this.refs;
        const node = findDOMNode(child);

        wrapper.style.height = `${node.clientHeight}px`;
        setTimeout(done, 200);
    }

    componentWillLeave(done) {
        const {wrapper} = this.refs;

        wrapper.style.height = 0;
        setTimeout(done, 200);
    }

    render() {
        return (
            <div className="gb-restaurant-menu-item-menu-wrapper" ref="wrapper">
                {this.props.showNoOrderMessage
                    ? <RestaurantMenuItemMenuWrapperComponent.NoOrderMessage />
                    : null
                }
                <RestaurantMenuItemMenuComponent ref="child" {...this.props}/>
            </div>
        );
    }

    static NoOrderMessage(props) {
        return (
            <div className="gb-restaurant-menu-item-no-order-message">
                <div className="gb-restaurant-menu-item-no-order-message-wrapper">
                    <p><strong>Want to order this item?</strong> Just enter your order info first.</p>
                    <p>That way you can make sure the restuarant will be able to make your food!</p>
                </div>
            </div>
        );
    }
}
