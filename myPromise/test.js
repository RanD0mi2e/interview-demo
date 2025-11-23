const MyPromise = require("./index");

console.log("--- Test 1: Basic Resolve ---");
new MyPromise((resolve, reject) => {
  resolve("Success");
}).then((value) => {
  console.log("1. Resolved with:", value);
});

console.log("--- Test 2: Basic Reject ---");
new MyPromise((resolve, reject) => {
  reject("Error");
}).catch((reason) => {
  console.log("2. Rejected with:", reason);
});

console.log("--- Test 3: Async Resolve ---");
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Async Success");
  }, 100);
}).then((value) => {
  console.log("3. Async Resolved with:", value);
});

console.log("--- Test 4: Chaining ---");
new MyPromise((resolve) => {
  resolve(1);
})
  .then((value) => {
    console.log("4.1 Chain step 1:", value);
    return value + 1;
  })
  .then((value) => {
    console.log("4.2 Chain step 2:", value);
    return new MyPromise((resolve) => resolve(value + 1));
  })
  .then((value) => {
    console.log("4.3 Chain step 3 (promise):", value);
  });

console.log("--- Test 5: Finally ---");
new MyPromise((resolve) => {
  resolve("Finally Test");
})
  .finally(() => {
    console.log("5.1 Finally executed");
  })
  .then((value) => {
    console.log("5.2 Value after finally:", value);
  });

console.log("--- Test 6: Promise.all ---");
const p1 = MyPromise.resolve(1);
const p2 = new MyPromise((resolve) => setTimeout(() => resolve(2), 50));
const p3 = MyPromise.resolve(3);

MyPromise.all([p1, p2, p3]).then((values) => {
  console.log("6. Promise.all results:", values);
});

console.log("--- Test 7: Promise.allSettled ---");
const p4 = MyPromise.resolve("Success");
const p5 = MyPromise.reject("Fail");

MyPromise.allSettled([p4, p5]).then((results) => {
  console.log("7. Promise.allSettled results:", results);
});
