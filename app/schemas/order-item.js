import {assert, nullable, concat} from 'nagoya';

// TODO
const msg = 'If you\'re reading this then we forgot to write the copy for this error message';

export function orderItemSchema(menuItem, orderItem) {
    const {quantity, options_sets} = orderItem;

    const minimumQuantity = assert(
        () => quantity >= menuItem.min_qty,
        () => `This item requires you to order a minimum of ${menuItem.min_qty}`
    );

    const optionsSetsValid = concat(options_sets.map(verifyChoice));

    return minimumQuantity.concat(optionsSetsValid);

    function verifyChoice(optionSet, index) {
        return assert(check, `You need to select a minimum of ${optionSet.selected_min} choice(s)`)
            .column(`options_sets[${index}]`);

        function check() {
            const selected = optionSet.options.filter(c => c.state).length;

            return selected >= optionSet.selected_min;;
        }
    }
}
