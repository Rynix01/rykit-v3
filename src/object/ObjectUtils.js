class ObjectUtils {
  // Key silme
  deleteKey(object, key) {
    const newObject = { ...object };
    delete newObject[key];
    return newObject;
  }

  // Key ekleme
  addKey(object, key, value) {
    return { ...object, [key]: value };
  }

  // Shallow copy
  shallowCopy(object) {
    return { ...object };
  }

  // Deep copy
  deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
  }

  // Deep equality check
  deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every((key) => this.deepEqual(obj1[key], obj2[key]));
  }

  // Query params extraction
  getQueryParams(url) {
    const params = {};
    const queryString = url.split("?")[1];
    if (!queryString) return params;
    queryString.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      params[key] = decodeURIComponent(value);
    });
    return params;
  }

  // Object merging with deep copy
  mergeObjects(...objects) {
    return objects.reduce((result, obj) => {
      return this.deepMerge(result, obj);
    }, {});
  }

  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  // Object flattening
  flattenObject(obj, prefix = "") {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? prefix + "." : "";
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        Object.assign(acc, this.flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  }
}

export default ObjectUtils;
