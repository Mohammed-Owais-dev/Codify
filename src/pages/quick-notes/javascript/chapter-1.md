# Quick Notes: Chapter 1 - Introduction to JavaScript

> ⏱ **10-minute revision.** Read the Chapter Map first, then scan each section's **Remember** list. Use the Cheat Sheet and Quiz at the end to test yourself.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 1.1 | What is JavaScript? | The programming language of the web; runs in browsers and Node.js |
| 1.2 | Features and Uses | Dynamic, interpreted, event-driven, single-threaded; websites, apps, servers, games |
| 1.3 | JavaScript with HTML and CSS | HTML = structure, CSS = style, JS = behavior |
| 1.4 | Setup and VS Code | Browser console, Node.js, VS Code, Live Server |
| 1.5 | First Program | `console.log()`, comments, running a file |

---

## 1. What is JavaScript? (1.1)

**Core idea:** JavaScript is a lightweight, high-level programming language that makes web pages **interactive**.

* Created in **1995** by **Brendan Eich** at Netscape.
* Standardized as **ECMAScript** (ES6 / ES2015 was the big modern update).
* Runs in **browsers** (client side) and in **Node.js** (server side).
* **JavaScript is not Java.** They are different languages.

**Remember**

* Every browser has a built-in JavaScript engine (Chrome uses **V8**).
* Node.js lets JavaScript run **outside** the browser.
* JavaScript files use the `.js` extension.

---

## 2. Features and Uses (1.2)

**Core idea:** JavaScript is flexible, easy to start with and used almost everywhere.

| Feature | Meaning |
| --- | --- |
| Interpreted | Runs line by line; no manual compile step |
| Dynamically typed | A variable can hold any type, and the type can change |
| Event-driven | Reacts to clicks, typing, timers and more |
| Single-threaded | Runs one task at a time (async code avoids blocking) |
| Multi-paradigm | Supports procedural, object-oriented and functional styles |
| First-class functions | Functions are values and can be passed around |
| Case-sensitive | `name` and `Name` are different |

```javascript
let value = 10;
console.log(typeof value);

value = "ten";
console.log(typeof value);
```

```output
number
string
```

**Where JavaScript is used**

| Area | Example |
| --- | --- |
| Websites | Menus, sliders, form checks, live updates |
| Web apps | React, Vue, Angular |
| Servers | Node.js, Express |
| Mobile apps | React Native |
| Desktop apps | Electron (VS Code is built with it) |
| Games | Browser games, Canvas, WebGL |

---

## 3. JavaScript with HTML and CSS (1.3)

**Core idea:** The three web languages work as a team.

| Language | Job | Analogy |
| --- | --- | --- |
| HTML | Structure and content | Skeleton |
| CSS | Style and layout | Skin and clothes |
| JavaScript | Behavior and logic | Muscles and brain |

**Three ways to add JavaScript**

* **Inline:** inside an attribute, such as `onclick="..."` (avoid in real projects).
* **Internal:** inside a `<script>` tag in the HTML file.
* **External:** a separate file linked with `<script src="app.js"></script>` (**best practice**).

Press **Run** to see all three languages working together.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    #box { padding: 12px; background: #eef4ff; border-radius: 8px; }
    .active { background: #ffe9b8 !important; }
  </style>
</head>
<body>
  <p id="box">Click the button to change me.</p>
  <button id="btn">Change</button>

  <script>
    document.getElementById("btn").addEventListener("click", () => {
      const box = document.getElementById("box");
      box.textContent = "JavaScript changed this text!";
      box.classList.add("active");
    });
  </script>
</body>
</html>
```

**Remember**

* Put `<script>` at the **end of `<body>`**, or use `defer` in the head, so the HTML loads first.
* JavaScript reaches the page through the **DOM** (`document`).
* Use `type="module"` when using `import` and `export`.

---

## 4. Setting Up JavaScript and VS Code (1.4)

**Core idea:** You only need a browser and a code editor to begin.

| Tool | Purpose |
| --- | --- |
| Browser Console | Test code instantly (`F12`) |
| Node.js | Run `.js` files outside the browser |
| VS Code | Code editor with highlighting and auto-complete |
| Live Server (extension) | Reloads the page automatically on save |
| Prettier (extension) | Formats code neatly |

**Quick commands**

```text
node --version         check that Node.js is installed
node app.js            run a JavaScript file
```

**Typical project folder**

```text
my-project/
├── index.html
├── style.css
└── script.js
```

**Remember**

* Open **DevTools** with `F12` or `Ctrl + Shift + I` (`Cmd + Option + I` on Mac).
* Save the file (`Ctrl + S`) before refreshing or running.
* Open the **folder** in VS Code, not just a single file.

---

## 5. Your First JavaScript Program (1.5)

**Core idea:** `console.log()` prints a value so you can see what your code does.

```javascript
// This is a single-line comment
console.log("Hello, World!");

/* This is a
   multi-line comment */
console.log(2 + 3);
console.log("Age:", 20);
```

```output
Hello, World!
5
Age: 20
```

**Ways to show output**

| Method | Where it appears | Use |
| --- | --- | --- |
| `console.log()` | Browser console / terminal | Debugging and learning |
| `alert()` | Popup box | Simple message |
| `element.textContent` | On the page | Real user output |
| `document.write()` | On the page | Avoid; it can erase the page |

**Remember**

* Strings need quotes: `"text"` or `'text'`.
* Statements usually end with a semicolon `;`.
* `console.log()` accepts many values separated by commas.
* A program runs **from top to bottom**.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Print to console | `console.log("Hi")` |
| Single-line comment | `// comment` |
| Multi-line comment | `/* comment */` |
| Link an external script | `<script src="app.js"></script>` |
| Load a module script | `<script type="module" src="app.js"></script>` |
| Run a file in Node | `node app.js` |
| Open DevTools | `F12` |
| Check a type | `typeof value` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Confusing JavaScript with Java | They are separate languages |
| Script runs before the HTML exists | Place it at the end of `<body>` or use `defer` |
| Wrong file path in `src` | Check the folder and spelling |
| Forgetting to save before refresh | Press `Ctrl + S` |
| Mixing up `Name` and `name` | JavaScript is case-sensitive |
| Missing quotes around text | Wrap strings in `" "` or `' '` |

---

## Last-Minute Checklist

* ✅ I can explain what JavaScript is and where it runs.
* ✅ I know three features: dynamic typing, interpreted, event-driven.
* ✅ I know the roles of HTML, CSS and JavaScript.
* ✅ I can link an external script correctly.
* ✅ I can open the console and run `console.log()`.
* ✅ I can write both kinds of comments.

---

## Quiz: Rapid Fire 🧠

1. Who created JavaScript in 1995?

- [ ] Tim Berners-Lee
- [x] Brendan Eich
- [ ] James Gosling
- [ ] Linus Torvalds

2. Which tool lets JavaScript run outside the browser?

- [ ] VS Code
- [ ] Chrome
- [x] Node.js
- [ ] Live Server

3. What is the best way to add a lot of JavaScript to a website?

- [ ] Inline in every tag
- [x] An external `.js` file linked with `<script src>`
- [ ] Inside CSS
- [ ] Inside an image

4. Which language controls the behavior of a web page?

- [ ] HTML
- [ ] CSS
- [x] JavaScript
- [ ] Markdown

5. Which line prints a message to the console?

- [ ] `print("Hi")`
- [ ] `echo("Hi")`
- [x] `console.log("Hi")`
- [ ] `log.console("Hi")`

6. Which is a single-line comment?

- [ ] `<!-- note -->`
- [x] `// note`
- [ ] `# note`
- [ ] `** note **`
