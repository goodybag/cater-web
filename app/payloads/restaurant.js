import {Restaurant} from '../models/restaurant';
import {RestaurantZip} from '../models/restaurant-zip';
import {RestaurantHour} from '../models/restaurant-hour';
import {MenuItem} from '../models/menu-item';

export class RestaurantPayload {
    static parse(attrs) {
        const restaurant = Restaurant.parse(attrs.restaurant);

        const restaurantDeliveryZips = (attrs.restaurantDeliveryZips || [])
            .map(RestaurantZip.parse);

        const restaurantHours = (attrs.restaurantHours || [])
            .map(RestaurantHour.parse);

        const menuItems = (attrs.menuItems || [])
            .map(MenuItem.parse);

        return new RestaurantPayload({
            restaurant,
            restaurantDeliveryZips,
            restaurantHours,
            // restaurantPickupLeadTimes,
            // restaurantDeliveryLeadTimes,
            menuItems
        });
    }

    static parseResp(data) {
        return RestaurantPayload.parse({
            restaurant: data,
            restaurantDeliveryZips: data.delivery_zips,
            restaurantHours: data.hours,
            menuItems: data.items
        });
    }

    constructor(attrs) {
        const {
            restaurant = null,
            restaurantDeliveryZips = [],
            restaurantHours = [],
            restaurantPickupLeadTimes = [],
            restaurantDeliveryLeadTimes = [],
            menuItems = []
        } = attrs;

        this.restaurant = restaurant;
        this.restaurantDeliveryZips = restaurantDeliveryZips;
        this.restaurantHours = restaurantHours;
        this.restaurantPickupLeadTimes = restaurantPickupLeadTimes;
        this.restaurantDeliveryLeadTimes = restaurantDeliveryLeadTimes;
        this.menuItems = menuItems;
    }
}
