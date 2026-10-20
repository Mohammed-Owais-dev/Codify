# Quick Notes: Chapter 4 - Functions and Scope

> ⏱ **15-minute revision.** Functions are the building blocks of every program. Focus on parameters vs arguments, arrow syntax, the three scopes and how callbacks work.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 4.1 | Defining and Calling | `function name() {}` then `name()` |
| 4.2 | Parameters, Arguments, Return | Inputs go in, `return` sends a value out |
| 4.3 | Expressions and Arrow Functions | Functions are values; `=>` is the short form |
| 4.4 | Scope and Hoisting | Where a variable can be used |
| 4.5 | Callback Functions | A function passed into another function |

---

## 1. Defining and Calling Functions (4.1)

**Core idea:** A function is a reusable block of code. **Define** it once, **call** it many times.

```javascript
function greet() {
  console.log("Hello!");
}

greet();
greet();
```

```output
Hello!
Hello!
```

* A function does nothing until you **call** it with `()`.
* **Function declarations** are **hoisted**: you can call them before they appear.

```javascript
console.log(hello());

function hello() {
  return "Hi from hoisting";
}
```

```output
Hi from hoisting
```

**Remember**

* Name functions with a **verb**: `calculateTotal`, `getUser`.
* One function should do **one job**.
* `greet` is the function; `greet()` runs it.

---

## 2. Parameters, Arguments and Return Values (4.2)

**Core idea:** **Parameters** are the names in the definition. **Arguments** are the real values you pass in.

```javascript
function add(a, b = 10) {
  return a + b;
}

console.log(add(5));
console.log(add(5, 2));
```

```output
15
7
```

| Term | Meaning | In `add(5, 2)` |
| --- | --- | --- |
| Parameter | Placeholder in the definition | `a`, `b` |
| Argument | Value passed in the call | `5`, `2` |
| Default parameter | Used when no argument is given | `b = 10` |

**Rest parameters and spread**

```javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4));
console.log(Math.max(...[3, 9, 4]));
```

```output
10
9
```

* `...numbers` in a definition **collects** arguments into an array.
* `...array` in a call **spreads** an array into separate arguments.

**return**

```javascript
function noReturn() {
  const x = 5;
}

function square(n) {
  return n * n;
  console.log("never runs");
}

console.log(noReturn());
console.log(square(4));
```

```output
undefined
16
```

**Remember**

* `return` ends the function immediately.
* A function with no `return` gives `undefined`.
* A function returns **one** value; use an object or array to return more.
* Missing arguments become `undefined`.

---

## 3. Function Expressions and Arrow Functions (4.3)

**Core idea:** Functions are values. You can store them in variables and pass them around.

```javascript
const multiply = function (a, b) {
  return a * b;
};

const square = n => n * n;
const add = (a, b) => a + b;
const makeUser = name => ({ name });

console.log(multiply(3, 4), square(4), add(2, 3), makeUser("Asha"));
```

```output
12 16 5 { name: 'Asha' }
```

**Arrow function syntax**

| Situation | Syntax |
| --- | --- |
| One parameter | `n => n * 2` |
| Many parameters | `(a, b) => a + b` |
| No parameters | `() => "hi"` |
| Many statements | `(a, b) => { return a + b; }` |
| Return an object | `name => ({ name })` |

**Declaration vs expression**

| Feature | Declaration | Expression / Arrow |
| --- | --- | --- |
| Syntax | `function f() {}` | `const f = () => {}` |
| Hoisted | Yes | No |
| Needs a name | Yes | No (anonymous allowed) |

```javascript
try {
  greet();
} catch (error) {
  console.log(error.name);
}

const greet = () => console.log("Hi");
```

```output
ReferenceError
```

**IIFE (Immediately Invoked Function Expression)**

```javascript
(function () {
  console.log("runs right now");
})();
```

```output
runs right now
```

**Remember**

* One-line arrow functions **return automatically** (no `return` keyword).
* Wrap an object result in parentheses: `() => ({ ... })`.
* Arrow functions do **not** have their own `this`; use normal functions for object methods.

---

## 4. Scope and Hoisting Basics (4.4)

**Core idea:** **Scope** decides where a variable can be used. Inner scopes can see outer scopes, never the reverse.

| Scope | Created by | Visible |
| --- | --- | --- |
| Global | Outside any function or block | Everywhere |
| Function | Inside a function | Only inside that function |
| Block | Inside `{ }` with `let` / `const` | Only inside that block |

```javascript
const g = "global";

function test() {
  const f = "function";

  if (true) {
    const b = "block";
    console.log(g, f, b);
  }

  console.log(typeof b);
}

test();
```

```output
global function block
undefined
```

**Hoisting summary**

| Declaration | Before its line |
| --- | --- |
| `function f() {}` | Fully usable |
| `var x` | `undefined` |
| `let` / `const` | `ReferenceError` (TDZ) |

**Closures**

A function **remembers** the variables from where it was created.

```javascript
function makeCounter() {
  let count = 0;
  return () => ++count;
}

const counter = makeCounter();
console.log(counter(), counter(), counter());
```

```output
1 2 3
```

**Remember**

* Avoid global variables; they can be changed from anywhere.
* A variable with the same name in an inner scope **shadows** the outer one.
* Closures keep data **private** and alive.

---

## 5. Callback Functions (4.5)

**Core idea:** A **callback** is a function passed to another function, to be called later. A function that accepts one is a **higher-order function**.

```javascript
function calculate(a, b, operation) {
  return operation(a, b);
}

console.log(calculate(10, 5, (x, y) => x + y));
console.log(calculate(10, 5, (x, y) => x * y));
console.log([1, 2, 3].map(n => n * 2));
```

```output
15
50
[ 2, 4, 6 ]
```

**Synchronous vs asynchronous callbacks**

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Callback after timer");
}, 0);

console.log("End");
```

```output
Start
End
Callback after timer
```

| Type | Runs | Example |
| --- | --- | --- |
| Synchronous | Immediately | `map`, `filter`, `forEach` |
| Asynchronous | Later | `setTimeout`, events, `fetch` |

**Pass, do not call**

```javascript
function greet() {
  console.log("Hi");
}

setTimeout(greet, 100);
```

```output
Hi
```

* `setTimeout(greet, 100)` passes the function. Correct.
* `setTimeout(greet(), 100)` runs it **now**. Wrong.
* To send an argument, wrap it: `setTimeout(() => greet("Asha"), 100)`.

**Remember**

* Event handlers are callbacks too.
* Deeply nested callbacks are called **callback hell**; Promises and `async/await` (Chapter 9) fix it.
* Check `typeof callback === "function"` before calling an optional callback.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Declaration | `function add(a, b) { return a + b; }` |
| Arrow function | `const add = (a, b) => a + b;` |
| Default parameter | `function f(x = 10) {}` |
| Rest parameter | `function f(...args) {}` |
| Spread into call | `Math.max(...numbers)` |
| Return an object (arrow) | `() => ({ key: value })` |
| IIFE | `(() => { /* code */ })();` |
| Callback | `setTimeout(() => {}, 1000)` |
| Private counter | closure returning an inner function |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Forgetting `()` to call | `greet()` not `greet` |
| Calling a callback too early | Pass `greet`, not `greet()` |
| No `return` | Add `return`, or the result is `undefined` |
| Code after `return` | It never runs; move it |
| Arrow function returning an object | Wrap it: `() => ({ ... })` |
| Calling an expression before it exists | Define it first |
| Using a block variable outside | Declare it in the outer scope |
| Too many globals | Keep variables inside functions |

---

## Last-Minute Checklist

* ✅ I know parameters vs arguments.
* ✅ I can write default and rest parameters.
* ✅ I can convert a normal function to an arrow function.
* ✅ I know which functions are hoisted.
* ✅ I can name the three scopes.
* ✅ I can explain a closure with the counter example.
* ✅ I can explain what a callback is and why `greet()` is wrong in `setTimeout`.

---

## Quiz: Rapid Fire 🧠

1. What is a function that is passed into another function called?

- [ ] A constructor
- [x] A callback
- [ ] A closure
- [ ] A loop

2. What does a function without a `return` statement give back?

- [ ] `0`
- [ ] `null`
- [x] `undefined`
- [ ] An empty string

3. Which function type can be called before its definition?

- [x] Function declaration
- [ ] Arrow function stored in `const`
- [ ] Function expression stored in `let`
- [ ] All of them

4. Which arrow function correctly returns the object `{ name: "Asha" }`?

- [ ] `() => { name: "Asha" }`
- [x] `() => ({ name: "Asha" })`
- [ ] `() => [name: "Asha"]`
- [ ] `=> { name: "Asha" }`

5. What does `...numbers` do in `function f(...numbers) {}`?

- [ ] Spreads an array into arguments
- [ ] Deletes the arguments
- [x] Collects all arguments into an array
- [ ] Makes the arguments constant

6. Which call passes the callback correctly?

- [ ] `setTimeout(greet(), 1000)`
- [x] `setTimeout(greet, 1000)`
- [ ] `setTimeout(greet[], 1000)`
- [ ] `setTimeout(call greet, 1000)`
