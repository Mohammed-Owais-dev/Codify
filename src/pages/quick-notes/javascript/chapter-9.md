# Quick Notes: Chapter 9 - Asynchronous JavaScript

> **20-minute revision.** Async code lets JavaScript start slow work and keep running. Learn the progression: **callbacks → Promises → async/await**, then use `fetch` to talk to servers.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 9.1 | Synchronous vs Asynchronous | Sync waits; async continues; the event loop runs callbacks later |
| 9.2 | setTimeout and setInterval | Run code once after a delay or repeatedly |
| 9.3 | Promises | An object for a future value: pending, fulfilled or rejected |
| 9.4 | async and await | Write Promise code that reads like normal code |
| 9.5 | Fetch API and JSON | Get data from servers and convert JSON |

---

## 1. Synchronous vs Asynchronous Code (9.1)

**Core idea:** JavaScript has **one thread**. Synchronous code runs line by line and can **block**. Asynchronous code starts a task and moves on; the result is handled **later**.

```javascript
console.log("A");

setTimeout(() => console.log("B (timer)"), 0);

Promise.resolve().then(() => console.log("C (promise)"));

console.log("D");
```

```output
A
D
C (promise)
B (timer)
```

**Order of execution**

| Step | What runs |
| --- | --- |
| 1 | All synchronous code (call stack) |
| 2 | **Microtasks** (Promise callbacks) |
| 3 | **Macrotasks** (timers, events), one at a time |

```text
Call Stack  ◀── Event Loop ◀── Microtask Queue (Promises)
                          ◀── Callback Queue (timers, events)
                                      ▲
                               Web APIs (timers, fetch, DOM events)
```

**Remember**

* `setTimeout(fn, 0)` still runs **after** the current synchronous code.
* Long loops **block** the page: buttons freeze and animations stop.
* Async tasks: timers, network requests, user events, file reading.
* Never use a value before the async task that produces it has finished.

---

## 2. setTimeout and setInterval (9.2)

**Core idea:** Timers schedule a callback. The delay is in **milliseconds** and is a **minimum**.

| Function | Runs | Cancel |
| --- | --- | --- |
| `setTimeout(fn, ms, ...args)` | Once | `clearTimeout(id)` |
| `setInterval(fn, ms, ...args)` | Repeatedly | `clearInterval(id)` |

```javascript
setTimeout(() => console.log("Slow (300ms)"), 300);
setTimeout(() => console.log("Fast (100ms)"), 100);

function greet(name, greeting) {
  console.log(`${greeting}, ${name}!`);
}
setTimeout(greet, 200, "Asha", "Hello");

const cancelled = setTimeout(() => console.log("never runs"), 50);
clearTimeout(cancelled);
```

```output
Fast (100ms)
Hello, Asha!
Slow (300ms)
```

**Countdown with `setInterval`**

```javascript
let count = 3;

const id = setInterval(() => {
  console.log(count);
  count--;

  if (count === 0) {
    clearInterval(id);
    console.log("Go!");
  }
}, 100);
```

```output
3
2
1
Go!
```

**Remember**

* Save the timer **ID** and clear it when done.
* Shorter delays run first; equal delays run in creation order.
* Pass the function, not its result: `setTimeout(fn, 1000)`.
* To pass arguments, use extra parameters or an arrow function.
* A `sleep` helper: `const sleep = ms => new Promise(r => setTimeout(r, ms));`

---

## 3. Promises (9.3)

**Core idea:** A **Promise** represents a value that will be available later.

| State | Meaning |
| --- | --- |
| Pending | Still working |
| Fulfilled | Succeeded with a value |
| Rejected | Failed with an error |

A Promise settles **once** and never changes again.

```javascript
function checkAge(age) {
  return new Promise((resolve, reject) => {
    if (age >= 18) resolve("Access granted");
    else reject(new Error("Access denied"));
  });
}

checkAge(20)
  .then(message => console.log(message))
  .catch(error => console.log(error.message))
  .finally(() => console.log("Check finished"));
```

```output
Access granted
Check finished
```

**Chaining and errors**

```javascript
Promise.resolve(2)
  .then(n => n * 2)
  .then(n => n + 1)
  .then(n => {
    console.log("Result:", n);
    throw new Error("Something broke");
  })
  .then(() => console.log("skipped"))
  .catch(error => console.log("Caught:", error.message));
```

```output
Result: 5
Caught: Something broke
```

**Combining Promises**

| Method | Fulfills when | Rejects when |
| --- | --- | --- |
| `Promise.all([...])` | **All** fulfill (results in order) | **Any** rejects |
| `Promise.allSettled([...])` | All have finished | Never |
| `Promise.race([...])` | The **first** settles | The first rejects |
| `Promise.any([...])` | The first **succeeds** | **All** reject |

```javascript
const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

Promise.all([wait(300, "A"), wait(100, "B"), wait(200, "C")])
  .then(results => console.log(results));

Promise.race([wait(150, "slow"), wait(50, "fast")])
  .then(winner => console.log("Race winner:", winner));
```

```output
Race winner: fast
[ 'A', 'B', 'C' ]
```

**Remember**

* `.then()` handles success, `.catch()` handles errors, `.finally()` always runs.
* Each `.then()` returns a **new** Promise, so chains stay flat.
* **Return** a value (or Promise) inside `.then()` to pass it on.
* Always end a chain with `.catch()`.
* Reject with `new Error(...)`, not a plain string.

---

## 4. async and await (9.4)

**Core idea:** `async`/`await` is cleaner syntax for Promises. An `async` function **always returns a Promise**. `await` pauses **that function** until a Promise settles.

```javascript
const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Asha" });
      else reject(new Error("Invalid user id"));
    }, 100);
  });
}

async function showUser(id) {
  try {
    const user = await getUser(id);
    console.log("User:", user.name);
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    console.log("Done");
  }
}

showUser(1).then(() => showUser(-5));
```

```output
User: Asha
Done
Error: Invalid user id
Done
```

**Sequential vs parallel**

```javascript
const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

async function run() {
  const a = await wait(100, "A");
  const b = await wait(100, "B");
  console.log("Sequential:", a, b);

  const [c, d] = await Promise.all([wait(100, "C"), wait(100, "D")]);
  console.log("Parallel:", c, d);
}

run();
```

```output
Sequential: A B
Parallel: C D
```

| Task | Use |
| --- | --- |
| Steps depend on each other | `await` one after another |
| Steps are independent | `await Promise.all([...])` |
| Loop one by one | `for (const x of list) { await ... }` |
| Loop all at once | `await Promise.all(list.map(...))` |

**Remember**

* `await` works only inside an `async` function (or at the top level of a module).
* Handle errors with `try...catch...finally`.
* `forEach` does **not** wait for `await`; use `for...of`.
* Forgetting `await` gives you a pending Promise instead of the value.
* Other code keeps running while an `await` waits.

---

## 5. Fetch API and JSON (9.5)

**Core idea:** `fetch(url)` returns a Promise of a `Response`. Reading the body is a **second** async step.

**JSON rules:** keys and strings in **double quotes**, no trailing commas, no functions, no comments.

```javascript
const student = { name: "Asha", age: 20, skills: ["JS", "HTML"] };

const json = JSON.stringify(student);
console.log(json);

const back = JSON.parse(json);
console.log(back.skills[1], typeof back);

try {
  JSON.parse("{ name: 'Asha' }");
} catch (error) {
  console.log(error.name);
}
```

```output
{"name":"Asha","age":20,"skills":["JS","HTML"]}
HTML object
SyntaxError
```

**The standard fetch pattern**

```javascript
async function getTodo() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const todo = await response.json();
    console.log(todo);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

getTodo();
```

```output
{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }
```

**Sending data (POST)**

```javascript
async function createPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Hello", userId: 1 })
  });

  console.log(response.status);
}

createPost();
```

```output
201
```

| Status | Meaning |
| --- | --- |
| `200` to `299` | Success (`response.ok` is `true`) |
| `404` | Not found |
| `401` / `403` | Not logged in / not allowed |
| `500` | Server error |

**Remember**

* `fetch` rejects **only on network failure**. A `404` or `500` still resolves, so check `response.ok`.
* Use `await response.json()`; the body can be read **only once**.
* For POST: set `method`, a JSON `Content-Type` header and `JSON.stringify` the body.
* Build query strings with `new URLSearchParams({ key: value })`.
* Show **loading, success and error** states on the page.
* Use `textContent` for server data, not `innerHTML`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Run once later | `setTimeout(fn, 1000)` |
| Run repeatedly | `const id = setInterval(fn, 1000)` |
| Stop | `clearTimeout(id)` / `clearInterval(id)` |
| New Promise | `new Promise((resolve, reject) => {})` |
| Handle result | `.then(fn).catch(fn).finally(fn)` |
| Wait for all | `await Promise.all([a(), b()])` |
| Async function | `async function f() { const x = await g(); }` |
| Error handling | `try { await x } catch (e) { } finally { }` |
| Fetch JSON | `const data = await (await fetch(url)).json()` |
| Object to JSON | `JSON.stringify(obj)` |
| JSON to object | `JSON.parse(text)` |
| Sleep | `const sleep = ms => new Promise(r => setTimeout(r, ms))` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Expecting async code to run in order | Use `await` or `.then()` |
| Using data before it arrives | Use it inside `.then()` or after `await` |
| Forgetting `await` | Add `await` (or you get a Promise) |
| `await` outside an `async` function | Mark the function `async` |
| Awaiting independent tasks one by one | `await Promise.all([...])` |
| `forEach` with `await` | Use `for...of` |
| Not returning inside `.then()` | `return` the value or Promise |
| No `.catch()` / `try...catch` | Always handle errors |
| Assuming `fetch` fails on 404 | Check `response.ok` |
| Object body without `JSON.stringify` | Stringify it and set the `Content-Type` header |
| Reading the body twice | Store it in a variable |
| `setInterval` never cleared | Keep the ID and call `clearInterval` |

---

## Last-Minute Checklist

* I can explain sync vs async and why blocking is bad.
* I know microtasks (Promises) run before timers.
* I can write `setTimeout`, `setInterval` and cancel them.
* I know the three Promise states and the four combiners.
* I can rewrite a `.then()` chain with `async/await`.
* I always check `response.ok`.
* I can use `JSON.stringify` and `JSON.parse`.

---

## Quiz: Rapid Fire

1. What is printed last: `console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C");`?

- [ ] `A`
- [ ] `C`
- [x] `B`
- [ ] Nothing

2. What are the three states of a Promise?

- [ ] Start, run, stop
- [x] Pending, fulfilled, rejected
- [ ] Open, closed, locked
- [ ] Wait, pass, fail

3. What does an `async` function always return?

- [ ] `undefined`
- [x] A Promise
- [ ] A callback
- [ ] A string

4. How do you run two independent async tasks at the same time?

- [ ] `await a(); await b();`
- [x] `await Promise.all([a(), b()]);`
- [ ] `a().then(b());`
- [ ] `for await (a, b)`

5. A server answers with status 404. What does `fetch` do?

- [ ] Rejects automatically
- [x] Resolves, with `response.ok` set to `false`
- [ ] Retries the request
- [ ] Reloads the page

6. Which is valid JSON?

- [ ] `{ name: "Asha" }`
- [ ] `{ 'name': 'Asha' }`
- [x] `{ "name": "Asha" }`
- [ ] `{ "name": "Asha", }`
