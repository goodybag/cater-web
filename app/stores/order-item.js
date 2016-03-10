import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {OrderItems} from '../models/order-item';
import {EditOrderItemAction, RemoveOrderItemAction, AddOrderItemAction} from '../actions/order-item';
import {OrderItemService} from '../services/order-item';
import {OrderItemValidator} from '../validators/order-item';

@dependencies(Dispatcher, OrderItems, OrderItemService, OrderItemValidator)
export class OrderItemStore extends Store {
    constructor(dispatcher, orderItems, orderItemService, orderItemValidator) {
        super(dispatcher);

        this.orderItems = orderItems;
        this.orderItemService = orderItemService;
        this.orderItemValidator = orderItemValidator;

        this.bind(AddOrderItemAction, this.onAddItem);
        this.bind(EditOrderItemAction, this.onEditOrderItem);
        this.bind(RemoveOrderItemAction, this.onRemoveOrderItem);
    }

    getOrderItems() {
        return this.orderItems;
    }

    onAddItem({order, menuItem, orderItem}) {
        const data = {
            order_id: order.id,
            item_id: menuItem.id,
            ...orderItem
        };

        this.orderItemValidator.schema(orderItem, menuItem).validate();

        this.orderItemService.createOrderItem(order.id, data)
            .then(item => {
                this.orderItems.push(item);
                this.emit('change');
            });
    }

    onEditOrderItem({orderItem}) {
        this.orderItemService.updateOrderItem(orderItem.id, orderItem.order.id, orderItem)
            .then(item => {
                let index = null;

                this.orderItems.forEach(function(orderItem, i) {
                    if(orderItem.id === item.id) {
                        index = i;
                    }
                });

                this.orderItems[index] = item;
                this.emit('change');
            });
    }

    onRemoveOrderItem({orderItem}) {
        this.orderItemService.removeOrderItem(orderItem.id, orderItem.order.id)
            .then(() => {
                this.orderItems = this.orderItems.filter(item => {
                    return item.id !== orderItem.id;
                });

                this.emit('change');
            });
    }
}
