import Promise from 'bluebird';
import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';
import delay from 'core-js/library/fn/delay';

import {OrderResolver} from '../resolvers/order';
import {SubmitOrderInfoAction, UpdateOrderInfoAction} from '../actions/order';
import {Order} from '../models/order';
import {validate} from '../validators/order-info';

@dependencies(Dispatcher, OrderResolver)
export class OrderStore extends Store {
    constructor(dispatcher, order) {
        super(dispatcher);

        this.order = order;
        this.saving = false;

        this.bind(SubmitOrderInfoAction, this.submitOrderInfo);
        this.bind(UpdateOrderInfoAction, this.updateOrderInfo);
    }

    isSaving() {
        return this.saving;
    }

    getOrder() {
        return this.order;
    }

    submitOrderInfo({info}) {
        this.saving = true;
        this.emit('change');

        return Promise.try(() => {
            validate(info, {subset: false});
        }).then(() => {
            return delay(500);
        }).then(() => {
            this.order = new Order({
                street: '7901 Cameron Rd',
                city: 'Austin',
                state: 'TX',
                zip: '78754',
                datetime: '2016-02-15 11:00:00',
                timezone: 'America/Chicago',
                status: 'pending',
                total: 8660,
                guests: 5
            });

            this.emit('change');
        }).finally(() => {
            this.saving = false;
            this.emit('change');
        });
    }

    updateOrderInfo({changes}) {
        this.saving = true;
        this.emit('change');

        return Promise.try(() => {
            return delay(500);
        }).then(() => {
            validate(changes, {nullableColumns: false});
        }).finally(() => {
            this.saving = false;
            this.emit('change');
        });
    }
}
