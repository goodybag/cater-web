import PropTypes from 'react/lib/ReactPropTypes';
import {Model} from 'backbone';

export class Restaurant extends Model {
    static schema = {
        type: 'object',
        required: ['name', 'is_hidden'],
        properties: {
            id: {
                type: 'number'
            },

            name: {
                type: 'string'
            },

            is_hidden: {
                type: 'boolean'
            }

            // TODO: add the rest
        }
    }

    static propType = PropTypes.instanceOf(Restaurant)

    validate(attrs) {
        if (!this.validator.validate(attrs, Restaurant.schema)) {
            return this.validator.getLastError();
        }
    }

    urlRoot = `${process.env.GOODYBAG_API}/restaurants`
}
