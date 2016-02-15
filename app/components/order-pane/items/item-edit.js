import React, {Component, PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';
import {Dispatcher} from 'flux';
import {inject} from 'yokohama';
import _ from 'lodash';
import cx from 'classnames';

import {OrderItem} from '../../../models/order-item';
import {MenuItem} from '../../../models/menu-item';
import {ItemOption, Option} from '../../../models/item-option';
import {CloseEditOrderItemAction, EditOrderItemAction, AddOrderItemAction} from '../../../actions/order-item';

@inject({
    dispatcher: Dispatcher
})
export class ModalEditOrderItemComponent extends Component {
    static propTypes = {
        orderItem: PropTypes.instanceOf(OrderItem).isRequired,
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
        const action = new CloseEditOrderItemAction();
        dispatcher.dispatch(action);
    };

    render() {
        return(
            <div className="gb-modal-container">
                <div className="gb-modal-overlay" onClick={this.close}></div>
                <div className="gb-modal">
                    <OrderItemComponent
                        orderItem = {this.props.orderItem}
                        onClose = {this.close}
                        dispatcher = {this.props.dispatcher}
                    />
                </div>
            </div>
        );
    };
};

export class OrderItemComponent extends Component {
    static propTypes = {
        orderId: PropTypes.number,
        orderItem: PropTypes.oneOfType([
            PropTypes.instanceOf(OrderItem),
            PropTypes.instanceOf(MenuItem)
        ]),
        dispatcher: PropTypes.instanceOf(Dispatcher),
        onClose: PropTypes.func.isRequired,
        menuView: PropTypes.bool
    };

    state = {
        menuView: false,
        unsavedChanges: {
            updatedOptions: [],
            updatedNotes: null,
            updatedRecipient: null,
            updatedQuantity: null
        }
    };

    pushOptionChange = (optionSetId, optionId, newOptionState) => {
        let {unsavedChanges} = this.state;
        let changePushed = false;

        if (unsavedChanges.updatedOptions) {
            unsavedChanges.updatedOptions.forEach(function(updatedOption) {
                if(updatedOption.optionId === optionId) {
                    updatedOption.newOptionState = newOptionState;
                    changePushed = true;
                    return;
                }
            });
        }

        if(!changePushed) {
            unsavedChanges.updatedOptions.push({optionSetId, optionId, newOptionState});
        }
    };

    updateNotes = (e) => {
        this.state.unsavedChanges.updatedNotes = e.target.value;
    };

    updateRecipient = (e) => {
        this.state.unsavedChanges.updatedRecipient = e.target.value;
    };

    updateQuantity = (e) => {
        this.state.unsavedChanges.updatedQuantity = e.target.value;
    };

    getUnsavedOrderItem = () => {
        const {orderItem} = this.props;
        const {unsavedChanges} = this.state;
        let unsavedOrderItem = _.clone(orderItem, true);

        if (unsavedChanges.updatedNotes) { unsavedOrderItem.notes = unsavedChanges.updatedNotes; }
        if (unsavedChanges.updatedRecipient) { unsavedOrderItem.recipient = unsavedChanges.updatedRecipient; }
        if (unsavedChanges.updatedQuantity) { unsavedOrderItem.quantity = unsavedChanges.updatedQuantity; }

        if (unsavedChanges.updatedOptions) {
            unsavedChanges.updatedOptions.forEach(function(updatedOption) {
                unsavedOrderItem.options_sets.forEach(function(optionSet) {
                    if (optionSet.id === updatedOption.optionSetId) {
                        optionSet.options.forEach(function(option) {
                            if (option.id === updatedOption.optionId) {
                                option.state = updatedOption.newOptionState;
                            }
                        });
                    }
                });
            });
        }

        return unsavedOrderItem;
    };

    onSaveChangesClick = () => {
        const {dispatcher, onClose} = this.props;
        const {unsavedChanges} = this.state;
        let unsavedOrderItem = this.getUnsavedOrderItem();

        const action = new EditOrderItemAction(unsavedOrderItem);
        dispatcher.dispatch(action);
        onClose();
    };

    onAddToOrderClick = () => {
        var {dispatcher, orderId} = this.props;
        let unsavedOrderItem = this.getUnsavedOrderItem();

        orderId = orderId || unsavedOrderItem.order_id;

        const action = new AddOrderItemAction({orderId, orderItem: unsavedOrderItem});
        dispatcher.dispatch(action);
        console.log(unsavedOrderItem);
    };

    render() {
        const {orderItem, onClose, menuView} = this.props;

        return (
            <div className={cx({
                    'gb-order-item': true,
                    'gb-order-item-menu-view': menuView
                })}>
                <div className="gb-order-item-header">
                    {orderItem.name}
                    <span className="icon-x" onClick={onClose} />
                    {
                        orderItem.min_qty > 0 ?
                            <div className="gb-order-item-header-detail">
                                <span className="header-detail">Min. {orderItem.min_qty}</span>
                                <span className="header-detail">
                                    <FormattedNumber
                                        value={orderItem.price / 100}
                                        style="currency"
                                        currency="USD"
                                    /> {' per person'}
                                </span>
                            </div> :
                            <div className="gb-order-item-header-detail">
                                <span className="header-detail">
                                    Feeds {orderItem.feeds_min}
                                    {
                                        orderItem.feeds_max > orderItem.feeds_min ?
                                            '-' + orderItem.feeds_max : null
                                    }
                                </span>
                                <span className="header-detail">
                                    <FormattedNumber
                                        value={orderItem.price / 100}
                                        style="currency"
                                        currency="USD"
                                    />
                                </span>
                            </div>
                    }
                </div>
                <div className="gb-order-item-contents">
                    <div className="gb-order-item-contents-description">
                        {orderItem.description}
                    </div>
                    {
                        orderItem.options_sets ?
                            orderItem.options_sets.map(this.renderItemOptionSet) : null
                    }
                    <div className="gb-order-item-notes">
                        <div className="item-notes-title">
                            Comments or Instructions
                        </div>
                        <textarea
                            className="item-notes-field"
                            defaultValue={orderItem.notes}
                            onChange={this.updateNotes}
                        />
                    </div>
                    <div className="gb-order-item-fields">
                        <div className="item-field-group">
                            <div className="item-field-title">Who is this item for?</div>
                            <span className="item-field-optional">Optional</span>
                            <input
                                className="item-field-input"
                                type="text"
                                defaultValue={orderItem.recipient}
                                onChange={this.updateRecipient}
                            />
                        </div>
                        <div className="item-field-group">
                            <div className="item-field-title">Quantity</div>
                            {
                                orderItem.min_qty > 0 ?
                                    <span className="item-field-min">Min. {orderItem.min_qty}</span> : null
                            }
                            <input
                                className="item-field-input"
                                type="number"
                                defaultValue={orderItem.quantity}
                                min={orderItem.min_qty}
                                onChange={this.updateQuantity}
                            />
                        </div>
                    </div>
                    <div className="gb-order-item-buttons">
                        <div className="item-cancel-btn" onClick={onClose}>Cancel</div>
                        {
                            menuView ?
                                <div className="item-add-btn" onClick={this.onAddToOrderClick}>Add to order</div> :
                                    <div className="item-save-btn" onClick={this.onSaveChangesClick}>Save changes</div>
                        }
                    </div>
                </div>
            </div>
        );
    };

    renderItemOptionSet = (optionSet, i) => {
        return (
            <OrderItemOptionSetComponent
                optionSet={optionSet}
                setOptionsState={this.pushOptionChange}
                key={i}
            />
        );
    };
}

export class OrderItemOptionSetComponent extends Component {
    static propTypes = {
        optionSet: PropTypes.oneOfType([
            PropTypes.instanceOf(ItemOption).isRequired,
            PropTypes.object
        ]),
        setOptionsState: PropTypes.func
    };

    setItemOptionState = (optionId, newOptionState) => {
        const {optionSet, setOptionsState} = this.props;
        setOptionsState(optionSet.id, optionId, newOptionState);
    };

    render() {
        const {optionSet} = this.props;

        return (
            <div className="gb-order-pane-item-edit-item-option-set">
                <div className="item-option-set-name">{optionSet.name}</div>
                <div className="item-option-set-min-max">
                    {
                        optionSet.selected_min > 0 ?
                            <span>Minimum: {optionSet.selected_min}</span> : null
                    }
                    {
                        optionSet.selected_max ?
                            <span>Maximum: {optionSet.selected_max}</span> : null
                    }
                </div>
                {
                    optionSet.options ?
                        optionSet.options.map(this.renderItemOption) : null
                }
            </div>
        );
    };

    renderItemOption = (option, i) => {
        return (
            <OrderItemOptionComponent
                option={option}
                setOptionState={this.setItemOptionState}
                key={i}
            />
        );
    };
}

export class OrderItemOptionComponent extends Component {
    static propTypes = {
        option: PropTypes.oneOfType([
            PropTypes.instanceOf(Option),
            PropTypes.object
        ]),
        setOptionState: PropTypes.func
    };

    state = {
        checked: this.props.option.state
    };

    onCheckboxToggle = (e) => {
        const {option, setOptionState} = this.props;
        let {checked} = this.state;

        setOptionState(option.id, !checked);

        this.setState({
            checked: !checked
        });
    };

    render() {
        const {option} = this.props;
        const {checked} = this.state;

        return (
            <div className="gb-order-pane-item-edit-item-option">
                {
                    checked ?
                        <input type="checkbox" onChange={this.onCheckboxToggle} value={option.id} checked /> :
                            <input type="checkbox" onChange={this.onCheckboxToggle} value={option.id} />
                }
                <div className="item-option-details">
                    <div className="item-option-name">{option.name}</div>
                    {
                        option.price > 0 ?
                            <span className="item-option-price">
                                (+<FormattedNumber
                                    value={option.price / 100}
                                    style="currency"
                                    currency="USD"
                                />)
                            </span> : null
                    }
                    <div className="item-option-description">{option.description}</div>
                </div>
            </div>
        );
    }
}
