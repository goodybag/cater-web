import PropTypes from 'react/lib/ReactPropTypes';
import {Model, Collection} from 'backbone';
import {validator} from '../util';

import {Order} from './order';

export class OrderItem extends Model {
    static schema = {
        type: 'object',
        required: ['quantity', 'item_id', 'order_id'],
        properties: {
            quantity: {
                type: 'integer',
                minimum: 1
            },

            item_id: {
                type: 'integer'
            },

            order_id: {
                type: 'integer'
            },

            notes: {
                type: 'string'
            }
        }
    }

    static propType = PropTypes.instanceOf(OrderItem)

    defaults() {
        return {
            quantity: 1,
            notes: ''
        }
    }

    order = new Order({id: this.get('order_id')});
}

export class OrderItemCollection extends Collection {}
