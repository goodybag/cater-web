import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Route} from 'hiroshima';
import {Dispatcher} from 'flux';

import {UpdateMenuSearchAction} from '../actions/menu';
import {Menu} from '../models/category';

@dependencies(Route)
export class MenuResolver {
    constructor({params}) {
        const menu = new Menu(null, {
            restaurant_id: params.restaurant_id
        });

        return menu.fetch().then(() => menu);
    }
}

@dependencies(Dispatcher, MenuResolver)
export class MenuStore extends Store {
    constructor(dispatcher, menu) {
        super(dispatcher);

        this.queryText = '';

        this.menu = menu;
        this.menu.on('change', () => this.emit('change'));

        this.bind(UpdateMenuSearchAction, this.updateMenuSearch);
    }

    updateMenuSearch({queryText}) {
        this.queryText = queryText.toLowerCase();
        this.emit('change');
    }

    getQueryText() {
        return this.queryText;
    }

    getMenu() {
        return this.menu;
    }
}
