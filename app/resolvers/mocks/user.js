import {dependencies, provide} from 'yokohama';

import {UserService} from '../../services/user';
import {CurrentUser} from '../../models/user';

@provide(CurrentUser)
@dependencies(UserService)
export class CurrentUserResolver {
    constructor(userService) {
        return userService.fetchCurrent();
    }
}
