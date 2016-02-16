import * as nagoya from 'nagoya';

export const schema = {
    date(date) {
        nagoya.matches(date, /^\d{4}-\d\d-\d\d$/, 'must be a valid date');
    },

    time(time) {
        nagoya.matches(time, /^\d\d:\d\d:\d\d$/, 'must be a valid time');
    },

    guests(guests) {
        nagoya.isNumber(guests, 'must be a number');
        nagoya.assert(guests >= 1, 'must be at least 1');
    }

    // we can supply times to validate against fulfillability models
};

export const validate = nagoya.schema(schema, {
    nullableColumns: true
});
