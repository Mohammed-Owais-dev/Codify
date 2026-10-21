# Quick Notes: Chapter 4 - The CSS Box Model

> **10-minute revision.** Know the four parts of every element's box, how width and height work, how margin and padding differ, how to style borders, outlines and rounded corners, and why `box-sizing: border-box` and `overflow` matter.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 4.1 | Understanding the Box Model | Every element is a box: content, padding, border, margin |
| 4.2 | Width, Height and Sizing | `width`, `height`, `min-`, `max-` and `auto` |
| 4.3 | Margin and Padding | Space **outside** vs **inside** the border |
| 4.4 | Borders, Outlines and Border Radius | `border`, `outline`, `border-radius` |
| 4.5 | box-sizing and Overflow | `border-box` and what happens when content is too big |

---

## 1. Understanding the Box Model (4.1)

**Core idea:** Every HTML element is a **rectangular box** made of four layers.

```text
┌───────────────────── margin ─────────────────────┐
│  ┌─────────────────── border ─────────────────┐  │
│  │  ┌──────────────── padding ─────────────┐  │  │
│  │  │         ┌─────────────────┐          │  │  │
│  │  │         │     content     │          │  │  │
│  │  │         └─────────────────┘          │  │  │
│  │  └──────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

| Layer | Purpose | Has background color? |
| --- | --- | --- |
| **Content** | The text or image | Yes |
| **Padding** | Space between content and border | Yes (background shows) |
| **Border** | The edge around padding | Its own color |
| **Margin** | Space **outside** the border | No (always transparent) |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; background: #f1f5f9; }
    .box {
      width: 200px;
      padding: 20px;
      border: 6px solid #0f766e;
      margin: 24px;
      background: #99f6e4;
    }
  </style>
</head>
<body>
  <div class="box">Content area. The light green includes the padding.</div>
</body>
</html>
```

**Total width with the default `content-box`**

```text
total width = width + padding (left+right) + border (left+right)
            = 200 + 40 + 12 = 252px   (margin is extra, outside the box)
```

**Remember**

* The `width` property sets the **content** width by default (until you change `box-sizing`).
* Padding takes the element's **background**. Margin does not.
* Use **DevTools** to view the box model diagram for any element.

---

## 2. Width, Height and Sizing (4.2)

**Core idea:** `width` and `height` set the content size. Use `min-` and `max-` to keep elements flexible.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .card {
      width: 80%;
      max-width: 360px;
      min-height: 80px;
      background: #e0e7ff;
      padding: 12px;
      border-radius: 8px;
    }
    img, .pic { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <div class="card">
    This card is 80% wide but never wider than 360px and at least 80px tall.
  </div>
</body>
</html>
```

| Property | Meaning |
| --- | --- |
| `width` / `height` | The preferred size |
| `min-width` / `min-height` | It **cannot be smaller** than this |
| `max-width` / `max-height` | It **cannot be bigger** than this |
| `auto` | Browser decides (block elements fill the width) |

| Value | Example |
| --- | --- |
| Fixed | `width: 300px;` |
| Percent of parent | `width: 50%;` |
| Viewport | `height: 100vh;` |
| Content-based | `width: fit-content;` |

**Remember**

* **Block** elements are `width: auto` = full width of the parent by default.
* **Inline** elements (`span`, `a`) **ignore** `width` and `height`.
* A percent `height` only works if the parent has a defined height.
* Use `max-width: 100%; height: auto;` on images so they never overflow.
* Prefer `min-height` over `height` so text can grow without spilling out.

---

## 3. Margin and Padding (4.3)

**Core idea:** **Padding** is space **inside** the border. **Margin** is space **outside** it.

**Shorthand patterns**

| Code | Meaning |
| --- | --- |
| `margin: 10px;` | All four sides |
| `margin: 10px 20px;` | top and bottom 10px, left and right 20px |
| `margin: 10px 20px 30px;` | top 10px, left and right 20px, bottom 30px |
| `margin: 10px 20px 30px 40px;` | top, right, bottom, left (clockwise) |
| `margin-left: 8px;` | One side only |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 16px; }
    .wrap { width: 260px; margin: 0 auto; background: #f1f5f9; padding: 10px; }
    .a, .b { background: #bfdbfe; padding: 14px 24px; margin-bottom: 20px; }
    .b { margin-top: 30px; background: #fecaca; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="a">Box A: margin-bottom 20px</div>
    <div class="b">Box B: margin-top 30px</div>
  </div>
</body>
</html>
```

In the demo, the two vertical margins **collapse**: the gap is **30px** (the larger one), not 50px.

| | Padding | Margin |
| --- | --- | --- |
| Location | Inside the border | Outside the border |
| Background | Colored with the element | Transparent |
| Negative values | **Not allowed** | Allowed |
| `auto` | No | Yes |
| Collapses | No | Yes (vertical, between blocks) |

**Remember**

* `margin: 0 auto;` **centers a block** horizontally, but the element needs a width (or `max-width`).
* **Vertical margins collapse** between adjacent blocks. The larger wins.
* Horizontal margins never collapse.
* Margins on **inline** elements work only left and right.
* Use **padding** to give a clickable area breathing room, and **margin** to separate elements.

---

## 4. Borders, Outlines and Border Radius (4.4)

**Core idea:** A **border** is part of the box. An **outline** is drawn **outside** the box and takes no space.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .b1 { border: 3px solid #0ea5e9; padding: 10px; margin-bottom: 14px; }
    .b2 { border: 3px dashed #f97316; border-radius: 12px; padding: 10px; margin-bottom: 14px; }
    .b3 { border-bottom: 4px double #16a34a; padding: 10px; margin-bottom: 14px; }
    .avatar { width: 70px; height: 70px; background: #a78bfa; border-radius: 50%; }
    button { padding: 8px 14px; border: 2px solid #334155; border-radius: 6px; background: white; }
    button:focus { outline: 3px solid #f59e0b; outline-offset: 3px; }
  </style>
</head>
<body>
  <div class="b1">solid border</div>
  <div class="b2">dashed rounded border</div>
  <div class="b3">double bottom border</div>
  <div class="avatar"></div>
  <p><button>Click then see the outline</button></p>
</body>
</html>
```

**Border shorthand:** `border: width style color;`

| Part | Values |
| --- | --- |
| Width | `1px`, `3px`, `thin`, `thick` |
| Style | `solid`, `dashed`, `dotted`, `double`, `none` |
| Color | any color |

| Property | Effect |
| --- | --- |
| `border-radius: 8px` | Rounded corners |
| `border-radius: 50%` | Circle (on a square) or oval |
| `border-radius: 10px 0` | Top-left and bottom-right rounded |
| `border-top`, `border-left`, ... | One side only |
| `outline: 2px solid blue` | Line outside the border |
| `outline-offset: 4px` | Gap between border and outline |

| | Border | Outline |
| --- | --- | --- |
| Takes up space | Yes | **No** |
| Per-side control | Yes | No |
| Follows `border-radius` | Yes | Yes (modern browsers) |
| Typical use | Design | **Focus indicator** |

**Remember**

* A border needs a **style**. `border: 2px red;` shows nothing; use `border: 2px solid red;`.
* **Never remove outlines** (`outline: none`) without giving another focus style.
* A circle needs **equal** width and height plus `border-radius: 50%`.
* Use `border-radius: 999px` for pill-shaped buttons.

---

## 5. box-sizing and Overflow (4.5)

**Core idea:** `box-sizing: border-box` makes `width` include padding and border. `overflow` controls what happens when content does not fit.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .cb, .bb { width: 200px; padding: 20px; border: 5px solid #334155; margin-bottom: 10px; background: #e2e8f0; }
    .cb { box-sizing: content-box; }
    .bb { box-sizing: border-box; }
    .scroll { width: 220px; height: 70px; overflow: auto; border: 2px solid #0f766e; padding: 6px; }
    .ellipsis { width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                border: 2px solid #7c3aed; padding: 4px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="cb">content-box: total 250px wide</div>
  <div class="bb">border-box: total 200px wide</div>
  <div class="scroll">This box has a fixed height and overflow auto, so a scrollbar appears when the text is longer than the box. More text here to force scrolling inside the box.</div>
  <div class="ellipsis">This very long single line of text is cut with an ellipsis</div>
</body>
</html>
```

| `box-sizing` | `width` includes | Total width of `width: 200px; padding: 20px; border: 5px` |
| --- | --- | --- |
| `content-box` (default) | Content only | 250px |
| `border-box` | Content + padding + border | **200px** |

**The standard reset**

```text
*, *::before, *::after {
  box-sizing: border-box;
}
```

**Overflow values**

| Value | Effect |
| --- | --- |
| `visible` (default) | Content spills outside the box |
| `hidden` | Extra content is **clipped** |
| `scroll` | Always shows scrollbars |
| `auto` | Scrollbars only when needed |
| `overflow-x` / `overflow-y` | Control one direction |

**Ellipsis recipe:** `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`

**Remember**

* Use `border-box` on **everything**. Layout math becomes much simpler.
* `width: 100%` plus padding **overflows** the parent with `content-box`, but fits with `border-box`.
* `overflow: hidden` also **contains floats** and clips child shadows.
* A fixed `height` with long text causes overflow, so prefer `min-height`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Center a block | `margin: 0 auto;` (with a width) |
| Equal padding | `padding: 16px;` |
| Vertical / horizontal padding | `padding: 8px 16px;` |
| Flexible width | `width: 90%; max-width: 600px;` |
| Responsive image | `max-width: 100%; height: auto;` |
| Border | `border: 1px solid #cbd5e1;` |
| Rounded corners | `border-radius: 8px;` |
| Circle | `width: 60px; height: 60px; border-radius: 50%;` |
| Focus ring | `outline: 3px solid #f59e0b; outline-offset: 2px;` |
| Easy sizing | `box-sizing: border-box;` |
| Scroll if needed | `overflow: auto;` |
| One-line ellipsis | `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Box wider than expected | Use `box-sizing: border-box` |
| `margin: auto` not centering | Give the element a width |
| `border: 2px red` shows nothing | Add a style: `solid` |
| Margins that "disappear" | Vertical margins collapse |
| `width` on a `span` ignored | Make it `inline-block` or `block` |
| Text spilling out of a fixed `height` | Use `min-height` or `overflow: auto` |
| Circle looks like an oval | Use equal width and height |
| `outline: none` with no replacement | Add a visible focus style |
| `width: 100%` plus padding overflows | Use `border-box` |
| Using margin for inside space | Use padding |

---

## Last-Minute Checklist

* I can name and order the four layers of the box model.
* I can calculate the total width of an element.
* I understand margin vs padding and margin collapse.
* I can write `margin`/`padding` shorthand with 1 to 4 values.
* I can create borders, rounded corners and circles.
* I know the difference between border and outline.
* I always use `box-sizing: border-box` and know the `overflow` values.

---

## Quiz: Rapid Fire

1. Which layer of the box model is outermost?

- [ ] Padding
- [ ] Border
- [ ] Content
- [x] Margin

2. What does `margin: 10px 20px;` mean?

- [ ] 10px left and right, 20px top and bottom
- [x] 10px top and bottom, 20px left and right
- [ ] 10px top, 20px bottom only
- [ ] 10px all around, plus 20px extra

3. With `box-sizing: border-box`, what does `width` include?

- [ ] Content only
- [ ] Content and margin
- [x] Content, padding and border
- [ ] Everything including margin

4. Which declaration makes a square element a circle?

- [ ] `border: 50%`
- [x] `border-radius: 50%`
- [ ] `circle: true`
- [ ] `radius: 100%`

5. Which `overflow` value shows scrollbars only when needed?

- [ ] `scroll`
- [ ] `hidden`
- [x] `auto`
- [ ] `visible`

6. What happens to the vertical margins of two stacked blocks?

- [ ] They are added together
- [x] They collapse into the larger one
- [ ] They are ignored
- [ ] The smaller one wins
