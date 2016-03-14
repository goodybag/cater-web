import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {MenuItems} from '../models/menu-item';
import {MenuCategories} from '../models/category';

@dependencies(Dispatcher, MenuItems, MenuCategories)
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
