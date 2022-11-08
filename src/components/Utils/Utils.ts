export const pricePrettier = (price: number) => {
    price = parseFloat(price.toFixed(2));
    const arr = [];
    const str = price.toString();

    for (let i = str.length; i > 0; i -= 3) {
        arr.push(str.substring(i - 3, i));
    }

    return arr.reverse().join(' ');
};

export const sortArr = (arr: any[], property: string, isDesc: boolean) => {
    return [...arr].sort((a, b) => {
        if (typeof a[property] === 'string') {
            return (
                (a[property].toLowerCase() < b[property].toLowerCase()
                    ? -1
                    : a[property].toLowerCase() > b[property].toLowerCase()
                    ? 1
                    : 0) * (isDesc ? -1 : 1)
            );
        } else {
            return (
                (a[property] < b[property]
                    ? -1
                    : a[property] > b[property]
                    ? 1
                    : 0) * (isDesc ? -1 : 1)
            );
        }
    });
};
