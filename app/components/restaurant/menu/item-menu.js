import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {find} from 'lodash';
import {inject} from 'yokohama';
import {Dispatcher} from 'flux';
import {listeningTo} from 'tokyo';

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
        const {item, onClose, dispatcher} = this.props;

        return (
            <OrderItemComponent
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
                <RestaurantMenuItemMenuComponent ref="child" {...this.props}/>
            </div>
        );
    }
}
