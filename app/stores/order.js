import Promise from 'bluebird';
import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';
import delay from 'core-js/library/fn/delay';

import {OrderResolver} from '../resolvers/order';
import {SubmitOrderInfoAction, UpdateOrderInfoAction} from '../actions/order';
import {Order} from '../models/order';
import {validate} from '../validators/order-info';
import {OrderService} from '../services/order';

@dependencies(Dispatcher, OrderResolver, OrderService)
export class OrderStore extends Store {
    constructor(dispatcher, order, orderService) {
        super(dispatcher);

        this.orderService = orderService;
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
            validate(changes, {nullableColumns: false});

            const [street, city, state, zip] = changes.address.split(/,\s+/g);

            const body = {
                street, city, state, zip,
                datetime: `${changes.date} ${changes.time}`,
                guests: changes.guests
            };

            return this.orderService.updateById(this.order.id, body);
        }).then(order => {
            this.order = order;
            this.emit('change');
        }).finally(() => {
            this.saving = false;
            this.emit('change');
        });
    }
}
