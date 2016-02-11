import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {OrderItemsResolver} from '../resolvers/order-item';
import {AddItemToOrderAction} from '../actions/menu';
import {RemoveOrderItemAction} from '../actions/order';
import {OrderItemService} from '../services/order-item'

@dependencies(Dispatcher, OrderItemsResolver, OrderItemService)
export class OrderItemStore extends Store {
    constructor(dispatcher, orderItems, orderItemService) {
        super(dispatcher);

        this.orderItems = orderItems;
        this.orderItemService = orderItemService;

        this.bind(AddItemToOrderAction, this.onAddItem);
        this.bind(RemoveOrderItemAction, this.onRemoveItem);
    }

    getOrderItems() {
        return this.orderItems;
    }

    onAddItem({order, orderItemData}) {
        return this.orderItemService.createOrderItem(order.id, orderItemData)
            .then(item => {
                this.orderItems.push(item);
                this.emit('change');
            });
    }

    onRemoveItem({orderItem, order}) {
        return this.orderItemService.removeOrderItem(orderItem.id, order.id)
            .then(item => {
                this.orderItems = this.orderItems.filter(i => {
                    return i.id !== item[0].id;
                });

                this.emit('change');
            });
    }
}
