import {fetchEndpoint} from '../lib/api';
import {User} from '../models/user';

export class UserService {
    fetchCurrent(id) {
        return fetchEndpoint('users/me')
            .then(User.parse);
    }
}
