# Quick Notes: Chapter 1 - Introduction to CSS

> **10-minute revision.** Know what CSS is, how it styles HTML, the three ways to add it, the syntax of a CSS rule, and how to set up a comfortable workspace.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 1.1 | What is CSS? | Cascading Style Sheets control how HTML looks |
| 1.2 | How CSS Works with HTML | Selectors pick elements; declarations style them |
| 1.3 | Ways to Add CSS | Inline, internal (`<style>`) and external (`.css` file) |
| 1.4 | CSS Syntax, Rules and Comments | `selector { property: value; }` and `/* comments */` |
| 1.5 | Setting Up Your CSS Workspace | VS Code, folders, Live Server and browser DevTools |

---

## 1. What is CSS? (1.1)

**Core idea:** **CSS (Cascading Style Sheets)** is the language that controls the **appearance** of a web page: colors, fonts, spacing and layout.

| Language | Job | Example |
| --- | --- | --- |
| HTML | **Structure** and content | Headings, paragraphs, links |
| CSS | **Presentation** and layout | Colors, sizes, positions |
| JavaScript | **Behavior** | Clicks, forms, updates |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .plain { margin: 0 0 12px; }
    .styled { color: white; background: #0f766e; padding: 12px; border-radius: 8px; }
  </style>
</head>
<body>
  <h3 class="plain">Plain heading (browser defaults)</h3>
  <h3 class="styled">Styled heading (CSS applied)</h3>
</body>
</html>
```

**What CSS can control**

* Colors, backgrounds and fonts
* Spacing, borders and sizes
* Layout: columns, grids, positioning
* Animations and hover effects
* Different looks for phones and desktops

**Remember**

* CSS is **not** a programming language. It is a **style sheet language**.
* **Cascading** means that when rules conflict, CSS has rules to decide which one wins.
* Keep **content in HTML** and **style in CSS**.

---

## 2. How CSS Works with HTML (1.2)

**Core idea:** CSS uses a **selector** to choose HTML elements and **declarations** to style them.

```text
p {                     <- selector: which elements
  color: blue;          <- declaration: property: value;
  font-size: 18px;      <- another declaration
}
```

**How the browser uses your code**

```text
HTML  ->  DOM tree  ─┐
                     ├─>  Render tree  ->  Layout  ->  Paint (what you see)
CSS   ->  CSSOM    ──┘
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    h2 { color: #1d4ed8; }
    .highlight { background: #fef08a; padding: 2px 6px; }
  </style>
</head>
<body>
  <h2>Selectors at work</h2>
  <p>The <span class="highlight">class</span> picks only this word.</p>
  <p>The <code>h2</code> rule styled the heading above.</p>
</body>
</html>
```

**Remember**

* Browsers have **default styles** (such as bold headings and blue links). Your CSS overrides them.
* HTML attributes `class` and `id` give CSS something to target.
* If no selector matches an element, the rule simply does nothing.

---

## 3. Ways to Add CSS (1.3)

**Core idea:** There are three ways to attach CSS to HTML.

| Method | Where | Best for |
| --- | --- | --- |
| **Inline** | `style="..."` on one element | Quick tests, rare one-off overrides |
| **Internal** | `<style>` in the `<head>` | One-page demos |
| **External** | A separate `.css` file linked with `<link>` | **Real websites** (recommended) |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p { color: green; font-family: Arial, sans-serif; }
  </style>
</head>
<body style="padding: 16px;">
  <p>Internal style: green text.</p>
  <p style="color: crimson;">Inline style: red text (it wins over the internal rule).</p>
</body>
</html>
```

**Linking an external stylesheet**

```text
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

| Method | Pros | Cons |
| --- | --- | --- |
| Inline | Highest priority | Hard to maintain; cannot reuse |
| Internal | Simple | Only one page can use it |
| External | One file styles the **whole site**; the browser caches it | Needs an extra file request |

**Remember**

* `<link>` goes in `<head>` and has **no closing tag**.
* The path in `href` must be correct, or no styles load.
* When rules conflict, **inline** beats internal and external (unless `!important` is used).
* If internal and external have the **same specificity**, the one that comes **later** wins.

---

## 4. CSS Syntax, Rules and Comments (1.4)

**Core idea:** A CSS **rule** = selector + a block of declarations. Each declaration is `property: value;`.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Style the card */
    .card {
      background: #f1f5f9;      /* light gray */
      padding: 16px;
      border: 2px solid #94a3b8;
      border-radius: 8px;
      font-family: Arial, sans-serif;
    }

    /* Group two selectors in one rule */
    h3, p { margin: 0 0 8px; }
  </style>
</head>
<body style="padding: 16px;">
  <div class="card">
    <h3>CSS Rule</h3>
    <p>Properties and values are separated by a colon.</p>
  </div>
</body>
</html>
```

| Part | Example | Meaning |
| --- | --- | --- |
| Selector | `.card` | Which elements to style |
| Declaration block | `{ ... }` | All the styles for that selector |
| Property | `padding` | What to change |
| Value | `16px` | What to change it to |

**Comments**

```text
/* This is a one-line comment */

/*
   This comment
   spans several lines
*/
```

**Useful syntax facts**

| Fact | Detail |
| --- | --- |
| End each declaration | with a semicolon `;` |
| Several values | separated by spaces: `margin: 10px 20px;` |
| Several selectors | separated by commas: `h1, h2 { }` |
| Whitespace | ignored, so format for readability |
| Property names | case-insensitive, but write them in lowercase |

**Remember**

* CSS comments are **`/* ... */` only**. `//` and `<!-- -->` do **not** work in CSS.
* A missing semicolon or brace can break **the next rule** too.
* An unknown property or invalid value is **ignored**; the rest of the file still works.

---

## 5. Setting Up Your CSS Workspace (1.5)

**Core idea:** You need a **code editor**, a **browser** and a tidy **folder**.

**Recommended tools**

| Tool | Use |
| --- | --- |
| **VS Code** | Code editor |
| **Live Server** extension | Reloads the page automatically when you save |
| **Chrome / Edge / Firefox** | Test and inspect pages |
| **DevTools** (`F12`) | Inspect and edit styles live |

**Simple project structure**

```text
my-website/
├── index.html
├── css/
│   └── style.css
└── images/
    └── logo.png
```

**Starter page**

```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>Hello CSS</h1>
</body>
</html>
```

**DevTools tips**

* Right-click an element and choose **Inspect**.
* The **Styles** panel shows every rule that applies, and crossed-out ones that lost.
* Change values or tick boxes to test ideas. Changes are **temporary** until you copy them into your file.
* The **Computed** tab shows the final value of every property.

**Remember**

* Save the file (`Ctrl + S`) before refreshing.
* Use **lowercase** file names without spaces: `style.css`.
* Do a **hard refresh** (`Ctrl + Shift + R`) if the browser still shows old CSS.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Rule | `selector { property: value; }` |
| Comment | `/* note */` |
| Inline style | `<p style="color: red;">` |
| Internal style | `<style> p { color: red; } </style>` |
| External style | `<link rel="stylesheet" href="style.css">` |
| Group selectors | `h1, h2 { color: navy; }` |
| Class selector | `.card { }` |
| ID selector | `#header { }` |
| Open DevTools | `F12` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Using `//` for comments | Use `/* ... */` |
| Missing semicolon | End every declaration with `;` |
| Writing `color = red` | CSS uses a colon: `color: red;` |
| Wrong `href` path to the stylesheet | Check the folder and file name |
| `<link>` placed in `<body>` | Put it in `<head>` |
| Forgetting `.` before a class | `.card`, not `card` |
| Editing the file but not saving | Save, then refresh |
| Overusing inline styles | Move styles into a stylesheet |
| Missing `}` | Match every `{` with a `}` |

---

## Last-Minute Checklist

* I can explain what CSS is and what it controls.
* I can name the parts of a CSS rule.
* I know the three ways to add CSS and which one to use for real sites.
* I can write a CSS comment correctly.
* I can link an external stylesheet.
* I know how to inspect an element in DevTools.

---

## Quiz: Rapid Fire

1. What does CSS stand for?

- [ ] Creative Style System
- [ ] Computer Style Sheets
- [x] Cascading Style Sheets
- [ ] Colorful Style Syntax

2. Which tag links an external stylesheet?

- [ ] `<style>`
- [x] `<link>`
- [ ] `<script>`
- [ ] `<css>`

3. How do you write a CSS comment?

- [ ] `// comment`
- [ ] `<!-- comment -->`
- [x] `/* comment */`
- [ ] `# comment`

4. In `p { color: red; }`, what is `color`?

- [ ] The selector
- [x] The property
- [ ] The value
- [ ] The comment

5. Which way of adding CSS is best for a large website?

- [ ] Inline styles
- [ ] Internal `<style>` tags
- [x] An external `.css` file
- [ ] Styles inside `<body>`

6. Which character ends a CSS declaration?

- [ ] `:`
- [x] `;`
- [ ] `,`
- [ ] `.`
