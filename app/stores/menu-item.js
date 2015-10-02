import {Store} from 'tokyo';
import {inject} from 'yokohama';
import {Params} from '../lib/injection';
import {Dispatcher} from 'flux';

import {MenuItem} from '../models/menu-item';

@inject(Params)
export class MenuItemCollectionResolver {
    static parse(menuItems) {
        return new MenuItemCollection(menuItems, {parse: true});
    }

    constructor(params) {
        const menuItems = new MenuItemCollection(null, {
            restaurant_id: params.restaurant_id
        });

        return menuItems.fetch().then(() => menuItems);
    }
}

@inject(Dispatcher, MenuItemCollectionResolver)
export class MenuItemStore extends Store {
    constructor(dispatcher, menuItems) {
        super(dispatcher);

        this.menuItems = menuItems;
        this.menuItems.on('change', () => this.emit('change'));
    }

    getMenuItems() {
        return this.menuItems;
    }
}
