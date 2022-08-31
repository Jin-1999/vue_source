export const isObject = (value) => {
  return typeof value === "object" && value !== null;
};

export const isFunction = (value) => {
  return typeof value === "function";
};

export const isString = () => {};

export const isArray = (value) => Array.isArray(value);
