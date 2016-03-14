import React, {Component} from 'react';
import {FormattedNumber, FormattedDate, FormattedTime} from 'react-intl';
import {Dispatcher} from 'tokyo';
import {inject} from 'yokohama';

import {RestaurantOrdersStatusLabelComponent} from './status-label';
import {DisplayOrderAction, DuplicateOrderAction, CancelOrderAction, UncancelOrderAction} from '../../../actions/past-orders';
import {RestaurantPastOrdersModalComponent} from './modal';
import {ModalState} from '../../../lib/modal';

import moment from 'moment-timezone';

@inject({
    modals: ModalState
})
export class RestaurantOrdersRowComponent extends Component {
    static propTypes = {
        order: React.PropTypes.object.isRequired,
        now: React.PropTypes.instanceOf(Date).isRequired,
        dispatcher: React.PropTypes.instanceOf(Dispatcher)
    };

    handleViewClick = () => {
        const {order, dispatcher, modals} = this.props;

        const action = new DisplayOrderAction({order});

        dispatcher.dispatch(action);

        modals.open(RestaurantPastOrdersModalComponent);
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
    };

    handleUncancelClick = () => {
        const {order, dispatcher} = this.props;

        const action = new UncancelOrderAction(order.id);

        dispatcher.dispatch(action);
    };

    render() {
        const {order, now} = this.props;

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
                        {order.deadline < now && 'Expired'}
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
