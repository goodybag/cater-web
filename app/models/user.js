import PropTypes from 'react/lib/ReactPropTypes';
import {Model} from 'backbone';
import {inject} from '../lib/injection';

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

    urlRoot = `${process.env.GOODYBAG_API}/users`;
}

export class CurrentUser extends User {
    url() {
        return `${this.urlRoot}/me`;
    }
}

@inject()
export class CurrentUserResolver {
    static parse(user) {
        return new CurrentUser(user, {parse: true});
    }

    constructor() {
        const user = new CurrentUser();

        return user.fetch().then(() => user);
    }
}
