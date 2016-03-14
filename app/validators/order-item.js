import {orderItemSchema} from '../schemas/order-item';

export class OrderItemValidator {
    schema(orderItem, menuItem) {
        return orderItemSchema(menuItem, orderItem);
    }
}
