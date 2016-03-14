import {IncomingMessage} from 'http';
import {dependencies, provide} from 'yokohama';

import {CurrentUser, User} from '../../models/user';

@provide(CurrentUser)
@dependencies(IncomingMessage)
export class ServerUserResolver {
    constructor(req) {
        return new User(req.user.attributes);
    }
}
