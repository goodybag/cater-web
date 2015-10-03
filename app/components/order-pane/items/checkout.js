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

    addAll = (arr) => {
        const {formatPrice} = this;
        let total = 0;

        for ( let i = 0; i < arr.length; i++ ) {
            total += arr[i];
        }

        return (
            formatPrice(total)
        );
    }

    render() {
        const {prices} = this.props;
        const {formatPrice} = this;
        const {addAll} = this;

        return (
            <div className="gb-order-pane-checkout">
                <table className="gb-order-pane-checkout-subtotal">
                    <tbody>
                        <tr>
                            <td className="gb-order-pane-checkout-subtotal-text">
                                Subtotal
                            </td>
                            <td className="gb-order-pane-checkout-subtotal-price">
                                {addAll(prices)}
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
