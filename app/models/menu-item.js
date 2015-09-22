import PropTypes from 'react/lib/ReactPropTypes';
import {Model, Collection} from 'backbone';
import {inject, Params} from '../lib/injection';

export class MenuItem extends Model {
    static schema = {
        type: 'object',
        required: ['restaurant_id', 'feeds_min', 'feeds_max', 'min_qty'],
        properties: {
            restaurant_id: {
                type: 'integer'
            },

            feeds_min: {
                type: 'integer'
            },

            feeds_max: {
                type: 'integer'
            },

            min_qty: {
                type: 'integer'
            }
        }
    }

    static propType = PropTypes.instanceOf(MenuItem)

    validate(attrs) {
        if (!this.validator.validate(attrs, MenuItem.schema)) {
            return this.validator.getLastError();
        }
    }
}

export class MenuItemCollection extends Collection {
    static propType = PropTypes.instanceOf(MenuItemCollection)

    constructor(models, options) {
        super(models, options);

        this.restaurant_id = options && options.restaurant_id;
    }

    url() {
        return `${process.env.GOODYBAG_API}/restaurants/${this.restaurant_id}/items`;
    }
}

MenuItemCollection.prototype.model = MenuItem;

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
