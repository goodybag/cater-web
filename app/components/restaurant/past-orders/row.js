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
            <div className="gb-restaurant-orders-row">
                <div className="gb-restaurant-orders-row-group-first">
                    <div className="gb-restaurant-orders-col-status">
                        <RestaurantOrdersStatusLabelComponent
                            status={status}
                        />
                    </div>
                    <div className="gb-restaurant-orders-col-date">
                        {/* TODO: Change mm/dd/yyyy to mm/dd/yy format
                            <FormattedDate value={tzdatetime}/>
                         */}
                        3/12/15
                    </div>
                    <div className="gb-restaurant-orders-col-time">
                        <FormattedTime value={datetime} format="hhmma"/>
                    </div>
                    <div className="gb-restaurant-orders-col-total">
                        <FormattedNumber
                            value={total / 100}
                            style="currency"
                            currency="USD"
                        />
                    </div>
                </div>
                <div className="gb-restaurant-orders-row-group-second">
                    <div className="gb-restaurant-orders-col-expired">
                        {/*TODO: Expired*/
                            status==="pending" ? "Expired" : ""
                        }
                    </div>
                    <div className="gb-restaurant-orders-col-resume">
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
                    </div>
                    <div className="gb-restaurant-orders-col-view">
                        <a href="/restaurants/111/orders" onClick={onLinkClicked.bind(this, "view")}>
                            View
                        </a>
                    </div>
                    <div className="gb-restaurant-orders-col-duplicate">
                        <a href="/restaurants/111/orders" onClick={onLinkClicked.bind(this, "duplicate")}>
                            Duplicate
                        </a>
                    </div>
                    <div className="gb-restaurant-orders-col-cancel">
                        <a href="/restaurants/111/orders" onClick={onLinkClicked.bind(this, "cancel")}>
                            {
                                status === "canceled" ? "" :
                                "Cancel"
                                /* TODO: add logic if too close to delivery time */
                            }
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
