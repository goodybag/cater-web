import fuzzy from 'fuzzysearch';

import {Restaurant} from './restaurant';
import {Category} from './category';

export class MenuItem {
    static parse(attrs) {
        const created_at = new Date(attrs.created_at);

        const restaurant = attrs.restaurant
            ? Restaurant.parse(attrs.restaurant)
            : new Restaurant({id: attrs.restaurant_id});

        const category = attrs.category
            ? Category.parse(attrs.category)
            : new Category({id: attrs.category_id});

        return new MenuItem({...attrs, created_at, restaurant, category});
    }

    constructor(attrs) {
        const {
            id = null,
            created_at = null,
            category = null,
            restaurant = null,
            order = null,
            name = null,
            description = null,
            price = null,
            feeds_min = null,
            feeds_max = null,
            options_sets = null,
            is_hidden = null,
            min_qty = null,
            hide_pricing = null,
            photo_url = null,
            is_popular = null,
            tags = []
        } = attrs;

        this.id = id;
        this.created_at = created_at;
        this.category = category;
        this.restaurant = restaurant;
        this.order = order;
        this.name = name;
        this.description = description;
        this.price = price;
        this.feeds_min = feeds_min;
        this.feeds_max = feeds_max;
        this.options_sets = options_sets;
        this.is_hidden = is_hidden;
        this.min_qty = min_qty;
        this.hide_pricing = hide_pricing;
        this.photo_url = photo_url;
        this.is_popular = is_popular;
        this.tags = tags;
    }

    matchSearchTerm(term) {
        if (!term) {
            return true;
        }

        var {name, description} = this;
        name = (name || '').toLowerCase();
        description = (description || '').toLowerCase();

        return fuzzy(term, name) || fuzzy(term, description);
    }

    defaultOptionChoices() {
        if (this.options_sets == null) {
            return [];
        } else {
            return this.options_sets.map(set => {
                const {id, name, type, options} = set;

                return {
                    id, name, type,
                    options: options.map(toChoice)
                };
            });
        }

        function toChoice({id, name, description, price, default_state: state}) {
            return {id, name, description, price, state};
        }
    }
}

export class MenuItems {
    static parse(items) {
        return items.map(MenuItem.parse);
    }
}
