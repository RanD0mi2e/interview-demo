export function deepClone(target, map = new WeakMap()) {
  if (target === null || typeof target !== "object") {
    return target;
  }

  const constructor = target.constructor

  if (target instanceof Date) {
    return new constructor(target)
  }

  if (target instanceof RegExp) {
    return new constructor(target)
  }

  if (map.has(target)) {
    return map.get(target)
  }

  const clone = new constructor()
  map.set(target, clone)

  if (clone instanceof Map) {
    target.forEach((value, key) => {
      clone.set(key, deepClone(value, map))
    })
    return clone
  }

  if (clone instanceof Set) {
    target.forEach((item) => {
      clone.add(deepClone(item, map))
    })
    return clone
  }

  const keys = Reflect.ownKeys(target)
  keys.forEach((key) => {
    clone[key] = deepClone(target[key], map)
  })

  return clone
}
