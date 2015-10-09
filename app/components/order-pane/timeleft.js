import React, {Component, PropTypes} from 'react';
import moment from 'moment-timezone';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';

import {OrderStore} from '../../stores/order';
import {Order} from '../../models/order';

@dependencies({
    orderStore: OrderStore
})
@listeningTo(['orderStore'], ({orderStore}) => {
    return {
        order: orderStore.getOrder()
    };
})
export class OrderPaneTimeLeftComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order).isRequired
    }

    render() {
        const {order} = this.props;
        const {timezone} = order.attributes;
        const now = moment().tz(timezone);
        const then = order.getDatetimeMoment();
        const time = moment.duration(then - now);

        // TODO: setup moment locale to handle different wording
        // TODO: setup pluralize library to re-implement the color coding
        // TODO: setup a time store for synchronized times

        return (
            <div className="gb-order-pane-timeleft">
                <i className="icon-timer"></i>
                Time left to place order:

                <span className="gb-order-pane-timeleft-time">
                    {time.humanize()}
                </span>
            </div>
        );
    }
}
