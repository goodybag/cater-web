export class Region {
    static parse(attrs) {
        return new Region(attrs);
    }

    constructor(attrs) {
        const {
            id = null,
            name = null,
            sales_tax = null,
            timezone = null,
            support_phone = null
        } = attrs;

        this.id = id;
        this.name = name;
        this.sales_tax = sales_tax;
        this.timezone = timezone;
        this.support_phone = support_phone;
    }
}
