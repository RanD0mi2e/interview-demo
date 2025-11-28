/**
 * 1. 执行上下文与调用栈 (Execution Context & Call Stack)
 */
function first() {
    console.log('Inside first function');
    second();
    console.log('Again inside first function');
}

function second() {
    console.log('Inside second function');
}

console.log('Start');
first();
console.log('End');

/**
 * 2. 变量提升 (Hoisting)
 */
console.log(varVariable); // undefined
var varVariable = 'I am var';

// console.log(letVariable); // ReferenceError: Cannot access 'letVariable' before initialization
let letVariable = 'I am let';

function hoistingFunc() {
    console.log('Function declaration is hoisted');
}
hoistingFunc();

/**
 * 3. 暂时性死区 (TDZ)
 */
{
    // TDZ starts here
    // console.log(tdzVar); // ReferenceError
    let tdzVar = 'I am in TDZ until this line'; // TDZ ends here
    console.log(tdzVar);
}

/**
 * 4. This 绑定规则
 */

// 4.1 默认绑定 (Default Binding)
function defaultBinding() {
    console.log(this); // In non-strict mode: global object (window/global), strict mode: undefined
}
defaultBinding();

// 4.2 隐式绑定 (Implicit Binding)
const obj = {
    name: 'Alice',
    greet: function() {
        console.log(`Hello, ${this.name}`);
    }
};
obj.greet(); // Alice

// 4.3 显式绑定 (Explicit Binding: call, apply, bind)
function sayHello() {
    console.log(`Hello, ${this.name}`);
}
const person = { name: 'Bob' };
sayHello.call(person); // Hello, Bob

// 4.4 new 绑定 (New Binding)
function Person(name) {
    this.name = name;
}
const charlie = new Person('Charlie');
console.log(charlie.name); // Charlie

// 4.5 箭头函数 (Arrow Functions) - Lexical this
const arrowObj = {
    name: 'Dave',
    greet: () => {
        console.log(`Hello, ${this.name}`); // inherits this from outer scope (likely global/undefined here)
    },
    delayedGreet: function() {
        setTimeout(() => {
            console.log(`Hello, ${this.name}`); // inherits this from delayedGreet (arrowObj)
        }, 100);
    }
};
arrowObj.greet(); 
arrowObj.delayedGreet();
