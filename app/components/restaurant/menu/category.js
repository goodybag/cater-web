import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';

import {Category} from '../../../models/category';
import {RestaurantMenuItemComponent} from './item';

@inject({}, [RestaurantMenuItemComponent])
export class RestaurantMenuCategoryComponent extends Component {
    static propTypes = {
        category: PropTypes.instanceOf(Category).isRequired
    }

    render() {
        const {category} = this.props;
        const {name, items} = category.attributes;

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
                    key={item.id}
                />
            );
        }
    }
}
