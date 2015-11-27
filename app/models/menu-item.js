import {Restaurant} from './restaurant';

export class MenuItem {
    static parse(attrs) {
        const created_at = new Date(attrs.created_at);

        const restaurant = attrs.restaurant
            ? Restaurant.parse(attrs.restaurant)
            : new Restaurant({id: attrs.restaurant_id});

        return new MenuItem({...attrs, created_at, restaurant});
    }

    constructor(attrs) {
        const {
            id = null,
            created_at = null,
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
            tags = []
        } = attrs;

        this.id = id;
        this.created_at = created_at;
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
        this.tags = tags;
    }
}
