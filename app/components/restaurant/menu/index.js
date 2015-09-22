import React, {Component, PropTypes} from 'react';

import {MenuItemCollectionResolver} from '../../../models/menu-item';

export class RestaurantMenuComponent extends Component {
    static contextTypes = {
        dependencies: PropTypes.object.isRequired
    }

    static dependencies = {
        menuItems: MenuItemCollectionResolver
    }

    render() {
        const {dependencies} = this.context;
        const {menuItems} = dependencies;

        return (
            <div className="gb-restaurant-menu">
                {/* TODO */}
                <div>CATERING MENU INDIVIDUAL MENU</div>
                <div>Popular Items</div>
                <pre>{JSON.stringify(menuItems, null, 4)}</pre>
            </div>
        );
    }
}
