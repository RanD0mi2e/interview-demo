/**
 * Closure Mechanism Deep Dive: How does it actually work?
 * 
 * Question: How can an inner function access variables from an outer function 
 * even after the outer function has finished executing and popped off the stack?
 * 
 * Answer: The "Stack" is for execution tracking, but data (Lexical Environments) 
 * lives in the "Heap".
 */

function outer() {
    let outerVar = 'I am from outer';
    
    function inner() {
        console.log(outerVar);
    }
    
    return inner;
}

const myClosure = outer(); // outer() executes and returns.
myClosure(); // "I am from outer"

/**
 * --- Step-by-Step Execution ---
 * 
 * 1. Creation Phase (outer function definition):
 *    - The function `outer` is created.
 *    - It gets an internal property `[[Environment]]` pointing to the Global Environment.
 * 
 * 2. Execution Phase (outer() called):
 *    - A new Execution Context for `outer` is pushed onto the Call Stack.
 *    - A new Lexical Environment (OuterEnv) is created for this execution.
 *    - `outerVar` is stored in OuterEnv.
 *    - `inner` function is defined.
 *    - CRITICAL: `inner` gets an internal `[[Environment]]` property pointing to OuterEnv.
 *      inner.[[Environment]] = OuterEnv
 * 
 * 3. Return Phase (outer() returns):
 *    - `outer` finishes execution.
 *    - The Execution Context of `outer` is popped off the Call Stack.
 *    - NORMALLY: The Garbage Collector (GC) would clean up OuterEnv because nothing refers to it.
 *    - HOWEVER: The returned function `inner` (now assigned to `myClosure`) still exists.
 *    - `myClosure` has `[[Environment]]` pointing to OuterEnv.
 *    - Because there is a live reference to OuterEnv, the GC does NOT clean it up.
 *    - OuterEnv (containing `outerVar`) remains alive in the Heap.
 * 
 * 4. Execution Phase (myClosure() called):
 *    - A new Execution Context for `inner` is pushed onto the stack.
 *    - A new Lexical Environment (InnerEnv) is created.
 *    - InnerEnv's parent is set to `inner.[[Environment]]` (which is OuterEnv).
 *    - When `console.log(outerVar)` runs, JS looks in InnerEnv -> not found.
 *    - It goes up the chain to the parent (OuterEnv) -> found!
 * 
 * --- Summary ---
 * 
 * - **Stack**: Tracks "where we are" in the code. Functions push/pop here.
 * - **Heap**: Stores objects and Lexical Environments (variables).
 * - **Closure**: A function instance + its `[[Environment]]` reference.
 * - **Persistence**: The outer scope stays in the Heap because the inner function holds a reference to it.
 */
