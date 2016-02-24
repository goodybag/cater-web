import React, {Component, PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';

import {OrderItem} from '../../../models/order-item';
import {MenuItem} from '../../../models/menu-item';

export class OrderItemFormComponent extends Component {
    static propTypes = {
        item: PropTypes.oneOfType([
            PropTypes.instanceOf(OrderItem),
            PropTypes.instanceOf(MenuItem)
        ]).isRequired,
        itemState: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        saveButton: PropTypes.element.isRequired
    };

    render() {
        const {item, itemState, onChange, onCancel, saveButton} = this.props;

        return (
            <div className="gb-order-item">
                <div className="gb-order-item-header">
                    {item.name}
                    <span className="icon-x" onClick={onCancel} />
                    {
                        item.min_qty > 0 ?
                            <div className="gb-order-item-header-detail">
                                <span className="header-detail">Min. {item.min_qty}</span>
                                <span className="header-detail">
                                    <FormattedNumber
                                        value={item.price / 100}
                                        style="currency"
                                        currency="USD"
                                    /> {' per person'}
                                </span>
                            </div> :
                            <div className="gb-order-item-header-detail">
                                <span className="header-detail">
                                    Feeds {item.feeds_min}
                                    {
                                        item.feeds_max > item.feeds_min ?
                                            '-' + item.feeds_max : null
                                    }
                                </span>
                                <span className="header-detail">
                                    <FormattedNumber
                                        value={item.price / 100}
                                        style="currency"
                                        currency="USD"
                                    />
                                </span>
                            </div>
                    }
                </div>
                <div className="gb-order-item-contents">
                    <div className="gb-order-item-contents-description">
                        {item.description}
                    </div>
                    {
                        item.options_sets ?
                            itemState.options_sets.map(this.renderItemOptionGroup) : null
                    }
                    <div className="gb-order-item-notes">
                        <div className="item-notes-title">
                            Comments or Instructions
                        </div>
                        <textarea
                            className="item-notes-field"
                            defaultValue={itemState.notes}
                            onChange={onChange}
                        />
                    </div>
                    <div className="gb-order-item-fields">
                        <div className="item-field-group">
                            <div className="item-field-title">Who is this item for?</div>
                            <span className="item-field-optional">Optional</span>
                            <input
                                className="item-field-input"
                                type="text"
                                defaultValue={itemState.recipient}
                                onChange={onChange}
                            />
                        </div>
                        <div className="item-field-group">
                            <div className="item-field-title">Quantity</div>
                            {
                                item.min_qty > 0 ?
                                    <span className="item-field-min">Min. {item.min_qty}</span> : null
                            }
                            <input
                                className="item-field-input"
                                type="number"
                                defaultValue={itemState.quantity}
                                min={item.min_qty}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="gb-order-item-buttons">
                        <div className="item-cancel-btn" onClick={onCancel}>Cancel</div>
                        {saveButton}
                    </div>
                </div>
            </div>
        );
    };

    renderItemOptionGroup = (optionGroup, i) => {
        return (
            <OrderItemOptionGroupComponent
                optionGroup={optionGroup}
                optionGroupI={i}
                onChange={this.props.onChange}
                key={i}
            />
        )
    };
};

export class OrderItemOptionGroupComponent extends Component {
    static propTypes = {
        optionGroup: PropTypes.object.isRequired,
        optionGroupI: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const {optionGroup} = this.props;

        return (
            <div className="gb-order-pane-item-edit-item-option-set">
                <div className="item-option-set-name">{optionGroup.name}</div>
                <div className="item-option-set-min-max">
                    {
                        optionGroup.selected_min > 0 ?
                            <span>Minimum: {optionGroup.selected_min}</span> : null
                    }
                    {
                        optionGroup.selected_max ?
                            <span>Maximum: {optionGroup.selected_max}</span> : null
                    }
                </div>
                {
                    optionGroup.options ?
                        optionGroup.options.map(this.renderItemOption) : null
                }
            </div>
        );
    };

    renderItemOption = (option, i) => {
        return (
            <OrderItemOptionComponent
                option={option}
                optionGroupType={this.props.optionGroup.type}
                optionI={i}
                optionGroupI={this.props.optionGroupI}
                onChange={this.props.onChange}
                key={i}
            />
        )
    };
};

export class OrderItemOptionComponent extends Component {
    static propTypes = {
        option: PropTypes.object.isRequired,
        optionGroupType: PropTypes.string.isRequired,
        optionI: PropTypes.number.isRequired,
        optionGroupI: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const {option, optionGroupType, optionI, optionGroupI, onChange} = this.props;
        const data = { optionI, optionGroupI }

        return (
            <div className="gb-order-pane-item-edit-item-option">
                <label>
                    <input
                        type={optionGroupType}
                        onChange={onChange.bind(null, data)}
                        value={option.id}
                        checked={option.state}
                    />
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
                </label>
            </div>
        )
    }
}
