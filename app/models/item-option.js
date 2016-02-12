export class ItemOption {
    static parse(attrs) {

        const options = (attrs.options || []).map(Option.parse);

        return new ItemOption({
            ...attrs,
            options
        });
    }

    constructor(attrs) {
        Object.assign(this, attrs);

        const {
            id = null,
            name = null,
            type = null,
            options = null,
            selected_min = null,
            selected_max = null
        } = attrs;

        this.id = id;
        this.name = name;
        this.type = type;
        this.options = options;
        this.selected_min = selected_min;
        this.selected_max = selected_max;
    }
}

export class Option {
    static parse(attrs) {
        return new Option(attrs);
    }

    constructor(attrs) {
        const {
            id = null,
            state = null,
            name = null,
            price = null,
            description = null
        } = attrs;

        this.id = id;
        this.state = state;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
