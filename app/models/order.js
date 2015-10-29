import moment from 'moment-timezone';
import {Model} from 'backbone';

export class Order extends Model {
    static schema = {
        type: 'object',
        required: ['user_id', 'restaurant_id', 'type', 'status'],
        properties: {
            user_id: {
                type: 'integer'
            },

            restaurant_id: {
                type: 'integer'
            },

            type: {
                type: 'string',
                enum: ['pickup', 'delivery', 'courier']
            },

            status: {
                type: 'string',
                enum: ['canceled', 'pending', 'submitted', 'denied', 'accepted', 'delivered']
            }
        }
    }

    defaults() {
        return {
            type: 'delivery',
            status: 'pending'
        };
    }

    validate(attrs) {
        if (!this.validator.validate(attrs, Order.schema)) {
            return this.validator.getLastError();
        }
    }

    urlRoot = `${process.env.GOODYBAG_API}/orders`

    parse(attrs) {
        return {
            id: attrs.id,
            restaurant_id: attrs.restaurant_id,
            user_id: attrs.user_id,
            street: attrs.street,
            city: attrs.city,
            state: attrs.state,
            zip: attrs.zip,
            phones: attrs.phones,
            notes: attrs.notes,
            datetime: attrs.datetime,
            timezone: attrs.timezone,
            guests: attrs.guests,
            review_token: attrs.review_token,
            tip: attrs.tip,
            name: attrs.name,
            delivery_instructions: attrs.delivery_instructions,
            status: attrs.status,
            total: attrs.total,
            type: attrs.type
        };
    }

    displayAddress() {
        const {street, city, state, zip} = this.attributes;

        if (street == null || city == null || state == null) {
            return `${zip}`;
        } else {
            return `${street}, ${city}, ${state}, ${zip}`;
        }
    }

    getDatetimeMoment() {
        const {datetime, timezone} = this.attributes;

        return moment.tz(datetime, timezone);
    }
}

export class OrderCollection {}

OrderCollection.prototype.model = Order;

export class OrderResolver {
    static parse(order) {
        return new Order(order, {parse: true});
    }

    constructor() {
        const order = new Order({id: process.env.GOODYBAG_ORDER_ID});

        return order.fetch().then(() => order);
    }
}
