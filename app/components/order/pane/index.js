import React, {Component} from 'react';

import {Order} from '../../../models/order';
import {OrderPaneInfoComponent} from './info';
import {OrderPaneShareComponent} from './share';

export class OrderPaneComponent extends Component {
    static propTypes = {
        order: Order.propType.isRequired
    }

    static childContextTypes = {
        order: Order.propType.isRequired
    }

    getChildContext() {
        const {order} = this.props;

        return {order};
    }

    render() {
        const {order} = this.props;

        return (
            <div className="gb-order-pane">
                <div className="gb-order-pane-header">
                    <div className="gb-order-pane-header-text">Order {order.id && `– #${order.id}`}</div>
                </div>

                <OrderPaneInfoComponent/>

                <div className="gb-order-pane-header">
                    <div className="gb-order-pane-header-text">Share</div>
                </div>

                <OrderPaneShareComponent/>
            </div>
        );
    }
}
