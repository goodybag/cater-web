import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'tokyo';

import {ReceiveEditOrderItemAction, CloseEditOrderItemAction} from '../actions/order-item';

@dependencies(Dispatcher)
export class EditItemStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);

        this.orderItem = null;
        this.modalOpen = false;

        this.bind(ReceiveEditOrderItemAction, this.onReceiveEditOrderItem);
        this.bind(CloseEditOrderItemAction, this.onCloseEditOrderItemAction);
    }

    onReceiveEditOrderItem({orderItem}) {
        this.modalOpen = true;
        this.orderItem = orderItem;
        this.emit('change');
    }

    onCloseEditOrderItemAction() {
        this.modalOpen = false;
        this.emit('change');
    }
}
