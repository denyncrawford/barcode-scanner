
const isValid = (validKey: RegExp, key:string) => validKey.test(key);

const isEndKey = (endKeys: string | Array<string>, key: string) => {
  return typeof endKeys === 'string' ? key.includes(endKeys) : endKeys.some((k) =>key.includes(k));
}

const formatKey = (uppercase: boolean, key:string) => {
  return !uppercase ? key.toLowerCase() : key;
}

export {
  isValid,
  isEndKey,
  formatKey
}