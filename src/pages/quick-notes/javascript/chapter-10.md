# Quick Notes: Chapter 10 - Error Handling and Practical Projects

> **20-minute revision.** This chapter makes you a professional: handle errors, debug quickly, organize code, follow best practices, build for everyone and finish with a complete project.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 10.1 | Errors and try...catch | Catch problems, throw your own, clean up with `finally` |
| 10.2 | Debugging with DevTools | Console, breakpoints, Network panel, a step-by-step method |
| 10.3 | ES Modules and Organization | One file, one job; named/default exports; layered structure |
| 10.4 | Best Practices and Accessibility | Clean, safe code that everyone can use |
| 10.5 | Final Project: Task List | Data → save → render, with validation and accessibility |

---

## 1. Errors and try...catch (10.1)

**Core idea:** An uncaught error **stops** the code. `try...catch` lets the program react and continue.

| Error type | Cause |
| --- | --- |
| `SyntaxError` | Code written incorrectly (found before running) |
| `ReferenceError` | Variable does not exist |
| `TypeError` | Wrong use of a value, such as `null.length` |
| `RangeError` | Number outside the allowed range |

```javascript
function test(shouldFail) {
  try {
    console.log("Trying...");
    if (shouldFail) throw new Error("Failure");
    console.log("Success");
  } catch (error) {
    console.log("Caught:", error.message);
  } finally {
    console.log("Cleanup");
  }
}

test(false);
test(true);
```

```output
Trying...
Success
Cleanup
Trying...
Caught: Failure
Cleanup
```

**Error object and custom errors**

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateAge(age) {
  if (age <= 0) throw new ValidationError("Age must be positive", "age");
  return age;
}

try {
  validateAge(-5);
} catch (error) {
  console.log(error.name, "-", error.message, "-", error.field);
  console.log(error instanceof ValidationError);
}
```

```output
ValidationError - Age must be positive - age
true
```

| Part | Role |
| --- | --- |
| `try` | Risky code |
| `catch (error)` | Runs only if an error happens |
| `finally` | **Always** runs (cleanup) |
| `throw new Error("msg")` | Raise your own error |
| `error.name` / `.message` / `.stack` | Type / description / where it happened |

**Errors in async code**

```javascript
const failLater = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Server not reachable")), 100);
  });

failLater().catch(error => console.log("Promise caught:", error.message));

async function run() {
  try {
    await failLater();
  } catch (error) {
    console.log("await caught:", error.message);
  }
}

run();
```

```output
Promise caught: Server not reachable
await caught: Server not reachable
```

**Remember**

* A normal `try...catch` **cannot** catch errors in a later callback; use `.catch()` or `await` inside `try`.
* Throw `Error` objects, never plain strings.
* Always wrap `JSON.parse` and `localStorage` access.
* Never leave an empty `catch` block.
* Show **friendly** messages to users; log technical details with `console.error`.

---

## 2. Debugging with Browser DevTools (10.2)

**Core idea:** Debug with a method, not guesses: **reproduce → read → isolate → inspect → fix → test.**

| Panel | Use |
| --- | --- |
| Elements | Inspect and edit live HTML and CSS |
| Console | Messages, errors, run code |
| Sources | Breakpoints and stepping |
| Network | Requests, status, payload, response, timing |
| Application | View `localStorage`, `sessionStorage`, cookies |

| Shortcut | Action |
| --- | --- |
| `F12` / `Ctrl + Shift + I` | Open DevTools |
| `F8` | Resume |
| `F10` | Step over |
| `F11` | Step into |
| `Shift + F11` | Step out |

```javascript
console.log("Name: %s, Age: %d", "Asha", 20);

console.count("click");
console.count("click");

console.group("Order");
console.log("Item: Book");
console.groupEnd();

console.assert(1 + 1 === 3, "Math is broken");
```

```output
Name: Asha, Age: 20
click: 1
click: 2
Order
  Item: Book
Assertion failed: Math is broken
```

| Console method | Purpose |
| --- | --- |
| `log` / `warn` / `error` | Message / yellow / red |
| `table` | Show arrays and objects as a table |
| `group` / `groupEnd` | Indent related logs |
| `count` | Count how often a line runs |
| `time` / `timeEnd` | Measure duration |
| `assert` | Print only when a condition is false |

**Breakpoint tools:** line breakpoint, **conditional** breakpoint (`i === 3`), **logpoint**, `debugger;` statement, pause on exceptions.

**Remember**

* Read the **first** error and its line number first.
* A stack trace shows the chain of calls that led to the error.
* Check the **Network panel** when data does not load (status, response).
* Log objects as `console.log({ total })` to see names with values.
* Remove `debugger` and sensitive logs before publishing.
* Edits made in the Elements panel are temporary.

---

## 3. ES Modules and Code Organization (10.3)

**Core idea:** Split code into small files that each do **one job** and share only what they export.

```text
js/
├── main.js          entry point: connects everything
├── config.js        constants
├── models/task.js   data rules (no DOM)
├── services/storage.js   localStorage / fetch
├── ui/render.js     DOM updates only
└── utils/helpers.js small reusable functions
```

```javascript
// js/models/task.js
export function createTask(id, text) {
  return { id, text, done: false };
}

export function toggleTask(task) {
  return { ...task, done: !task.done };
}
```

```javascript
// js/main.js
import { createTask, toggleTask } from "./models/task.js";

let task = createTask(1, "Write notes");
task = toggleTask(task);

console.log(task);
```

```output
{ id: 1, text: 'Write notes', done: true }
```

| Feature | Named export | Default export |
| --- | --- | --- |
| Per file | Many | One |
| Import | `import { x } from "./f.js"` | `import x from "./f.js"` |
| Name must match | Yes | No |

**Remember**

* HTML needs `<script type="module" src="js/main.js"></script>`.
* Paths start with `./` and include `.js`; serve over **HTTP**, not `file://`.
* A module runs **once**; all importers share the same instance.
* Imports are **read-only**.
* `await import("./x.js")` loads code **on demand**.
* Avoid **circular imports**; move shared code into a third file.
* Keep layers separate: **data**, **storage**, **UI**, **main**.

---

## 4. JavaScript Best Practices and Accessibility (10.4)

**Core idea:** Write code that is readable, safe and usable by everyone.

**Clean code habits**

| Habit | Example |
| --- | --- |
| Clear names | `isLoggedIn`, `calculateTotal()` |
| `const` by default | Use `let` only when it changes; avoid `var` |
| Strict equality | `===` and `!==` |
| Small functions | One job each |
| Guard clauses | Return early on bad input |
| Named constants | `GST_RATE` instead of `0.18` |
| No repetition (DRY) | Reuse a function |
| Comments explain **why** | Not what the code obviously does |

```javascript
const MIN_PASSWORD_LENGTH = 8;

function validatePassword(password) {
  if (typeof password !== "string") return "Password is required";
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  if (!/\d/.test(password)) return "Include at least one number";
  return "";
}

console.log(validatePassword("abc"));
console.log(validatePassword("abcdefgh"));
console.log(validatePassword("abcdefg1") === "");
```

```output
Use at least 8 characters
Include at least one number
true
```

**Safe access and debounce**

```javascript
const user = { profile: { name: "Asha" } };
console.log(user.profile?.name, user.address?.city ?? "Unknown city");

function debounce(callback, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
}

const search = debounce(text => console.log("Searching:", text), 100);
search("j");
search("ja");
search("java");
```

```output
Asha Unknown city
Searching: java
```

**Security basics**

* Treat all input as **untrusted**.
* Use `textContent`, not `innerHTML`, for user data.
* Never use `eval()`.
* Validate on the **server** too.
* Never store secrets in front-end code or `localStorage`.

**Accessibility (a11y) essentials**

| Practice | How |
| --- | --- |
| Native elements | `<button>`, `<a href>`, `<label>` instead of clickable `<div>` |
| Keyboard access | Everything works with `Tab`, `Enter`, `Space`, `Escape` |
| Visible focus | Style `:focus-visible`; never remove it |
| Manage focus | Move focus after dialogs, deletes, errors |
| Announce changes | `aria-live="polite"`, `role="alert"` |
| State attributes | `aria-expanded`, `aria-pressed`, `aria-invalid`, `aria-label` |
| Forms | Real `<label for>`, text error messages |
| Not color alone | Add text or icons; keep good contrast |
| Images | Helpful `alt` text (`alt=""` for decoration) |
| Motion | Respect `prefers-reduced-motion` |

**Remember**

* Use ARIA to **support** native elements, never to replace them.
* Test your page using **only the keyboard**.
* Accessible pages are better for everyone, including search engines.

---

## 5. Final Project: Interactive Task List (10.5)

**Core idea:** One loop powers almost every interactive page: **event → update data → save → render.**

```text
User action ──▶ validate ──▶ update tasks array ──▶ saveTasks() ──▶ render()
```

| Skill | Where it appears |
| --- | --- |
| Arrays and objects | `tasks = [{ id, text, done }]` |
| `map`, `filter`, `find`, `some` | Toggle, delete, filter, count |
| DOM creation | `createElement` + `textContent` |
| Event delegation | One listener on the list |
| Forms and validation | Empty, too long, duplicate checks |
| `localStorage` + JSON | Persist tasks, `try...catch` around it |
| Accessibility | Labels, `aria-live`, `aria-pressed`, focus management |

```javascript
let tasks = [];
let nextId = 1;

const addTask = text => tasks.push({ id: nextId++, text, done: false });
const toggleTask = id => { tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t); };
const removeTask = id => { tasks = tasks.filter(t => t.id !== id); };
const remaining = () => tasks.filter(t => !t.done).length;

addTask("Buy milk");
addTask("Study JavaScript");
addTask("Call mom");

toggleTask(2);
removeTask(3);

console.log(tasks);
console.log(remaining() + " tasks left");
```

```output
[
  { id: 1, text: 'Buy milk', done: false },
  { id: 2, text: 'Study JavaScript', done: true }
]
1 tasks left
```

**Project checklist**

* Each task has a stable **`id`** (never use the index).
* Validate input: empty, length limit, duplicates.
* Save after **every** change; load safely with `try...catch` and `Array.isArray`.
* Render with `createElement` and `textContent`.
* Handle toggle and delete with **one delegated listener**.
* Restore **focus** after redrawing the list.
* Announce actions in an `aria-live` region.
* Show an **empty state** message.

**Remember**

* The **array is the single source of truth**; the page is drawn from it.
* Convert `dataset.id` with `Number()` before comparing.
* Test with mouse, keyboard, empty input and `<b>html</b>` as text.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Catch errors | `try { } catch (error) { } finally { }` |
| Throw an error | `throw new Error("message")` |
| Custom error | `class MyError extends Error { }` |
| Async error | `try { await x } catch (e) { }` |
| Log an object | `console.log({ value })` |
| Pause code | `debugger;` or a breakpoint |
| Export / import | `export { f }` / `import { f } from "./f.js"` |
| Safe access | `obj?.prop ?? "default"` |
| Show user text | `el.textContent = text` |
| Announce update | `<p aria-live="polite"></p>` |
| Toggle state | `button.setAttribute("aria-pressed", "true")` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `try...catch` around `setTimeout` | Use `.catch()` or `await` inside `try` |
| Empty `catch` | Log or show the error |
| Throwing a string | `throw new Error(...)` |
| Guessing at bugs | Inspect values with logs or breakpoints |
| `debugger` or secrets left in code | Remove before publishing |
| Missing `type="module"` or `.js` | Add both |
| Circular imports | Extract shared code |
| `innerHTML` with user text | `textContent` |
| Clickable `<div>` | Use `<button>` |
| Removed focus outline | Style `:focus-visible` |
| Silent page updates | Use `aria-live` or `role="alert"` |
| Index used as task id | Use a stable `id` |
| List redraw loses focus | Restore focus after `render()` |

---

## Last-Minute Checklist

* I can use `try`, `catch`, `finally` and `throw`.
* I can create a custom error class.
* I can handle errors in Promises and `async/await`.
* I follow the debugging method and know the main DevTools panels.
* I can structure a project into modules.
* I use `===`, `const`, small functions and named constants.
* I can make a page keyboard- and screen-reader-friendly.
* I can explain the **event → data → save → render** loop.

---

## Quiz: Rapid Fire

1. Which block always runs, whether or not an error occurred?

- [ ] `try`
- [ ] `catch`
- [x] `finally`
- [ ] `throw`

2. Why can `try { setTimeout(() => { throw new Error("x"); }, 0); } catch (e) {}` not catch the error?

- [ ] Arrow functions cannot throw
- [x] The callback runs later, after the `try...catch` has finished
- [ ] `catch` only accepts strings
- [ ] `setTimeout` blocks errors

3. Which DevTools panel shows a failed `fetch` request and its status code?

- [ ] Elements
- [ ] Sources
- [x] Network
- [ ] Performance

4. Which element is best for a clickable action?

- [ ] `<div onclick>`
- [ ] `<span>`
- [x] `<button>`
- [ ] `<p>`

5. What does `aria-live="polite"` do?

- [ ] Hides the element
- [x] Announces text changes to screen reader users
- [ ] Makes text bold
- [ ] Disables the element

6. In the Task List project, what should happen right after the `tasks` array changes?

- [ ] Reload the page
- [ ] Nothing
- [x] Save the tasks and call `render()`
- [ ] Clear the filter
