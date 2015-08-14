import {Model} from 'backbone';
import {validator} from '../util';

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

    static propType(props, propName) {
        const obj = props[propName];

        return new Restaurant(obj).isValid();
    }

    validate(attrs) {
        if (!validator.validate(attrs, Restaurant.schema)) {
            return validator.getLastError();
        }
    }

    urlRoot = `${process.env.GOODYBAG_API}/restaurants`
}
