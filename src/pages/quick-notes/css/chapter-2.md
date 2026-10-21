# Quick Notes: Chapter 2 - Selectors and the Cascade

> **10-minute revision.** Know how to target elements with element, class, ID, attribute and combinator selectors, how pseudo-classes and pseudo-elements work, and how the cascade, specificity and inheritance decide which style wins.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 2.1 | Element, Class and ID Selectors | `p`, `.class`, `#id` |
| 2.2 | Grouping and Universal Selectors | `h1, h2` and `*` |
| 2.3 | Attribute and Combinator Selectors | `[type="text"]`, descendant, child, sibling |
| 2.4 | Pseudo-Classes and Pseudo-Elements | `:hover`, `:nth-child()`, `::before` |
| 2.5 | Cascade, Specificity and Inheritance | Which rule wins, and which values pass down |

---

## 1. Element, Class and ID Selectors (2.1)

**Core idea:** Three basic ways to pick elements: by **tag name**, by **class**, and by **ID**.

| Selector | Syntax | Matches | Reuse |
| --- | --- | --- | --- |
| Element | `p` | Every `<p>` | Many |
| Class | `.note` | `class="note"` | **Many** elements |
| ID | `#title` | `id="title"` | **One** element per page |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    p { color: #334155; }
    .note { background: #fef9c3; padding: 6px 10px; border-left: 4px solid #eab308; }
    #title { color: #0f766e; }
  </style>
</head>
<body>
  <h2 id="title">Basic selectors</h2>
  <p>Plain paragraph (element selector).</p>
  <p class="note">Paragraph with a class.</p>
  <p class="note">Another paragraph with the same class.</p>
</body>
</html>
```

**Multiple classes and combined selectors**

```text
<p class="note urgent">...</p>   ->  an element can have several classes

p.note { }          ->  a <p> that also has class "note"
.note.urgent { }    ->  an element with BOTH classes (no space)
```

**Remember**

* Class selector starts with a **dot** `.`. ID selector starts with a **hash** `#`.
* An `id` must be **unique** on the page. Use classes for repeated styling.
* Class names are **case-sensitive** and cannot start with a digit.
* Prefer **classes** for styling; use IDs for page anchors and JavaScript.

---

## 2. Grouping and Universal Selectors (2.2)

**Core idea:** Use a **comma** to share one rule among several selectors. Use `*` to select **everything**.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: Arial, sans-serif; padding: 16px; }
    h1, h2, h3 { color: #7c3aed; margin-bottom: 8px; }
    .box * { color: #b91c1c; }
  </style>
</head>
<body>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <div class="box">
    <p>Everything inside .box is red.</p>
    <span>Even this span.</span>
  </div>
</body>
</html>
```

| Selector | Meaning |
| --- | --- |
| `h1, h2, h3` | Any of these three (grouping) |
| `*` | Every element |
| `.box *` | Every element **inside** `.box` |
| `*, *::before, *::after` | Everything, including generated content |

**Common reset**

```text
*, *::before, *::after {
  box-sizing: border-box;
}
```

**Remember**

* In a group, **each** selector must be complete: `h1, .note`, not `h1 .note` (a space means "inside").
* One invalid selector in a group **invalidates the whole rule** in older browsers.
* `*` has **no specificity**, so any other rule overrides it.

---

## 3. Attribute and Combinator Selectors (2.3)

**Core idea:** **Attribute selectors** match by an attribute. **Combinators** match by **relationship** between elements.

**Attribute selectors**

| Selector | Matches |
| --- | --- |
| `[disabled]` | Has the attribute |
| `[type="text"]` | Attribute equals the value |
| `[href^="https"]` | Value **starts with** |
| `[href$=".pdf"]` | Value **ends with** |
| `[class*="btn"]` | Value **contains** |

**Combinators**

| Combinator | Syntax | Matches |
| --- | --- | --- |
| Descendant | `div p` | Any `<p>` inside a `<div>` (any depth) |
| Child | `div > p` | `<p>` that is a **direct** child |
| Adjacent sibling | `h2 + p` | The `<p>` right **after** an `<h2>` |
| General sibling | `h2 ~ p` | **All** following `<p>` siblings |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    a[href$=".pdf"] { color: #dc2626; font-weight: bold; }
    input[type="text"] { border: 2px solid #0ea5e9; padding: 4px; }
    .box > p { color: #15803d; }
    h3 + p { background: #fef08a; }
  </style>
</head>
<body>
  <p><a href="guide.pdf">Download PDF</a> | <a href="index.html">Home</a></p>
  <p><input type="text" placeholder="Styled input"> <input type="number" placeholder="Not styled"></p>
  <div class="box">
    <p>Direct child (green)</p>
    <section><p>Nested child (not green)</p></section>
  </div>
  <h3>Title</h3>
  <p>Directly after the heading (yellow)</p>
  <p>Second paragraph (not yellow)</p>
</body>
</html>
```

**Remember**

* A **space** means descendant. `>` means **direct child only**.
* `+` selects **one** element. `~` selects **all** later siblings.
* Siblings must share the **same parent**, and `+` and `~` look **forward** only.

---

## 4. Pseudo-Classes and Pseudo-Elements (2.4)

**Core idea:** A **pseudo-class** (`:`) selects an element in a certain **state or position**. A **pseudo-element** (`::`) styles a **part** of an element.

**Common pseudo-classes**

| Pseudo-class | Matches |
| --- | --- |
| `:hover` | Mouse is over it |
| `:focus` / `:focus-visible` | Has keyboard or click focus |
| `:active` | Being pressed |
| `:first-child` / `:last-child` | First / last child of its parent |
| `:nth-child(2)` | The 2nd child |
| `:nth-child(odd)` / `(even)` / `(3n)` | Every odd / even / 3rd child |
| `:not(.x)` | Elements **without** class `x` |
| `:checked`, `:disabled` | Form states |

**Common pseudo-elements**

| Pseudo-element | Styles |
| --- | --- |
| `::before` / `::after` | Generated content before / after the element |
| `::first-letter` | The first letter |
| `::first-line` | The first line of text |
| `::selection` | Text highlighted by the user |
| `::placeholder` | Placeholder text in inputs |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    li:nth-child(even) { background: #e0f2fe; }
    li:last-child { font-weight: bold; }
    .btn { padding: 8px 14px; background: #2563eb; color: white; border: 0; border-radius: 6px; }
    .btn:hover { background: #1e40af; }
    .tag::before { content: "# "; color: #db2777; }
    p::first-letter { font-size: 32px; color: #0f766e; }
  </style>
</head>
<body>
  <button class="btn">Hover me</button>
  <ul>
    <li>One</li><li>Two (even)</li><li>Three</li><li>Four (even)</li><li>Five (last)</li>
  </ul>
  <p class="tag">Generated hash sign before this text.</p>
  <p>The first letter of this paragraph is large.</p>
</body>
</html>
```

**Remember**

* Pseudo-classes use **one colon**, pseudo-elements use **two** (`::before`).
* `::before` and `::after` **do nothing without the `content` property** (even `content: "";`).
* Generated content is **not selectable** and is invisible to many screen readers, so never put important text there.
* `:nth-child(n)` counts **all** children, not only elements of one type. Use `:nth-of-type` for that.

---

## 5. Cascade, Specificity and Inheritance (2.5)

**Core idea:** When several rules target the same property, the browser decides the winner using **importance, specificity and order**.

**Specificity score** (compare left to right)

| Selector type | Weight | Example |
| --- | --- | --- |
| Inline style | `1,0,0,0` | `style="..."` |
| ID | `0,1,0,0` | `#title` |
| Class, attribute, pseudo-class | `0,0,1,0` | `.note`, `[type]`, `:hover` |
| Element, pseudo-element | `0,0,0,1` | `p`, `::before` |
| Universal `*` | `0,0,0,0` | `*` |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    p { color: gray; }                 /* 0,0,0,1 */
    .note { color: green; }            /* 0,0,1,0 */
    p.note { color: blue; }            /* 0,0,1,1 */
    #special { color: crimson; }       /* 0,1,0,0 */
    .late { color: orange; }
    .late { color: purple; }           /* same score, later wins */
  </style>
</head>
<body>
  <p>Gray: element selector</p>
  <p class="note">Blue: p.note beats .note and p</p>
  <p class="note" id="special">Crimson: the ID wins</p>
  <p class="late">Purple: last rule wins on a tie</p>
</body>
</html>
```

**Order of decision**

1. **Importance:** `!important` beats normal declarations.
2. **Specificity:** the higher score wins.
3. **Source order:** on a tie, the **last** rule wins.

**Inheritance**

Some properties pass from parent to child automatically.

| Usually inherited | Usually **not** inherited |
| --- | --- |
| `color`, `font-family`, `font-size` | `margin`, `padding` |
| `line-height`, `text-align` | `border`, `background` |
| `visibility`, `cursor` | `width`, `height`, `display` |

| Keyword | Effect |
| --- | --- |
| `inherit` | Take the parent's value |
| `initial` | Use the CSS default value |
| `unset` | `inherit` if the property is inherited, otherwise `initial` |

**Remember**

* Where the stylesheet is loaded does not matter as much as **specificity**. Order only breaks ties.
* **Avoid `!important`.** It makes later changes very hard.
* Avoid IDs for styling. A low, flat specificity (single classes) is easy to maintain.
* Inline styles beat any selector.
* DevTools shows crossed-out declarations that **lost** the cascade.

---

## Cheat Sheet

| Need | Selector |
| --- | --- |
| All paragraphs | `p` |
| By class | `.card` |
| By ID | `#header` |
| Several selectors | `h1, h2` |
| Everything | `*` |
| Inside | `nav a` |
| Direct child | `ul > li` |
| Right after | `h2 + p` |
| All later siblings | `h2 ~ p` |
| Attribute equals | `[type="email"]` |
| Link ends with | `a[href$=".pdf"]` |
| Hover | `a:hover` |
| Every other row | `tr:nth-child(even)` |
| Not a class | `li:not(.done)` |
| Before content | `.x::before { content: ""; }` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `.note` written as `note` | Add the dot |
| Same ID used on many elements | Use a class |
| `.a .b` vs `.a.b` confusion | A space means inside; no space means both classes |
| `::before` with no `content` | Add `content: ""` |
| Rule ignored because of specificity | Check DevTools; raise specificity or lower the competing one |
| Reaching for `!important` | Rewrite the selector instead |
| Expecting `margin` to inherit | It does not; set it directly |
| `:hover` rule placed before `a` rule with equal specificity | Order matters on ties |
| `:nth-child` counting other tags | Use `:nth-of-type` |

---

## Last-Minute Checklist

* I can write element, class and ID selectors.
* I can group selectors and use `*`.
* I can use attribute selectors and the four combinators.
* I can write `:hover`, `:nth-child()` and `::before`.
* I can compare specificity of two selectors.
* I know which properties are inherited.
* I know to avoid `!important` and IDs for styling.

---

## Quiz: Rapid Fire

1. Which symbol starts a class selector?

- [ ] `#`
- [x] `.`
- [ ] `*`
- [ ] `>`

2. What does `ul > li` select?

- [ ] Every `li` anywhere inside a `ul`
- [x] Only `li` elements that are direct children of a `ul`
- [ ] The `li` after a `ul`
- [ ] All `ul` inside an `li`

3. Which selector has the highest specificity?

- [ ] `p`
- [ ] `.note`
- [x] `#title`
- [ ] `*`

4. Which property is inherited by default?

- [ ] `margin`
- [ ] `border`
- [x] `color`
- [ ] `width`

5. Which pseudo-element needs the `content` property to appear?

- [ ] `::first-letter`
- [x] `::before`
- [ ] `::selection`
- [ ] `::placeholder`

6. If two rules have equal specificity, which one wins?

- [ ] The first one
- [ ] The shorter one
- [x] The one that comes last
- [ ] Neither is applied
