import React, {Component, PropTypes} from 'react';
import {FormattedNumber} from 'react-intl';

import {MenuItem} from '../../../models/menu-item';

export class RestaurantMenuItemComponent extends Component {
    static propTypes = {
        item: PropTypes.instanceOf(MenuItem).isRequired
    }

    render() {
        const {item} = this.props;
        const {
            name,
            tags,
            min_qty,
            price
        } = item.attributes;

        return (
            <div className="gb-restaurant-menu-item" onClick={this.handleClick}>
                <div className="gb-restaurant-menu-item-title">
                    <div className="gb-restaurant-menu-item-title-content">
                        {name}
                    </div>
                    <div className="gb-restaurant-menu-item-tags">
                        {tags.map(renderTag)}
                    </div>
                </div>

                <div className="gb-restaurant-menu-item-quantity">
                    {this.renderQuantity()}
                </div>

                <div className="gb-restaurant-menu-item-price">
                    <FormattedNumber
                        value={price / 100}
                        style="currency"
                        currency="USD"
                    />

                    {min_qty ? ' per person' : null}
                </div>
            </div>
        );

        function renderTag(tagName, index) {
            return (
                <div className="gb-restaurant-menu-item-tag" key={index}>
                    {tagName}
                </div>
            );
        }
    }

    renderQuantity() {
        const {item} = this.props;
        const {min_qty, feeds_min, feeds_max} = item.attributes;

        if (min_qty !== 0) {
            return `Min. ${min_qty}`;
        } else if (feeds_max > feeds_min) {
            return `Feeds ${feeds_min}-${feeds_max}`;
        } else {
            return `Feeds ${feeds_min}`;
        }
    }
}
