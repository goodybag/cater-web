import React, {Component, PropTypes, cloneElement} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {router, Route} from 'hiroshima';
import {MenuSearchTerm} from '../../../lib/menu-search';

import {MenuStore} from '../../../stores/menu';
import {OrderStore} from '../../../stores/order';
import {Category} from '../../../models/category';
import {MenuItem} from '../../../models/menu-item';
import {RestaurantMenuCategoryComponent} from './category';
import {RestaurantMenuTabComponent} from './tab';
import {RestaurantMenuSearchboxComponent} from './searchbox';

@inject({
    menuStore: MenuStore,
    orderStore: OrderStore
})
@listeningTo(['menuStore', 'orderStore'], ({menuStore, orderStore, searchTerm}) => {
    const categories = menuStore.getCategories();
    const items = menuStore.getItems();

    return {
        menu: searchTerm.groupMenu(categories, items, 'group'),
        order: orderStore.getOrder()
    };
})
class RestaurantMenuCateringComponent extends Component {
    static propTypes = {
        menu: PropTypes.array.isRequired,
        openItem: PropTypes.string.isRequired,
        requestOpen: PropTypes.func.isRequired,
        requestClose: PropTypes.func.isRequired
    };

    render() {
        const {menu, order, openItem, requestOpen, requestClose} = this.props;

        return (
            <div className="gb-restaurant-menu-catering">
                {menu.map(renderSection)}
            </div>
        );

        function renderSection({category, items}) {
            return (
                <RestaurantMenuCategoryComponent
                    category={category}
                    items={items}
                    order={order}
                    requestOpen={requestOpen}
                    requestClose={requestClose}
                    openItem={openItem}
                    key={category.id}
                />
            );
        }
    }
}

@inject({
    menuStore: MenuStore,
    orderStore: OrderStore
})
@listeningTo(['menuStore', 'orderStore'], ({menuStore, orderStore, searchTerm}) => {
    const categories = menuStore.getCategories();
    const items = menuStore.getItems();

    return {
        menu: searchTerm.groupMenu(categories, items, 'individual'),
        order: orderStore.getOrder()
    };
})
class RestaurantMenuIndividualComponent extends Component {
    static propTypes = {
        menu: PropTypes.array.isRequired,
        openItem: PropTypes.string.isRequired,
        requestOpen: PropTypes.func.isRequired,
        requestClose: PropTypes.func.isRequired
    };

    render() {
        const {menu, order, openItem, requestOpen, requestClose} = this.props;

        return (
            <div className="gb-restaurant-menu-individual">
                {menu.map(renderSection)}
            </div>
        );

        function renderSection({category, items}) {
            return (
                <RestaurantMenuCategoryComponent
                    category={category}
                    items={items}
                    order={order}
                    requestOpen={requestOpen}
                    requestClose={requestClose}
                    openItem={openItem}
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
    };

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
        children: PropTypes.element.isRequired
    };

    state = {
        searchTerm: new MenuSearchTerm(''),
        openItem: ''
    };

    constructor(props) {
        super(props);
        this.onItemRequestOpen = this.onItemRequestOpen.bind(this);
        this.onItemRequestClose = this.onItemRequestClose.bind(this);
    }

    handleSearchTermChange = (text) => {
        this.setState({
            searchTerm: new MenuSearchTerm(text)
        });
    };

    render() {
        const {children} = this.props;
        const {searchTerm, openItem} = this.state;

        const child = cloneElement(children, {
            searchTerm,
            openItem,
            requestOpen: this.onItemRequestOpen,
            requestClose: this.onItemRequestClose
        });

        return (
            <div className="gb-restaurant-menu">
                <RestaurantMenuSearchboxComponent
                    searchTerm={searchTerm}
                    onSearchTermChange={this.handleSearchTermChange}
                />

                <RestaurantMenuTabsComponent/>

                {child}
            </div>
        );
    }

    onItemRequestOpen(openItem) {
        this.setState({ openItem });
    }

    onItemRequestClose() {
        this.setState({ openItem: '' });
    }
}
