import Promise from 'bluebird';
import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';
import delay from 'core-js/library/fn/delay';

import {RestaurantPayload} from '../payloads/restaurant';
import {OrderResolver} from '../resolvers/order';
import {SubmitOrderInfoAction, UpdateOrderInfoAction} from '../actions/order';
import {Order} from '../models/order';
import {validate} from '../validators/order-info';
import {validate as validateFulfillability} from '../validators/order-fulfillability';
import {OrderService} from '../services/order';
import {CurrentUserResolver} from '../resolvers/user';

@dependencies(Dispatcher, OrderResolver, OrderService, RestaurantPayload, CurrentUserResolver)
export class OrderStore extends Store {
    constructor(dispatcher, order, orderService, restaurantPayload, user) {
        super(dispatcher);

        this.orderService = orderService;
        this.order = order;
        this.restaurantPayload = restaurantPayload;
        this.user = user;
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

    handleInfoValidation(infoSet) {
        return Promise.try(() => {
            validate(infoSet, {nullableColumns: false});

            return this.orderService.geocodeAddress(infoSet.address);
        }).then(body => {
            const {
                restaurant,
                restaurantDeliveryLeadTimes,
                restaurantPickupLeadTimes,
                restaurantDeliveryHours,
                restaurantPickupHours,
                restaurantDeliveryZips
            } = this.restaurantPayload;

            validateFulfillability(infoSet, {
                nullableColumns: false,
                context: {
                    addressData: body,
                    restaurant: {
                        ...restaurant,
                        lead_times: restaurantDeliveryLeadTimes,
                        pickup_lead_times: restaurantPickupLeadTimes,
                        hours: restaurantPickupHours,
                        delivery_hours: restaurantDeliveryHours,
                        delivery_zips: restaurantDeliveryZips
                    }
                }
            });

            if (!body.valid) {
                throw new TypeError('Failed to invalidate empty geocode body');
            }

            return {
                street: body.address.street,
                city: body.address.city,
                state: body.address.state,
                zip: body.address.zip,
                datetime: `${infoSet.date} ${infoSet.time}`,
                guests: infoSet.guests
            };
        });
    }

    submitOrderInfo({info}) {
        this.saving = true;
        this.emit('change');

        return this.handleInfoValidation(info).then(data => {
            return this.orderService.create({
                restaurant_id: this.restaurantPayload.restaurant.id,
                user_id: this.user.id, // TODO
                ...data
            });
        }).then(order => {
            this.order = order;
            this.emit('change');
        }).finally(() => {
            this.saving = false;
            this.emit('change');
        });
    }

    updateOrderInfo({changes}) {
        this.saving = true;
        this.emit('change');

        return this.handleInfoValidation(changes).then(data => {
            return this.orderService.updateById(this.order.id, data);
        }).then(order => {
            this.order = order;
            this.emit('change');
        }).finally(() => {
            this.saving = false;
            this.emit('change');
        });
    }
}
