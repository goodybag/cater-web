import React, {Component, PropTypes} from 'react';
import {formatPrice} from '../../../lib/price';

export class OrderPaneCheckoutComponent extends Component {
    static propTypes = {
        total: PropTypes.number.isRequired
    }

    render() {
        const {total} = this.props;

        return (
            <div className="gb-order-pane-checkout">
                <table className="gb-order-pane-checkout-subtotal">
                    <tbody>
                        <tr>
                            <td className="gb-order-pane-checkout-subtotal-text">
                                Subtotal
                            </td>

                            <td className="gb-order-pane-checkout-subtotal-price">
                                {formatPrice(total)}
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
