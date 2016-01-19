import expect from 'expect';
import validator from '../app/lib/validator';

describe("validator", function () {

    it(".assert()", function () {
        try {
            validator.assert(false, 'should throw an error')
        } catch (err) {
            expect(err).toExist();
        }
    });

    it('.bySchema()', function () {
        const schema = {
            name(name) {
                validator.assert(name, "name should not be null");
            },

            phone(phone) {
                validator.assert(phone, "phone should not be null");
            }
        };

        const attrs = {
            name: null,
            phone: null
        };

        try {
            validator.bySchema(schema, attrs);
        } catch (err) {
            expect(err).toExist();
            expect(Object.keys(err.columns).length).toEqual(2);
        }
    });

});
