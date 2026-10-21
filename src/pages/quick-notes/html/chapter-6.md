# Quick Notes: Chapter 6 - Lists & Data Organization

> **10-minute revision.** Know the three list types, the attributes that change numbering, and how to nest lists to build menus and outlines.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 6.1 | Unordered Lists | `<ul>` with `<li>` items makes a bulleted list |
| 6.2 | Ordered Lists | `<ol>` numbers items; `type`, `start` and `reversed` change it |
| 6.3 | Description Lists | `<dl>` pairs a term `<dt>` with a description `<dd>` |
| 6.4 | Nesting Lists | Put a list **inside** an `<li>` to make sub-items |

---

## 1. Unordered Lists (6.1)

**Core idea:** Use `<ul>` when the **order does not matter**. Each item is an `<li>`.

```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Mangoes</li>
</ul>
```

| Tag | Role |
| --- | --- |
| `<ul>` | Unordered (bulleted) list container |
| `<li>` | One list item |

**Remember**

* The only direct children of `<ul>` are `<li>` elements.
* Bullets are a default look. Change or remove them with CSS `list-style`.
* Navigation menus are usually a `<ul>` of links.

---

## 2. Ordered Lists (6.2)

**Core idea:** Use `<ol>` when the **order matters**, such as steps or rankings.

```html
<ol>
  <li>Open the editor</li>
  <li>Write the code</li>
  <li>Save the file</li>
</ol>

<ol type="A" start="3">
  <li>Third</li>
  <li>Fourth</li>
</ol>

<ol reversed>
  <li>Bronze</li>
  <li>Silver</li>
  <li>Gold</li>
</ol>
```

| Attribute | Effect |
| --- | --- |
| `type="1"` | Numbers (default) |
| `type="a"` / `type="A"` | Lowercase / uppercase letters |
| `type="i"` / `type="I"` | Lowercase / uppercase Roman numerals |
| `start="5"` | Start counting from 5 |
| `reversed` | Count down |
| `value` on `<li>` | Set the number of one item |

**Remember**

* Choose `<ol>` for steps and rankings, `<ul>` for everything else.
* `start` takes a **number**, even when `type` is letters: `start="3"` gives `C`.
* The numbers are added by the browser. You do not type them.

---

## 3. Description Lists (6.3)

**Core idea:** A description list holds **terms and their meanings**: glossaries, FAQs, details.

```html
<dl>
  <dt>HTML</dt>
  <dd>The structure of a page</dd>
  <dt>CSS</dt>
  <dd>The style of a page</dd>
  <dt>Colours</dt>
  <dd>Red</dd>
  <dd>Blue</dd>
</dl>
```

| Tag | Role |
| --- | --- |
| `<dl>` | Description list container |
| `<dt>` | Description **t**erm |
| `<dd>` | Description **d**etails |

**Remember**

* One term can have **several** `<dd>` descriptions.
* Browsers indent `<dd>` by default.
* Good for glossaries, product specs and metadata (label and value pairs).

---

## 4. Nesting Lists (6.4)

**Core idea:** To make a sub-list, put the new `<ul>` or `<ol>` **inside an `<li>`**, not directly inside the parent list.

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Mango</li>
    </ul>
  </li>
  <li>Vegetables
    <ol>
      <li>Carrot</li>
      <li>Potato</li>
    </ol>
  </li>
</ul>
```

**Navigation menu pattern**

```html
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="courses.html">Courses</a>
      <ul>
        <li><a href="html.html">HTML</a></li>
        <li><a href="css.html">CSS</a></li>
      </ul>
    </li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

**Remember**

* Close the inner list **before** closing the parent `<li>`.
* You can mix `<ul>` and `<ol>` when nesting.
* Keep nesting shallow: more than 3 levels is hard to read.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Bulleted list | `<ul><li>Item</li></ul>` |
| Numbered list | `<ol><li>Item</li></ol>` |
| Letters | `<ol type="a">` |
| Start at 5 | `<ol start="5">` |
| Count down | `<ol reversed>` |
| Term and meaning | `<dl><dt>Term</dt><dd>Meaning</dd></dl>` |
| Sub-list | `<li>Parent<ul><li>Child</li></ul></li>` |
| Menu | `<nav><ul><li><a href="...">...</a></li></ul></nav>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Text placed directly inside `<ul>` | Wrap every item in `<li>` |
| Nested `<ul>` placed directly inside the parent `<ul>` | Place it inside an `<li>` |
| Typing numbers by hand in an `<ol>` | Let `<ol>` number the items |
| Using `<ul>` for steps | Use `<ol>` when order matters |
| Using `<br>` to fake a list | Use real list elements |
| Using `<dl>` just for indenting | Use it for term and description pairs |

---

## Last-Minute Checklist

* I can write `<ul>`, `<ol>` and `<dl>` lists.
* I know when order matters, so I choose `<ol>`.
* I can use `type`, `start` and `reversed`.
* I can nest a list inside an `<li>`.
* I can build a simple navigation menu with a list.

---

## Quiz: Rapid Fire

1. Which tag creates a bulleted list?

- [ ] `<ol>`
- [ ] `<dl>`
- [x] `<ul>`
- [ ] `<li>`

2. Which attribute starts an ordered list at 5?

- [ ] `begin="5"`
- [x] `start="5"`
- [ ] `from="5"`
- [ ] `number="5"`

3. Which three tags build a description list?

- [ ] `<ul>`, `<li>`, `<dd>`
- [ ] `<dl>`, `<li>`, `<dd>`
- [x] `<dl>`, `<dt>`, `<dd>`
- [ ] `<ol>`, `<dt>`, `<li>`

4. Which element must be a direct child of a `<ul>`?

- [ ] `<p>`
- [ ] `<div>`
- [x] `<li>`
- [ ] `<span>`

5. Where do you put a nested list?

- [ ] After the `</ul>` tag
- [x] Inside an `<li>`
- [ ] Inside the `<head>`
- [ ] Directly inside the parent `<ul>`

6. Which `type` value gives lowercase letters in an ordered list?

- [ ] `type="1"`
- [ ] `type="A"`
- [ ] `type="i"`
- [x] `type="a"`
