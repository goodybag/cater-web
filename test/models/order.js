import expect from 'expect';

import {Order} from '../../src/models/order';

describe('Order', function() {
    it('should validate a valid order', function() {
        const order = new Order({
            user_id: 1,
            restaurant_id: 111
        });

        expect(order.isValid()).toBe(true);
    });

    it('should not validate an invalid order', function() {
        const order = new Order({
            restaurant_id: 111
        });

        expect(order.isValid()).toBe(false);
    });
});
