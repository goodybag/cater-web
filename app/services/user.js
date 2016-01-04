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

    update(id, data) {
        return this.apiService
            .update(`users/${id}`, data)
            .then(body => body ? User.parse(body) : null);
    }
}
