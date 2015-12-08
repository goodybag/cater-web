import {fetchEndpoint} from '../lib/api';
import {OrderItem} from '../models/order-item';

export class OrderItemService {
    fetchAllByOrderId(id) {
        return fetchEndpoint(`orders/${id}/items`)
            .then(items => items.map(OrderItem.parse));
    }
}
