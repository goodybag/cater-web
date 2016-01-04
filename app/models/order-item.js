import {ItemOption} from './item-option';
import {Order} from './order';
import {MenuItem} from './menu-item';

export class OrderItem {
    static parse(attrs) {
        const created_at = new Date(attrs.created_at);

        const item = attrs.item
            ? MenuItem.parse(attrs.item)
            : new MenuItem({id: attrs.item_id});

        const order = attrs.order
            ? Order.parse(attrs.order)
            : new Order({id: attrs.order_id});

        const option_sets = (attrs.option_sets || []).map(ItemOption.parse);

        return new OrderItem({
            ...attrs,
            created_at,
            item,
            order,
            option_sets
        });
    }

    constructor(attrs) {
        const {
            id = null,
            created_at = null,
            item = null,
            order = null,
            quantity = null,
            name = null,
            description = null,
            price = null,
            feeds_min = null,
            feeds_max = null,
            notes = null,
            option_sets = null,
            recipient = null,
            sub_total = null,
            min_qty = null
        } = attrs;

        this.id = id;
        this.created_at = created_at;
        this.item = item;
        this.order = order;
        this.quantity = quantity;
        this.name = name;
        this.description = description;
        this.price = price;
        this.feeds_min = feeds_min;
        this.feeds_max = feeds_max;
        this.notes = notes;
        this.option_sets = option_sets;
        this.recipient = recipient;
        this.sub_total = sub_total;
        this.min_qty = min_qty;
    }
}
