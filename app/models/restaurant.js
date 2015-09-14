import PropTypes from 'react/lib/ReactPropTypes';
import {Model} from 'backbone';
import {inject, Params} from '../lib/injection';

export class Restaurant extends Model {
    static schema = {
        type: 'object',
        required: ['name', 'is_hidden'],
        properties: {
            id: {
                type: 'number'
            },

            name: {
                type: 'string'
            },

            is_hidden: {
                type: 'boolean'
            }

            // TODO: add the rest
        }
    }

    static propType = PropTypes.instanceOf(Restaurant)

    validate(attrs) {
        if (!this.validator.validate(attrs, Restaurant.schema)) {
            return this.validator.getLastError();
        }
    }

    urlRoot = `${process.env.GOODYBAG_API}/restaurants`
}

@inject(Params)
export class RestaurantResolver {
    static parse(restaurant) {
        return new Restaurant(restaurant, {parse: true});
    }

    constructor(params) {
        if (isNaN(+params.restaurant_id)) {
            throw new TypeError(`restaurant_id ${params.restaurant_id} is not a number`);
        }

        const restaurant = new Restaurant({id: params.restaurant_id});

        return restaurant.fetch().then(() => restaurant);
    }
}
