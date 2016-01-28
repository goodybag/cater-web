import React, {Component, PropTypes} from 'react';
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {Dispatcher} from 'flux';

import {Order} from '../../../models/order';
import {RestaurantOrdersStatusLabelComponent} from './status-label';
import {OrderPaneItemComponent} from '../../order-pane/items/item';
import {PastOrdersStore} from '../../../stores/past-orders';
import {StopDisplayingOrderAction} from '../../../actions/past-orders';

@inject({
    pastOrdersStore: PastOrdersStore,
    dispatcher: Dispatcher
})
@listeningTo(['pastOrdersStore'], ({pastOrdersStore}) => {
    return {
        order: pastOrdersStore.getCurrentOrder(),
        orderItems: pastOrdersStore.getCurrentOrderItems()
    }
})
export class RestaurantPastOrdersModalComponent extends Component {
    static propTypes = {
        order: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Order)
        ]),
        orderItems: PropTypes.array,
        dispatcher: PropTypes.instanceOf(Dispatcher)
    };

    handleKeyDown = (e) => { // <-- 'ESC' key is keycode 27
        if(e.keyCode === 27) this.close();
    };

    componentWillMount = () => {
        window.addEventListener('keydown', this.handleKeyDown, false);
    };

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.handleKeyDown, false);
    };

    close = () => {
        const {dispatcher} = this.props;

        const action = new StopDisplayingOrderAction();

        dispatcher.dispatch(action);
    };

    render() {
        const {order} = this.props;

        return order && (
            <div className="gb-modal-container">
                <div className="gb-modal-overlay" onClick={this.close} />

                <div className="gb-modal">
                    {this.renderModal()}
                </div>
            </div>
        );
    }

    renderModal() {
        const {order, orderItems} = this.props;

        if (order === 'loading') {
            return <ModalLoaderComponent/>;
        } else {
            return (
                <ModalOrderComponent
                    order={order}
                    orderItems={orderItems}
                    onModalClose={this.close}
                />
            );
        }
    }
}

export class ModalLoaderComponent extends Component {
    render() {
        return (
            <div className="gb-modal-loading">
                <div className="gb-modal-loading-spinner"></div>
            </div>
        );
    }
}

export class ModalOrderComponent extends Component {
    static propTypes = {
        order: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Order)
        ]),
        orderItems: PropTypes.array,
        onModalClose: PropTypes.func
    };

    close = () => {
        this.props.onModalClose();
    };

    render() {
        const {order, orderItems} = this.props;

        return (
            <div className="gb-modal-order">

                <div className="gb-modal-order-header">
                    Order #{order.id}
                    <span className="icon-x" onClick={this.close} />
                </div>

                <div className="gb-modal-order-contents">
                    <div className="gb-modal-order-details">
                        <div>
                            Delivery Date: {' '}
                            <FormattedDate value={order.datetime} />
                        </div>

                        <div>
                            Delivery Time: {' '}
                            <FormattedTime
                                value={order.datetime}
                                format="hhmma"
                            />
                        </div>

                        <div>Guests: {' '} {order.guests}</div>

                        <RestaurantOrdersStatusLabelComponent
                            status={order.status}
                        />
                    </div>
                    <div className="gb-modal-order-summary">
                        <div className="gb-modal-order-summary-header">
                            Order Summary
                        </div>

                        {orderItems.map(renderOrderItem)}
                    </div>
                </div>
                <div className="gb-modal-order-footer">
                    <div className="gb-modal-order-footer-subtotal">
                        <div className="gb-modal-order-footer-subtotal-row">
                            <span className="gb-modal-order-footer-subtotal-price">
                                <FormattedNumber
                                    value={order.sub_total / 100}
                                    style="currency"
                                    currency="USD"
                                />
                            </span>

                            <span className="gb-modal-order-footer-subtotal-text">
                                Subtotal
                            </span>

                        </div>

                        <div className="gb-modal-order-footer-subtotal-row">
                            <span className="gb-modal-order-footer-subtotal-price">
                                <FormattedNumber
                                    value={order.delivery_fee / 100}
                                    style="currency"
                                    currency="USD"
                                />
                            </span>

                            <span className="gb-modal-order-footer-subtotal-text">
                                Delivery Fee
                            </span>
                        </div>

                        <div className="gb-modal-order-footer-subtotal-row">
                            <span className="gb-modal-order-footer-subtotal-price">
                                <FormattedNumber
                                    value={order.sales_tax / 100}
                                    style="currency"
                                    currency="USD"
                                />
                            </span>

                            <span className="gb-modal-order-footer-subtotal-text">
                                Tax
                            </span>
                        </div>

                        <div className="gb-modal-order-footer-subtotal-row">
                            <span className="gb-modal-order-footer-subtotal-price">
                                <FormattedNumber
                                    value={order.total / 100}
                                    style="currency"
                                    currency="USD"
                                />
                            </span>

                            <span className="gb-modal-order-footer-subtotal-text">
                                Total
                            </span>
                        </div>
                    </div>
                    <div className="gb-modal-order-footer-buttons">
                        <div
                            className="gb-modal-order-close-btn"
                            onClick={this.close}>
                            Close
                        </div>

                        {this.renderCancelButton()}

                        {this.renderActionButton()}
                    </div>
                </div>
            </div>
        );

        function renderOrderItem(orderItem) {
            return (
                <OrderPaneItemComponent
                    key={orderItem.id}
                    orderItem={orderItem}
                    showLinks={false}
                />
            );
        }
    }

    renderCancelButton() {
        const {order} = this.props;

        // TODO: Add logic to grey out if too close to delivery time */
        if (order.status === 'canceled') {
            return (
                <div className="gb-modal-order-uncancel-btn">
                    Uncancel this order
                </div>
            );
        } else {
            return (
                <div className="gb-modal-order-cancel-btn">
                    Cancel this order
                </div>
            );
        }
    }

    renderActionButton() {
        const {order} = this.props;

        if (order.status === 'pending') {
            return (
                <div className="gb-modal-order-resume-btn">
                    Resume this order
                </div>
            );
        } else {
            return (
                <div className="gb-modal-order-duplicate-btn">
                    Duplicate this order
                </div>
            );
        }
    }
}
