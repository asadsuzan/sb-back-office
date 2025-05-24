/* eslint-disable @typescript-eslint/no-explicit-any */
const flattenPayload = (obj: any, parentKey = '', res: any = {}) => {
  for (const key in obj) {
    const propertyName = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      flattenPayload(obj[key], propertyName, res);
    } else {
      res[propertyName] = obj[key];
    }
  }
  return res;
};

export default flattenPayload;
