import React, {Component, PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import moment from 'moment-timezone';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';
import cx from 'classnames';

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
        const {timezone, datetime} = order.attributes;
        const now = moment().tz(timezone);
        const then = order.getDatetimeMoment();
        const time = moment.duration(now - then);

        const set = cx('gb-order-pane-timeleft', {
            'gb-order-pane-timeleft-urgent': time.asHours() < 3
        });

        return (
            <div className={set}>
                <div className="gb-order-pane-timeleft-timer"/>

                <div className="gb-order-pane-timeleft-text">
                    Time left to place order:
                </div>

                <OrderPaneTimeLeftMetricComponent time={time}/>
            </div>
        );
    }
}

export class OrderPaneTimeLeftMetricComponent extends Component {
    static propTypes = {
        time: PropTypes.instanceOf(moment.duration.fn.constructor).isRequired
    }

    render() {
        const {time} = this.props;

        return (
            <div className="gb-order-pane-timeleft-metric">
                {time.humanize()}
            </div>
        );
    }
}
