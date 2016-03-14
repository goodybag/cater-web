import React, {Component} from 'react';
import {FormattedNumber, FormattedDate, FormattedTime} from 'react-intl';
import {Dispatcher} from 'tokyo';
import {inject} from 'yokohama';
import cx from 'classnames';

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

    state = {
        isCurrentOrder: false
    }

    handleViewClick = (e) => {
        e.preventDefault();
        const {order, dispatcher, modals} = this.props;

        const action = new DisplayOrderAction({order});

        dispatcher.dispatch(action);

        modals.open(RestaurantPastOrdersModalComponent, {
            isCurrentOrder: this.state.isCurrentOrder
        });
    };

    handleDuplicateClick = (e) => {
        e.preventDefault();
        const {order, dispatcher} = this.props;

        const action = new DuplicateOrderAction(order.id);

        dispatcher.dispatch(action);
    };

    handleCancelClick = (e) => {
        e.preventDefault();
        const {order, dispatcher} = this.props;

        const action = new CancelOrderAction(order.id);

        dispatcher.dispatch(action);
    };

    handleUncancelClick = (e) => {
        e.preventDefault();
        const {order, dispatcher} = this.props;

        const action = new UncancelOrderAction(order.id);

        dispatcher.dispatch(action);
    };

    handleResumeClick = (e) => {
        e.preventDefault();
    }

    checkCurrentOrder = () => {
        const {order, currentOrder} = this.props;
        this.setState({
            isCurrentOrder: order.id === currentOrder.id
        })
    }

    componentWillMount = () => {
        this.checkCurrentOrder();
    }

    render() {
        const {order, now} = this.props;
        const {isCurrentOrder} = this.state;

        return (
            <div className={cx({
                    "gb-restaurant-orders-row": true,
                    "current-order-row": isCurrentOrder
                })}>
                <div className="gb-restaurant-orders-row-group-first">
                    <div className="gb-restaurant-orders-col-status">
                        <RestaurantOrdersStatusLabelComponent
                            status={order.status}
                        />
                    </div>
                    <div className="gb-restaurant-orders-col-date">
                        {
                            order.datetime ?
                                <FormattedDate value={order.datetime} day="numeric" month="numeric" year="numeric"/> : "None"
                        }
                    </div>
                    <div className="gb-restaurant-orders-col-time">
                        {
                            order.datetime ?
                                <FormattedTime value={order.datetime} format="hhmma"/> : null
                        }
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
                            order.status==="pending" && !isCurrentOrder ?
                                <a onClick={this.handleResumeClick}>
                                    Resume
                                </a> :
                            order.status==="canceled" ?
                                <a onClick={this.handleUncancelClick}>
                                    Uncancel
                                </a> : null
                        }
                    </div>
                    <div className="gb-restaurant-orders-col-view">
                        <a
                            onClick={this.handleViewClick}>
                            View
                        </a>
                    </div>
                    <div className="gb-restaurant-orders-col-duplicate">
                        <a
                            onClick={this.handleDuplicateClick} >
                            Duplicate
                        </a>
                    </div>
                    <div className="gb-restaurant-orders-col-cancel">
                        {
                            order.status === 'canceled' ? null :
                                <a onClick={this.handleCancelClick}>
                                    Cancel
                                </a>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
