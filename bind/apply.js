Function.prototype.myApply = function(context, args) {
  if (typeof this !== 'function') {
    throw new TypeError('myApply调用者必须是函数')
  }

  context = (context === undefined || context === null) ? globalThis : Object(context)

  const fnSymbol = Symbol('fn')
  context[fnSymbol] = this

  let result
  if (args && Array.isArray(args)) {
    result = context[fnSymbol](...args)
  } else {
    result = context[fnSymbol]()
  }

  return result
}

globalThis.a = 1
let obj = {
  a: 2
}

function getA (...args) {
  if (!this) {
    console.log(globalThis.a, args)
  } else {
    console.log(this.a, args)
  }
}

getA()
getA.apply(obj, [1, 2])
getA.myApply(obj, [3, 4])