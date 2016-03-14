import React, {Component, PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import moment from 'moment-timezone';
import cx from 'classnames';

import {OrderStore} from '../../stores/order';
import {Order} from '../../models/order';

export class OrderPaneTimeLeftComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order).isRequired,
        now: PropTypes.instanceOf(Date).isRequired
    };

    render() {
        const {order, now} = this.props;
        const {deadline} = order;
        const then = moment(deadline);
        const time = moment.duration(Math.max(then.diff(moment(now)), 0));

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
    };

    render() {
        const {time} = this.props;

        return (
            <div className="gb-order-pane-timeleft-metric">
                {+time !== 0 ? time.humanize() : '0 min'}
            </div>
        );
    }
}
