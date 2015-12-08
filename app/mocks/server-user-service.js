import {IncomingMessage} from 'http';
import {dependencies, provide} from 'yokohama';

import {UserService} from '../services/user';
import {User} from '../models/user';

@provide(UserService)
@dependencies(IncomingMessage)
export class ServerUserService {
    constructor(req) {
        this.currentUser = new User(req.user.attributes);
    }

    fetchCurrent() {
        return this.currentUser;
    }
}
