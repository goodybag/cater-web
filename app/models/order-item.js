import PropTypes from 'react/lib/ReactPropTypes';
import {Model, Collection} from 'backbone';

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

    validate(attrs) {
        if (!this.validator.validate(attrs, OrderItem.schema)) {
            return this.validator.getLastError();
        }
    }

    defaults() {
        return {
            quantity: 1,
            notes: ''
        };
    }
}

export class OrderItemCollection extends Collection {
    static propType = PropTypes.instanceOf(OrderItemCollection)

    constructor(models, options) {
        super(models, options);

        this.order_id = options.order_id;
    }

    url() {
        return `${process.env.GOODYBAG_API}/orders/${this.order_id}`;
    }
}

OrderItemCollection.prototype.model = OrderItem;
