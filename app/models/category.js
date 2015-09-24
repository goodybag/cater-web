import {Model, Collection} from 'backbone';
import {inject, Params} from '../lib/injection';

import {MenuItemCollection} from './menu-item';

export class Category extends Model {
    static schema = {
        type: 'object',
        required: ['order', 'name', 'menus'],
        properties: {
            order: {
                type: 'string',
                minimum: 0
            },

            name: {
                type: 'string'
            },

            description: {
                type: ['string', null]
            },

            menus: { // meaning what 'menus' the category belongs in
                type: 'array',
                uniqueItems: true,
                maxLength: 2,
                minLength: 1,
                items: {
                    type: 'string',
                    pattern: /^(?:group|individual)$/i
                }
            }
        }
    }

    parse(attrs) {
        attrs.items = new MenuItemCollection(attrs.items, {parse: true});

        return attrs;
    }

    validate(attrs) {
        if (!this.validator.validate(attrs, Category.schema)) {
            return this.validator.getLastError();
        }
    }
}

export class Menu extends Collection {
    constructor(models, options) {
        super(models, options);

        this.restaurant_id = options && options.restaurant_id;
    }

    url() {
        return `${process.env.GOODYBAG_API}/restaurants/${this.restaurant_id}/menu`;
    }
}

Menu.prototype.model = Category;

@inject(Params)
export class MenuResolver {
    static parse(menu) {
        return new Menu(menu, {parse: true});
    }

    constructor(params) {
        const menu = new Menu(null, {
            restaurant_id: params.restaurant_id
        });

        return menu.fetch().then(() => menu);
    }
}
