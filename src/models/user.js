import PropTypes from 'react/lib/ReactPropTypes';
import {Model} from 'backbone';
import ZSchema from 'z-schema';

export const validator = new ZSchema();

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

    static propType = PropTypes.instanceOf(User)

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

    urlRoot = `${process.env.GOODYBAG_API}/users`;
}

export class CurrentUser extends User {
    url() {
        return `${this.urlRoot}/me`;
    }
}
