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
import {RestaurantMenuBarComponent} from './bar';

@inject({
    menuStore: MenuStore,
    orderStore: OrderStore
}, [RestaurantMenuCategoryComponent])
@listeningTo(['menuStore', 'orderStore'], ({menuStore, orderStore, searchTerm}) => {
    const categories = menuStore.getCategories();
    const items = menuStore.getItems();

    return {
        menu: searchTerm.groupMenu(categories, items, 'group'),
        popularItems: searchTerm.getPopularItems(categories, items, 'group'),
        order: orderStore.getOrder()
    };
})
class RestaurantMenuCateringComponent extends Component {
    static propTypes = {
        menu: PropTypes.array.isRequired,
        popularItems: PropTypes.array.isRequired,
        openItem: PropTypes.string.isRequired,
        requestOpen: PropTypes.func.isRequired,
        requestClose: PropTypes.func.isRequired
    };

    render() {
        const {
            menu, popularItems, order, openItem, requestOpen, requestClose
        } = this.props;

        const popularSection = popularItems.length > 0 && (
            <RestaurantMenuCategoryComponent
                category={new Category({name: 'Popular Items'})}
                items={popularItems}
                order={order}
                requestOpen={requestOpen}
                requestClose={requestClose}
                openItem={openItem}
                key="popular"
            />
        );

        return (
            <div className="gb-restaurant-menu-catering">
                {popularSection}
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
}, [RestaurantMenuCategoryComponent])
@listeningTo(['menuStore', 'orderStore'], ({menuStore, orderStore, searchTerm}) => {
    const categories = menuStore.getCategories();
    const items = menuStore.getItems();

    return {
        menu: searchTerm.groupMenu(categories, items, 'individual'),
        popularItems: searchTerm.getPopularItems(categories, items, 'individual'),
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
        const {menu, order, popularItems, openItem, requestOpen, requestClose} = this.props;

        const popularSection = popularItems.length > 0 && (
            <RestaurantMenuCategoryComponent
                category={new Category({name: 'Popular Items'})}
                items={popularItems}
                order={order}
                requestOpen={requestOpen}
                requestClose={requestClose}
                openItem={openItem}
                key="popular"
            />
        );

        return (
            <div className="gb-restaurant-menu-individual">
                {popularSection}
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

@router(route => {
    route.index(RestaurantMenuCateringComponent);
    route.dir('individual').index(RestaurantMenuIndividualComponent);
})
@inject({}, [
    RestaurantMenuBarComponent
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
                <RestaurantMenuBarComponent
                    searchTerm={searchTerm}
                    onSearchTermChange={this.handleSearchTermChange}
                />

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
