import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {User} from '../models/user';
import {UserService} from '../services/user';

@dependencies(UserService)
export class CurrentUserResolver {
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
