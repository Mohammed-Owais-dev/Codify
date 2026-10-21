# Quick Notes: Chapter 3 - Text & Headings Hierarchy

> **10-minute revision.** Know the six heading levels, how paragraphs and line breaks behave, which tags format text, and how to show code.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 3.1 | Headings Hierarchy | `<h1>` to `<h6>` outline the page; one `<h1>`, no skipped levels |
| 3.2 | Paragraphs & Line Breaks | `<p>` for paragraphs, `<br>` for line breaks, `<hr>` for a divider |
| 3.3 | Text Formatting | `<strong>`, `<em>`, `<mark>`, `<sub>`, `<sup>`, `<del>` and more |
| 3.4 | Preformatted Text & Code | `<pre>` keeps spacing; `<code>` and `<kbd>` mark code and keys |

---

## 1. Headings Hierarchy (3.1)

**Core idea:** Headings create the **outline** of a page. `<h1>` is the most important and `<h6>` the least.

```html
<h1>Main Title</h1>
<h2>Section</h2>
<h3>Sub-section</h3>
<h4>Sub-sub-section</h4>
<h5>Small heading</h5>
<h6>Smallest heading</h6>
```

| Level | Typical use |
| --- | --- |
| `<h1>` | The page title (one per page) |
| `<h2>` | Main sections |
| `<h3>` | Parts of a section |
| `<h4>` to `<h6>` | Deeper levels, used rarely |

**Remember**

* Use **one `<h1>`** per page.
* **Do not skip levels**: go `h2` then `h3`, not `h2` then `h4`.
* Choose a heading by **meaning**, not by size. Change the size with CSS.
* Screen readers and search engines use headings to understand the page.

---

## 2. Paragraphs & Line Breaks (3.2)

**Core idea:** `<p>` wraps a paragraph. Browsers add space before and after it.

```html
<p>This is the first paragraph.</p>
<p>This is the second paragraph.</p>
<p>Line one<br>Line two<br>Line three</p>
<hr>
```

| Tag | Purpose |
| --- | --- |
| `<p>` | A paragraph of text |
| `<br>` | A line break (empty element) |
| `<hr>` | A horizontal rule: a topic change |

**Special characters (entities)**

| Entity | Shows |
| --- | --- |
| `&lt;` | `<` |
| `&gt;` | `>` |
| `&amp;` | `&` |
| `&quot;` | `"` |
| `&nbsp;` | A non-breaking space |
| `&copy;` | `©` |

```html
<p>5 &lt; 10 &amp;&amp; 10 &gt; 5</p>
<p>&copy; 2026 My Site</p>
```

**Remember**

* Extra spaces and blank lines in the code are **collapsed** into one space.
* Use `<br>` only for real line breaks, such as addresses or poems. Use separate `<p>` tags for paragraphs.
* Never write a literal `<` in text. Use `&lt;`.

---

## 3. Text Formatting (3.3)

**Core idea:** Some tags carry **meaning** (semantic). Others only change the **look**.

```html
<p>This is <strong>important</strong> and this is <em>stressed</em>.</p>
<p>Water is H<sub>2</sub>O and E = mc<sup>2</sup>.</p>
<p>Price: <del>$50</del> <ins>$40</ins>. Use <mark>highlight</mark> for key words.</p>
<p><small>Terms apply.</small> <abbr title="HyperText Markup Language">HTML</abbr></p>
<p>She said <q>hello</q>.</p>
<blockquote>Learning never exhausts the mind.</blockquote>
```

| Tag | Meaning | Default look |
| --- | --- | --- |
| `<strong>` | Strong importance | Bold |
| `<em>` | Stressed emphasis | Italic |
| `<b>` | Draw attention, no extra importance | Bold |
| `<i>` | Alternate voice or technical term | Italic |
| `<mark>` | Highlighted for reference | Yellow background |
| `<small>` | Side comments, fine print | Smaller text |
| `<del>` | Deleted text | Strikethrough |
| `<ins>` | Inserted text | Underline |
| `<sub>` / `<sup>` | Subscript / superscript | Lower / raised |
| `<abbr title="...">` | Abbreviation with full form | Tooltip |
| `<q>` | Short inline quote | Quote marks |
| `<blockquote>` | Long quote on its own block | Indented |

**Remember**

* Prefer `<strong>` and `<em>` over `<b>` and `<i>` when you mean importance or emphasis.
* Do **not** use `<u>` to underline text for style. Links are underlined, so it confuses readers.
* Use CSS for colours, sizes and fonts. Do not use the old `<font>` tag.

---

## 4. Preformatted Text & Code (3.4)

**Core idea:** `<pre>` shows text **exactly as typed**, with spaces and line breaks kept, in a fixed-width font.

```html
<pre>
Line one
    indented line
Line three
</pre>

<p>Use the <code>&lt;p&gt;</code> tag. Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>

<pre><code>function hi() {
  return "Hello";
}</code></pre>
```

| Tag | Use |
| --- | --- |
| `<pre>` | Keep spaces and line breaks |
| `<code>` | A piece of computer code |
| `<kbd>` | Keys the user presses |
| `<samp>` | Sample output from a program |
| `<var>` | A variable name in maths or code |

**Remember**

* For code blocks, nest `<code>` inside `<pre>`.
* To show tags as text, escape them: `&lt;p&gt;`.
* A long line in `<pre>` does not wrap. Style it with CSS if needed.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Main heading | `<h1>Title</h1>` |
| Paragraph | `<p>Text</p>` |
| Line break | `<br>` |
| Divider | `<hr>` |
| Important text | `<strong>Text</strong>` |
| Emphasis | `<em>Text</em>` |
| Highlight | `<mark>Text</mark>` |
| H₂O / x² | `H<sub>2</sub>O` / `x<sup>2</sup>` |
| Show a tag as text | `&lt;p&gt;` |
| Keep spacing | `<pre>Text</pre>` |
| Inline code | `<code>x = 5</code>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Using `<h1>` many times | One `<h1>` per page |
| Skipping heading levels | Go in order: `h1`, `h2`, `h3` |
| Choosing a heading for its size | Pick by meaning, size with CSS |
| Using `<br><br>` to make paragraph gaps | Use separate `<p>` tags |
| Typing `<p>` in text and seeing nothing | Write `&lt;p&gt;` |
| Using many `&nbsp;` for layout | Use CSS spacing |
| Using `<b>` or `<i>` when meaning matters | Use `<strong>` or `<em>` |

---

## Last-Minute Checklist

* I can write all six heading levels and use them in order.
* I know the difference between `<p>`, `<br>` and `<hr>`.
* I can write `&lt;`, `&gt;`, `&amp;` and `&nbsp;`.
* I can choose between `<strong>` and `<b>`, and between `<em>` and `<i>`.
* I can show code with `<pre>`, `<code>` and `<kbd>`.

---

## Quiz: Rapid Fire

1. How many `<h1>` elements is it best to use on a page?

- [ ] None
- [x] One
- [ ] Six
- [ ] As many as you like

2. Which tag adds a line break?

- [ ] `<lb>`
- [ ] `<hr>`
- [x] `<br>`
- [ ] `<break>`

3. Which tag marks text of strong importance?

- [ ] `<b>`
- [ ] `<big>`
- [ ] `<mark>`
- [x] `<strong>`

4. How do you show the text `<p>` on a page?

- [ ] `<p>`
- [x] `&lt;p&gt;`
- [ ] `"<p>"`
- [ ] `//<p>`

5. Which tag keeps spaces and line breaks exactly as typed?

- [ ] `<code>`
- [ ] `<p>`
- [x] `<pre>`
- [ ] `<span>`

6. Which tag marks text that was deleted?

- [x] `<del>`
- [ ] `<cut>`
- [ ] `<sub>`
- [ ] `<small>`
