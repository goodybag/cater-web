import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {find, cloneDeep} from 'lodash';
import {inject} from 'yokohama';
import {Dispatcher, listeningTo} from 'tokyo';
import cx from 'classnames';

import {MenuItem} from '../../../models/menu-item';
import {OrderItem} from '../../../models/order-item';
import {AddOrderItemAction} from '../../../actions/order-item';
import {OrderStore} from '../../../stores/order';
import {OrderItemFormComponent} from '../../order-pane/items/item-form';

@inject({
    dispatcher: Dispatcher
}, [])
export class RestaurantMenuItemMenuComponent extends Component {
    constructor(props) {
        super(props);

        const clonedMenuItem = cloneDeep(props.item);
        let initOptionsSets = clonedMenuItem.options_sets || [ ];

        initOptionsSets.forEach((optionGroup) => {
            optionGroup.options.forEach((option) => {
                option.state = option.default_state;
            });
        });

        this.state = {
            options_sets: initOptionsSets,
            notes: "",
            recipient: "",
            quantity: clonedMenuItem.min_qty || 1
        };
    };

    static propTypes = {
        item: PropTypes.instanceOf(MenuItem).isRequired,
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
        onClose: PropTypes.func.isRequired
    };

    onSubmit = () => {
        const {dispatcher, item, order, onClose} = this.props;

        const orderItem = new OrderItem({
            name: item.name,
            description: item.description,
            price: item.price,
            feeds_min: item.feeds_min,
            feeds_max: item.feeds_max,
            options_sets: this.state.options_sets,
            recipient: this.state.recipient,
            quantity: this.state.quantity,
            notes: this.state.notes
        });

        const action = new AddOrderItemAction({order, menuItem: item, orderItem});
        dispatcher.dispatch(action);
        onClose();
    };

    onChange = (data, e) => {
        e = e || data; // <-- if no data is passed

        switch(e.target.type) {
            case "checkbox":
                this.updateOptionState(data, "checkbox");
                break;
            case "radio":
                this.updateOptionState(data, "radio");
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

    updateOptionState = (data, type) => {
        let {options_sets} = this.state;
        const {optionGroupI, optionI} = data;

        if(type==="radio") {
            options_sets[optionGroupI].options.forEach(option => option.state = false);
        }

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
            <OrderItemFormComponent
                item={this.props.item}
                itemState={this.state}
                onChange={this.onChange}
                onCancel={this.props.onClose}
                saveButton={
                    <div className="item-add-btn" onClick={this.onSubmit}>Add to order</div>
                }
            />
        );
    };
};

export class RestaurantMenuItemMenuWrapperComponent extends Component {
    componentWillEnter(done) {
        const {wrapper, child} = this.refs;
        const node = findDOMNode(child);

        wrapper.style.height = `${node.clientHeight}px`;
        setTimeout(done, 200);
    }

    componentWillLeave(done) {
        const {wrapper} = this.refs;

        wrapper.style.height = 0;
        setTimeout(done, 200);
    }

    render() {
        const {showNoOrderMessage} = this.props;

        return (
            <div className={cx({
                    "gb-restaurant-menu-item-menu-wrapper": true,
                    "show-no-order-message": showNoOrderMessage})} ref="wrapper">
                {showNoOrderMessage
                    ? <RestaurantMenuItemMenuWrapperComponent.NoOrderMessage />
                    : null
                }
                <RestaurantMenuItemMenuComponent ref="child" {...this.props}/>
            </div>
        );
    }

    static NoOrderMessage(props) {
        return (
            <div className="gb-restaurant-menu-item-no-order-message">
                <div className="gb-restaurant-menu-item-no-order-message-wrapper">
                    <p><strong>Want to order this item?</strong> Just enter your order info first.</p>
                    <p>That way you can make sure the restuarant will be able to make your food!</p>
                </div>
            </div>
        );
    }
}
