import React, {Component, PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';

export class OrderPaneCheckoutComponent extends Component {
    static propTypes = {
        subtotal: PropTypes.number.isRequired
    };

    render() {
        const {subtotal} = this.props;

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
                    </tbody>
                </table>

                <div className="gb-order-pane-checkout-btn">
                    Checkout
                </div>
            </div>
        );
    }
}
