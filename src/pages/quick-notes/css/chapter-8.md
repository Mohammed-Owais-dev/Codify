# Quick Notes: Chapter 8 - Responsive Web Design

> **10-minute revision.** Know the ideas behind responsive design, how to write media queries and choose breakpoints, how to make images and containers flexible, why to design mobile-first, and how to build responsive navigation and layouts.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 8.1 | Responsive Design Fundamentals | One page that adapts to every screen |
| 8.2 | Media Queries and Breakpoints | `@media (min-width: 768px) { ... }` |
| 8.3 | Responsive Images and Containers | `max-width: 100%`, `object-fit`, `aspect-ratio` |
| 8.4 | Mobile-First Design | Start small, add styles for larger screens |
| 8.5 | Responsive Navigation and Layouts | Wrapping navs, auto-fit grids, stacked columns |

---

## 1. Responsive Design Fundamentals (8.1)

**Core idea:** **Responsive web design** makes one website look and work well on **phones, tablets and desktops** by adapting to the screen size.

**The three ingredients**

| Ingredient | How |
| --- | --- |
| **Flexible layouts** | Use `%`, `fr`, `max-width`, Flexbox and Grid instead of fixed pixel widths |
| **Flexible media** | `max-width: 100%` on images and video |
| **Media queries** | Change CSS at certain screen sizes |

**The required viewport meta tag** (in `<head>`)

```text
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Without it, phones pretend to be about 980px wide and show a tiny zoomed-out page.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 16px; }
    .page { width: 90%; max-width: 640px; margin: 0 auto; background: #e0f2fe; padding: 16px; border-radius: 10px; }
    .fixed { width: 900px; background: #fecaca; padding: 10px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="page">Fluid container: 90% wide, never above 640px. It adapts to any screen.</div>
</body>
</html>
```

**Remember**

* **Avoid fixed widths** like `width: 900px` for containers. Use `max-width` instead.
* Test with the browser's **device toolbar** (`Ctrl + Shift + M` in Chrome, Firefox).
* Design for **content**, not specific devices. Add a breakpoint where the layout **breaks**.
* Responsive is not only about width: also consider **touch targets**, **font size** and **loading speed**.

---

## 2. Media Queries and Breakpoints (8.2)

**Core idea:** A **media query** applies CSS only when a condition is true, such as a minimum screen width.

```text
@media (min-width: 768px) {
  .container { display: flex; }
}
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .box { padding: 16px; color: white; border-radius: 8px; background: #dc2626; }
    .box::after { content: " (narrow: under 500px)"; }

    @media (min-width: 500px) {
      .box { background: #2563eb; }
      .box::after { content: " (500px or wider)"; }
    }
    @media (min-width: 800px) {
      .box { background: #16a34a; }
      .box::after { content: " (800px or wider)"; }
    }
  </style>
</head>
<body>
  <div class="box">Background changes with the width</div>
  <p>Open this page in your own browser and resize the window to see it change.</p>
</body>
</html>
```

**Common conditions**

| Query | True when |
| --- | --- |
| `(min-width: 768px)` | Viewport is **768px or wider** |
| `(max-width: 767px)` | Viewport is **767px or narrower** |
| `(min-width: 600px) and (max-width: 900px)` | Between 600px and 900px |
| `(orientation: landscape)` | Wider than tall |
| `(prefers-color-scheme: dark)` | User prefers dark mode |
| `(prefers-reduced-motion: reduce)` | User wants less animation |
| `print` | When printing |

**Typical breakpoints**

| Name | Width | Devices |
| --- | --- | --- |
| Small | Up to 575px | Phones |
| Medium | `min-width: 768px` | Tablets |
| Large | `min-width: 1024px` | Laptops |
| Extra large | `min-width: 1280px` | Desktops |

**Remember**

* Write `@media` rules **after** the base styles, since later rules win ties.
* Media queries add **no specificity**, so they must come later to override.
* Use `rem` or `em` in breakpoints if you want them to scale with user font settings.
* Keep the number of breakpoints **small** (two or three is common).
* Use a media query to **change a layout**, not to restyle every detail.

---

## 3. Responsive Images and Containers (8.3)

**Core idea:** Images should **shrink to fit** their container and **never overflow**. Containers should have a **maximum width** and centered content.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 16px; }
    .container { width: 92%; max-width: 560px; margin: 0 auto; }
    .photo {
      width: 100%; aspect-ratio: 16 / 9; border-radius: 10px;
      background: linear-gradient(135deg, #6366f1, #ec4899);
      color: white; display: flex; align-items: center; justify-content: center;
    }
    .thumb { width: 100%; aspect-ratio: 1; object-fit: cover; }
  </style>
</head>
<body>
  <div class="container">
    <div class="photo">16:9 box that scales with its container</div>
  </div>
</body>
</html>
```

**The responsive image rule**

```text
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

| Tool | Purpose |
| --- | --- |
| `max-width: 100%` | Never wider than the parent |
| `height: auto` | Keep the proportions |
| `object-fit: cover` | Fill the box, **crop** extras |
| `object-fit: contain` | Show the **whole** image |
| `aspect-ratio: 16 / 9` | Reserve a shape, which prevents layout jumps |
| `<picture>` and `srcset` | Serve **different image files** for different screens |

**Different images with HTML**

```text
<img src="small.jpg"
     srcset="small.jpg 480w, medium.jpg 900w, large.jpg 1600w"
     sizes="(min-width: 800px) 50vw, 100vw"
     alt="A mountain lake">
```

**Remember**

* Always write a meaningful **`alt`** attribute.
* Add `width` and `height` attributes to `<img>`, so the browser can reserve the space.
* A responsive **container**: `width: 92%; max-width: 1100px; margin-inline: auto;`.
* Use `loading="lazy"` on images below the fold.
* For videos and embeds, combine `width: 100%` with `aspect-ratio`.

---

## 4. Mobile-First Design (8.4)

**Core idea:** Write the **base CSS for small screens** first, then use `min-width` queries to **add** layout for larger screens.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 12px; }

    /* Base: mobile first (one column) */
    .cards { display: grid; gap: 10px; }
    .card { background: #fef08a; padding: 16px; border-radius: 8px; }

    /* Tablet and up: two columns */
    @media (min-width: 600px) {
      .cards { grid-template-columns: repeat(2, 1fr); }
    }

    /* Desktop: four columns */
    @media (min-width: 1000px) {
      .cards { grid-template-columns: repeat(4, 1fr); }
    }
  </style>
</head>
<body>
  <div class="cards">
    <div class="card">One</div><div class="card">Two</div>
    <div class="card">Three</div><div class="card">Four</div>
  </div>
  <p>One column on phones, two on tablets, four on large screens.</p>
</body>
</html>
```

| | Mobile-first | Desktop-first |
| --- | --- | --- |
| Base styles | For **small** screens | For **large** screens |
| Query type | `min-width` | `max-width` |
| Result | Simple styles grow bigger | Complex styles are undone |
| Recommended | **Yes** | Only for old projects |

**Why mobile-first**

* Most visitors use phones.
* Small screens force you to focus on **essential content**.
* Phones download **less CSS**, since they skip the complex rules.
* Fewer overrides, so the CSS is simpler.

**Remember**

* In mobile-first, use **`min-width`** only.
* The **base** (outside any query) is the mobile layout.
* Keep touch targets **at least 44 by 44 px**.
* Body text should be at least **16px** on mobile.
* Test on a **real phone** when you can.

---

## 5. Responsive Navigation and Layouts (8.5)

**Core idea:** Navigation and page layouts should **stack** on small screens and **spread out** on large ones.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, sans-serif; margin: 0; }
    .nav { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; background: #0f172a; padding: 12px 16px; }
    .logo { color: white; font-weight: bold; margin-right: auto; }
    .nav a { color: #cbd5e1; text-decoration: none; padding: 6px 10px; border-radius: 6px; }
    .nav a:hover { background: #1e293b; color: white; }

    .layout { display: grid; gap: 12px; padding: 12px; }
    .layout > div { padding: 18px; border-radius: 8px; color: white; }
    .main { background: #0d9488; }
    .side { background: #db2777; }

    @media (min-width: 700px) {
      .layout { grid-template-columns: 2fr 1fr; }
    }
  </style>
</head>
<body>
  <nav class="nav">
    <span class="logo">Codify</span>
    <a href="#">Home</a><a href="#">Courses</a><a href="#">Blog</a><a href="#">Contact</a>
  </nav>
  <div class="layout">
    <div class="main">Main content (full width on phones, 2/3 on larger screens)</div>
    <div class="side">Sidebar (stacks below on phones)</div>
  </div>
</body>
</html>
```

**Navigation patterns**

| Pattern | When | How |
| --- | --- | --- |
| **Wrapping links** | Few links | `display: flex; flex-wrap: wrap;` |
| **Stacked menu** | Phones | `flex-direction: column;` |
| **Hamburger menu** | Many links | A button toggles the menu (needs a little JavaScript, or `<details>`) |
| **Horizontal scroll** | Tab bars | `overflow-x: auto; white-space: nowrap;` |

**Layout patterns**

| Pattern | CSS idea |
| --- | --- |
| **Stack, then side by side** | Flex or Grid, switched by `min-width` |
| **Auto-fit cards** | `repeat(auto-fit, minmax(220px, 1fr))` |
| **Sidebar layout** | `grid-template-columns: 1fr` on phones; `240px 1fr` on large |
| **Fluid typography** | `font-size: clamp(1.5rem, 4vw, 3rem);` |

**Remember**

* Make menu links **large enough to tap**.
* A hidden mobile menu must stay **keyboard accessible**. Use real `<button>` elements with `aria-expanded`.
* Use `clamp(min, preferred, max)` for sizes that scale smoothly.
* **Avoid horizontal scrolling** on the page. If something overflows, find it with DevTools.
* Check layouts at **320px**, **768px** and **1280px** widths.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Viewport tag | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| Tablet and up | `@media (min-width: 768px) { ... }` |
| Phones only | `@media (max-width: 767px) { ... }` |
| Dark mode | `@media (prefers-color-scheme: dark) { ... }` |
| Reduced motion | `@media (prefers-reduced-motion: reduce) { ... }` |
| Responsive image | `img { max-width: 100%; height: auto; }` |
| Fill a box | `object-fit: cover;` |
| Keep a shape | `aspect-ratio: 16 / 9;` |
| Centered container | `width: min(92%, 1100px); margin-inline: auto;` |
| Auto columns | `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));` |
| Fluid font | `font-size: clamp(1rem, 2.5vw, 1.5rem);` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| No viewport meta tag | Add it to `<head>` |
| Fixed pixel widths on containers | Use `%` and `max-width` |
| Images overflowing | `max-width: 100%; height: auto;` |
| Media query placed **before** base styles | Put queries after the base rules |
| Mixing `min-width` and `max-width` across the file | Choose mobile-first with `min-width` |
| Tiny tap targets | At least 44px |
| Horizontal page scroll on phones | Find the wide element with DevTools |
| Using `hover` for the only way to open a menu | Provide a tap or keyboard way |
| Too many breakpoints | Add them only where the layout breaks |
| Testing only by resizing a desktop window | Also test on a real device |

---

## Last-Minute Checklist

* I can explain what responsive design is and why it needs the viewport tag.
* I can write `min-width` and `max-width` media queries.
* I know a few common breakpoints and when to add one.
* I can make images and containers flexible.
* I understand mobile-first and write base CSS for phones.
* I can build a wrapping navigation and a layout that stacks on small screens.

---

## Quiz: Rapid Fire

1. Which tag makes a page scale correctly on phones?

- [ ] `<meta charset="UTF-8">`
- [x] `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] `<link rel="mobile">`
- [ ] `<meta name="responsive">`

2. When does `@media (min-width: 768px)` apply?

- [ ] Only below 768px
- [x] At 768px and wider
- [ ] Only at exactly 768px
- [ ] Only on printers

3. Which CSS keeps an image from overflowing its container?

- [ ] `width: 1000px`
- [x] `max-width: 100%`
- [ ] `overflow: visible`
- [ ] `float: left`

4. In mobile-first design, which query type do you mostly use?

- [ ] `max-width`
- [x] `min-width`
- [ ] `orientation`
- [ ] `print`

5. Which property keeps an element in a 16:9 shape as it resizes?

- [ ] `ratio: 16/9`
- [ ] `shape: wide`
- [x] `aspect-ratio: 16 / 9`
- [ ] `height: 16/9`

6. What does `clamp(1rem, 4vw, 2rem)` do?

- [ ] Always sets 4vw
- [x] Scales with the viewport but stays between 1rem and 2rem
- [ ] Always sets 2rem
- [ ] Limits the element to 4 characters
