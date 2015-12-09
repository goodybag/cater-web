import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {CurrentUserResolver} from '../resolvers/user';

@dependencies(Dispatcher, CurrentUserResolver)
export class CurrentUserStore extends Store {
    constructor(dispatcher, user) {
        super(dispatcher);

        this.user = user;
    }

    getUser() {
        return this.user;
    }
}
