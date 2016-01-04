import {dependencies} from 'yokohama';

import {ApiService} from '../lib/api';
import {User} from '../models/user';

@dependencies(ApiService)
export class UserService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    fetchCurrent(id) {
        return this.apiService.fetchEndpoint('users/me')
            .then(User.parse);
    }
}
