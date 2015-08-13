import React, {Component} from 'react';

import {Order} from '../../models/order';

export class OrderPaneComponent extends Component {
    static propTypes = {
        order: React.PropTypes.instanceOf(Order).isRequired
    }

    static childContextTypes = {
        order: React.PropTypes.instanceOf(Order)
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
