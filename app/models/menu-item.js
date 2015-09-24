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

export class MenuItemCollection extends Collection {}

MenuItemCollection.prototype.model = MenuItem;
