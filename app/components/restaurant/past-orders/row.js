import React, {Component} from 'react';
import {FormattedNumber, FormattedDate, FormattedTime} from 'react-intl';

import {RestaurantOrdersStatusLabelComponent} from './status-label';

import moment from 'moment-timezone';

export class RestaurantOrdersRowComponent extends Component {
    static propTypes = {
        status: React.PropTypes.string.isRequired,
        datetime: React.PropTypes.string.isRequired,
        timezone: React.PropTypes.string.isRequired,
        total: React.PropTypes.number.isRequired,
        initAlertState: React.PropTypes.bool.isRequired,
        signalAlertOpen: React.PropTypes.func.isRequired
    }

    state = {
        alertOpen: this.props.initAlertState
    }

    onLinkClicked = (action) => {
        this.setState({
            alertOpen: true
        });
        this.props.signalAlertOpen(action);
    }

    render() {
        const {status, datetime, timezone, total} = this.props;
        const {displayStatus} = this;
        const tzdatetime = moment.tz(datetime, timezone);

        const {onLinkClicked} = this;

        return (
            <tr className="gb-restaurant-orders-row">
                <td className="gb-restaurant-orders-row-status">
                    <RestaurantOrdersStatusLabelComponent
                        status={status}
                    />
                </td>

                <td className="gb-restaurant-orders-row-date">
                    <FormattedDate value={tzdatetime}/>
                </td>

                <td className="gb-restaurant-orders-row-time">
                    <FormattedTime value={tzdatetime} format="hhmma"/>
                </td>

                <td className="gb-restaurant-orders-row-total">
                    <FormattedNumber
                        value={total / 100}
                        style="currency"
                        currency="USD"
                    />
                </td>
                <td className="gb-restaurant-orders-row-expired">
                    {/*TODO: Expired*/}
                </td>
                <td className="gb-restaurant-orders-row-resume">
                    {
                        status==="pending" ?
                            <a href="/restaurants/111/orders" onClick={onLinkClicked.bind(this, "resume")}>
                                Resume
                            </a> :
                        status==="canceled" ?
                            <a href="/restaurants/111/orders" onClick={onLinkClicked.bind(this, "uncancel")}>
                                Uncancel
                            </a> : ""
                    }
                </td>
                <td className="gb-restaurant-orders-row-view">
                    <a href="/restaurants/111/orders" onClick={onLinkClicked.bind(this, "view")}>
                        View
                    </a>
                </td>
                <td className="gb-restaurant-orders-row-duplicate">
                    <a href="/restaurants/111/orders" onClick={onLinkClicked.bind(this, "duplicate")}>
                        Duplicate
                    </a>
                </td>
                <td className="gb-restaurant-orders-row-cancel">
                    <a href="/restaurants/111/orders" onClick={onLinkClicked.bind(this, "cancel")}>
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
