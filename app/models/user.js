import PropTypes from 'react/lib/ReactPropTypes';
import {Model} from 'backbone';

import {API_PREFIX} from '../config';

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
        if (!this.validator.validate(attrs, User.schema)) {
            return this.validator.getLastError();
        }
    }

    isAdmin() {
        return this.get('groups').some(function(groupObj) {
            return groupObj.group === 'admin';
        });
    }

    urlRoot = `${API_PREFIX}/users`;
}

export class CurrentUser extends User {
    url() {
        return `${this.urlRoot}/me`;
    }
}
