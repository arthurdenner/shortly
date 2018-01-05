const createHash = itemCount => {
  let hashDigits = [];
  // dividend is a unique integer (in our case, number of links)
  let dividend = itemCount + 1;
  let remainder = 0;

  while (dividend > 0) {
    remainder = dividend % 62;
    dividend = Math.floor(dividend / 62);
    hashDigits.unshift(remainder);
  }

  console.log(hashDigits);

  // prettier-ignore
  const alphabetArray = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.split('');

  // Convert hashDigits to base62 representation
  let hashString = '';
  let i = 0;

  while (hashDigits.length > i) {
    hashString += alphabetArray[hashDigits[i]];
    i++;
  }

  return hashString;
};

export default createHash;
