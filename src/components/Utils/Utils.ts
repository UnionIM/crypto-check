export const pricePrettier = (price: number) => {
    price = parseFloat(price.toFixed(2));
    const arr = [];
    const str = price.toString();

    for (let i = str.length; i > 0; i -= 3) {
        arr.push(str.substring(i - 3, i));
    }

    return arr.reverse().join(' ');
};
