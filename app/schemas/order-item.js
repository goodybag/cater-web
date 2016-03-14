import {assert, nullable, concat} from 'nagoya';

// TODO
const msg = 'If you\'re reading this then we forgot to write the copy for this error message';

export function orderItemSchema(menuItem, orderItem) {
    const {quantity, options_sets} = orderItem;

    const minimumQuantity = assert(
        () => quantity >= menuItem.min_qty,
        () => `This item requires you to order a minimum of ${menuItem.min_qty}`
    ).column('quantity');

    const optionsSetsValid = concat(options_sets.map(verifyChoice));

    return minimumQuantity.concat(optionsSetsValid);

    function verifyChoice(optionSet) {
        return assert(check, `You need to select a minimum of ${optionSet.selected_min} choice(s) for this option`)
            .column(`option_set:${optionSet.id}`);

        function check() {
            const selected = optionSet.options.filter(c => c.state).length;

            return selected >= optionSet.selected_min;;
        }
    }
}
