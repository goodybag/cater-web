import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {PastOrdersResolver} from '../resolvers/past-orders';
import {OrderItemService} from '../services/order-item';
import {PastOrdersService} from '../services/past-orders';
import {DisplayOrderAction, StopDisplayingOrderAction, DuplicateOrderAction} from '../actions/past-orders';

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

        this.orderItemService.fetchAllByOrderId(order.id)
            .then(orderItems => {
                this.setOrderAndItems(order, orderItems);
            });
    }

    onStopDisplayingOrder() {
        this.setOrderAndItems(null, []);
    }

    onDuplicateOrder({orderId}) {
        this.pastOrdersService.duplicateOrderByOrderId(orderId)
            .then(order => {
                this.pastOrders.unshift(order);
                this.emit('change');
            });
    }
}
