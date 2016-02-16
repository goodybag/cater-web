import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {OrderItemsResolver} from '../resolvers/order-item';
import {EditOrderItemAction, RemoveOrderItemAction, AddOrderItemAction} from '../actions/order-item';
import {OrderItemService} from '../services/order-item';

@dependencies(Dispatcher, OrderItemsResolver, OrderItemService)
export class OrderItemStore extends Store {
    constructor(dispatcher, orderItems, orderItemService) {
        super(dispatcher);

        this.orderItems = orderItems;
        this.orderItemService = orderItemService;

        this.bind(AddOrderItemAction, this.onAddItem);
        this.bind(EditOrderItemAction, this.onEditOrderItem);
        this.bind(RemoveOrderItemAction, this.onRemoveOrderItem);
    }

    getOrderItems() {
        return this.orderItems;
    }

    onAddItem({orderId, orderItemData}) {
        console.log("add order item store");
        this.orderItemService.createOrderItem(orderId, orderItemData)
            .then(item => {
                this.orderItems.push(item);
                this.emit('change');
            });
    }

    onEditOrderItem({orderItem}) {
        console.log("edit order item store");
        // this.orderItemService.updateOrderItem(orderItem.id, orderItem.order.id, orderItem)
        //     .then(item => {
        //         let index = null;
        //
        //         this.orderItems.forEach(function(orderItem, i) {
        //             if(orderItem.id === item.id) {
        //                 index = i;
        //             }
        //         });
        //
        //         this.orderItems[index] = item;
        //         this.emit('change');
        //     });
    }

    onRemoveOrderItem({orderItem}) {
        console.log("removeo order item store");
        // this.orderItemService.removeOrderItem(orderItem.id, orderItem.order.id)
        //     .then(() => {
        //         this.orderItems = this.orderItems.filter(item => {
        //             return item.id !== orderItem.id;
        //         });
        //
        //         this.emit('change');
        //     });
    }
}
