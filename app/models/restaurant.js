import {Address} from './address';
import {YelpData} from './yelp-data';
import {Region} from './region';

export class Restaurant {
    static parse(attrs) {
        const address = attrs.address
            ? Address.parse(attrs.address)
            : new Address({id: attrs.address_id});

        const yelp_data = new YelpData(attrs.yelp_data || {});

        const region = attrs.region
            ? Region.parse(attrs.region)
            : new Region({id: attrs.region_id});

        const created_at = new Date(attrs.created_at);

        return new Restaurant({
            ...attrs, address, yelp_data, region, created_at
        });
    }

    constructor(attrs) {
        const {
            id = null,
            created_at = null,
            name = null,
            street = null,
            city = null,
            state = null,
            zip = null,
            minimum_order = null,
            price = null,
            cuisine = [],
            is_hidden = null,
            address_id = null,
            address = null,
            logo_url = null,
            logo_mono_url = null,
            street2 = null,
            delivery_instructions = null,
            yelp_business_id = null,
            yelp_data = null,
            description = null,
            websites = [],
            display_phone = null,
            emails = [],
            gb_fee = null,
            region_id = null,
            region = null,
            cover_photo_url = null,
            supported_order_types = null
        } = attrs;

        this.id = id;
        this.created_at = created_at;
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.minimum_order = minimum_order;
        this.price = price;
        this.cuisine = cuisine;
        this.is_hidden = is_hidden;
        this.address = address;
        this.logo_url = logo_url;
        this.logo_mono_url = logo_mono_url;
        this.street2 = street2;
        this.delivery_instructions = delivery_instructions;
        this.yelp_business_id = yelp_business_id;
        this.yelp_data = yelp_data;
        this.description = description;
        this.websites = websites;
        this.display_phone = display_phone;
        this.emails = emails;
        this.gb_fee = gb_fee;
        this.region = region;
        this.cover_photo_url = cover_photo_url;
        this.supported_order_types = supported_order_types;
    }
}
