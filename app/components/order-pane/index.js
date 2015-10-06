import React, {Component, PropTypes} from 'react';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';
import cxnames from 'classnames';

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

    state = {
        infoHeaderClosed: false,
        shareHeaderClosed: true,
        itemsHeaderClosed: false
    }

    handlePaneHeaderClick = (btn) => {
        if(btn === "info-header") {
            this.setState({
                infoHeaderClosed: !this.state.infoHeaderClosed
            });
        }

        if(btn === "share-header") {
            this.setState({
                shareHeaderClosed: !this.state.shareHeaderClosed
            });
        }

        if(btn === "items-header") {
            this.setState({
                itemsHeaderClosed: !this.state.itemsHeaderClosed
            });
        }
    }

    render() {
        const {order, orderItems} = this.props;
        const {datetime, timezone} = order.attributes;
        const {handlePaneHeaderClick} = this;
        let {infoHeaderClosed, shareHeaderClosed, itemsHeaderClosed} = this.state;

        return (
            <div className="gb-order-pane">

                <OrderPaneTimeLeftComponent
                    datetime={datetime}
                    timezone={timezone}
                />

                <div className="gb-order-pane-tablet-left">
                    <div className="gb-order-pane-header-container" onClick={handlePaneHeaderClick.bind(this, "info-header")}>
                        <OrderPaneHeaderComponent
                            title={order.isNew() ? 'Order Info' : `Order – #${order.id}`}
                            closed={infoHeaderClosed}
                        />
                    </div>

                    {
                        !infoHeaderClosed ?
                            <OrderPaneInfoComponent order={order} /> : ""
                    }

                    <div className="gb-order-pane-header-container" onClick={handlePaneHeaderClick.bind(this, "share-header")}>
                        <OrderPaneHeaderComponent
                            title="Share Order (Optional)"
                            closed={shareHeaderClosed}
                        />
                    </div>

                    {
                        !shareHeaderClosed ?
                            <OrderPaneShareComponent order={order} /> : ""
                    }

                </div>

                <div className="gb-order-pane-tablet-right">
                    <div className="gb-order-pane-header-container" onClick={handlePaneHeaderClick.bind(this, "items-header")}>
                        <OrderPaneHeaderComponent
                            title="Order Items"
                            closed={itemsHeaderClosed}
                        />
                    </div>

                    {
                        !itemsHeaderClosed ?
                            <OrderPaneItemsComponent orderItems={orderItems} /> : ""
                    }
                </div>

                <div className="gb-order-pane-endcap"></div>
            </div>
        );
    }
}

class OrderPaneHeaderComponent extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        closed: React.PropTypes.bool.isRequired
    }

    render() {
        const {title, closed} = this.props;

        return (
            <div className="gb-order-pane-header">
                <div className="gb-order-pane-header-text">
                    {title}
                    <i className={"icon-arrow_" + cxnames({"side":closed, "down":!closed})}></i>
                </div>
            </div>
        );
    }
}
