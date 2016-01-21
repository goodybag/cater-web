import React, {Component, PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';
import {find} from 'lodash';

export class ItemOptions extends Component {
    static propTypes = {
        optionsSets: PropTypes.array.isRequired,
        optionChoices: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };

    handleItemChange = (event) => {
        this.props.onChange(event);
    };

    render () {
        const {optionChoices, optionsSets, onChange: change} = this.props;

        const itemGroups = optionsSets.map((options, index) => {
            return (
                <div key={index}>
                    <ItemOptionsGroup
                        key={index}
                        options={options}
                        optionChoices={optionChoices}
                        onChange={change}
                    />
                </div>
            );
        });

        return (
            <div className="gb-restaurant-menu-item-options">
                {itemGroups}
            </div>
        );
    }
}

class ItemOptionsGroup extends Component{
    render () {
        const {id, name, selected_min, selected_max, type, options} = this.props.options;

        const choices = find(this.props.optionChoices, { id }).options;

        const itemOptions = options.map((option, index) => {
            return (
                <ItemOption
                    key={index}
                    optionType={type}
                    option={option}
                    choices={choices}
                    options={this.props.options}
                    onChange={this.props.onChange}
                />
            );
        });

        const minimum = <span><strong>Minimum:</strong> {selected_min}</span>;
        const maximum = <span><strong>Maximum:</strong> {selected_max}</span>;

        return (
            <div className="gb-restaurant-menu-item-options-group" data-options-set-id="{id}">
                <legend>
                    <div className="menu-item-options-header">{name}</div>

                    <div className="menu-item-options-restrictions">
                        {selected_min && minimum}
                        {' '}
                        {selected_max && maximum}
                    </div>
                </legend>

                <div className="menu-item-options-group">
                    {itemOptions}
                </div>
            </div>
        );
    }
}

class ItemOption extends Component {
    isDisabled(choice, options) {
        if (choice.state) {
            return false;
        } else if (options.selected_max > 0) {
            return this.props.choices.filter(o => o.state).length >= options.selected_max;
        }
    }

    render () {
        const {id, name, price, description} = this.props.option;

        const choice = find(this.props.choices, { id });

        const itemPrice = (
            <span className="menu-item-options-group-item-price">
                (+
                <FormattedNumber
                    value={price / 100}
                    style="currency"
                    currency="USD"
                />
                )
            </span>
        );

        return (
            <div className="gb-restaurant-menu-item-options-group-item">
                <label>
                    <input
                        type={this.props.optionType}
                        name={id}
                        value={choice.state}
                        disabled={this.isDisabled(choice, this.props.options)}
                        onChange={this.props.onChange}
                    />

                    <span className="menu-item-options-group-item-name">
                        {name}
                    </span>

                    {price && itemPrice}

                    {/* TODO: diet tags component */}
                    <span className="option-description">{description}</span>
                </label>
            </div>
        );
    }
}
