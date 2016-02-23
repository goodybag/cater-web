import React, {Component, PropTypes} from 'react';
import moment from 'moment-timezone';

import {Order} from '../../models/order';

export class OrderPaneInfoComponent extends Component {
    static propTypes = {
        onStartEditing: PropTypes.func.isRequired,
        order: PropTypes.instanceOf(Order).isRequired
    };

    constructor(props) {
        super(props);

        this.startEditing = this.startEditing.bind(this);
    }

    startEditing() {
        this.props.onStartEditing();
    }

    render() {
        const {order} = this.props;
        const {guests, datetime} = order;
        const address = order.displayAddress();

        const [date, time] = datetime.split(' ', 2);

        const mDate = moment(date, 'YYYY-MM-DD');
        const mTime = moment(time, 'HH:mm:ss');

        return (
            <div className="gb-order-pane-info">
                <div className="gb-order-pane-info-show">
                    <div className="gb-order-pane-info-location">
                        <i className="icon-locationpin"></i>
                        {address}
                    </div>

                    <div className="gb-order-pane-info-date">
                        <i className="icon-calendar"></i>
                        {mDate.format('M/DD/YYYY')}
                    </div>

                    <div className="gb-order-pane-info-time">
                        <i className="icon-clock"></i>
                        {mTime.format('hh:mm a')}
                    </div>

                    <div className="gb-order-pane-info-guests">
                        <i className="icon-profile"></i>
                        {guests}
                    </div>

                    <div
                        className="gb-order-pane-info-editbutton"
                        onClick={this.startEditing}>
                        Edit
                    </div>
                </div>
            </div>
        );
    }
}
