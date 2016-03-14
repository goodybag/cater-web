import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {CurrentUser} from '../models/user';
import {UpdateUserAction, UpdateUserRegionAction} from '../actions/user';
import {UserService} from '../services/user';
import {Region} from '../models/region';

@dependencies(Dispatcher, CurrentUser, UserService)
export class CurrentUserStore extends Store {
    constructor(dispatcher, user, userService) {
        super(dispatcher);

        this.user = user;
        this.userService = userService;

        this.bind(UpdateUserAction, this.onUpdateUserAction);
        this.bind(UpdateUserRegionAction, this.onUpdateUserRegionAction);
    }

    getUser() {
        return this.user;
    }

    onUpdateUserAction(payload) {
        return this.userService
            .update(this.user.id, payload.changes)
            .then(user => {
                this.user = user || this.user;
                this.emit('change');
            });
    }

    onUpdateUserRegionAction(payload) {
        var oldRegion = this.user.region;

        this.user.region = new Region(payload);
        this.emit('change');

        return this.userService
            .update(this.user.id, { region_id: payload.id })
            .then(user => {
                this.user = user || this.user;
                this.emit('change');
            })
            .catch(error => {
                this.user.region = oldRegion;
                this.emit('change');

                throw error;
            });
    }
}
