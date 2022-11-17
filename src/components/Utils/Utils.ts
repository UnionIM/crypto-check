export const pricePrettier = (num: number, intSep = ' ', floatSep = '.') => {
  return new Intl.NumberFormat('en-US')
    .format(num)
    .replaceAll('.', floatSep)
    .replaceAll(',', intSep);
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
        (a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0) *
        (isDesc ? -1 : 1)
      );
    }
  });
};
