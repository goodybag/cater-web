import Promise from 'bluebird';
import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {RestaurantPayload} from '../payloads/restaurant';
import {Order} from '../models/order';
import {OrderService} from '../services/order';
import {CurrentUser} from '../models/user';
import {fulfillabilitySchema, geocodingSchema} from '../validators/order';
import {
    SubmitOrderParamsAction,
    UpdateOrderParamsAction
} from '../actions/order';

@dependencies(Dispatcher, Order, OrderService, RestaurantPayload, CurrentUser)
export class OrderStore extends Store {
    constructor(dispatcher, order, orderService, restaurantPayload, user) {
        super(dispatcher);

        this.orderService = orderService;
        this.order = order;
        this.restaurantPayload = restaurantPayload;
        this.user = user;

        this.bind(SubmitOrderParamsAction, this.submitOrderParams);
        this.bind(UpdateOrderParamsAction, this.updateOrderParams);
    }

    getOrder() {
        return this.order;
    }

    handleParamsValidation(params) {
        return Promise.try(() => {
            const {
                restaurant,
                restaurantDeliveryLeadTimes,
                restaurantPickupLeadTimes,
                restaurantDeliveryHours,
                restaurantPickupHours,
                restaurantDeliveryZips
            } = this.restaurantPayload;

            fulfillabilitySchema(params, {
                timezone: this.user.region.timezone,
                restaurant: {
                    ...restaurant,
                    lead_times: restaurantDeliveryLeadTimes,
                    pickup_lead_times: restaurantPickupLeadTimes,
                    hours: restaurantPickupHours,
                    delivery_hours: restaurantDeliveryHours,
                    delivery_zips: restaurantDeliveryZips
                }
            }).validate();

            return this.orderService.geocodeAddress(params.address);
        }).then(body => {
            geocodingSchema(body).validate();

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
