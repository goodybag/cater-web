export class ReceiveEditOrderItemAction {
    constructor({orderItem}) {
        this.orderItem = orderItem;
    }
}

export class CloseEditOrderItemAction {}

export class AddOrderItemAction {
    constructor({orderId, orderItemData}) {
        this.orderId = orderId;
        this.orderItemData = orderItemData;
    }
}

export class EditOrderItemAction {
    constructor({orderItem}) {
        this.orderItem = orderItem;
        console.log("edit order item action");
    }
}

export class RemoveOrderItemAction {
    constructor({orderItem}) {
        this.orderItem = orderItem;
        console.log("remove order item action");
    }
}
