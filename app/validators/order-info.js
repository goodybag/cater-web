import * as nagoya from 'nagoya';

export const schema = {
    address(address) {
        const segments = address.split(/,\s*/);
        nagoya.assert(segments.length === 4,
                      'must have a street, city, state and zip code');

        const [street, city, state, zip] = segments;

        nagoya.matches(state, /^[a-z]{2}$/i, 'state must be a two character code');
        nagoya.matches(zip, /^\d+$/i, 'zip must be a number');

        // from here we can supply context and match the zip
        // code against the restaurant zips collection.
    },

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
