import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {User} from '../models/user';
import {UserService} from '../services/user';

@dependencies(UserService)
export class CurrentUserResolver {
    static uuid = '629dce40-9dee-11e5-9900-d332f6d2eb61';

    constructor(userService) {
        return userService.fetchCurrent();
    }
}

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
