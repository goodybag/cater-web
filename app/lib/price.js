export function formatPrice(price) {
    const cents = price % 100;
    const dollars = (price - cents) / 100;

    return `$${dollars}.${cents}`;
}
