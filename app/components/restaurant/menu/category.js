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

    static getIdString(categoryId, itemId) {
        return `${categoryId}-${itemId}`;
    }

    constructor(props) {
        super(props);
        this.onItemRequestOpen = this.onItemRequestOpen.bind(this);
    }

    render() {
        const {category, items, order, openItem, requestClose} = this.props;
        const {name} = category;

        return (
            <div className="gb-restaurant-menu-category">
                <div className="gb-restaurant-menu-category-title">
                    <div className="gb-restaurant-menu-category-title-content">
                        {name}
                    </div>
                </div>

                <div className="gb-restaurant-menu-items">
                    {items.map(item => {
                        const idString = RestaurantMenuCategoryComponent.getIdString(
                            category.id, item.id
                        );

                        return (
                            <RestaurantMenuItemComponent
                                key={item.id}
                                item={item}
                                order={order}
                                isOpen={idString === openItem}
                                requestOpen={this.onItemRequestOpen}
                                requestClose={requestClose}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

    onItemRequestOpen(itemId) {
        const idString = RestaurantMenuCategoryComponent.getIdString(
            this.props.category.id, itemId
        );

        this.props.requestOpen(idString);
    }
}
