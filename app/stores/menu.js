import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {MenuItemsResolver, CategoriesResolver} from '../resolvers/menu';

@dependencies(Dispatcher, MenuItemsResolver, CategoriesResolver)
export class MenuStore extends Store {
    constructor(dispatcher, items, categories) {
        super(dispatcher);

        this.items = items;
        this.categories = categories;
    }

    getItems() {
        return this.items;
    }

    getCategories() {
        return this.categories;
    }
}
