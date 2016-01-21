import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import cxnames from 'classnames';

import {OrderStore} from '../../stores/order';
import {OrderItemStore} from '../../stores/order-item';
import {Order} from '../../models/order';
import {OrderItem} from '../../models/order-item';
import {OrderPaneInfoComponent} from './info';
import {OrderPaneShareComponent} from './share';
import {OrderPaneItemsComponent} from './items';
import {OrderPaneTimeLeftComponent} from './timeleft';

@inject({
    orderStore: OrderStore,
    orderItemStore: OrderItemStore
}, [OrderPaneInfoComponent, OrderPaneItemsComponent])
@listeningTo(['orderStore', 'orderItemStore'], props => {
    const {orderStore, orderItemStore} = props;

    return {
        order: orderStore.getOrder(),
        orderItems: orderItemStore.getOrderItems()
    };
})
export class OrderPaneComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order).isRequired,
        orderItems: PropTypes.arrayOf(PropTypes.instanceOf(OrderItem))
    };

    render() {
        const {order, orderItems} = this.props;
        const {datetime, timezone} = order;

        return (
            <div className="gb-order-pane">
                <OrderPaneTimeLeftComponent order={order}/>

                <div className="gb-order-pane-tablet-left">
                    <OrderPaneHeaderComponent title={`Order - #${order.id}`}>
                        <OrderPaneInfoComponent/>
                    </OrderPaneHeaderComponent>

                    <OrderPaneHeaderComponent
                        title="Share Order (Optional)"
                        initiallyClosed>

                        <OrderPaneShareComponent order={order}/>
                    </OrderPaneHeaderComponent>
               </div>

                <div className="gb-order-pane-tablet-right">
                    <OrderPaneHeaderComponent title="Order Items">
                        <OrderPaneItemsComponent />
                    </OrderPaneHeaderComponent>
                </div>

                <div className="gb-order-pane-endcap"/>
            </div>
        );
    }
}

class OrderPaneHeaderComponent extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        initiallyClosed: PropTypes.bool
    };

    state = {
        open: !this.props.initiallyClosed
    };

    handleClick = () => {
        this.setState(({open}) => {
            return {
                open: !open
            };
        });
    };

    render() {
        const {open} = this.state;
        const {title, children} = this.props;

        const iconx = open ? 'gb-arrow-down' : 'gb-arrow-right';

        return (
            <div className="gb-order-pane-block">
                <div className="gb-order-pane-header" onClick={this.handleClick}>
                    <div className="gb-order-pane-header-text">
                        {title}
                    </div>

                    <div className="gb-order-pane-header-arrow">
                        <div className={iconx}/>
                    </div>
                </div>

                {open && children}
            </div>
        );
    }
}
