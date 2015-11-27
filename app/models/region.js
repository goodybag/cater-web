export class Region {
    static parse(attrs) {
        return new Region(attrs);
    }

    constructor(attrs) {
        const {
            id = null,
            name = null
        } = attrs;

        this.id = id;
        this.name = name;
    }
}
