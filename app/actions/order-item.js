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
    }
}

export class RemoveOrderItemAction {
    constructor({orderItem}) {
        this.orderItem = orderItem;
    }
}
