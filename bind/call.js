Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('myCall调用者必须是函数!')
  }

  context = (context === undefined || context === null) ? globalThis : Object(context)

  const fnSymbol = Symbol('fn')
  context[fnSymbol] = this

  const result = context[fnSymbol](...args)
  delete context[fnSymbol]

  return result
}

globalThis.a = 1
let obj = {
  a: 2
}

function getA () {
  if (!this) {
    console.log(globalThis.a)
  } else {
    console.log(this.a)
  }
}

getA()
getA.call(obj)
getA.myCall(obj)


