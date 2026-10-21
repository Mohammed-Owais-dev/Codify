# Quick Notes: Chapter 2 - Document Anatomy & Structure

> **10-minute revision.** Know the parts of a tag, the standard boilerplate every page starts with, the metadata that goes in `<head>`, and how to keep your code clean.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 2.1 | Tags, Elements & Attributes | Tags wrap content, elements are the whole piece, attributes add extra details |
| 2.2 | The Boilerplate | `DOCTYPE`, `html`, `head` and `body` form the skeleton of every page |
| 2.3 | Metadata Essentials | `title`, `charset`, `viewport` and `description` live in `<head>` |
| 2.4 | Code Formatting & Comments | Indent, use lowercase, quote attributes and add `<!-- comments -->` |

---

## 1. Tags, Elements & Attributes (2.1)

**Core idea:** A **tag** is a label in angle brackets. An **element** is the opening tag, the content and the closing tag together.

```html
<p class="intro" id="first">Hello, <strong>HTML</strong>!</p>
```

| Part | In the example |
| --- | --- |
| Opening tag | `<p ...>` |
| Attribute | `class="intro"` (name + value) |
| Content | `Hello, HTML!` |
| Closing tag | `</p>` |
| Element | The whole line |

**Empty (void) elements** have no content and no closing tag.

```html
<p>Line one<br>Line two</p>
<hr>
<input type="text" placeholder="Type here">
```

Common void elements: `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>`, `<link>`.

**Block and inline elements**

| Type | Behaviour | Examples |
| --- | --- | --- |
| Block | Starts on a new line and takes full width | `<div>`, `<p>`, `<h1>`, `<ul>` |
| Inline | Stays in the line and takes only its own width | `<span>`, `<a>`, `<strong>`, `<img>` |

```html
<div>Block one</div>
<div>Block two</div>
<span>Inline one</span>
<span>Inline two</span>
```

**Global attributes** work on almost every element.

| Attribute | Use |
| --- | --- |
| `id` | A unique name for one element |
| `class` | A shared name for a group of elements |
| `style` | Inline CSS |
| `title` | Tooltip text on hover |
| `lang` | Language of the content |
| `hidden` | Hides the element |

**Remember**

* Attributes go in the **opening tag** only, as `name="value"`.
* **Nest** tags properly: close the inner tag before the outer one.
* An `id` must be **unique** on the page. A `class` can repeat.

---

## 2. The Boilerplate (2.2)

**Core idea:** Every HTML5 page starts with the same skeleton.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
</head>
<body>
  <h1>Visible content goes here</h1>
</body>
</html>
```

| Part | Role |
| --- | --- |
| `<!DOCTYPE html>` | Declares HTML5 (not a tag, a declaration) |
| `<html lang="en">` | Root element of the page |
| `<head>` | Metadata: title, character set, links to CSS |
| `<meta charset="UTF-8">` | Correct display of all characters |
| `<meta name="viewport" ...>` | Makes the page scale properly on phones |
| `<title>` | Text on the browser tab |
| `<body>` | All visible content |

**Remember**

* `<head>` is **not shown** on the page. `<body>` is.
* Put `<meta charset="UTF-8">` as the **first** thing in `<head>`.
* Always set `lang` on `<html>`. Screen readers and translators use it.
* Without the viewport tag, mobile pages look tiny and zoomed out.

---

## 3. Metadata Essentials (2.3)

**Core idea:** **Metadata** is information about the page. Browsers, search engines and social sites read it.

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pizza Palace | Best Pizza in Town</title>
  <meta name="description" content="Fresh wood-fired pizza delivered in 30 minutes.">
  <meta name="author" content="Asha Rao">
  <link rel="icon" href="favicon.ico">
</head>
```

| Tag | Purpose |
| --- | --- |
| `<title>` | Browser tab, bookmarks and search result headline |
| `<meta name="description">` | Summary shown under the title in search results |
| `<meta name="author">` | Who wrote the page |
| `<meta name="robots">` | Tells search engines to index or not (`noindex`) |
| `<link rel="icon">` | The small tab icon (favicon) |
| `<link rel="stylesheet">` | Connects a CSS file |

**Remember**

* Keep the title short, around **50 to 60 characters**. Make each page title different.
* Keep the description around **150 to 160 characters**.
* Search engines ignore `<meta name="keywords">`, so you do not need it.
* Metadata goes only in `<head>`.

---

## 4. Code Formatting & Comments (2.4)

**Core idea:** Clean code is easier to read, debug and share.

```html
<!-- Main navigation starts here -->
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
</nav>

<!-- <p>This line is switched off</p> -->
<p>This line is visible.</p>
```

| Good habit | Example |
| --- | --- |
| Indent child elements | 2 or 4 spaces, same size everywhere |
| Lowercase tags and attributes | `<p class="note">` |
| Quote attribute values | `class="note"` |
| Close every non-void element | `<p>...</p>` |
| One idea per line | Put each `<li>` on its own line |
| Comment sections | `<!-- Footer -->` |

**Whitespace rule:** The browser collapses many spaces and line breaks into **one space**.

```html
<p>This     text
has    extra      spaces.</p>
```

**Remember**

* Comment syntax is `<!-- comment -->`. Comments are **not shown** but anyone can read them in View Source.
* Use comments to **switch off** code while testing.
* Comments cannot be nested inside other comments.
* Never put passwords or secrets in comments.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Element with attribute | `<a href="page.html">Link</a>` |
| Empty element | `<br>` |
| Page skeleton | `<!DOCTYPE html>` + `<html>` + `<head>` + `<body>` |
| Language | `<html lang="en">` |
| Character set | `<meta charset="UTF-8">` |
| Mobile scaling | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| Tab title | `<title>Text</title>` |
| Search description | `<meta name="description" content="...">` |
| Comment | `<!-- note -->` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Wrong nesting: `<b><i>text</b></i>` | Close in order: `<b><i>text</i></b>` |
| Forgetting a closing tag | Close every non-void element |
| Duplicate `id` values | Make each `id` unique |
| Missing `<title>` | Add one inside `<head>` |
| Attribute value without quotes | Write `class="note"` |
| Visible content inside `<head>` | Move it into `<body>` |
| Missing the viewport meta tag | Add it for mobile layouts |
| Using many `&nbsp;` for spacing | Use CSS for spacing |

---

## Last-Minute Checklist

* I can name the parts of an element: opening tag, content, closing tag, attributes.
* I can list 4 empty elements.
* I can write the boilerplate from memory.
* I know what `charset`, `viewport`, `title` and `description` do.
* I can write and use an HTML comment.
* I indent my code and use lowercase.

---

## Quiz: Rapid Fire

1. Which of these is an empty (void) element?

- [ ] `<p>`
- [ ] `<div>`
- [x] `<br>`
- [ ] `<h1>`

2. Which tag should carry the `lang="en"` attribute?

- [ ] `<head>`
- [ ] `<body>`
- [ ] `<title>`
- [x] `<html>`

3. Which element sets the text shown on the browser tab?

- [x] `<title>`
- [ ] `<h1>`
- [ ] `<header>`
- [ ] `<meta>`

4. How do you write an HTML comment?

- [ ] `// comment`
- [ ] `/* comment */`
- [x] `<!-- comment -->`
- [ ] `# comment`

5. What is the first line of an HTML5 page?

- [ ] `<html>`
- [ ] `<head>`
- [x] `<!DOCTYPE html>`
- [ ] `<body>`

6. Which meta tag makes a page scale correctly on phones?

- [ ] `charset`
- [ ] `description`
- [x] `viewport`
- [ ] `author`
