import PropTypes from 'react/lib/ReactPropTypes';
import {Model} from 'backbone';
import ZSchema from 'z-schema';

export const validator = new ZSchema();

export class Restaurant extends Model {
    static schema = {
        type: 'object',
        required: ['name', 'is_hidden'],
        properties: {
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
        if (!validator.validate(attrs, Restaurant.schema)) {
            return validator.getLastError();
        }
    }

    urlRoot = `${process.env.GOODYBAG_API}/restaurants`
}
