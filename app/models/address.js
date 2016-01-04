export class Address {
    static parse(attrs) {
        return new Address(attrs);
    }

    constructor(attrs) {
        const {
            id
        } = attrs;

        this.id = id;
    }
}
