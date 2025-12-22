Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('myBind caller must be Function')
  }

  let self = this
  function fbound(...args2) {
    let isNew = this instanceof fbound
    return self.apply(
      isNew ? this : context,
      [...args, ...args2]
    )
  }

  if (self.prototype) {
    fbound.prototype = Object.create(self.prototype)
  }

  return fbound
}

// test
const person = {
  name: 'Alice'
}

function sayHi (age, city) {
  console.log(`Hi~, my name is ${this.name}, Age: ${age}, City: ${city}`)
}

let bindingHi = sayHi.myBind(person, '18')
bindingHi('Peking')

// 'new' test
function Animal(name) {
  this.name = name
}

const BoundAnimal = Animal.bind(person)
const dog = new BoundAnimal('doggy')
console.log(dog.name)