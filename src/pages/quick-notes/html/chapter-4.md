# Quick Notes: Chapter 4 - Hyperlinks & Site Navigation

> **10-minute revision.** Know how the `<a>` element works, how absolute and relative paths differ, how to control link behaviour, and how to build page jumps and email links.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 4.1 | The Anchor Element | `<a href="url">text</a>` creates a link |
| 4.2 | Absolute vs. Relative URLs | Full address vs a path from the current file |
| 4.3 | Link Behaviors | `target`, `rel` and `download` change what a link does |
| 4.4 | Page Jumps & Email Links | `#id` jumps within a page; `mailto:` and `tel:` open apps |

---

## 1. The Anchor Element (4.1)

**Core idea:** The `<a>` (anchor) element makes a clickable link. Its `href` attribute holds the destination.

```html
<a href="https://www.example.com">Visit Example</a>
<a href="about.html" title="About our team">About</a>
<a href="home.html"><img src="logo.png" alt="Go to home page"></a>
```

| Part | Role |
| --- | --- |
| `<a>` | The link element |
| `href` | **H**ypertext **ref**erence: where the link goes |
| Link text | What the user clicks |
| `title` | Optional tooltip |

**Good link text**

| Bad | Good |
| --- | --- |
| `click here` | `Read the pricing guide` |
| `more` | `More about our services` |
| `https://example.com/page` | `Example page` |

**Remember**

* Link text should make sense **on its own**. Screen reader users often scan a list of links.
* A link can wrap text, an image, or both.
* Without `href`, an `<a>` is not a working link.

---

## 2. Absolute vs. Relative URLs (4.2)

**Core idea:** An **absolute** URL is a full address. A **relative** URL is a path from the file you are in.

```text
my-site/
├── index.html
├── about.html
├── blog/
│   ├── post1.html
│   └── post2.html
└── images/
    └── logo.png
```

| Path | Meaning |
| --- | --- |
| `https://example.com/about.html` | **Absolute**: full address, works anywhere |
| `about.html` | Same folder as this file |
| `blog/post1.html` | A file inside the `blog` folder |
| `../index.html` | **One folder up**, then the file |
| `../../index.html` | Two folders up |
| `/images/logo.png` | From the **site root** (root-relative) |

**From `blog/post1.html`, to link to:**

```html
<a href="post2.html">Next post</a>
<a href="../index.html">Home</a>
<a href="../images/logo.png">Logo file</a>
<a href="https://developer.mozilla.org">MDN (external)</a>
```

**Remember**

* Use **relative** URLs for your own pages and **absolute** URLs for other websites.
* `../` means "go up one folder".
* A broken path gives a **404** error. Check spelling, folders and lowercase names.

---

## 3. Link Behaviors (4.3)

**Core idea:** Attributes on `<a>` control where a link opens and what it does.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Open in new tab</a>
<a href="guide.pdf" download>Download the guide</a>
<a href="https://example.com" rel="nofollow">Not endorsed by us</a>
```

| Attribute | Purpose |
| --- | --- |
| `target="_self"` | Open in the same tab (default) |
| `target="_blank"` | Open in a new tab |
| `rel="noopener noreferrer"` | Safety for `_blank` links |
| `rel="nofollow"` | Ask search engines not to follow the link |
| `download` | Download the file instead of opening it |
| `title` | Tooltip text |

**Remember**

* Always add `rel="noopener noreferrer"` with `target="_blank"`.
* Use new tabs only when needed. Many users prefer to choose themselves.
* `download` works for files on your own site.
* Mention file type and size in the link text: `Report (PDF, 2 MB)`.

---

## 4. Page Jumps & Email Links (4.4)

**Core idea:** A link can jump to another place on the page, or open the email or phone app.

**Jump to a section**

```html
<a href="#details">Jump to details</a>

<h2 id="details">Details</h2>
<p>This is the target section.</p>

<a href="#top">Back to top</a>
```

**Email and phone links**

```html
<a href="mailto:hello@example.com">Email us</a>
<a href="mailto:hello@example.com?subject=Hello&amp;body=Hi%20there">Email with subject</a>
<a href="tel:+911234567890">Call us</a>
```

| Link | Result |
| --- | --- |
| `href="#id"` | Jump to the element with that `id` |
| `href="#"` or `href="#top"` | Jump to the top of the page |
| `href="page.html#id"` | Open another page at a section |
| `mailto:` | Open the email app |
| `tel:` | Open the phone dialler |

**Remember**

* The `id` must be **unique** and match the text after `#`.
* In a URL, a space is written as `%20`.
* Inside an attribute, write `&` as `&amp;`.
* Use the full international number in `tel:` links, for example `+91...`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Basic link | `<a href="page.html">Text</a>` |
| External link | `<a href="https://site.com">Text</a>` |
| New tab, safely | `target="_blank" rel="noopener noreferrer"` |
| Download a file | `<a href="file.pdf" download>Text</a>` |
| Image link | `<a href="page.html"><img src="a.png" alt="..."></a>` |
| Up one folder | `../page.html` |
| Jump to section | `<a href="#id">` and `<h2 id="id">` |
| Email link | `<a href="mailto:a@b.com">Text</a>` |
| Phone link | `<a href="tel:+911234567890">Text</a>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Link text like `click here` | Describe the destination |
| `target="_blank"` without `rel` | Add `rel="noopener noreferrer"` |
| Wrong relative path | Count folders and use `../` correctly |
| Mismatch between `#id` and `id` | Make them identical, same case |
| Duplicate `id` values | Keep every `id` unique |
| Forgetting `http://` or `https://` on external links | The browser treats it as a relative path |
| Spaces in file names | Use hyphens: `my-file.html` |
| Using `file:///C:/...` paths | Use relative paths so the site works anywhere |

---

## Last-Minute Checklist

* I can write a link with `href` and good link text.
* I can tell absolute, relative and root-relative paths apart.
* I can use `../` to go up a folder.
* I know to add `rel="noopener noreferrer"` with `target="_blank"`.
* I can build a page jump with `id` and `#`.
* I can write `mailto:` and `tel:` links.

---

## Quiz: Rapid Fire

1. Which attribute holds the destination of a link?

- [ ] `src`
- [ ] `link`
- [x] `href`
- [ ] `url`

2. What does `../page.html` mean?

- [ ] A file in the same folder
- [x] A file one folder up
- [ ] A file on another website
- [ ] A file in a subfolder

3. Which is the safe way to open a link in a new tab?

- [ ] `target="_new"`
- [ ] `open="tab"`
- [ ] `target="_blank"` only
- [x] `target="_blank" rel="noopener noreferrer"`

4. Which link type opens the email app?

- [ ] `email:`
- [x] `mailto:`
- [ ] `mail://`
- [ ] `send:`

5. How do you link to the element that has `id="faq"`?

- [ ] `href="faq"`
- [ ] `href="id=faq"`
- [x] `href="#faq"`
- [ ] `href="@faq"`

6. Which attribute makes a link download a file?

- [ ] `save`
- [x] `download`
- [ ] `target`
- [ ] `get`
