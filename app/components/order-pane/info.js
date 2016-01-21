import React, {Component, PropTypes} from 'react';
import {FormattedDate, FormattedTime} from 'react-intl';

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

        return (
            <div className="gb-order-pane-info">
                <div className="gb-order-pane-info-show">
                    <div className="gb-order-pane-info-location">
                        <i className="icon-locationpin"></i>
                        {address}
                    </div>

                    <div className="gb-order-pane-info-date">
                        <i className="icon-calendar"></i>
                        <FormattedDate value={datetime}/>
                    </div>

                    <div className="gb-order-pane-info-time">
                        <i className="icon-clock"></i>
                        <FormattedTime value={datetime} format="hhmma"/>
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
