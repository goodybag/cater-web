import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {find} from 'lodash';
import {inject} from 'yokohama';
import {Dispatcher} from 'flux';
import {listeningTo} from 'tokyo';

import {MenuItem} from '../../../models/menu-item';
import {AddItemToOrderAction} from '../../../actions/menu';
import {OrderStore} from '../../../stores/order';

import {ItemOptions} from './item-options';

@inject({
    dispatcher: Dispatcher,
    orderStore: OrderStore
})
@listeningTo(['orderStore'], ({orderStore}) => {
    return {
        order: orderStore.getOrder()
    };
})
export class RestaurantMenuItemMenuComponent extends Component {
    static propTypes = {
        item: PropTypes.instanceOf(MenuItem).isRequired,
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
        onClose: PropTypes.func.isRequired
    };

    state = {
        quantity: this.props.item.min_qty,
        notes: '',
        name: '',
        optionChoices: this.props.item.defaultOptionChoices()
    };

    handleAddClick = () => {
        const {dispatcher, item, order} = this.props;
        const {quantity, notes, optionChoices} = this.state;

        dispatcher.dispatch(new AddItemToOrderAction({
            order,
            orderItemData: {
                item_id: item.id,
                order_id: order.id,
                name: item.name,
                description: item.description,
                price: item.price,
                feeds_min: item.feeds_min,
                feeds_max: item.feeds_min,
                options_sets: item.options_sets,
                recipient: item.recipient,
                options_sets: optionChoices,
                quantity,
                notes
            }
        }));

        this.props.onClose();
    };

    handleQuantityChange = (event) => {
        this.setState({quantity: event.target.value});
    };

    handleNotesChange = (event) => {
        this.setState({ notes: event.target.value });
    };

    handleOptionChoiceChange = (event) => {
        const id = event.target.name;
        let isChecked = event.target.checked;

        // update the item options state
        this.setState(state => {
            state.optionChoices.forEach((choice, i) => {
                let j = choice.options.indexOf(find(choice.options, { id }))
                state.optionChoices[i].options[j].state = !!isChecked;
            });
        });
    };

    render() {
        const {item, onClose: close} = this.props;
        const {description, min_qty, options_sets} = item;
        const {notes, quantity, optionChoices} = this.state;

        const descEl = (
            <div className="gb-restaurant-menu-item-menu-desc">
                {description}
            </div>
        );

        const optionsEl = (
            <div className="gb-restaurant-menu-item-menu-options">
                <ItemOptions
                    optionsSets={options_sets || []}
                    optionChoices={optionChoices}
                    onChange={this.handleOptionChoiceChange}
                />
            </div>
        );

        return (
            <div className="gb-restaurant-menu-item-menu">
                {description && descEl}
                {options_sets && optionsEl}

                <div className="gb-restaurant-menu-item-menu-notes">
                    <div className="gb-restaurant-menu-item-menu-box-title">
                        Comments or Instructions
                    </div>

                    <textarea
                        className="gb-restaurant-menu-item-menu-box-field"
                        onChange={this.handleNotesChange}
                        value={notes}
                    />
                </div>

                <div className="gb-restaurant-menu-item-menu-bottomfields">
                    <div className="gb-restaurant-menu-item-menu-quantity">
                        <div className="gb-restaurant-menu-item-menu-box-title">
                            Quantity
                        </div>

                        <input
                            className="gb-restaurant-menu-item-menu-box-field"
                            type="number"
                            onChange={this.handleQuantityChange}
                            value={quantity}
                        />
                    </div>

                    <div className="gb-restaurant-menu-item-menu-buttons">
                        <div className="gb-restaurant-menu-item-menu-cancel" onClick={close}>
                            Cancel
                        </div>

                        <div className="gb-restaurant-menu-item-menu-addtoorder" onClick={this.handleAddClick}>
                            Add to order
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

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
        return (
            <div className="gb-restaurant-menu-item-menu-wrapper" ref="wrapper">
                <RestaurantMenuItemMenuComponent ref="child" {...this.props}/>
            </div>
        );
    }
}
