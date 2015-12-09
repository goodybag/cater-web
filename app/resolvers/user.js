import {dependencies} from 'yokohama';

import {UserService} from '../services/user';

@dependencies(UserService)
export class CurrentUserResolver {
    constructor(userService) {
        return userService.fetchCurrent();
    }
}
