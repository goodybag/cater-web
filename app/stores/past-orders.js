import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {PastOrdersResolver} from '../resolvers/past-orders';
import {OrderItemService} from '../services/order-item';
import {PastOrdersService} from '../services/past-orders';
import {DisplayOrderAction,
    StopDisplayingOrderAction,
    DuplicateOrderAction,
    CancelOrderAction,
    UncancelOrderAction} from '../actions/past-orders';

@dependencies(Dispatcher, PastOrdersResolver, OrderItemService, PastOrdersService)
export class PastOrdersStore extends Store {
    constructor(dispatcher, pastOrders, orderItemService, pastOrdersService) {
        super(dispatcher);

        this.pastOrders = pastOrders;
        this.orderItemService = orderItemService;
        this.pastOrdersService = pastOrdersService;
        this.currentOrder = null;
        this.currentOrderItems = [];

        this.bind(DisplayOrderAction, this.onDisplayOrder);
        this.bind(StopDisplayingOrderAction, this.onStopDisplayingOrder);
        this.bind(DuplicateOrderAction, this.onDuplicateOrder);
        this.bind(CancelOrderAction, this.onCancelOrder);
        this.bind(UncancelOrderAction, this.onUncancelOrder);
    }

    getPastOrders() {
        return this.pastOrders;
    }

    getCurrentOrder() {
        return this.currentOrder;
    }

    getCurrentOrderItems() {
        return this.currentOrderItems;
    }

    setOrderAndItems(order, orderItems) {
        this.currentOrder = order;
        this.currentOrderItems = orderItems;
        this.emit('change');
    }

    onDisplayOrder({order}) {
        this.currentOrder = 'loading';
        this.emit('change');

        return this.orderItemService.fetchAllByOrderId(order.id)
            .then(orderItems => {
                this.setOrderAndItems(order, orderItems);
            });
    }

    onStopDisplayingOrder() {
        return this.setOrderAndItems(null, []);
    }

    onDuplicateOrder({orderId}) {
        return this.pastOrdersService.duplicateOrderByOrderId(orderId)
            .then(order => {
                this.pastOrders.unshift(order);
                this.emit('change');
            });
    }

    onCancelOrder({orderId}) {
        return this.pastOrdersService.updateOrderStatusByOrderId(orderId, "canceled")
            .then(order => {
                this.pastOrders.map(function(pastOrder) {
                    if(pastOrder.id === order.id) {
                        pastOrder.updateStatus(order.status);
                    }
                });
                this.emit('change');
            });
    }

    onUncancelOrder({orderId}) {
        return this.pastOrdersService.updateOrderStatusByOrderId(orderId, "pending")
            .then(order => {
                this.pastOrders.map(function(pastOrder) {
                    if(pastOrder.id === order.id) {
                        pastOrder.updateStatus(order.status);
                    }
                });
                this.emit('change');
            });
    }
}
