import React, {Component} from 'react';
import moment from 'moment-timezone';

export class OrderPaneDateTimeComponent extends Component {
    static propTypes = {
        datetime: React.PropTypes.string.isRequired,
        timezone: React.PropTypes.string.isRequired,
        padding: React.PropTypes.number,
        displayTimeRange: React.PropTypes.bool,
        displayDate: React.PropTypes.bool
    }

    static defaultProps = {
        padding: 15,
        displayTimeRange: false,
        displayDate: false
    }

    render() {
        const {datetime} = this.props;
        const {timezone} = this.props;
        const {padding} = this.props;
        const {displayTimeRange} = this.props;
        const {displayDate} = this.props;
        const date = moment.tz(datetime, timezone).format('MM/DD/YYYY');
        const time_start = moment.tz(datetime, timezone).format('HH:mm a');
        const time_end = moment.tz(datetime, timezone).add(padding, 'minutes').format('HH:mm a');

        return(
            <div className="gb-order-pane-datetime">
                {   displayDate ? date :
                    displayTimeRange ? (time_start + " - " + time_end) :
                    "Display Else"    }
            </div>
        );
    }
};
