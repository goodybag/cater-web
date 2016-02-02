import React, {Component} from 'react';
import {FormattedNumber, FormattedDate, FormattedTime} from 'react-intl';
import {Dispatcher} from 'flux';

import {RestaurantOrdersStatusLabelComponent} from './status-label';
import {DisplayOrderAction, DuplicateOrderAction, CancelOrderAction, UncancelOrderAction} from '../../../actions/past-orders';

import moment from 'moment-timezone';

export class RestaurantOrdersRowComponent extends Component {
    static propTypes = {
        order: React.PropTypes.object.isRequired,
        dispatcher: React.PropTypes.instanceOf(Dispatcher)
    };

    handleViewClick = () => {
        const {order, dispatcher} = this.props;

        const action = new DisplayOrderAction({order});

        dispatcher.dispatch(action);
    };

    handleDuplicateClick = () => {
        const {order, dispatcher} = this.props;

        const action = new DuplicateOrderAction(order.id);

        dispatcher.dispatch(action);
    };

    handleCancelClick = () => {
        const {order, dispatcher} = this.props;

        const action = new CancelOrderAction(order.id);

        dispatcher.dispatch(action);
    }

    handleUncancelClick = () => {
        const {order, dispatcher} = this.props;

        const action = new UncancelOrderAction(order.id);

        dispatcher.dispatch(action);
    }

    render() {
        const {order} = this.props;

        return (
            <div className="gb-restaurant-orders-row">
                <div className="gb-restaurant-orders-row-group-first">
                    <div className="gb-restaurant-orders-col-status">
                        <RestaurantOrdersStatusLabelComponent
                            status={order.status}
                        />
                    </div>
                    <div className="gb-restaurant-orders-col-date">
                        <FormattedDate value={order.datetime} day="numeric" month="numeric" year="numeric"/>
                    </div>
                    <div className="gb-restaurant-orders-col-time">
                        <FormattedTime value={order.datetime} format="hhmma"/>
                    </div>
                    <div className="gb-restaurant-orders-col-total">
                        <FormattedNumber
                            value={order.total / 100}
                            style="currency"
                            currency="USD"
                        />
                    </div>
                </div>
                <div className="gb-restaurant-orders-row-group-second">
                    <div className="gb-restaurant-orders-col-expired">
                        { order.deadline < Date.now() ? "Expired" : ""}
                    </div>

                    <div className="gb-restaurant-orders-col-resume">
                        {
                            order.status==="pending" ?
                                <a href="/restaurants/111/orders">
                                    Resume
                                </a> :
                            order.status==="canceled" ?
                                <a href="/restaurants/111/orders" onClick={this.handleUncancelClick}>
                                    Uncancel
                                </a> : null
                        }
                    </div>
                    <div className="gb-restaurant-orders-col-view">
                        <a
                            href="/restaurants/111/orders"
                            onClick={this.handleViewClick}>
                            View
                        </a>
                    </div>
                    <div className="gb-restaurant-orders-col-duplicate">
                        <a
                            href="/restaurants/111/orders"
                            onClick={this.handleDuplicateClick} >
                            Duplicate
                        </a>
                    </div>
                    <div className="gb-restaurant-orders-col-cancel">
                        {
                            order.status === 'canceled' ? null :
                                <a href="/restaurants/111/orders" onClick={this.handleCancelClick}>
                                    Cancel
                                </a>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
