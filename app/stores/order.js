import Promise from 'bluebird';
import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {Order} from '../models/order';
import {Restaurant} from '../models/restaurant';
import {CurrentUser} from '../models/user';
import {OrderService} from '../services/order';
import {OrderParamsValidator} from '../validators/order-params';
import {
    SubmitOrderParamsAction,
    UpdateOrderParamsAction,
    ResumeOrderAction
} from '../actions/order';
import {OrderItemStore} from '../stores/order-item';

@dependencies(Dispatcher, Order, OrderService, OrderParamsValidator, OrderItemStore, Restaurant, CurrentUser)
export class OrderStore extends Store {
    constructor(dispatcher, order, orderService, orderParamsValidator, orderItemStore, restaurant, user) {
        super(dispatcher);

        this.orderService = orderService;
        this.order = order;
        this.orderParamsValidator = orderParamsValidator;
        this.orderItemStore = orderItemStore;
        this.restaurant = restaurant;
        this.user = user;

        this.bind(SubmitOrderParamsAction, this.submitOrderParams);
        this.bind(UpdateOrderParamsAction, this.updateOrderParams);
        this.bind(ResumeOrderAction, this.onResumeOrder);
    }

    getOrder() {
        return this.order;
    }

    handleParamsValidation(params) {
        return Promise.try(() => {
            this.orderParamsValidator.schema(params).validate();

            return this.orderService.geocodeAddress(params.address);
        }).then(body => {
            this.orderParamsValidator.geocodingSchema(body).validate();

            return {
                street: body.address.street,
                city: body.address.city,
                state: body.address.state,
                zip: body.address.zip,
                datetime: `${params.date} ${params.time}`,
                guests: params.guests
            };
        });
    }

    submitOrderParams({params}) {
        return this.handleParamsValidation(params).then(data => {
            return this.orderService.create({
                restaurant_id: this.restaurant.id,
                user_id: this.user.id, // TODO
                ...data
            });
        }).then(order => {
            this.order = order;
            this.emit('change');
        });
    }

    updateOrderParams({params}) {
        return this.handleParamsValidation(params).then(data => {
            return this.orderService.updateById(this.order.id, data);
        }).then(order => {
            this.order = order;
            this.emit('change');
        });
    }

    onResumeOrder({order}) {
        this.order = order;
        this.orderItemStore.refreshOrderItems(order.id);
        this.emit('change');
    }
}
