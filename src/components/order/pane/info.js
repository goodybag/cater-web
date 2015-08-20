import React, {Component} from 'react';

import {Order} from '../../../models/order';

export class OrderPaneInfoComponent extends Component {
    static contextTypes = {
        order: Order.propType
    }

    render() {
        const location = '7901 Cameron Rd, Austin, TX 78754';
        const time = '1/22/2015 12:15 PM — 12:30 PM';
        const guests = 30;

        return (
            <div className="gb-order-pane-info">
                <div className="gb-order-pane-info-location">{location}</div>

                <div className="gb-order-pane-info-time">{time}</div>

                <div className="gb-order-pane-info-guests">{guests}</div>

                <div className="gb-order-pane-info-edit">Edit</div>
            </div>
        );
    }
}
