import * as nagoya from 'nagoya';
import fulfillability from '@goodybag/models-order/stamps/fulfillability';

export const schema = {
    address(address, {date, time}) {
        nagoya.assert(this.addressData.valid, 'failed to geocode address');
    },

    time(time, {date, guests}) {
        const fModel = fulfillability({
            timezone: this.timezone,
            datetime: `${date} ${time}`,
            guests,
            restaurant: this.restaurant
        });

        nagoya.assert(fModel.isFulfillable(), fModel.why()[0]);

        // from here we can supply context and match the zip
        // code against the restaurant zips collection.
    }
};

export const validate = nagoya.schema(schema);
