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

    items = new OrderItemCollection([], {url: `${this.url()}/items`});
}