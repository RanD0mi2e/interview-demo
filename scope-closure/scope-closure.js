/**
 * JavaScript Scope and Closure Demo
 */

console.log('--- 1. Scope (Global, Function, Block) ---');

// Global Scope
const globalVar = 'I am global';

function scopeTest() {
    // Function Scope
    const functionVar = 'I am function scoped';
    
    if (true) {
        // Block Scope (let/const)
        const blockVar = 'I am block scoped';
        var functionScopedVar = 'I am function scoped (var)'; // var ignores block scope
        console.log('Inside block:', blockVar);
    }
    
    // console.log(blockVar); // Error: blockVar is not defined
    console.log('Inside function:', functionScopedVar); // Accessible
}

scopeTest();
// console.log(functionVar); // Error: functionVar is not defined


console.log('\n--- 2. Closure Basic Example ---');
/**
 * Closure: A function bundled together (enclosed) with references to its surrounding state (the lexical environment).
 * In other words, a closure gives you access to an outer function's scope from an inner function.
 */

function createCounter() {
    let count = 0; // Private variable via closure
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log('Counter:', counter()); // 1
console.log('Counter:', counter()); // 2
console.log('Counter:', counter()); // 3


console.log('\n--- 3. Module Pattern (Encapsulation) ---');
/**
 * Practical Application: Modularization
 * Hiding implementation details and exposing a public API.
 */

const UserModule = (function() {
    // Private state
    const users = [];

    function privateHelper() {
        console.log('Private helper called');
    }

    return {
        addUser: function(name) {
            users.push(name);
            privateHelper();
            console.log(`${name} added.`);
        },
        getUsers: function() {
            return [...users]; // Return copy to protect private array
        }
    };
})();

UserModule.addUser('Alice');
UserModule.addUser('Bob');
console.log('Users:', UserModule.getUsers());
// console.log(UserModule.users); // undefined (private)


console.log('\n--- 4. Currying ---');
/**
 * Practical Application: Currying
 * Transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.
 */

// Normal function
function add(a, b, c) {
    return a + b + c;
}

// Curried version
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log('Normal add(1, 2, 3):', add(1, 2, 3));
console.log('Curried add(1)(2)(3):', curriedAdd(1)(2)(3));

// Practical use: Parameter reuse
const add5 = curriedAdd(5); // Fix first parameter
console.log('add5(10)(20):', add5(10)(20)); // 35


console.log('\n--- 5. Memory Leaks ---');
/**
 * Potential Memory Leaks with Closures:
 * 
 * 1. Unintentional Global Variables:
 *    Assigning to an undeclared variable creates a global variable, which stays in memory.
 *    function foo() { bar = "global"; }
 * 
 * 2. Forgotten Timers or Callbacks:
 *    setInterval(() => { ... uses closure ... }, 1000);
 *    If not cleared, the closure keeps references alive.
 * 
 * 3. DOM References:
 *    Keeping references to removed DOM elements inside closures.
 * 
 * 4. Closures holding large objects:
 *    If a closure keeps a reference to a large object in its outer scope, that object cannot be garbage collected
 *    as long as the closure exists.
 */

function heavyOperation() {
    const hugeData = new Array(1000000).fill('data');
    
    return function() {
        // Even if we don't use hugeData here, some JS engines might keep it 
        // if it's in the lexical scope and shared with other closures that might use it.
        // However, modern engines are smart enough to optimize unused variables (V8).
        // But if used:
        console.log('Huge data length:', hugeData.length);
    };
}

const heavyClosure = heavyOperation();
heavyClosure();
// hugeData is kept in memory as long as heavyClosure exists.
// To fix: heavyClosure = null; when done.
