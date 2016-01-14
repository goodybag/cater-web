import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {OrderItemsResolver} from '../resolvers/order-item';
import {AddItemToOrderAction} from '../actions/menu';
import {OrderItemService} from '../services/order-item'

@dependencies(Dispatcher, OrderItemsResolver, OrderItemService)
export class OrderItemStore extends Store {
    constructor(dispatcher, orderItems, orderItemService) {
        super(dispatcher);

        this.orderItems = orderItems;
        this.orderItemService = orderItemService;

        this.bind(AddItemToOrderAction, this.onAddItem);
    }

    getOrderItems() {
        return this.orderItems;
    }

    onAddItem({order, orderItemData}) {
        this.orderItemService.createOrderItem(order.id, orderItemData)
            .then(item => {
                this.orderItems.push(item);
                this.emit('change');
            });
    }
}
