import PropTypes from 'react/lib/ReactPropTypes';
import {Model} from 'backbone';
import ZSchema from 'z-schema';

import {OrderItemCollection} from './order-item';

export const validator = new ZSchema();

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

    static propType = PropTypes.instanceOf(Order)

    defaults() {
        return {
            type: 'delivery',
            status: 'pending'
        };
    }

    validate(attrs) {
        if (!validator.validate(attrs, Order.schema)) {
            return validator.getLastError();
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
            type: attrs.type,
            orderItems: attrs.orderItems && new OrderItemCollection(attrs.orderItems, {order_id: this.id, parse: true})
        };
    }

    items() {
        if (this.has('orderItems')) {
            return this.get('orderItems');
        } else {
            const orderItems = new OrderItemCollection([], {order_id: this.id});
            this.set({orderItems});
            return orderItems;
        }
    }
}
