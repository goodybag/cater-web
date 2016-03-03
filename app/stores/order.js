import Promise from 'bluebird';
import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {Order} from '../models/order';
import {OrderService} from '../services/order';
import {OrderParamsValidator} from '../validators/order-params';
import {
    SubmitOrderParamsAction,
    UpdateOrderParamsAction
} from '../actions/order';

@dependencies(Dispatcher, Order, OrderService, OrderParamsValidator)
export class OrderStore extends Store {
    constructor(dispatcher, order, orderService, orderParamsValidator) {
        super(dispatcher);

        this.orderService = orderService;
        this.order = order;
        this.orderParamsValidator = orderParamsValidator;

        this.bind(SubmitOrderParamsAction, this.submitOrderParams);
        this.bind(UpdateOrderParamsAction, this.updateOrderParams);
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
                restaurant_id: this.restaurantPayload.restaurant.id,
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
}
