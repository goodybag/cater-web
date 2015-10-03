import React, {Component} from 'react';

export class OrderPaneCheckoutComponent extends Component {
    static propTypes = {
        prices: React.PropTypes.array.isRequired
    }

    formatPrice = (price) => {
        const dollars = price.toString().slice(0, -2);
        const cents = price.toString().slice(-2);

        return (
            ['$', dollars, '.', cents].join('')
        );
    }

    render() {
        const {prices} = this.props;
        const {formatPrice} = this;

        return (
            <div className="gb-order-pane-checkout">
                <table className="gb-order-pane-checkout-subtotal">
                    <tbody>
                        <tr>
                            <td className="gb-order-pane-checkout-subtotal-text">
                                Subtotal
                            </td>
                            <td className="gb-order-pane-checkout-subtotal-price">
                                {/*formatPrice(price)*/}
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
