import {assert, nullable} from 'nagoya';
import fulfillability from '@goodybag/models-order/stamps/fulfillability';
import moment from 'moment-timezone';

export function fulfillabilitySchema(orderParams, {timezone, restaurant}) {
    const {address, date, time, guests} = orderParams;

    const strategyMapping = {
        OpenDay() {
            return {
                message: `vendor is closed on ${formattedWeekday()}s`,
                columns: ['date']
            };
        },

        OpenHours() {
            return {
                message: `vendor is closed at ${formattedTime()} on ${formattedWeekday()}s`,
                columns: ['time']
            };
        },

        ClosedEvents() {
            return {
                message: `vendor is closed during ${formattedDate()}`,
                columns: ['date']
            };
        },

        LeadTimes() {
            return {
                message: `vendor requires more time to process an order of that size`,
                columns: ['date', 'time']
            };
        }
    };

    const fModel = fulfillability({
        timezone,
        datetime: `${date} ${time}`,
        guests,
        restaurant
    });

    const fulfillable = assert(() => fModel.isFulfillable(),
                               () => fModel.why().map(toMessage));

    const addressNotNull =
        nullable('address', address, 'address is required')
            .column('address');

    const dateNotNull =
        nullable('date', date, 'date is required')
            .column('date');

    const timeNotNull =
        nullable('time', time, 'time is required')
            .column('time');

    const guestsNotNull =
        nullable('guests', guests, 'guests is required')
            .column('guests');

    return addressNotNull
        .concat(dateNotNull.concat(timeNotNull).concat(guestsNotNull).and(fulfillable));

    function toMessage(strategyName) {
        if (strategyMapping[strategyName]) {
            return strategyMapping[strategyName]();
        } else {
            return strategyName;
        }
    }

    function formattedTime() {
        return moment.tz(time, 'HH:mm:ss', timezone)
            .format('h:mma');
    }

    function formattedWeekday() {
        return moment(date, 'YYYY-MM-DD')
            .format('dddd');
    }

    function formattedDate() {
        return moment(date, 'YYYY-MM-DD')
            .format('ddd, MMM Do');
    }
}

export function geocodingSchema(address) {
    return assert(() => address.valid, 'failed to geocode address')
        .column('address');
}
