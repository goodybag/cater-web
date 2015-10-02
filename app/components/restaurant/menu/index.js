import React, {Component, PropTypes} from 'react';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';

import {MenuStore} from '../../../stores/menu';
import {Menu} from '../../../models/category';
import {RestaurantMenuCategoryComponent} from './category';
import {RestaurantMenuTabComponent} from './tab';
import {RestaurantMenuSearchboxComponent} from './searchbox';

@dependencies({
    menuStore: MenuStore
})
@listeningTo(['menuStore'], ({menuStore}) => {
    return {
        menu: menuStore.getMenu()
    };
})
class RestaurantMenuCateringComponent extends Component {
    static propTypes = {
        menu: PropTypes.instanceOf(Menu)
    }

    render() {
        const {menu} = this.props;
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

@dependencies({
    menuStore: MenuStore
})
@listeningTo(['menuStore'], ({menuStore}) => {
    return {
        menu: menuStore.getMenu()
    };
})
class RestaurantMenuIndividualComponent extends Component {
    static propTypes = {
        menu: PropTypes.instanceOf(Menu)
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

@dependencies({}, [
    RestaurantMenuCateringComponent,
    RestaurantMenuIndividualComponent,
    RestaurantMenuSearchboxComponent
])
export class RestaurantMenuComponent extends Component {
    static contextTypes = {
        route: PropTypes.object.isRequired
    }

    static propTypes = {
        children: PropTypes.node
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
