import React, {Component, PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';
import {Dispatcher} from 'tokyo';
import {inject} from 'yokohama';
import {clone} from 'lodash';

import {OrderItem} from '../../../models/order-item';
import {ReceiveEditOrderItemAction, RemoveOrderItemAction} from '../../../actions/order-item';
import {OrderItemEditorComponent} from './item-editor';
import {ModalState} from '../../../lib/modal';

@inject({
    dispatcher: Dispatcher,
    modals: ModalState
})
export class OrderPaneItemComponent extends Component {
    static propTypes = {
        orderItem: PropTypes.instanceOf(OrderItem).isRequired
    };

    onEditItemClick = (e) => {
        const {orderItem, dispatcher, modals} = this.props;

        e.preventDefault();

        modals.open(OrderItemEditorComponent, {
            orderItem
        });
    };

    onRemoveItemClick = (e) => {
        const {orderItem, dispatcher} = this.props;

        e.preventDefault();
        var action = new RemoveOrderItemAction({orderItem});
        dispatcher.dispatch(action);
    };

    render() {
        const {orderItem} = this.props;
        const {name, quantity, sub_total, options_sets} = orderItem;

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
                                    value={(sub_total / 100)}
                                    style="currency"
                                    currency="USD"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="gb-order-pane-item-options">
                    {displayOptions()}
                </div>

                <div className="gb-order-pane-item-links">
                    <a className="gb-order-pane-item-edit" onClick={this.onEditItemClick}>
                        Edit
                    </a>

                    <span className="gb-order-pane-item-links-del">
                        |
                    </span>

                    <a className="gb-order-pane-item-remove" onClick={this.onRemoveItemClick}>
                        Remove
                    </a>
                </div>
            </div>
        );

        function displayOptions() {
            const optionsSets = clone(options_sets, true);

            const itemOptionGroups = (optionsSets || [])
                .filter(itemOption => {
                    itemOption.options = itemOption.options.filter(option => option.state);
                    return itemOption.options.length > 0;
                });

            return itemOptionGroups
                .map((itemOption, i) => {
                    return (
                        <div key={i}>{ itemOptionGroups.length > 1 ? <span>&bull;</span> : null} {itemOption.name}: {displayOption(itemOption.options)}</div>
                    );
                });

            function displayOption(options) {
                return options
                    .map(option => option.name)
                    .join(', ');
            }
        }
    }
}
