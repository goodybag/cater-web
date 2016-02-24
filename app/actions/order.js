export class UpdateOrderParamsAction {
    constructor({orderId, params}) {
        this.orderId = orderId;
        this.params = params;
    }
}

export class SubmitOrderParamsAction {
    constructor({params}) {
        this.params = params;
    }
}
