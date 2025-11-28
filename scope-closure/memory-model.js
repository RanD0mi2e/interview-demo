/**
 * JS Memory Model: Stack vs Heap vs Context
 * 
 * Question: "Aren't simple variables (int, float) stored on the Stack?"
 * 
 * Answer: Yes, BUT with a major exception in JavaScript: **Closures**.
 * 
 * --- 1. The General Rule (Like C/C++/Java) ---
 * - **Stack**: Stores primitive values (numbers, booleans) and references (pointers) to objects.
 * - **Heap**: Stores Objects, Arrays, Functions.
 * 
 * --- 2. The JavaScript Exception (V8 Implementation) ---
 * JavaScript engines (like V8) perform an optimization/analysis called "Scope Analysis".
 * 
 * Case A: Pure Local Variable (Stack)
 * If a variable is declared inside a function and NEVER used by an inner function (closure),
 * V8 stores it on the **Stack**. It is fast and destroyed immediately when the function returns.
 * 
 * Case B: Captured Variable (Heap / Context)
 * If a variable IS used by an inner function, V8 detects this "capture".
 * It moves that variable to a special heap-allocated object called a **"Context"**.
 * Even if it's a primitive number!
 */

function memoryTest() {
    // Case A: Stack Variable
    // 'localNum' is never used by an inner function.
    // It lives on the Stack. Dies when memoryTest returns.
    let localNum = 123; 
    
    // Case B: Heap (Context) Variable
    // 'capturedNum' is used by the returned function.
    // V8 allocates a "Context" object on the Heap and stores 'capturedNum' there.
    let capturedNum = 456;

    // Case C: Heap Object
    // 'obj' reference is on Stack (or Context if captured), 
    // but the { value: 789 } object itself is ALWAYS on the Heap.
    let obj = { value: 789 };

    return function() {
        console.log('I am accessing capturedNum:', capturedNum);
        // Note: I am NOT accessing localNum.
    };
}

const closure = memoryTest();
// At this point:
// - memoryTest has returned.
// - Stack frame for memoryTest is gone.
// - 'localNum' is gone.
// - 'capturedNum' is STILL ALIVE in the Heap (inside the Context).

closure();

/**
 * --- Summary ---
 * 
 * 1. **Logical View (Spec)**: Everything is in an "Environment Record".
 * 2. **Physical View (V8)**:
 *    - **Stack**: Uncaptured primitives.
 *    - **Heap**: Objects + **Captured Primitives** (Context).
 * 
 * So you are right about CS basics, but Closures force JS engines to move 
 * what would normally be stack variables into the Heap so they can survive 
 * the function return.
 */
