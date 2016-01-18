export class UpdateUserAction {
    constructor({changes}) {
        this.changes = changes;
    }
}

export class UpdateUserRegionAction {
    constructor(region) {
        Object.assign(this, region);
    }
}
