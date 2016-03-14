export class ReceiveEditOrderItemAction {
    constructor({orderItem}) {
        this.orderItem = orderItem;
    }
}

export class CloseEditOrderItemAction {}

export class AddOrderItemAction {
    constructor({order, menuItem, orderItem}) {
        this.order = order;
        this.menuItem = menuItem;
        this.orderItem = orderItem;
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
