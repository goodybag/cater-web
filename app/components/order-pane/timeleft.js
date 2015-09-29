import React, {Component} from 'react';
import moment from 'moment-timezone';

export class OrderPaneTimeLeftComponent extends Component {
    static propTypes = {
        datetime: React.PropTypes.string.isRequired,
        timezone: React.PropTypes.string.isRequired
    }

    render() {
        const {datetime, timezone} = this.props;
        const currentTime = moment().tz(timezone);
        const scheduledTime = moment.tz(datetime, timezone);
        const daysRemaining = scheduledTime.diff(currentTime, 'days');

        return (
            <div className="gb-order-pane-timeleft">
                <i className="icon-timer"></i>
                TIME LEFT TO PLACE ORDER:
                <span className="gb-order-pane-timeleft-time">
                    {
                        daysRemaining===1 ? "1 DAY" :
                        ( daysRemaining + " DAYS" )
                    }
                </span>
            </div>
        );
    }
}
