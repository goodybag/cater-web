import React, {Component, PropTypes} from 'react';

import {MenuResolver} from '../../../models/category';
import {RestaurantMenuCategoryComponent} from './category';
import {RestaurantMenuTabComponent} from './tab';
import {RestaurantMenuSearchboxComponent} from './searchbox';

class RestaurantMenuCateringComponent extends Component {
    static contextTypes = {
        dependencies: PropTypes.object.isRequired
    }

    static dependencies = {
        menu: MenuResolver
    }

    render() {
        const {dependencies: {menu}} = this.context;
        const categories = menu.forMenu('group');

        return (
            <div className="gb-restaurant-menu-catering">
                {categories.map(renderCategory)}
            </div>
        );

        function renderCategory(category) {
            return (
                <RestaurantMenuCategoryComponent
                    category={category}
                    key={category.id}
                />
            );
        }
    }
}

class RestaurantMenuIndividualComponent extends Component {
    static contextTypes = {
        dependencies: PropTypes.object.isRequired
    }

    static dependencies = {
        menu: MenuResolver
    }

    render() {
        const {dependencies: {menu}} = this.context;
        const categories = menu.forMenu('individual');

        return (
            <div className="gb-restaurant-menu-individual">
                {categories.map(renderCategory)}
            </div>
        );

        function renderCategory(category) {
            return (
                <RestaurantMenuCategoryComponent
                    category={category}
                    key={category.id}
                />
            );
        }
    }
}

export class RestaurantMenuComponent extends Component {
    static contextTypes = {
        dependencies: PropTypes.object.isRequired,
        route: React.PropTypes.object.isRequired
    }

    static propTypes = {
        children: React.PropTypes.node
    }

    static dependencies = {
        menu: MenuResolver,
        ...RestaurantMenuCateringComponent.dependencies,
        ...RestaurantMenuIndividualComponent.dependencies,
        ...RestaurantMenuSearchboxComponent.dependencies
    }

    static route(router) {
        router.index(RestaurantMenuCateringComponent);
        router.dir('individual').index(RestaurantMenuIndividualComponent);
    }

    render() {
        const {route} = this.context;
        const {children} = this.props;
        const {restaurant_id} = route.params;
        const path = `/restaurants/${restaurant_id}`;

        return (
            <div className="gb-restaurant-menu">
                <RestaurantMenuSearchboxComponent/>

                <RestaurantMenuTabComponent
                    href={path}
                    type="catering">
                    Catering Menu
                </RestaurantMenuTabComponent>

                <RestaurantMenuTabComponent
                    href={`${path}/individual`}
                    type="individual">
                    Individual Menu
                </RestaurantMenuTabComponent>

                {children}
            </div>
        );
    }
}
