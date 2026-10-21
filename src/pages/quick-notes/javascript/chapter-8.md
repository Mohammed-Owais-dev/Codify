# Quick Notes: Chapter 8 - Forms, Validation and Browser Storage

> **20-minute revision.** This chapter turns static pages into real apps: read forms, check the data, handle many elements with one listener, save data in the browser and schedule actions with timers.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 8.1 | Handling Form Input | `submit` event, `preventDefault`, read `value`, `checked`, `FormData` |
| 8.2 | Form Validation | HTML rules plus JavaScript checks and clear error messages |
| 8.3 | Event Bubbling and Delegation | Events travel upward; one parent listener handles all children |
| 8.4 | localStorage and sessionStorage | Save strings in the browser; use JSON for objects |
| 8.5 | Timers and Browser Dialogs | `setTimeout`, `setInterval`, `alert`, `confirm`, `prompt` |

---

## 1. Handling Form Input (8.1)

**Core idea:** Listen to the form's **`submit`** event, stop the page reload and read the values.

| Field | Read with |
| --- | --- |
| Text, email, number, textarea | `input.value` (always a **string**) |
| Checkbox | `input.checked` (`true` or `false`) |
| Radio group | `form.querySelector('input[name="x"]:checked')?.value` |
| Select | `select.value` |
| Whole form | `new FormData(form)` |

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <form id="signup">
    <p><input name="username" placeholder="Username"></p>
    <p><input name="age" type="number" placeholder="Age"></p>
    <p>
      <select name="course">
        <option value="js">JavaScript</option>
        <option value="html">HTML</option>
      </select>
    </p>
    <p><label><input type="checkbox" name="newsletter"> Send me updates</label></p>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>
  <pre id="result"></pre>

  <script>
    const form = document.getElementById("signup");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const values = {
        username: data.get("username").trim(),
        age: Number(data.get("age")),
        course: data.get("course"),
        newsletter: form.elements.newsletter.checked
      };

      document.getElementById("result").textContent = JSON.stringify(values, null, 2);
    });
  </script>
</body>
</html>
```

| Event | Fires | Use for |
| --- | --- | --- |
| `input` | On every change | Live feedback |
| `change` | When the value is committed | Selects, checkboxes |
| `submit` | When the form is sent | Final handling |
| `focus` / `blur` | Entering / leaving a field | Validate on leave |

**Remember**

* Listen on the **form's `submit` event**, not the button's `click`; then `Enter` also works.
* Call `event.preventDefault()` to stop the reload.
* Convert numbers: `Number(input.value)`.
* Use `.trim()` on text and `form.reset()` to clear.
* Every input needs a `<label>` (use `for` and `id`).

---

## 2. Form Validation (8.2)

**Core idea:** Never trust input. Check it for **format**, **length** and **range** before using it.

**HTML validation attributes**

| Attribute | Rule |
| --- | --- |
| `required` | Must not be empty |
| `minlength` / `maxlength` | Text length limits |
| `min` / `max` | Number or date limits |
| `type="email"` / `"url"` | Format check |
| `pattern="[A-Za-z]+"` | Regular expression |

**JavaScript validation with regular expressions**

```javascript
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePassword(password) {
  if (password.length < 8) return "Use at least 8 characters";
  if (!/\d/.test(password)) return "Include a number";
  if (!/[A-Z]/.test(password)) return "Include an uppercase letter";
  return "";
}

console.log(emailPattern.test("asha@example.com"), emailPattern.test("asha@"));
console.log(validatePassword("abc"));
console.log(validatePassword("abcdefgh"));
console.log(validatePassword("Abcdefg1") === "");
```

```output
true false
Use at least 8 characters
Include a number
true
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    input { padding: 8px; }
    input[aria-invalid="true"] { border: 2px solid #c62828; }
    .error { color: #c62828; min-height: 1.3em; }
    .ok { color: #2e7d32; }
  </style>
</head>
<body>
  <form id="form" novalidate>
    <label for="email">Email</label><br>
    <input id="email" type="email" aria-describedby="emailError">
    <p id="emailError" class="error" role="alert"></p>
    <button type="submit">Register</button>
    <p id="success" class="ok"></p>
  </form>

  <script>
    const email = document.getElementById("email");
    const error = document.getElementById("emailError");
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function checkEmail() {
      const value = email.value.trim();
      let message = "";

      if (value === "") message = "Email is required";
      else if (!pattern.test(value)) message = "Enter a valid email address";

      error.textContent = message;
      email.setAttribute("aria-invalid", message ? "true" : "false");
      return message === "";
    }

    email.addEventListener("blur", checkEmail);

    document.getElementById("form").addEventListener("submit", (event) => {
      event.preventDefault();
      document.getElementById("success").textContent = checkEmail() ? "Registered!" : "";
    });
  </script>
</body>
</html>
```

**Remember**

* HTML attributes give quick checks; JavaScript gives custom messages and rules.
* Show the error **next to the field**, in text (not just a red color).
* Validate on `blur`/`submit`; clear the message when the user fixes the value.
* Use `novalidate` on the form when you want your own messages.
* **Always validate again on the server.** Browser checks can be bypassed.

---

## 3. Event Bubbling and Delegation (8.3)

**Core idea:** After an event hits the target, it **bubbles up** through every parent. **Delegation** uses this: one listener on the parent handles all its children, even ones added later.

```text
Click on <button> inside <div> inside <body>

   button  ──▶  div  ──▶  body  ──▶  document
  (target)        bubbling goes upward
```

| Property / method | Meaning |
| --- | --- |
| `event.target` | The element that was actually clicked |
| `event.currentTarget` | The element that owns the running listener |
| `event.stopPropagation()` | Stop bubbling to parents |
| `element.closest("selector")` | Nearest matching ancestor (or itself) |
| `{ capture: true }` | Listen during the downward (capture) phase |

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <ul id="tasks">
    <li data-id="1">Learn DOM <button data-action="delete">x</button></li>
    <li data-id="2">Learn Events <button data-action="delete">x</button></li>
  </ul>
  <button id="addBtn">Add task</button>
  <p id="log"></p>

  <script>
    const list = document.getElementById("tasks");
    const log = document.getElementById("log");
    let counter = 3;

    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action='delete']");
      if (!button) return;

      const item = button.closest("li");
      log.textContent = "Deleted task " + item.dataset.id;
      item.remove();
    });

    document.getElementById("addBtn").addEventListener("click", () => {
      const li = document.createElement("li");
      li.dataset.id = counter;
      li.textContent = "New task " + counter + " ";

      const btn = document.createElement("button");
      btn.dataset.action = "delete";
      btn.textContent = "x";

      li.append(btn);
      list.append(li);
      counter++;
    });
  </script>
</body>
</html>
```

**Remember**

* Delegation = **fewer listeners**, and new elements work automatically.
* Use `closest()` to find the real item when the click lands on a child element.
* Always check that the click was on what you expect, and return early otherwise.
* Avoid `stopPropagation()` unless needed; it can break other features.
* `focus` and `blur` do not bubble; use `focusin` and `focusout` instead.

---

## 4. localStorage and sessionStorage (8.4)

**Core idea:** Web Storage keeps small amounts of **text** in the browser as key-value pairs.

| Feature | `localStorage` | `sessionStorage` |
| --- | --- | --- |
| Lifetime | Stays until cleared | Ends when the **tab** closes |
| Shared between tabs | Yes (same site) | No |
| Size | About 5 MB | About 5 MB |
| Sent to server | No | No |

| Method | Use |
| --- | --- |
| `setItem(key, value)` | Save |
| `getItem(key)` | Read (`null` if missing) |
| `removeItem(key)` | Delete one |
| `clear()` | Delete everything |

**Values are strings, so use JSON for objects and arrays.**

```javascript
const store = {};

const settings = { theme: "dark", fontSize: 18 };
store.settings = JSON.stringify(settings);

console.log(store.settings);
console.log(typeof store.settings);

const loaded = JSON.parse(store.settings);
console.log(loaded.theme, loaded.fontSize + 2);
```

```output
{"theme":"dark","fontSize":18}
string
dark 20
```

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <input id="nameInput" placeholder="Your name">
  <button id="saveBtn">Save</button>
  <button id="clearBtn">Clear</button>
  <p id="greeting"></p>

  <script>
    const KEY = "codify-username";
    let memory = "";

    function read() {
      try { return localStorage.getItem(KEY) || ""; }
      catch (error) { return memory; }
    }

    function write(value) {
      try { localStorage.setItem(KEY, value); }
      catch (error) { memory = value; }
    }

    function clear() {
      try { localStorage.removeItem(KEY); }
      catch (error) { memory = ""; }
    }

    function show() {
      const name = read();
      document.getElementById("greeting").textContent = name ? "Welcome back, " + name + "!" : "Hello, stranger!";
    }

    document.getElementById("saveBtn").addEventListener("click", () => {
      write(document.getElementById("nameInput").value.trim());
      show();
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
      clear();
      show();
    });

    show();
  </script>
</body>
</html>
```

**Remember**

* Storage holds **strings only**: use `JSON.stringify` to save and `JSON.parse` to load.
* `getItem` returns `null` when the key does not exist.
* Wrap storage code in `try...catch` (it can be blocked, full, or hold broken JSON).
* **Never store passwords, tokens or private data.** Any script on the page can read it.
* Use `localStorage` for preferences and saved lists; `sessionStorage` for temporary tab data.

---

## 5. Timers and Browser Dialogs (8.5)

**Core idea:** Timers run code **later** or **repeatedly**. Dialogs ask the user something using the browser's built-in boxes.

| Function | Use | Cancel with |
| --- | --- | --- |
| `setTimeout(fn, ms)` | Run once after a delay | `clearTimeout(id)` |
| `setInterval(fn, ms)` | Run repeatedly | `clearInterval(id)` |

```javascript
let count = 0;

const id = setInterval(() => {
  count++;
  console.log("Tick", count);

  if (count === 3) {
    clearInterval(id);
    console.log("Stopped");
  }
}, 100);

setTimeout(() => console.log("One-time message"), 50);
```

```output
One-time message
Tick 1
Tick 2
Tick 3
Stopped
```

| Dialog | Returns | Notes |
| --- | --- | --- |
| `alert("msg")` | Nothing | Shows a message |
| `confirm("Sure?")` | `true` / `false` | OK or Cancel |
| `prompt("Name?", "default")` | String or `null` | `null` when cancelled |

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2 id="clock">0</h2>
  <button id="start">Start</button>
  <button id="stop">Stop</button>

  <script>
    let seconds = 0;
    let timerId = null;
    const clock = document.getElementById("clock");

    document.getElementById("start").addEventListener("click", () => {
      if (timerId !== null) return;
      timerId = setInterval(() => {
        seconds++;
        clock.textContent = seconds;
      }, 1000);
    });

    document.getElementById("stop").addEventListener("click", () => {
      clearInterval(timerId);
      timerId = null;
    });
  </script>
</body>
</html>
```

**Remember**

* Delay is in **milliseconds** (1000 = 1 second).
* Always keep the timer **ID** so you can cancel it.
* Pass the function, not its result: `setTimeout(fn, 1000)`, not `setTimeout(fn(), 1000)`.
* `alert`, `confirm` and `prompt` **block** the page; use them sparingly.
* Prefer an on-page message or the `<dialog>` element for better design and accessibility.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Handle form submit | `form.addEventListener("submit", e => { e.preventDefault(); })` |
| Read all fields | `Object.fromEntries(new FormData(form))` |
| Checkbox state | `checkbox.checked` |
| Email check | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)` |
| Delegation | `parent.addEventListener("click", e => e.target.closest(".item"))` |
| Save an object | `localStorage.setItem("k", JSON.stringify(obj))` |
| Load an object | `JSON.parse(localStorage.getItem("k"))` |
| Remove saved item | `localStorage.removeItem("k")` |
| Delay once | `setTimeout(fn, 1000)` |
| Repeat | `const id = setInterval(fn, 1000); clearInterval(id);` |
| Ask yes or no | `confirm("Delete?")` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Page reloads on submit | `event.preventDefault()` |
| Number input treated as text | `Number(input.value)` |
| Only validating in the browser | Validate on the server too |
| Red border as the only error signal | Add a text message |
| Listener on every list item | Delegate from the parent |
| Click on a child misses the target | Use `event.target.closest()` |
| Saving an object directly | `JSON.stringify` first |
| `JSON.parse(null)` or broken data | Use `try...catch` and a default |
| Storing passwords in `localStorage` | Never store secrets |
| Forgetting `clearInterval` | Save the ID and clear it |
| `setTimeout(fn(), 1000)` | Pass `fn`, not `fn()` |

---

## Last-Minute Checklist

* I can read text, checkbox, select and `FormData` values.
* I stop the page reload with `preventDefault()`.
* I can validate with HTML attributes and with a regex.
* I can explain bubbling and write a delegated listener.
* I know `localStorage` vs `sessionStorage`.
* I save objects with JSON and handle errors with `try...catch`.
* I can start and stop a timer.

---

## Quiz: Rapid Fire

1. Which event is best for handling a whole form?

- [ ] `click` on the button
- [x] `submit` on the form
- [ ] `load` on the window
- [ ] `hover` on the form

2. What type of value does `input.value` always return?

- [ ] Number
- [ ] Boolean
- [x] String
- [ ] Object

3. What is event delegation?

- [ ] Giving every child its own listener
- [x] Handling child events with one listener on a parent
- [ ] Stopping all events
- [ ] Deleting listeners after use

4. How do you save an object in `localStorage`?

- [ ] `localStorage.setItem("k", obj)`
- [x] `localStorage.setItem("k", JSON.stringify(obj))`
- [ ] `localStorage.k = JSON.parse(obj)`
- [ ] `localStorage.save(obj)`

5. What is the main difference between `localStorage` and `sessionStorage`?

- [ ] Only `localStorage` can hold strings
- [ ] `sessionStorage` is larger
- [x] `sessionStorage` ends when the tab closes
- [ ] `localStorage` is sent to the server

6. What does `confirm("Sure?")` return when the user clicks Cancel?

- [ ] `null`
- [x] `false`
- [ ] `undefined`
- [ ] `0`
