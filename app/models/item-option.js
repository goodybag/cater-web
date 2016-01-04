// TODO
export class ItemOption {
    static parse(attrs) {
        return new ItemOption(attrs);
    }

    constructor(attrs) {
        Object.assign(this, attrs);
    }
}
