const isType = type => input => typeof input === type;
export const isString = isType("string");
export const isFunction = isType("function");
export const isElement = input => input instanceof Element;
export const isArray = Array.isArray;
export const isObject = input => input && isType("object");
export const isDefined = input => input !== void 0;

const node = document.createElement("div");
export function createNode (htmlString) {

  node.innerHTML = htmlString.trim();
  return node.firstChild;
}

export function deepFreeze(object) {

  var propNames = Object.getOwnPropertyNames(object);

  for (let name of propNames) {

    let value = object[name];

    try {

      object[name] = value
    } catch (e) { /* the prop is not writable */}
          
    value && typeof value === "object" ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
}
