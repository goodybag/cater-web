import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama'
import {Dispatcher} from 'tokyo';
import {cloneDeep, forIn} from 'lodash';

import {OrderItemFormComponent} from './item-form';
import {OrderItem} from '../../../models/order-item';
import {CloseEditOrderItemAction, EditOrderItemAction} from '../../../actions/order-item';

@inject({
    dispatcher: Dispatcher
})
export class OrderItemEditorComponent extends Component {
    constructor(props) {
        super(props);

        const clonedOrderItem = cloneDeep(props.orderItem);

        this.state = {
            options_sets: clonedOrderItem.options_sets,
            notes: clonedOrderItem.notes,
            recipient: clonedOrderItem.recipient,
            quantity: clonedOrderItem.quantity
        };
    };

    static propTypes = {
        orderItem: PropTypes.instanceOf(OrderItem).isRequired
    };

    onClose = () => {
        const {requestClose} = this.props;
        requestClose();
    };

    onSubmit = () => {
        const {dispatcher} = this.props;
        const clonedOrderItem = cloneDeep(this.props.orderItem);

        forIn(this.state, function(value, prop) {
            clonedOrderItem[prop] = value;
        });

        const action = new EditOrderItemAction({orderItem: clonedOrderItem});
        dispatcher.dispatch(action);
        this.onClose();
    };

    onChange = (data, e) => {
        e = e || data; // <-- if no data is passed

        switch(e.target.type) {
            case "checkbox":
                this.updateOptionState(data);
                break;
            case "textarea":
                this.updateNotes(e.target.value);
                break;
            case "text":
                this.updateRecipient(e.target.value);
                break;
            case "number":
                this.updateQuantity(e.target.value);
                break;
            default:
                return;
        }
    };

    updateOptionState = (data) => {
        let {options_sets} = this.state;
        const {optionGroupI, optionI} = data;

        options_sets[optionGroupI].options[optionI].state = !options_sets[optionGroupI].options[optionI].state;

        this.setState({
            options_sets
        });

    };

    updateNotes = (value) => {
        this.setState({
            notes: value
        });
    };

    updateRecipient = (value) => {
        this.setState({
            recipient: value
        });
    };

    updateQuantity = (value) => {
        this.setState({
            quantity: value
        });
    };

    render() {

        return (
            <div className="modal">
                    <OrderItemFormComponent
                        item={this.props.orderItem}
                        itemState={this.state}
                        onChange={this.onChange}
                        onCancel={this.onClose}
                        saveButton={
                            <div className="item-save-btn" onClick={this.onSubmit}>Save changes</div>
                        }
                    />
            </div>
        );
    };
}
