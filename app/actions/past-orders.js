export class DisplayOrderAction {
    constructor({order}) {
        this.order = order;
    }
}

export class StopDisplayingOrderAction {}

export class DuplicateOrderAction {
    constructor(orderId) {
        this.orderId = orderId;
    }
}

export class CancelOrderAction {
    constructor(orderId) {
        this.orderId = orderId;
    }
}

export class UncancelOrderAction {
    constructor(orderId) {
        this.orderId = orderId;
    }
}
