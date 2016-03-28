import React, {Component, PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';
import cx from 'classnames';

import {Order} from '../../../models/order';

export class OrderPaneCheckoutComponent extends Component {
    static propTypes = {
        subtotal: PropTypes.number.isRequired,
        order: PropTypes.instanceOf(Order).isRequired
    };

    render() {
        const {subtotal, order} = this.props;
        const {minimum_order} = order.restaurant;
        const isDisabled = minimum_order && (minimum_order > subtotal);

        const minOrderComponent = isDisabled &&
            (
                <tr>
                    <td className="gb-order-pane-checkout-min-order-text">
                        Minimum order size:
                    </td>

                    <td className="gb-order-pane-checkout-min-order-price">
                        <FormattedNumber
                            value={minimum_order / 100}
                            style="currency"
                            currency="USD"
                        />
                    </td>
                </tr>
            );

        return (
            <div className="gb-order-pane-checkout">
                <table className="gb-order-pane-checkout-subtotal">
                    <tbody>
                        <tr>
                            <td className="gb-order-pane-checkout-subtotal-text">
                                Subtotal
                            </td>

                            <td className="gb-order-pane-checkout-subtotal-price">
                                <FormattedNumber
                                    value={subtotal / 100}
                                    style="currency"
                                    currency="USD"
                                />
                            </td>
                        </tr>
                        {minOrderComponent}
                    </tbody>
                </table>

                <a href={ isDisabled ? '#' : `/orders/${order.id}/items`} className={cx({
                        "gb-order-pane-checkout-btn": true,
                        "disabled-btn": isDisabled
                    })}>
                    Checkout
                </a>
            </div>
        );
    }
}
