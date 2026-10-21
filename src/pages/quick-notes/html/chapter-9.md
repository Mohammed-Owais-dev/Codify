# Quick Notes: Chapter 9 - Modern Semantic HTML5 Layouts

> **10-minute revision.** Know why semantic elements matter, the elements that build a page layout, how to chunk content with `<article>` and `<section>`, and how to use `<figure>` and `<figcaption>`.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 9.1 | Why Semantics Matter | Elements that describe meaning help people, search engines and tools |
| 9.2 | Page Layout Elements | `<header>`, `<nav>`, `<main>`, `<aside>` and `<footer>` form the page skeleton |
| 9.3 | Content Chunking | `<article>`, `<section>`, `<details>` and `<time>` organise content |
| 9.4 | Figures & Captions | `<figure>` and `<figcaption>` attach a caption to media or code |

---

## 1. Why Semantics Matter (9.1)

**Core idea:** A **semantic** element tells you what its content **is**, not just how it looks. `<nav>` says "navigation"; `<div>` says nothing.

```html
<!-- Non-semantic -->
<div class="top"><div class="menu">...</div></div>

<!-- Semantic -->
<header><nav>...</nav></header>
```

| Benefit | Explanation |
| --- | --- |
| Accessibility | Screen readers jump between landmarks such as `main` and `nav` |
| SEO | Search engines understand the page structure better |
| Readability | Code explains itself |
| Maintenance | Easier to find and change parts of the page |
| Consistent default behaviour | Built-in roles with no extra work |

**Remember**

* `<div>` and `<span>` have **no meaning**. Use them only when no semantic element fits.
* Semantic elements do not change how the page looks. CSS does that.
* Choose elements for **meaning first**, then style them.

---

## 2. Page Layout Elements (9.2)

**Core idea:** Most pages share the same layout parts, and HTML5 has an element for each.

```html
<body>
  <header>
    <h1>My Blog</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Post Title</h2>
      <p>Post text goes here.</p>
    </article>

    <aside>
      <h2>Related Links</h2>
      <p>Extra information beside the main content.</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 My Blog</p>
  </footer>
</body>
```

| Element | Role |
| --- | --- |
| `<header>` | Intro content: logo, title, nav |
| `<nav>` | Main navigation links |
| `<main>` | The **unique** main content of the page |
| `<aside>` | Related side content |
| `<footer>` | Copyright, contact, extra links |

**Remember**

* Use **one visible `<main>`** per page.
* `<header>` and `<footer>` can also appear inside an `<article>` or `<section>`.
* Use `<nav>` for **major** navigation blocks, not for every group of links.
* `<aside>` is for content that is related but not essential.

---

## 3. Content Chunking (9.3)

**Core idea:** Break content into meaningful chunks, each with its own heading.

```html
<article>
  <h2>Learn HTML</h2>
  <section>
    <h3>Tags</h3>
    <p>Tags label content.</p>
  </section>
  <section>
    <h3>Attributes</h3>
    <p>Attributes add details.</p>
  </section>
  <address>Written by <a href="mailto:asha@example.com">Asha</a></address>
  <p>Published <time datetime="2026-10-18">18 October 2026</time></p>
</article>

<details>
  <summary>What is semantic HTML?</summary>
  <p>HTML that describes meaning, not looks.</p>
</details>
```

| Element | Use it for |
| --- | --- |
| `<article>` | A **self-contained** piece that makes sense on its own: blog post, news story, comment |
| `<section>` | A themed group of content, **usually with a heading** |
| `<div>` | A plain wrapper when nothing else fits |
| `<address>` | Contact details for the author or page owner |
| `<time datetime="...">` | A date or time in a machine-readable form |
| `<details>` + `<summary>` | A collapsible block, like an FAQ |

**Article or section?**

| Question | Answer |
| --- | --- |
| Could it be shared on its own? | `<article>` |
| Is it one theme within a bigger piece? | `<section>` |
| Is it only for styling? | `<div>` |

**Remember**

* Give each `<section>` and `<article>` a heading.
* Articles can contain sections, and sections can contain articles.
* `<details>` works without any JavaScript.

---

## 4. Figures & Captions (9.4)

**Core idea:** `<figure>` wraps self-contained content such as an image, chart or code listing. `<figcaption>` gives it a caption.

```html
<figure>
  <img src="chart.png" alt="Bar chart showing sales growth in 2026" width="400" height="250">
  <figcaption>Figure 1: Sales growth in 2026</figcaption>
</figure>

<figure>
  <pre><code>&lt;p&gt;Hello&lt;/p&gt;</code></pre>
  <figcaption>Listing 1: A simple paragraph</figcaption>
</figure>
```

| Element | Role |
| --- | --- |
| `<figure>` | Self-contained media, diagram or code |
| `<figcaption>` | Caption: first or last child of `<figure>` |

**Remember**

* The content could be moved to an appendix and the text would still make sense. That is the test for `<figure>`.
* `<figcaption>` does **not** replace `alt`. Keep both.
* A figure can hold images, charts, tables, code, poems or quotes.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Page top | `<header>` |
| Main menu | `<nav>` |
| Main content | `<main>` |
| Side content | `<aside>` |
| Page bottom | `<footer>` |
| Standalone post | `<article>` |
| Themed group | `<section>` + a heading |
| Collapsible block | `<details><summary>...</summary>...</details>` |
| Date | `<time datetime="2026-10-18">` |
| Captioned media | `<figure>` + `<figcaption>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Using `<div>` for everything | Use a semantic element when one fits |
| Two `<main>` elements | Keep one visible `<main>` |
| `<section>` with no heading | Add a heading, or use `<div>` |
| Using `<header>` only for `<h1>` text | It is a container for intro content |
| Using `<nav>` for every link group | Use it for major navigation only |
| Skipping `alt` because there is a figcaption | Keep `alt` on the image |
| Using semantic elements only for looks | Choose by meaning |

---

## Last-Minute Checklist

* I can explain why semantic HTML helps accessibility, SEO and readability.
* I can lay out a page with `header`, `nav`, `main`, `aside` and `footer`.
* I know when to use `article`, `section` and `div`.
* I can use `details`, `summary` and `time`.
* I can caption media with `figure` and `figcaption`.

---

## Quiz: Rapid Fire

1. Which element holds the unique main content of a page?

- [ ] `<body>`
- [x] `<main>`
- [ ] `<section>`
- [ ] `<header>`

2. Which of these has meaning on its own?

- [ ] `<div>`
- [ ] `<span>`
- [x] `<nav>`
- [ ] `<b>`

3. Which element holds the caption of an image inside a `<figure>`?

- [ ] `<caption>`
- [ ] `<legend>`
- [ ] `<title>`
- [x] `<figcaption>`

4. Which element suits a self-contained blog post?

- [ ] `<aside>`
- [x] `<article>`
- [ ] `<div>`
- [ ] `<footer>`

5. Which element creates a collapsible block of content?

- [ ] `<fold>`
- [ ] `<dl>`
- [x] `<details>`
- [ ] `<summary>` alone

6. What is a main benefit of semantic HTML?

- [ ] It makes the page colourful
- [ ] It makes images load faster
- [x] It improves accessibility and helps search engines
- [ ] It removes the need for CSS
