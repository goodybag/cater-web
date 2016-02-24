export class OrderParams {
    static fromOrder(order) {
        const {street, city, state, zip, datetime, guests} = order;

        const address = `${street}, ${city}, ${state}, ${zip}`;
        const [date, time] = datetime.split(' ', 2);

        return new OrderParams({address, date, time, guests});
    }

    constructor(attrs = {}) {
        const {
            address = null,
            date = null,
            time = null,
            guests = null
        } = attrs;

        this.address = address;
        this.date = date;
        this.time = time;
        this.guests = guests;
    }
}
