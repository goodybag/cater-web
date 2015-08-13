import {Model} from 'backbone';
import {validator} from '../util';

export class User extends Model {
    static schema = {
        type: 'object',
        required: ['email', 'name', 'groups', 'points'],
        properties: {
            id: {
                type: 'integer',
                minimum: 1
            },

            email: {
                type: 'string',
                maxLength: 250
            },

            name: {
                type: 'string'
            },

            points: {
                type: 'integer',
                minimum: 0
            },

            groups: {
              type: 'array'
            }
        }
    }

    validate(attrs) {
        if (!validator.validate(attrs, User.schema)) {
            return validator.getLastError();
        }
    }

    isAdmin() {
        return this.get('groups').some(function(groupObj) {
            return groupObj.group === 'admin';
        });
    }

    urlRoot() {
        return 'https://www.goodybag.com/api/users';
    }
}
