import {Store} from 'tokyo';
import {inject} from 'yokohama';
import {Route} from 'hiroshima';
import {Dispatcher} from 'flux';

import {Menu} from '../models/category';

@inject(Route)
export class MenuResolver {
    constructor({params}) {
        const menu = new Menu(null, {
            restaurant_id: params.restaurant_id
        });

        return menu.fetch().then(() => menu);
    }
}

@inject(Dispatcher, MenuResolver)
export class MenuStore extends Store {
    constructor(dispatcher, menu) {
        super(dispatcher);

        this.menu = menu;
        this.menu.on('change', () => this.emit('change'));
    }

    getMenu() {
        return this.menu;
    }
}
