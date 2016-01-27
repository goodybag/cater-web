import {MenuItem} from './menu-item';
import {Restaurant} from './restaurant';

export class Category {
    static parse(attrs) {
        const created_at = new Date(attrs.created_at);

        const restaurant = attrs.restaurant
            ? Restaurant.parse(attrs.restaurant)
            : new Restaurant({id: attrs.restaurant_id});

        return new Category({
            ...attrs,
            created_at,
            restaurant
        });
    }

    constructor(attrs) {
        const {
            id = null,
            created_at = null,
            restaurant = null,
            name = null,
            description = null,
            order = null,
            menus = null
        } = attrs;

        this.id = id;
        this.created_at = created_at;
        this.restaurant = restaurant;
        this.name = name;
        this.description = description;
        this.order = order;
        this.menus = menus;
    }

    // these are horrible names
    hasMenu(menuName) {
        return this.menus.indexOf(menuName) !== -1;
    }
}

export class MenuCategories {
    static parse(cats) {
        return cats.map(Category.parse);
    }

    constructor(cats) {
        return cats;
    }
}
