export class UpdateOrderInfoAction {
    constructor({order, changes}) {
        this.order = order;
        this.changes = changes;
    }
}

export class RemoveOrderItemAction {
    constructor({orderItem, order}) {
        this.orderItem = orderItem;
        this.order = order;
    }
}

export class SubmitOrderInfoAction {
    constructor({info}) {
        this.info = info;
    }
}
