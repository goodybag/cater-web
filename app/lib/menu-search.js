import {chain} from 'lodash';

/**
 * Helper/logic class for the algorithm behind
 * searching menu items. It currently uses
 * `Item#matchSearchTerm` which matches by
 * fuzzysearch.
 */
export class MenuSearchTerm {
    constructor(searchTermText) {
        this.searchTermText = searchTermText;
    }

    groupMenu(categories, items, categoryMenu) {
        const {searchTermText} = this;

        return chain(items)
            .filter(bySearchTerm)
            .groupBy(itemCategory)
            .map(toSection)
            .compact()
            .filter(specifiedMenu)
            .value();

        function bySearchTerm(item) {
            return item.matchSearchTerm(searchTermText);
        }

        function specifiedMenu({category}) {
            return category.hasMenu(categoryMenu);
        }

        function itemCategory(item) {
            return item.category.id;
        }

        function toSection(items, categoryId) {
            const category = categories.find(c => c.id === +categoryId);

            if (category) {
                return {category, items};
            }
        }
    }
}
