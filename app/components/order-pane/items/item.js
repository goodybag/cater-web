import React, {Component, PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';

import {OrderItem} from '../../../models/order-item';

export class OrderPaneItemComponent extends Component {
    static propTypes = {
        orderItem: PropTypes.instanceOf(OrderItem).isRequired,
        onRemoveItem: PropTypes.func.isRequired
    };

    handleRemoveItem = () => {
        const {removeItem, orderItem} = this.props;
        removeItem({orderItem});
    };

    render() {
        const {orderItem} = this.props;
        const {name, quantity, price} = orderItem;

        return (
            <div className="gb-order-pane-item">
                <table className="gb-order-pane-item-info">
                    <tbody>
                        <tr>
                            <td className="gb-order-pane-item-info-name">
                                {name}
                            </td>

                            <td className="gb-order-pane-item-info-quantity">
                                x{quantity}
                            </td>

                            <td className="gb-order-pane-item-info-price">
                                <FormattedNumber
                                    value={price / 100}
                                    style="currency"
                                    currency="USD"
                                />
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

                    <a href="/" className="gb-order-pane-item-remove" onClick={this.handleRemoveItem}>
                        Remove
                    </a>
                </div>
            </div>
        );
    }
}
