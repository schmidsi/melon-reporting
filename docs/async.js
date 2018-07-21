const a = 1;
// a = 2; // => ​​Assignment to constant variable.​​

function oldStyle(param) {
  console.log(param);
}

const arrowFunction = param => console.log(param);

// Don't do this:
function PrototypeClass(name) {
  this.name = name;
}
PrototypeClass.prototype.describe = function (how) {
  console.log(this.name, "is", how);
};

// Nor this:
class MyClass {
  constructor(name) {
    this.name = name;
  }

  describe(how) {
    console.log(this.name, "is", how);
  }
}

// Instead write functions as pure as possible which receive all their
// relevant context as explicit arguments
const describe = (name, how) =>
  console.log(name, "is", how);

const c = new MyClass("qwer");
c.describe("aqw");

const p = new PrototypeClass("Melon");
p.describe("awesome");

describe("Melon", "great");

// Instead model in a functional way.

// const logDelayed = (Pquo)

// First we create a placeholder function for all async functions.
// Async is everything that we need to wait for, like queries to
// the blockchain (which is nothing else than a simple async HTTP request).
// In legacy JavaScript async functions receive a callback
// function as an argument which will be called after the task completed.
// The functional nature of JavaScript with these kind of higher-order functions
// was there since the beginning.
const doSomethingAsync = (param, callback) =>
  setTimeout(() => callback(param), Math.random() * 100);

// The async-nature of JavaScript can be tricky to wrap the head around it
// Since commands aren't executed in the same order as they are declared:
doSomethingAsync(1, console.log);
console.log(2);
// ==> Prints first 2 and then 1 after 100ms since the first command is async.

// But there are problems with this asynchronicity: The so called callback-hell.
// Imagine 3 async functions that need to run in a given order, every function
// depending on the result of the other. This would be modelled like this:

doSomethingAsync([1], param1 => {
  doSomethingAsync([...param1, 2], param2 => {
    doSomethingAsync([...param2, 3], param3 => {
      console.log(param3); // -> [1, 2, 3]
    });
  });
});

// ES2015 introduced the concept of Promises to mitigate this problem. It is a
// common pattern which can be described like: An async function returns an object
// (the promise) on which we can register two callbacks. This whole thing is chainable.
// Let us look at code to understand this better.
const doSomethingAsyncPromisified = param =>
  new Promise(resolve =>
    doSomethingAsync(param, result => resolve(result))
  );

// With this, we can now rewrite the callback-hell:
doSomethingAsyncPromisified([1])
  .then(param => doSomethingAsyncPromisified([...param, 2]))
  .then(param => doSomethingAsyncPromisified([...param, 3]))
  .then(console.log); // -> [1, 2, 3]

// This is already better but ES2017 introduced a newer concept: Async/await.
// The function above can be rewritten like this:
const asyncFunction = async () => {
  const result1 = await doSomethingAsyncPromisified([1]);
  const result2 = await doSomethingAsyncPromisified([
    ...result1,
    2
  ]);
  const result3 = await doSomethingAsyncPromisified([
    ...result2,
    3
  ]);
  console.log(result3); // -> [1, 2, 3]
};
asyncFunction();
