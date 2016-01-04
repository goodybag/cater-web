import {Region} from './region';

export class User {
    static parse(attrs) {
        const created_at = new Date(attrs.created_at);

        const region = attrs.region
            ? Region.parse(attrs.region)
            : new Region({id: attrs.region_id});

        return new User({
            ...attrs,
            created_at,
            region
        });
    }

    constructor(attrs) {
        const {
            id = null,
            created_at = null,
            email = null,
            organization = null,
            name = null,
            points = null,
            region = null,
            groups = null
        } = attrs;

        this.id = id;
        this.created_at = created_at;
        this.email = email;
        this.organization = organization;
        this.name = name;
        this.points = points;
        this.region = region;
        this.groups = groups;
    }

    isAdmin() {
        return this.groups.some(function(groupObj) {
            return groupObj.group === 'admin';
        });
    }
}
