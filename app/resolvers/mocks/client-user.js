import {provide} from 'yokohama';

import {CurrentUserResolver} from '../user';
import {User} from '../../models/user';

@provide(CurrentUserResolver)
export class ClientCurrentUserResolver {
    constructor() {
        return User.parse(__GBDATA__.CurrentUserResolver);
    }
}
