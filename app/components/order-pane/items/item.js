import React, {Component} from 'react';

import {OrderItem} from '../../../models/order-item';

export class OrderPaneItemComponent extends Component {
    static propTypes = {
        orderItem: OrderItem.propType.isRequired
    }

    formatPrice = (price) => {
        const dollars = price.toString().slice(0, -2);
        const cents = price.toString().slice(-2);

        return (
            ['$', dollars, '.', cents].join('')
        );
    }

    render() {
        const {orderItem} = this.props;
        const {name, quantity, price} = orderItem.attributes;
        const {formatPrice} = this;

        return (
            <div className="gb-order-pane-item">
                <table className="gb-order-pane-item-info">
                    <tbody>
                        <tr>
                            <td className="gb-order-pane-item-info-name">
                                {name}
                            </td>
                            <td className="gb-order-pane-item-info-quantity">
                                {"x" + quantity}
                            </td>
                            <td className="gb-order-pane-item-info-price">
                                {formatPrice(price)}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="gb-order-pane-item-links">
                    <a href="/" className="gb-order-pane-item-edit">
                        Edit
                    </a>
                    <span className="gb-order-pane-item-links-del">
                        |
                    </span>
                    <a href="/" className="gb-order-pane-item-remove">
                        Remove
                    </a>
                </div>
            </div>
        );
    }
}
