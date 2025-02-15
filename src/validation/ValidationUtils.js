class ValidationUtils {
  constructor() {
    this.customPatterns = new Map();
  }

  // String validations
  isString(value) {
    return typeof value === "string";
  }

  minLength(value, min) {
    return this.isString(value) && value.length >= min;
  }

  maxLength(value, max) {
    return this.isString(value) && value.length <= max;
  }

  exactLength(value, length) {
    return this.isString(value) && value.length === length;
  }

  matches(value, pattern) {
    return this.isString(value) && pattern.test(value);
  }

  // Number validations
  isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  }

  isInteger(value) {
    return Number.isInteger(value);
  }

  min(value, min) {
    return this.isNumber(value) && value >= min;
  }

  max(value, max) {
    return this.isNumber(value) && value <= max;
  }

  between(value, min, max) {
    return this.isNumber(value) && value >= min && value <= max;
  }

  // Array validations
  isArray(value) {
    return Array.isArray(value);
  }

  arrayMinLength(value, min) {
    return this.isArray(value) && value.length >= min;
  }

  arrayMaxLength(value, max) {
    return this.isArray(value) && value.length <= max;
  }

  // Object validations
  isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  hasProperty(obj, prop) {
    return this.isObject(obj) && obj.hasOwnProperty(prop);
  }

  // Common validations
  isEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.matches(value, emailPattern);
  }

  isURL(value) {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator
    );
    return this.matches(value, urlPattern);
  }

  isDate(value) {
    if (value instanceof Date) return true;
    if (!this.isString(value)) return false;
    const date = new Date(value);
    return date instanceof Date && !isNaN(date);
  }

  // Custom pattern management
  addPattern(name, pattern) {
    if (!(pattern instanceof RegExp)) {
      throw new Error("Pattern must be a RegExp instance");
    }
    this.customPatterns.set(name, pattern);
  }

  removePattern(name) {
    return this.customPatterns.delete(name);
  }

  matchesPattern(value, patternName) {
    const pattern = this.customPatterns.get(patternName);
    if (!pattern) {
      throw new Error(`Pattern "${patternName}" not found`);
    }
    return this.matches(value, pattern);
  }

  // Schema validation
  validateSchema(data, schema) {
    const errors = [];

    // Schema'daki tüm alanların data'da var olup olmadığını kontrol et
    for (const field of Object.keys(schema)) {
      if (!(field in data)) {
        errors.push({
          field,
          rule: "required",
          message: `${field} is missing from data`,
        });
      }
    }

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field];

      for (const [rule, param] of Object.entries(rules)) {
        let isValid = true;

        switch (rule) {
          case "required":
            isValid = value !== undefined && value !== null && value !== "";
            break;
          case "type":
            isValid = typeof value === param;
            break;
          case "minLength":
            isValid = this.minLength(value, param);
            break;
          case "maxLength":
            isValid = this.maxLength(value, param);
            break;
          case "min":
            isValid = this.min(value, param);
            break;
          case "max":
            isValid = this.max(value, param);
            break;
          case "pattern":
            isValid = this.matches(value, param);
            break;
          case "email":
            isValid = this.isEmail(value);
            break;
          case "url":
            isValid = this.isURL(value);
            break;
          case "date":
            isValid = this.isDate(value);
            break;
        }

        if (!isValid) {
          const messages = {
            required: `${field} is required`,
            minLength: `${field} must be at least ${param} characters`,
            maxLength: `${field} must be at most ${param} characters`,
            min: `${field} must be greater than or equal to ${param}`,
            max: `${field} must be less than or equal to ${param}`,
            email: `${field} must be a valid email address`,
            url: `${field} must be a valid URL`,
            date: `${field} must be a valid date`,
            type: `${field} must be of type ${param}`,
          };

          errors.push({
            field,
            rule,
            message: messages[rule] || `${field} failed ${rule} validation`,
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export default ValidationUtils;
