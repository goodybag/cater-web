import expect from 'expect';

import {User} from '../../src/models/user';

// TODO
describe('User', function() {
    it('should succesfully validate a legitimate user', function() {
        var user = new User({
            email: 'example@example.com'
        });

        expect(user.isValid()).toBe(true);
    });

    it('should fail to validate an illegitimate user', function() {
        var user = new User({
            email: 'example@example.com',
            restaurant_ids: 'foo'
        });

        expect(user.isValid()).toBe(false);
    });
});
