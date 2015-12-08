import {fetchEndpoint} from '../lib/api';
import {Order} from '../models/order';

export class OrderService {
    fetchById(id) {
        return fetchEndpoint(`orders/${id}`)
            .then(Order.parse);
    }
}
