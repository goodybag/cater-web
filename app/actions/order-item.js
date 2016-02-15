export class ReceiveEditOrderItemAction {
    constructor({orderItem}) {
        this.orderItem = orderItem;
    }
}

export class CloseEditOrderItemAction {}

export class AddOrderItemAction {
    constructor({orderId, orderItem}) {
        this.orderId = orderId;
        this.orderItem = orderItem;
    }
}

export class EditOrderItemAction {
    constructor(orderItem) {
        this.orderItem = orderItem;
    }
}

export class RemoveOrderItemAction {
    constructor({orderItem}) {
        this.orderItem = orderItem;
    }
}
