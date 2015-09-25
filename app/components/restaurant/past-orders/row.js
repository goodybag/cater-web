import React, {Component} from 'react';

import moment from 'moment-timezone';

export class RestaurantOrdersRowComponent extends Component {
    static propTypes = {
        status: React.PropTypes.string.isRequired,
        datetime: React.PropTypes.string.isRequired,
        timezone: React.PropTypes.string.isRequired,
        total: React.PropTypes.number.isRequired
    }

    displayStatus = (status) => {
        if(status==="pending") {
            return "Draft"
        } else {
            return [status.slice(0,1).toUpperCase(), status.slice(1)].join('');
        }
    }

    formatPrice = (price) => {
        const dollars = price.toString().slice(0, -2);
        const cents = price.toString().slice(-2);

        return (
            ['$', dollars, '.', cents].join('')
        );
    }

    render() {
        const {status, datetime, timezone, total} = this.props;
        const {displayStatus, formatPrice} = this;
        const date = moment.tz(datetime, timezone).format('MM/DD/YYYY');
        const time = moment.tz(datetime, timezone).format('HH:mm a');

        return (
            <tr className="gb-restaurant-orders-row">
                <td className="gb-restaurant-orders-row-status">
                    {displayStatus(status)}
                </td>
                <td className="gb-restaurant-orders-row-date">
                    {date}
                </td>
                <td className="gb-restaurant-orders-row-time">
                    {time}
                </td>
                <td className="gb-restaurant-orders-row-total">
                    {formatPrice(total)}
                </td>
                <td className="gb-restaurant-orders-row-expired">
                    {/*TODO: Expired*/}
                </td>
                <td className="gb-restaurant-orders-row-resume">
                    <a href="#">
                        {
                            status==="pending" ? "Resume" :
                            status==="canceled" ? "Uncancel" : ""
                        }
                    </a>
                </td>
                <td className="gb-restaurant-orders-row-view">
                    <a href="#">
                        View
                    </a>
                </td>
                <td className="gb-restaurant-orders-row-duplicate">
                    <a href="#">
                        Duplicate
                    </a>
                </td>
                <td classname="gb-restaurant-orders-row-cancel">
                    <a href="#">
                        {
                            status === "canceled" ? "" :
                            "Cancel"
                            /* TODO: add logic if too close to delivery time */
                        }
                    </a>
                </td>
            </tr>
        );
    }
}
