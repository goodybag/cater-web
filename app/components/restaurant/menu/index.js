import React, {Component, PropTypes} from 'react';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';
import {router, Route} from 'hiroshima';

import {MenuStore} from '../../../stores/menu';
import {RouteStore} from '../../../stores/route';
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
        const {menu} = this.props;
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

@dependencies({
    routeStore: RouteStore
}, [
    RestaurantMenuCateringComponent,
    RestaurantMenuSearchboxComponent
])
@listeningTo(['routeStore'], ({routeStore}) => {
    return {
        route: routeStore.getRoute()
    };
})
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
@dependencies({}, [
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
