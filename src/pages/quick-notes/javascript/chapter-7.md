# Quick Notes: Chapter 7 - The Document Object Model (DOM)

> ⏱ **20-minute revision.** The DOM is how JavaScript talks to the page. Remember the flow: **select → change → create/remove → listen for events**. Press **Run** on each example to see it work.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 7.1 | Understanding the DOM | The page as a tree of objects; `document` is the entry point |
| 7.2 | Selecting Elements | `querySelector`, `querySelectorAll`, `getElementById` |
| 7.3 | Changing Content, Attributes, Styles | `textContent`, `setAttribute`, `classList`, `style` |
| 7.4 | Creating, Adding, Removing | `createElement`, `append`, `remove` |
| 7.5 | Events and Listeners | `addEventListener`, the event object, `preventDefault` |

---

## 1. Understanding the DOM (7.1)

**Core idea:** The browser turns your HTML into a **tree of objects** called the DOM. JavaScript changes the tree, and the page updates instantly.

```text
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        └── ul
            ├── li
            └── li
```

| Term | Meaning |
| --- | --- |
| `document` | The root object for the whole page |
| `window` | The browser window (global object) |
| Node | Anything in the tree (element, text, comment) |
| Element | A node made from an HTML tag |
| Parent / child / sibling | Relationships between nodes |

**Navigating the tree**

| Property | Gives |
| --- | --- |
| `el.parentElement` | The parent element |
| `el.children` | Child elements (collection) |
| `el.firstElementChild` / `lastElementChild` | First / last child element |
| `el.nextElementSibling` / `previousElementSibling` | Neighbor elements |

**Remember**

* The DOM is **not** your HTML file. It is the live version in memory.
* Run your script **after** the HTML loads (end of `<body>` or `defer`).
* Use the `...Element...` properties; plain `childNodes` also includes text and whitespace.

---

## 2. Selecting HTML Elements (7.2)

**Core idea:** Find an element first, then work with it.

| Method | Returns |
| --- | --- |
| `document.getElementById("id")` | One element or `null` |
| `document.querySelector("css")` | **First** match or `null` |
| `document.querySelectorAll("css")` | **All** matches (`NodeList`) |
| `document.getElementsByClassName("c")` | Live `HTMLCollection` |
| `document.getElementsByTagName("p")` | Live `HTMLCollection` |

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2 id="title">Fruits</h2>
  <ul>
    <li class="item">Apple</li>
    <li class="item">Banana</li>
    <li class="item special">Mango</li>
  </ul>
  <p id="out"></p>

  <script>
    const title = document.getElementById("title");
    const first = document.querySelector(".item");
    const all = document.querySelectorAll(".item");
    const special = document.querySelector("ul .special");

    const names = [];
    all.forEach(li => names.push(li.textContent));

    document.getElementById("out").textContent =
      `${title.textContent}: first = ${first.textContent}, total = ${all.length}, special = ${special.textContent}, all = ${names.join(", ")}`;
  </script>
</body>
</html>
```

**Remember**

* `querySelector` uses **CSS selectors**: `#id`, `.class`, `tag`, `ul li`, `[type="text"]`.
* A missing element gives `null`; calling a method on it causes `TypeError`. Check first.
* `querySelectorAll` returns a static **NodeList** (has `forEach`). Use `[...list]` to get a real array for `map` and `filter`.
* Store the result in a variable instead of selecting again and again.

---

## 3. Changing Content, Attributes and Styles (7.3)

**Core idea:** Once you have an element, you can change what it shows, how it is marked up and how it looks.

| Property | Use |
| --- | --- |
| `textContent` | Set or read **plain text** (safe) |
| `innerHTML` | Set or read **HTML** (risky with user input) |
| `value` | Read or set a form field |
| `getAttribute` / `setAttribute` / `removeAttribute` | Work with any attribute |
| `classList.add/remove/toggle/contains` | Work with CSS classes |
| `style.property` | Set inline style (camelCase) |
| `dataset.name` | Read `data-name` attributes |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .highlight { background: #ffe9b8; padding: 8px; border-radius: 6px; }
  </style>
</head>
<body>
  <p id="msg" data-level="beginner">Hello!</p>
  <a id="link" href="#">Link</a>
  <br><br>
  <button id="textBtn">Change text</button>
  <button id="classBtn">Toggle class</button>
  <button id="styleBtn">Change style</button>
  <button id="attrBtn">Change link</button>

  <script>
    const msg = document.getElementById("msg");
    const link = document.getElementById("link");

    document.getElementById("textBtn").addEventListener("click", () => {
      msg.textContent = "Level: " + msg.dataset.level;
    });

    document.getElementById("classBtn").addEventListener("click", () => {
      msg.classList.toggle("highlight");
    });

    document.getElementById("styleBtn").addEventListener("click", () => {
      msg.style.color = "crimson";
      msg.style.fontSize = "24px";
    });

    document.getElementById("attrBtn").addEventListener("click", () => {
      link.setAttribute("href", "https://example.com");
      link.textContent = "Now points to example.com";
    });
  </script>
</body>
</html>
```

**Remember**

* Prefer `textContent` for user data. `innerHTML` can run harmful HTML.
* Prefer **changing classes** over inline styles; keep design in CSS.
* CSS `background-color` becomes `style.backgroundColor` in JavaScript.
* `data-user-id` becomes `dataset.userId`.

---

## 4. Creating, Adding and Removing Elements (7.4)

**Core idea:** Build elements in memory, then place them on the page.

| Task | Code |
| --- | --- |
| Create | `document.createElement("li")` |
| Add to the end / start | `parent.append(el)` / `parent.prepend(el)` |
| Add before / after | `el.before(newEl)` / `el.after(newEl)` |
| Remove | `el.remove()` |
| Copy | `el.cloneNode(true)` |
| Insert HTML text | `el.insertAdjacentHTML("beforeend", html)` |
| Clear children | `parent.replaceChildren()` |

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <input id="itemInput" placeholder="New item">
  <button id="addBtn">Add</button>
  <ul id="list"></ul>

  <script>
    const input = document.getElementById("itemInput");
    const list = document.getElementById("list");

    document.getElementById("addBtn").addEventListener("click", () => {
      const text = input.value.trim();
      if (text === "") return;

      const li = document.createElement("li");
      li.textContent = text + " ";

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => li.remove());

      li.append(removeBtn);
      list.append(li);

      input.value = "";
      input.focus();
    });
  </script>
</body>
</html>
```

**Remember**

* Create, fill, then add. Adding many items one by one is slower than building them together (use a `DocumentFragment` or build a string).
* `el.remove()` deletes the element itself.
* `cloneNode(true)` copies children too; `cloneNode(false)` copies only the element.
* Adding a new element does not attach listeners; add them yourself, or use delegation (Chapter 8).

---

## 5. Events and Event Listeners (7.5)

**Core idea:** An **event** is something that happens (click, key press, submit). A **listener** is a function that runs when it happens.

```text
element.addEventListener("eventName", callbackFunction);
```

| Event | Fires when |
| --- | --- |
| `click` | Element is clicked |
| `dblclick` | Double-clicked |
| `input` | Value changes (every keystroke) |
| `change` | Value is committed (blur, select change) |
| `submit` | A form is submitted |
| `keydown` / `keyup` | A key is pressed / released |
| `mouseover` / `mouseout` | Pointer enters / leaves |
| `DOMContentLoaded` | HTML is loaded and parsed |

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <button id="clickBtn">Click me</button>
  <input id="typeInput" placeholder="Type here">
  <p id="live">You typed: </p>
  <p id="info">Event info appears here</p>

  <a id="blocked" href="https://example.com">A link that does nothing</a>

  <script>
    const info = document.getElementById("info");

    document.getElementById("clickBtn").addEventListener("click", (event) => {
      info.textContent = `Type: ${event.type}, target: ${event.target.id}`;
    }, { once: false });

    document.getElementById("typeInput").addEventListener("input", (event) => {
      document.getElementById("live").textContent = "You typed: " + event.target.value;
    });

    document.getElementById("blocked").addEventListener("click", (event) => {
      event.preventDefault();
      info.textContent = "Link click was prevented";
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") info.textContent = "Escape pressed";
    });
  </script>
</body>
</html>
```

| Event object | Meaning |
| --- | --- |
| `event.target` | The element that was actually clicked |
| `event.type` | The event name |
| `event.key` | Which key was pressed |
| `event.preventDefault()` | Stop the default action (link, form submit) |

**Remember**

* Pass the function **without** parentheses: `addEventListener("click", handler)`.
* One element can have **many** listeners for the same event.
* Remove a listener with `removeEventListener` (needs the **same function reference**).
* Use `{ once: true }` for a listener that should run only once.
* Prefer `addEventListener` to inline `onclick="..."` attributes.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Select by id | `document.getElementById("id")` |
| First / all matches | `querySelector(".x")` / `querySelectorAll(".x")` |
| Set text | `el.textContent = "Hi"` |
| Read input | `input.value` |
| Add / remove class | `el.classList.add("on")` / `.remove("on")` |
| Toggle class | `el.classList.toggle("on")` |
| Set attribute | `el.setAttribute("href", url)` |
| Inline style | `el.style.color = "red"` |
| Create element | `document.createElement("div")` |
| Add / remove | `parent.append(el)` / `el.remove()` |
| Listen | `el.addEventListener("click", fn)` |
| Stop default | `event.preventDefault()` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `Cannot read properties of null` | Wrong selector, or script runs before the HTML; check `null` |
| Script placed in `<head>` without `defer` | Move to end of `<body>` or add `defer` |
| `innerHTML` with user input | Use `textContent` |
| `addEventListener("click", fn())` | Pass `fn` without `()` |
| Treating a `NodeList` like an array | Use `forEach` or `[...list]` |
| Form reloads the page | `event.preventDefault()` in the submit handler |
| `input.value` is a string | Convert: `Number(input.value)` |
| New elements have no listeners | Add listeners when creating them, or use delegation |
| Using `class` instead of `className` | Prefer `classList` |

---

## Last-Minute Checklist

* ✅ I can explain the DOM as a tree.
* ✅ I can select one or many elements with CSS selectors.
* ✅ I know `textContent` vs `innerHTML`.
* ✅ I can toggle classes and change attributes.
* ✅ I can create, append and remove an element.
* ✅ I can attach a click listener and use `event.target`.
* ✅ I know when to use `preventDefault()`.

---

## Quiz: Rapid Fire 🧠

1. Which method returns the **first** element matching a CSS selector?

- [ ] `getElementsByClassName`
- [x] `querySelector`
- [ ] `querySelectorAll`
- [ ] `findElement`

2. Which property should you use to put user text on the page safely?

- [ ] `innerHTML`
- [x] `textContent`
- [ ] `outerHTML`
- [ ] `write`

3. How do you toggle a CSS class named `active` on an element?

- [ ] `el.class.toggle("active")`
- [ ] `el.toggle("active")`
- [x] `el.classList.toggle("active")`
- [ ] `el.style.toggle("active")`

4. What does `event.preventDefault()` do on a form submit?

- [ ] Deletes the form
- [x] Stops the page from reloading or navigating
- [ ] Clears all inputs
- [ ] Stops all other listeners

5. What does `document.querySelector(".missing")` return when nothing matches?

- [ ] `undefined`
- [ ] An empty array
- [x] `null`
- [ ] `false`

6. Which call correctly adds a click listener?

- [ ] `btn.addEventListener("click", handler())`
- [ ] `btn.onClick(handler)`
- [x] `btn.addEventListener("click", handler)`
- [ ] `btn.listen("click", handler)`
