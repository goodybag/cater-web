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
        const hoursRemaining = scheduledTime.diff(currentTime, 'hours');

        if(!daysRemaining) {
            console.log("calculate hours: " + hoursRemaining);
        }

        return (
            <div className="gb-order-pane-timeleft">
                <i className="icon-timer"></i>
                TIME LEFT TO PLACE ORDER:
                <span className="gb-order-pane-timeleft-time">
                    {renderTimeRemaining()}
                </span>
            </div>
        );

        function renderTimeRemaining() {
            if(!daysRemaining) {
                if(!hoursRemaining) {
                    return (
                        <span className="gb-no-time-remaining">
                            { hoursRemaining + " HRS" }
                        </span>
                    );
                } else if (hoursRemaining===1) {
                    return (
                        <span className="gb-no-time-remaining">
                            { hoursRemaining + " HR" }
                        </span>
                    );
                } else {
                    return (
                        <span className="gb-hours-remaining">
                            { hoursRemaining + " HRS" }
                        </span>
                    );
                }
            } else if(daysRemaining===1) {
                return (
                    <span className="gb-days-remaining">
                        { daysRemaining + " DAY" }
                    </span>
                )
            } else {
                return (
                    <span className="gb-days-remaining">
                        { daysRemaining + " DAYS" }
                    </span>
                );
            }
        }
    }
}
