import React, {Component} from 'react';

import {Order} from '../../../models/order';
import {OrderPaneInfoComponent} from './info';

export class OrderPaneComponent extends Component {
    static propTypes = {
        order: Order.propType
    }

    static childContextTypes = {
        order: Order.propType
    }

    getChildContext() {
        const {order} = this.props;

        return {order};
    }

    render() {
        return (
            <div className="gb-order-pane">
                <div className="gb-order-pane-header">
                    <div className="gb-order-pane-header-text">Order</div>
                </div>

                <OrderPaneInfoComponent/>
            </div>
        );
    }
}
