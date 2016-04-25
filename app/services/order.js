import {dependencies} from 'yokohama';
import {ValidationError} from 'nagoya';

import {ApiService} from '../lib/api';
import {Order} from '../models/order';

@dependencies(ApiService)
export class OrderService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    fetchById(id) {
        return this.apiService.fetchEndpoint(`orders/${id}`)
            .then(Order.parse);
    }

    fetchCurrentByRestaurantId(restaurantId) {
        return this.apiService.fetchEndpoint(`restaurants/${restaurantId}/orders/current`)
        .then(body => {
            if (body != null) {
                return Order.parse(body);
            } else {
                return null;
            }
        }).catch(err => {
            if (err.status === 404) {
                return null;
            } else {
                throw err;
            }
        });
    }

    create(body) {
        return this.apiService.create(`orders`, body)
            .then(Order.parse)
            .catch(isBadRequest, handleBadRequest);
    }

    updateById(id, body) {
        return this.apiService.update(`orders/${id}`, body)
            .then(Order.parse)
            .catch(isBadRequest, handleBadRequest);
    }

    geocodeAddress(address) {
        return this.apiService.fetch(`maps/geocode/${address}`);
    }
}

export function BadRequestError(message, details = {}) {
    const {
        body = {},
        stackFn = this.constructor
    } = details;

    this.message = message;
    this.body = body;

    if (message instanceof Error) {
        this.message = message.message;
        this.stack = message.stack;
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, stackFn);
    }
}

BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.constructor = BadRequestError;

Object.defineProperty(BadRequestError.prototype, 'name', {
    value: 'BadRequestError'
});

function isBadRequest(err) {
    return err.status === 400;
}

function handleBadRequest(err) {
    throw new BadRequestError('Bad Request', {
        stackFn: OrderService.prototype.create,
        body: err.response.body
    });
}
