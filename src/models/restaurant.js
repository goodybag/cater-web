import {Model} from 'backbone';
import {validator} from '../util';

export class Restaurant extends Model {
    static schema = {
        type: 'object',
        required: ['name', 'is_hidden'],
        properties: {
            name: {
                type: 'string',
                minLength: 1
            },

            is_hidden: {
                type: 'boolean'
            }

            // TODO: add the rest
        }
    }

    validate(attrs, options) {
        if (!validator.validate(attrs, Restaurant.schema)) {
            return validator.getLastError();
        }
    }
}
