import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';

import {Category} from '../../../models/category';
import {Order} from '../../../models/order';
import {MenuItem} from '../../../models/menu-item';
import {RestaurantMenuItemComponent} from './item';

@inject({}, [RestaurantMenuItemComponent])
export class RestaurantMenuCategoryComponent extends Component {
    static propTypes = {
        category: PropTypes.instanceOf(Category).isRequired,
        order: PropTypes.instanceOf(Order).isRequired,
        items: PropTypes.arrayOf(PropTypes.instanceOf(MenuItem)).isRequired
    };

    render() {
        const {category, items, order} = this.props;
        const {name} = category;

        return (
            <div className="gb-restaurant-menu-category">
                <div className="gb-restaurant-menu-category-title">
                    <div className="gb-restaurant-menu-category-title-content">
                        {name}
                    </div>
                </div>

                <div className="gb-restaurant-menu-items">
                    {items.map(renderItem)}
                </div>
            </div>
        );

        function renderItem(item) {
            return (
                <RestaurantMenuItemComponent
                    item={item}
                    order={order}
                    key={item.id}
                />
            );
        }
    }
}
