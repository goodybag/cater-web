import {Model, Collection} from 'backbone';
import url from 'url';
import fuzzy from 'fuzzysearch';

import {API_PREFIX} from '../config';
import {MenuItem} from './menu-item';

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
        attrs.items = attrs.items.map(MenuItem.parse);

        return attrs;
    }

    validate(attrs) {
        if (!this.validator.validate(attrs, Category.schema)) {
            return this.validator.getLastError();
        }
    }

    // these are horrible names
    hasMenu(menuName) {
        return this.get('menus').indexOf(menuName) !== -1;
    }

    applySearch(text) {
        const revised = this.clone();

        const revisedItems = revised.get('items').filter(item => {
            var {name, description} = item;
            name = (name || '').toLowerCase();
            description = (description || '').toLowerCase();

            return fuzzy(text, name) || fuzzy(text, description);
        });

        revised.set({items: revisedItems});

        return revised;
    }
}

export class Menu extends Collection {
    constructor(models, options) {
        super(models, options);

        this.restaurant_id = options && options.restaurant_id;
    }

    url() {
        return url.resolve(API_PREFIX, `restaurants/${this.restaurant_id}/menu`);
    }

    forMenu(menuName) {
        return new Menu(this.filter(category => category.hasMenu(menuName)));
    }

    applySearch(text) {
        return this.models
            .map(category => category.applySearch(text))
            .filter(category => category.get('items').length !== 0);
    }
}

Menu.prototype.model = Category;
Menu.prototype.comparator = 'order';
