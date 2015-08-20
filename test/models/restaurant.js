import expect from 'expect';

import {Restaurant} from '../../app/models/restaurant';

// TODO
describe('Restaurant', function() {
    it('should succesfully validate a psuedo-legitimate restaurant', function() {
        var restaurant = new Restaurant({
            name: 'A restaurant',
            is_hidden: false
        });

        expect(restaurant.isValid()).toBe(true);
    });

    it('should fail to validate an psuedo-illegitimate restaurant', function() {
        var restaurant = new Restaurant({
            name: 'A restaurant',
            is_hidden: 'not a boolean'
        });

        expect(restaurant.isValid()).toBe(false);
    });
});
