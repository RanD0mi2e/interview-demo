function ParentES5(name) {
  this.name = name
}

ParentES5.prototype.sayName = function() {
  console.log(this.name)
}

function ChildES5(name, age) {
  ParentES5.call(this, name)
  this.age = age
}

ChildES5.prototype = Object.create(ParentES5.prototype)
ChildES5.prototype.constructor = ChildES5

ChildES5.prototype.sayAge = function() {
  console.log(this.age)
}

let c = new ChildES5('niko', 18)
c.sayName()
c.sayAge()

class ParentES6 {
  constructor(name) {
    this.name = name
  }

  sayName() {
    console.log(this.name)
  }
}

class ChildES6 extends ParentES6 {
  constructor(name, age) {
    super(name)
    this.age = age
  }

  sayAge() {
    console.log(this.age)
  }
}

let c6 = new ChildES6('monster', 20)
c6.sayName()
c6.sayAge()