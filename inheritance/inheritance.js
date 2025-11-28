/**
 * JavaScript Inheritance Demo
 * 
 * 1. __proto__ vs prototype
 * - prototype: A property of a function (constructor). It is the object that will become the prototype of instances created with that constructor.
 * - __proto__: A property of an object (instance). It points to the prototype of the constructor that created the object.
 * 
 * Relationship: instance.__proto__ === Constructor.prototype
 */

console.log('--- 1. __proto__ vs prototype ---');
function Animal(name) {
    this.name = name;
}
Animal.prototype.eat = function() {
    console.log(`${this.name} is eating.`);
};

const dog = new Animal('Dog');
console.log('dog.__proto__ === Animal.prototype:', dog.__proto__ === Animal.prototype); // true
console.log('Animal.prototype.constructor === Animal:', Animal.prototype.constructor === Animal); // true


/**
 * 2. ES5 Inheritance (Parasitic Combination Inheritance)
 * This is considered the standard way to implement inheritance in ES5.
 */
console.log('\n--- 2. ES5 Inheritance ---');

function ParentES5(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}

ParentES5.prototype.sayName = function() {
    console.log('ES5 Parent name:', this.name);
};

function ChildES5(name, age) {
    // Inherit properties
    ParentES5.call(this, name); 
    this.age = age;
}

// Inherit methods
// Object.create() creates a new object with the specified prototype object and properties.
ChildES5.prototype = Object.create(ParentES5.prototype);
// Fix constructor pointer
ChildES5.prototype.constructor = ChildES5;

ChildES5.prototype.sayAge = function() {
    console.log('ES5 Child age:', this.age);
};

const childES5 = new ChildES5('ES5 Child', 10);
childES5.sayName();
childES5.sayAge();
console.log('childES5 instanceof ChildES5:', childES5 instanceof ChildES5);
console.log('childES5 instanceof ParentES5:', childES5 instanceof ParentES5);


/**
 * 3. ES6 Inheritance (Class)
 * Syntactic sugar over the prototype-based inheritance.
 */
console.log('\n--- 3. ES6 Inheritance ---');

class ParentES6 {
    constructor(name) {
        this.name = name;
        this.colors = ['red', 'blue'];
    }

    sayName() {
        console.log('ES6 Parent name:', this.name);
    }
}

class ChildES6 extends ParentES6 {
    constructor(name, age) {
        super(name); // Calls ParentES6 constructor, must be before 'this'
        this.age = age;
    }

    sayAge() {
        console.log('ES6 Child age:', this.age);
    }
}

const childES6 = new ChildES6('ES6 Child', 5);
childES6.sayName();
childES6.sayAge();
console.log('childES6 instanceof ChildES6:', childES6 instanceof ChildES6);
console.log('childES6 instanceof ParentES6:', childES6 instanceof ParentES6);
