import {Model} from 'backbone';
import {validator} from '../util';

export class User extends Model {
    static schema = {
        type: 'object',
        required: ['email', 'restaurant_ids', 'groups'],
        properties: {
            email: {
                type: 'string',
                maxLength: 250
            },

            restaurant_ids: {
                type: 'array'
            },

            organization: {
              type: ['string', 'null'],
            },

            groups: {
              type: 'array',
            },

            region_id: {
              type: ['number', 'null']
            }
        }
    }

    defaults() {
        return {
            groups: [],
            restaurant_ids: []
        };
    }

    constructor(attrs, options) {
        super(attrs, options);
    }

    validate(attrs, options) {
        if (!validator.validate(attrs, User.schema)) {
            return validator.getLastError();
        }
    }
}
