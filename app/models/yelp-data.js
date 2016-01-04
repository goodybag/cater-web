export class YelpData {
    static parse(attrs) {
        const reviews = (attrs.reviews || []).map(YelpReview.parse);

        return new YelpData({...attrs, reviews});
    }

    constructor(attrs) {
        const {
            url = null,
            rating = null,
            reviews = []
        } = attrs;

        this.url = url;
        this.rating = rating;
        this.reviews = reviews;
    }
}

export class YelpReview {
    static parse(attrs) {
        const user = YelpReviewer.parse(attrs.user);
        const time_created = new Date(attrs.time_created);

        return new YelpReview({...attrs, time_created, user});
    }

    constructor(attrs) {
        const {
            id = null,
            rating = null,
            excerpt = null,
            time_created = null,
            user = {}
        } = attrs;

        this.id = id;
        this.rating = rating;
        this.excerpt = excerpt;
        this.time_created = time_created;
        this.user = user;
    }
}

export class YelpReviewer {
    static parse(attrs) {
        return new YelpReviewer(attrs);
    }

    cosntructor(attrs) {
        const {
            id = null,
            name = null,
            image_url = null
        } = attrs;

        this.id = id;
        this.name = name;
        this.image_url = image_url;
    }
}
