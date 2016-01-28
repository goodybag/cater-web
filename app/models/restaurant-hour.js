import {Restaurant} from './restaurant';

export class RestaurantHour {
    static parse(attrs) {
        const created_at = new Date(attrs.created_at);

        const restaurant = attrs.restaurant
            ? Restaurant.parse(attrs.restaurant)
            : new Restaurant({id: attrs.restaurant_id});

        return new RestaurantHour({
            ...attrs,
            created_at,
            restaurant
        });
    }

    constructor(attrs) {
        const {
            id = null,
            created_at = null,
            restaurant = null,
            day = null,
            start_time = null,
            end_time = null
        } = attrs;

        this.id = id;
        this.created_at = created_at;
        this.restaurant = restaurant;
        this.day = day;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

export class RestaurantHours {
    constructor(hours) {
        return hours;
    }
}
