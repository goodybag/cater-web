import {Model} from 'backbone';

export class Category extends Model {
    static schema = {
        type: 'object',
        required: ['order', 'name', 'menus'],
        properties: {
            order: {
                type: 'string',
                minimum: 0
            },

            name: {
                type: 'string'
            },

            description: {
                type: ['string', null]
            },

            menus: { // meaning what 'menus' the category belongs in
                type: 'array',
                uniqueItems: true,
                maxLength: 2,
                minLength: 1,
                items: {
                    type: 'string',
                    pattern: /^(?:Group|Individual)$/
                }
            }
        }
    }

    validate(attrs) {
        if (!this.validator.validate(attrs, Category.schema)) {
            return this.validator.getLastError();
        }
    }
}
