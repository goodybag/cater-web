import React, {Component, PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';

import {OrderItem} from '../../../models/order-item';

export class OrderPaneItemComponent extends Component {
    static propTypes = {
        orderItem: PropTypes.instanceOf(OrderItem).isRequired,
        onRemoveItem: PropTypes.func.isRequired,
        showLinks: PropTypes.bool
    };

    static defaultProps = {
        showLinks: true
    }

    handleRemoveItem = () => {
        const {removeItem, orderItem} = this.props;
        removeItem({orderItem});
    };

    render() {
        const {orderItem, showLinks} = this.props;
        const {name, quantity, price, options_sets} = orderItem;

        const choices = (options_sets || []).map(set => {
            return (set.options || [])
                .filter(option => option.state)
                .map(option => option.name);
        }).join(', ');

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

                <div className="gb-order-pane-item-options">
                    {choices}
                </div>

                {
                    showLinks ?
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
                        </div> : null
                }
            </div>
        );
    }
}
