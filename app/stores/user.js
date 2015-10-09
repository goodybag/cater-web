import {Store} from 'tokyo';
import {inject} from 'yokohama';
import {Dispatcher} from 'flux';

import {CurrentUser} from '../models/user';

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

@inject(Dispatcher, CurrentUserResolver)
export class CurrentUserStore extends Store {
    constructor(dispatcher, user) {
        super(dispatcher);

        this.user = user;
        this.user.on('change', () => this.emit('change'));
    }

    getUser() {
        return this.user;
    }
}
