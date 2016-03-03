import {assert, nullable} from 'nagoya';
import fulfillability from '@goodybag/models-order/stamps/fulfillability';
import moment from 'moment-timezone';

export function fulfillabilitySchema(orderParams, context) {
    const {address, date, time, guests} = orderParams;
    const {now, timezone, restaurant} = context;

    const datetime = `${date} ${time}`;
    const mDatetime = moment(datetime, 'YYYY-MM-DD HH:mm:ss');

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

    const fModel = fulfillability({timezone, datetime, guests, restaurant});

    const future = assert(() => mDatetime.isAfter(now),
                          'provided date & time must be in the future')
        .column('date', 'time');

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

    const datetimePresent = dateNotNull.concat(timeNotNull).concat(guestsNotNull);

    const datetimeValidity = datetimePresent.and(future).and(fulfillable);

    return addressNotNull.concat(datetimeValidity);

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

export function deadlineSchema(order, now) {
    return assert(() => +now < +new Date(order.deadline),
                  [
                      'Looks like time is up to place this order!',
                      'Change the time if you still want to place it.'
                  ].join(' '))
        .column('date', 'time');
}
