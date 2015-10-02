import React, {Component, PropTypes} from 'react';

import {MenuItem} from '../../../models/menu-item';

export class RestaurantMenuItemComponent extends Component {
    static propTypes = {
        item: PropTypes.instanceOf(MenuItem).isRequired
    }

    render() {
        const {item} = this.props;
        const {name, tags, min_qty} = item.attributes;

        return (
            <div className="gb-restaurant-menu-item">
                <div className="gb-restaurant-menu-item-title">
                    {name}
                </div>

                <div className="gb-restaurant-menu-item-tags">
                    {tags.map(renderTag)}
                </div>

                <div className="gb-restaurant-menu-item-quantity">
                    Min 10.
                </div>

                <div className="gb-restaurant-menu-item-price">
                    $20.00 per person
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
}
