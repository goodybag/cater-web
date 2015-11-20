import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {router, Route} from 'hiroshima';

import {MenuStore} from '../../../stores/menu';
import {Menu} from '../../../models/category';
import {RestaurantMenuCategoryComponent} from './category';
import {RestaurantMenuTabComponent} from './tab';
import {RestaurantMenuSearchboxComponent} from './searchbox';

@inject({
    menuStore: MenuStore
})
@listeningTo([MenuStore], ({menuStore}) => {
    const menu = menuStore.getMenu();
    const queryText = menuStore.getQueryText();
    const categories = menu.forMenu('group').applySearch(queryText);

    return {categories};
})
class RestaurantMenuCateringComponent extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired
    }

    render() {
        const {categories} = this.props;

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

@inject({
    menuStore: MenuStore
})
@listeningTo([MenuStore], ({menuStore}) => {
    const menu = menuStore.getMenu();
    const queryText = menuStore.getQueryText();
    const categories = menu.forMenu('individual').applySearch(queryText);

    return {categories};
})
class RestaurantMenuIndividualComponent extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired
    }


    render() {
        const {categories} = this.props;

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

@inject({
    route: Route
}, [
    RestaurantMenuCateringComponent,
    RestaurantMenuSearchboxComponent,
    RestaurantMenuTabComponent,
    RestaurantMenuCategoryComponent
])
class RestaurantMenuTabsComponent extends Component {
    static propTypes = {
        route: PropTypes.instanceOf(Route).isRequired
    }

    render() {
        const {route} = this.props;
        const {restaurant_id} = route.params;
        const path = `/restaurants/${restaurant_id}`;

        return (
            <div className="gb-restaurant-menu-tabs">
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
            </div>
        );
    }
}

@router(route => {
    route.index(RestaurantMenuCateringComponent);
    route.dir('individual').index(RestaurantMenuIndividualComponent);
})
@inject({}, [
    RestaurantMenuSearchboxComponent,
    RestaurantMenuTabsComponent
])
export class RestaurantMenuComponent extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    render() {
        const {children} = this.props;

        return (
            <div className="gb-restaurant-menu">
                <RestaurantMenuSearchboxComponent/>

                <RestaurantMenuTabsComponent/>

                {children}
            </div>
        );
    }
}
