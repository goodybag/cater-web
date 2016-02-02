import {Restaurant} from './restaurant';
import {User} from './user';
import moment from 'moment-timezone';

export class Order {
    static parse(attrs) {
        const created_at = new Date(attrs.created_at);

        const restaurant = attrs.restaurant
            ? Restaurant.parse(attrs.restaurant)
            : new Restaurant({id: attrs.restaurant_id});

        const user = attrs.user
            ? new User(attrs.user, {parse: true}) // TODO
            : new User({id: attrs.user_id});

        let tempDateTime = new Date(moment.tz(attrs.datetime, attrs.timezone));

        if(isNaN(tempDateTime.getTime())) {
            tempDateTime = new Date();
        }

        const datetime = tempDateTime;

        const deadline = new Date(moment.tz(attrs.deadline, attrs.timezone));

        return new Order({
            ...attrs,
            created_at,
            restaurant,
            user,
            datetime,
            deadline
        });
    }

    constructor(attrs) {
        const {
            id = null,
            created_at = null,
            user = null,
            restaurant = null,
            street = null,
            city = null,
            state = null,
            zip = null,
            phone = null,
            notes = null,
            datetime = null,
            timezone = null,
            guests = null,
            review_token = null,
            tip = null,
            name = null,
            street2 = null,
            delivery_instructions = null,
            tip_percent = null,
            status = null,
            cut = null,
            payment_status = null,
            uuid = null,
            edit_token = null,
            type = null,
            sub_total = null,
            sales_tax = null,
            total = null,
            delivery_fee = null,
            deadline = null
        } = attrs;

        this.id = id;
        this.created_at = created_at;
        this.user = user;
        this.restaurant = restaurant;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.notes = notes;
        this.datetime = datetime;
        this.timezone = timezone;
        this.guests = guests;
        this.review_token = review_token;
        this.tip = tip;
        this.name = name;
        this.street2 = street2;
        this.delivery_instructions = delivery_instructions;
        this.tip_percent = tip_percent;
        this.status = status;
        this.cut = cut;
        this.payment_status = payment_status;
        this.uuid = uuid;
        this.edit_token = edit_token;
        this.type = type;
        this.sub_total = sub_total;
        this.sales_tax = sales_tax;
        this.total = total;
        this.delivery_fee = delivery_fee;
        this.deadline = deadline;
    }

    displayAddress() {
        const {street, city, state, zip} = this;

        return `${street}, ${city}, ${state}, ${zip}`;
    }

    updateStatus(status) {
        this.status = status;
    }
}
