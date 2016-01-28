import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {MenuItemsResolver} from '../resolvers/menu';
import {MenuCategories} from '../models/category';

@dependencies(Dispatcher, MenuItemsResolver, MenuCategories)
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
