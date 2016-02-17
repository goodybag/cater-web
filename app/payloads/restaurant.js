import {Restaurant} from '../models/restaurant';
import {RestaurantZip} from '../models/restaurant-zip';
import {RestaurantHour} from '../models/restaurant-hour';
import {MenuItem} from '../models/menu-item';

export class RestaurantPayload {
    static parse(attrs) {
        const restaurant = Restaurant.parse(attrs.restaurant);

        const restaurantDeliveryZips = (attrs.restaurantDeliveryZips || [])
            .map(RestaurantZip.parse);

        const restaurantPickupHours = (attrs.restaurantPickupHours || [])
            .map(RestaurantHour.parse);

        const restaurantDeliveryHours = (attrs.restaurantDeliveryHours || [])
            .map(RestaurantHour.parse);

        const restaurantPickupLeadTimes = attrs.restaurantPickupLeadTimes || [];

        const restaurantDeliveryLeadTimes = attrs.restaurantDeliveryLeadTimes || [];

        const menuItems = (attrs.menuItems || [])
            .map(MenuItem.parse);

        return new RestaurantPayload({
            restaurant,
            restaurantDeliveryZips,
            restaurantPickupHours,
            restaurantPickupLeadTimes,
            restaurantDeliveryLeadTimes,
            restaurantDeliveryHours,
            menuItems
        });
    }

    static parseResp(data) {
        return RestaurantPayload.parse({
            restaurant: data,
            restaurantDeliveryZips: data.delivery_zips,
            restaurantPickupHours: data.hours,
            restaurantDeliveryHours: data.delivery_times,
            restaurantPickupLeadTimes: data.pickup_lead_times,
            restaurantDeliveryLeadTimes: data.pickup_lead_times,
            menuItems: data.items
        });
    }

    constructor(attrs) {
        const {
            restaurant = null,
            restaurantDeliveryZips = [],
            restaurantPickupHours = [],
            restaurantDeliveryHours = [],
            restaurantPickupLeadTimes = [],
            restaurantDeliveryLeadTimes = [],
            menuItems = []
        } = attrs;

        this.restaurant = restaurant;
        this.restaurantDeliveryZips = restaurantDeliveryZips;
        this.restaurantPickupHours = restaurantPickupHours;
        this.restaurantDeliveryHours = restaurantDeliveryHours;
        this.restaurantPickupLeadTimes = restaurantPickupLeadTimes;
        this.restaurantDeliveryLeadTimes = restaurantDeliveryLeadTimes;
        this.menuItems = menuItems;
    }
}
