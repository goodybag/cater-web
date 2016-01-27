import {Restaurant} from './restaurant';

export class RestaurantZip {
    static parse(attrs) {
        const created_at = new Date(attrs.created_at);

        const restaurant = attrs.restaurant
            ? Restaurant.parse(attrs.restaurant)
            : new Restaurant({id: attrs.restaurant_id});

        return new RestaurantZip({
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
            zip = null,
            fee = null
        } = attrs;

        this.id = id;
        this.created_at = created_at;
        this.restaurant = restaurant;
        this.zip = zip;
        this.fee = fee;
    }
}

export class RestaurantDeliveryZips {
    constructor(zips) {
        return zips;
    }
}
