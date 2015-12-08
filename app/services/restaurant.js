import {fetchEndpoint} from '../lib/api';
import {Restaurant} from '../models/restaurant';

export class RestaurantService {
    fetchById(id) {
        return fetchEndpoint(`restaurants/${id}`)
            .then(Restaurant.parse);
    }
}
