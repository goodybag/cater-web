export class UpdateOrderInfoAction {
    constructor({order, changes}) {
        this.order = order;
        this.changes = changes;
    }
}

export class SubmitOrderInfoAction {
    constructor({info}) {
        this.info = info;
    }
}
