import {IncomingMessage} from 'http';
import {dependencies, provide} from 'yokohama';

import {CurrentUserResolver} from '../user';
import {User} from '../../models/user';

@provide(CurrentUserResolver)
@dependencies(IncomingMessage)
export class ServerUserResolver {
    constructor(req) {
        return new User(req.user.attributes);
    }
}
