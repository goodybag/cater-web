import expect from 'expect';

import {User} from '../../app/models/user';

// TODO
describe('User', function() {
    it('should succesfully validate a legitimate user', function() {
        var user = new User({
            email: 'example@example.com',
            name: 'John Doe',
            points: 500,
            groups: [{group: 'client'}]
        });

        expect(user.isValid()).toBe(true);
    });

    it('should fail to validate an illegitimate user', function() {
        var user = new User({
            email: 'example@example.com',
            name: 'John Doe',
            points: Infinity,
            groups: []
        });

        expect(user.isValid()).toBe(false);
    });
});
