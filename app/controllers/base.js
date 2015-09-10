export class Controller {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
        this._callbackId = dispatcher.register(dispatchHandler.bind(this));
        this._triggers = [];
    }

    bind(actionType, method) {
        this._triggers.push({actionType, method});
    }

    waitFor(controller) {
        this.dispatcher.waitFor(controller._callbackId);
    }
}

function dispatchHandler(action) {
    this._triggers.forEach(({actionType, method}) => {
        if (action instanceof actionType) {
            method.call(this, action);
        }
    });
}
