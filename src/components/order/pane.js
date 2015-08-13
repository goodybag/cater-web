import React, {Component} from 'react';

import {Order} from '../../models/order';

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
            <div className="gb-order-pane"></div>
        );
    }
}
