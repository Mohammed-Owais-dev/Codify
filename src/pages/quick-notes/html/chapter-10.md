# Quick Notes: Chapter 10 - Projects & Next Horizons

> **10-minute revision.** Know how HTML connects to CSS and JavaScript, how to validate and debug a page, and how to plan and finish a capstone project.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 10.1 | Connecting to CSS | `<link rel="stylesheet">` in `<head>` adds style |
| 10.2 | Connecting to JavaScript | `<script src defer>` adds behaviour |
| 10.3 | Validation & Debugging | Use the W3C validator and DevTools to find and fix problems |
| 10.4 | Capstone Project | Combine structure, forms, tables and semantics into one page |

---

## 1. Connecting to CSS (10.1)

**Core idea:** HTML gives structure. **CSS** gives it style. There are three ways to add CSS.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Demo</title>
  <style>
    h1 { color: royalblue; }
    .note { background: #fff3cd; padding: 8px; }
  </style>
</head>
<body>
  <h1>Styled heading</h1>
  <p class="note">Styled by the internal style sheet.</p>
  <p style="color: crimson;">Styled inline.</p>
</body>
</html>
```

| Method | Code | Use |
| --- | --- | --- |
| External | `<link rel="stylesheet" href="css/style.css">` | **Best**: one file for many pages |
| Internal | `<style> ... </style>` in `<head>` | One page only |
| Inline | `style="color: red;"` | A quick one-off change |

**Remember**

* Put `<link rel="stylesheet">` in `<head>`.
* When rules conflict, **inline** beats internal and external. For equal rules, the **later** one wins.
* Use `class` for groups and `id` for one element. Select them with `.class` and `#id`.
* Keep CSS **out** of your HTML where you can.

---

## 2. Connecting to JavaScript (10.2)

**Core idea:** **JavaScript** makes a page react to the user. Add it with `<script>`.

```html
<button id="btn">Click me</button>
<p id="msg"></p>

<script>
  document.getElementById("btn").addEventListener("click", function () {
    document.getElementById("msg").textContent = "Hello from JavaScript!";
  });
</script>
```

**External file**

```html
<script src="js/app.js" defer></script>
```

| Attribute | Behaviour |
| --- | --- |
| none | Stops HTML parsing while the script downloads and runs |
| `defer` | Downloads while parsing, runs **after** the page is parsed, in order |
| `async` | Runs as soon as it is downloaded, order is **not** guaranteed |
| `type="module"` | Modern JavaScript module; deferred by default |

**Remember**

* Use `defer` on scripts in `<head>`. Or place `<script>` just before `</body>`.
* Give elements an `id` so JavaScript can find them.
* `<noscript>` shows a message to users with JavaScript turned off.
* The page must still make sense without JavaScript where possible.

---

## 3. Validation & Debugging (10.3)

**Core idea:** Check your code with tools. Do not guess.

| Tool | Use |
| --- | --- |
| W3C Validator (validator.w3.org) | Finds invalid HTML: unclosed tags, bad nesting, missing attributes |
| Browser DevTools (`F12`) | **Elements**: inspect the DOM. **Console**: errors. **Network**: failed files |
| Lighthouse (in DevTools) | Scores for accessibility, SEO, performance |
| Keyboard test | Use `Tab` to check every link and field can be reached |
| Mobile preview | Test narrow screens in DevTools |

**Common HTML errors**

| Error | Fix |
| --- | --- |
| Unclosed or wrongly nested tag | Close tags in the right order |
| Missing `alt` on `<img>` | Add `alt` |
| Duplicate `id` | Make every `id` unique |
| `<p>` inside `<p>`, or `<div>` inside `<p>` | Do not nest them: the browser closes the first `<p>` |
| `<li>` outside `<ul>` or `<ol>` | Put it inside a list |
| Missing `lang` or `<title>` | Add them |
| 404 on an image, CSS or JS file | Check the path and file name |

```html
<!-- Broken: wrong nesting -->
<p>Hello <b>world</p></b>

<!-- Fixed -->
<p>Hello <b>world</b></p>
```

**Remember**

* Read the **first** error first. Many later errors come from it.
* Right-click then **Inspect** to see what the browser really built.
* If a file does not load, open the Network tab and look for a red 404.

---

## 4. Capstone Project (10.4)

**Core idea:** Plan first, build in small steps, then check. A personal portfolio page uses most of what you learned.

| Phase | What to do |
| --- | --- |
| Plan | List the sections: About, Skills, Contact. Sketch the layout. |
| Build the skeleton | Boilerplate, then `header`, `main`, `footer` |
| Add content | Headings, paragraphs, lists, images with `alt` |
| Add data and input | A `table` for skills and a `form` for contact |
| Style and script | CSS file and optional JavaScript |
| Check | Validate, test with the keyboard and on a phone |

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Asha Rao | Portfolio</title>
  <meta name="description" content="Portfolio of Asha Rao, web developer in training.">
  <style>
    body { font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 1rem; }
    nav a { margin-right: 1rem; }
    table { border-collapse: collapse; }
    th, td { border: 1px solid #999; padding: 6px 10px; }
  </style>
</head>
<body>
  <header>
    <h1>Asha Rao</h1>
    <p>Web developer in training</p>
    <nav>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About</h2>
      <p>I build simple, <strong>accessible</strong> websites.</p>
    </section>

    <section id="skills">
      <h2>Skills</h2>
      <table>
        <caption>Skill levels</caption>
        <thead>
          <tr><th scope="col">Skill</th><th scope="col">Level</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">HTML</th><td>Advanced</td></tr>
          <tr><th scope="row">CSS</th><td>Intermediate</td></tr>
        </tbody>
      </table>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <form action="#" method="post">
        <p><label for="name">Name</label> <input type="text" id="name" name="name" required></p>
        <p><label for="email">Email</label> <input type="email" id="email" name="email" required></p>
        <p><label for="msg">Message</label><br>
           <textarea id="msg" name="msg" rows="3" cols="30"></textarea></p>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Asha Rao</p>
  </footer>
</body>
</html>
```

**Where to go next**

| Next step | Why |
| --- | --- |
| CSS | Layout with Flexbox and Grid, responsive design |
| JavaScript | Interactive pages and working with data |
| Git and GitHub | Save versions and publish your site |
| Accessibility | Build pages everyone can use |
| A framework | React or similar, after JavaScript basics |

**Remember**

* Finish a small project instead of starting a huge one.
* Re-use what you know: semantic layout, labelled forms, accessible tables.
* Publish your work, for example with GitHub Pages.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| External CSS | `<link rel="stylesheet" href="style.css">` |
| Internal CSS | `<style>...</style>` |
| Inline CSS | `style="color: red;"` |
| External JS | `<script src="app.js" defer></script>` |
| Inline JS | `<script>...</script>` |
| Fallback for no JS | `<noscript>Message</noscript>` |
| Open DevTools | `F12` |
| Check HTML | validator.w3.org |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Wrong path in `href` or `src` | Check folders and file names, then the Network tab |
| `<link>` placed in `<body>` | Put it in `<head>` |
| Script runs before the elements exist | Use `defer` or place the script before `</body>` |
| Putting all CSS inline | Move it to an external file |
| Never validating the page | Run the W3C validator |
| Testing only on a desktop | Test a phone-size screen too |
| Starting the capstone without a plan | List sections and sketch first |

---

## Last-Minute Checklist

* I can connect CSS in the three ways and know the best one.
* I can add JavaScript with `<script>` and `defer`.
* I can validate a page and read DevTools.
* I can fix common errors: nesting, missing `alt`, duplicate `id`, bad paths.
* I can plan and build a small multi-section page.

---

## Quiz: Rapid Fire

1. Which tag links an external CSS file?

- [ ] `<style>`
- [ ] `<css>`
- [x] `<link>`
- [ ] `<script>`

2. Which attribute runs a script after the HTML is parsed, in order?

- [ ] `async`
- [x] `defer`
- [ ] `wait`
- [ ] `later`

3. Where does `<link rel="stylesheet">` belong?

- [ ] In the `<footer>`
- [ ] Right before `</body>`
- [x] In the `<head>`
- [ ] Inside a `<p>`

4. Which tool checks your HTML for errors?

- [ ] A spell checker
- [x] The W3C Validator
- [ ] A file manager
- [ ] An image editor

5. Which key opens the browser's DevTools?

- [ ] `F1`
- [ ] `F5`
- [x] `F12`
- [ ] `Esc`

6. Which habit helps most before you call a project finished?

- [ ] Delete all comments
- [ ] Add more inline styles
- [x] Validate it and test with the keyboard and on a phone
- [ ] Remove all `alt` text
