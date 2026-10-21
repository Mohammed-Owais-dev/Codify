# Quick Notes: Chapter 6 - Layout with Display and Position

> **10-minute revision.** Know how the `display` property changes an element's behavior, how normal flow and the five `position` values work, how `z-index` and stacking contexts decide what is on top, how floats work, and how overflow and visibility hide content.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 6.1 | The display Property | `block`, `inline`, `inline-block`, `none` |
| 6.2 | Normal Flow and Positioning | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| 6.3 | z-index and Stacking Context | Which overlapping element is on top |
| 6.4 | Float and Clear | Wrap text around images; `clear` to stop it |
| 6.5 | Overflow and Visibility | `overflow`, `visibility`, `display: none` |

---

## 1. The display Property (6.1)

**Core idea:** `display` decides how an element **behaves in the layout**.

| Value | New line? | Width/height work? | Margin/padding |
| --- | --- | --- | --- |
| `block` | **Yes**, full width | Yes | All sides |
| `inline` | No | **No** | Left/right only (top/bottom do not push) |
| `inline-block` | No | **Yes** | All sides |
| `none` | Removed from layout | - | - |
| `flex`, `grid` | Container layouts | Yes | Chapter 7 |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .b  { display: block;        background: #bfdbfe; margin-bottom: 8px; }
    .i  { display: inline;       background: #fde68a; width: 200px; height: 50px; }
    .ib { display: inline-block; background: #bbf7d0; width: 90px; height: 40px; text-align: center; }
    .gone { display: none; }
  </style>
</head>
<body>
  <div class="b">block: fills the width</div>
  <span class="i">inline: ignores width and height</span>
  <span class="i">inline again</span>
  <p>
    <span class="ib">inline-block</span>
    <span class="ib">sizes work</span>
    <span class="ib">side by side</span>
  </p>
  <p class="gone">This paragraph is removed completely.</p>
  <p>The hidden paragraph above takes no space.</p>
</body>
</html>
```

**Default display values**

| Block by default | Inline by default |
| --- | --- |
| `div`, `p`, `h1`-`h6`, `ul`, `li`, `section`, `form` | `span`, `a`, `strong`, `em`, `img`, `button` (inline-block) |

**Remember**

* `display: none` **removes** the element from layout and from screen readers.
* Changing `display` **does not change the HTML tag**, only how it behaves.
* Whitespace between `inline-block` elements creates a small gap.
* To make a link fill a menu button, set `display: block` or `inline-block` on it.
* `img` is inline by default and leaves a gap below it. Use `display: block` to remove it.

---

## 2. Normal Flow and Positioning (6.2)

**Core idea:** By default, elements follow **normal flow**: blocks stack down, inline elements go side by side. The `position` property can change that.

| Value | Behavior | Offsets (`top`, `left`...) |
| --- | --- | --- |
| `static` | Normal flow (default) | Ignored |
| `relative` | Normal flow, then shifted from its **own spot**; keeps its space | Work |
| `absolute` | **Removed from flow**; placed relative to the nearest **positioned ancestor** | Work |
| `fixed` | Removed from flow; stays relative to the **viewport** while scrolling | Work |
| `sticky` | Normal flow until a scroll point, then **sticks** | Work (needs `top`) |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .card { position: relative; width: 240px; padding: 20px; background: #e0f2fe; border-radius: 10px; margin-bottom: 16px; }
    .badge { position: absolute; top: -10px; right: -10px; background: #dc2626; color: white;
             font-size: 12px; padding: 4px 8px; border-radius: 999px; }
    .nudge { position: relative; top: 8px; left: 20px; background: #fde68a; padding: 6px; display: inline-block; }
    .scroller { height: 110px; overflow: auto; border: 2px solid #334155; }
    .scroller h4 { position: sticky; top: 0; margin: 0; background: #fef08a; padding: 6px; }
  </style>
</head>
<body>
  <div class="card">Card (position: relative)<span class="badge">NEW</span></div>
  <div class="nudge">Shifted with relative</div>
  <div class="scroller">
    <h4>Sticky heading</h4>
    <p>Scroll this box.</p><p>The heading stays at the top.</p><p>Line three.</p><p>Line four.</p><p>Line five.</p><p>Line six.</p>
  </div>
</body>
</html>
```

**The usual recipe**

```text
.parent { position: relative; }          /* anchor */
.child  { position: absolute; top: 0; right: 0; }
```

**Remember**

* An `absolute` element positions itself against the nearest ancestor with a position **other than `static`**. If none exists, it uses the page.
* `absolute` and `fixed` elements **leave a gap** (other content moves up) and shrink to fit their content.
* `relative` without offsets does nothing visible, but it makes the element an **anchor** for children.
* `sticky` needs a `top` (or `bottom`/`left`) value to work, and **no ancestor with `overflow: hidden`** between it and the scroller.
* Use `fixed` for headers and chat buttons, but leave room (padding) so content is not hidden beneath.

---

## 3. z-index and Stacking Context (6.3)

**Core idea:** When elements **overlap**, `z-index` decides which one is on top. Higher values appear in front.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; }
    .stage { position: relative; height: 150px; }
    .box { position: absolute; width: 120px; height: 90px; color: white; padding: 8px; border-radius: 8px; }
    .one   { background: #dc2626; top: 0;    left: 0;    z-index: 1; }
    .two   { background: #2563eb; top: 30px; left: 60px; z-index: 3; }
    .three { background: #16a34a; top: 60px; left: 120px; z-index: 2; }
  </style>
</head>
<body>
  <div class="stage">
    <div class="box one">z-index 1</div>
    <div class="box two">z-index 3 (top)</div>
    <div class="box three">z-index 2</div>
  </div>
</body>
</html>
```

| Rule | Detail |
| --- | --- |
| Works on | **Positioned** elements (`relative`, `absolute`, `fixed`, `sticky`) and flex/grid items |
| Default | `auto` (treated as `0`); later HTML is on top |
| Values | Integers, including negatives |
| Compared with | Only siblings **inside the same stacking context** |

**What creates a new stacking context**

* The root `<html>` element
* `position` (not static) **with** a `z-index` value other than `auto`
* `opacity` less than `1`
* `transform`, `filter` and similar properties
* A flex or grid child with a `z-index`

A child can **never rise above** content outside its parent's stacking context, no matter how large its `z-index`.

**Remember**

* `z-index` on a **static** element (without flex or grid) has **no effect**.
* A huge number like `9999` is a sign of a stacking-context problem. Find the context instead.
* Use a **small scale**: for example `10` dropdown, `100` modal, `1000` toast.
* Equal `z-index` values stack in **HTML order**.
* Use DevTools' **3D view** or layer inspector to debug stacking.

---

## 4. Float and Clear (6.4)

**Core idea:** `float` moves an element to the left or right and lets text **wrap around** it. It was once used for page layouts, but is now mainly used for **text wrapping**.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; max-width: 460px; }
    .pic { float: left; width: 90px; height: 90px; margin: 0 14px 6px 0; background: #a78bfa; border-radius: 10px; }
    .note { clear: both; background: #fef9c3; padding: 8px; margin-top: 10px; }
    .clearfix::after { content: ""; display: block; clear: both; }
    .row { border: 2px dashed #334155; margin-top: 10px; }
    .row .tile { float: left; width: 80px; height: 50px; background: #34d399; margin: 6px; }
  </style>
</head>
<body>
  <div class="pic"></div>
  <p>The purple box is floated left, so this paragraph flows around it. Floats take an element out of normal flow, so text wraps beside the box until it runs out of height and goes underneath.</p>
  <div class="note">clear: both pushes this box below the float.</div>
  <div class="row clearfix">
    <div class="tile"></div><div class="tile"></div><div class="tile"></div>
  </div>
</body>
</html>
```

| Property | Values | Meaning |
| --- | --- | --- |
| `float` | `left`, `right`, `none` | Push to a side; content wraps |
| `clear` | `left`, `right`, `both` | Move **below** earlier floats |

**The clearfix**

```text
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

**Remember**

* A parent of only floated children **collapses to zero height**. Fix it with a clearfix, or `overflow: hidden`, or `display: flow-root`.
* Floated elements become **block-like**, whatever their original display value.
* For page layouts, use **Flexbox or Grid** (Chapter 7), not floats.
* Add a `margin` on the side facing the text so it does not touch.

---

## 5. Overflow and Visibility (6.5)

**Core idea:** `overflow` handles content that is too big for its box. `visibility` and `display` hide elements in different ways.

| Value of `overflow` | Result |
| --- | --- |
| `visible` | Content spills out (default) |
| `hidden` | Clipped, no scrollbars |
| `scroll` | Scrollbars always shown |
| `auto` | Scrollbars only if needed |
| `clip` | Clipped, no scrolling at all |

| Way to hide | Takes space? | Clickable / focusable? | Screen readers |
| --- | --- | --- | --- |
| `display: none` | **No** | No | Ignored |
| `visibility: hidden` | **Yes** (empty gap) | No | Ignored |
| `opacity: 0` | **Yes** | **Yes** (still there) | **Read** |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .row span { display: inline-block; padding: 8px 12px; background: #bfdbfe; margin-right: 6px; }
    .none   { display: none; }
    .hidden { visibility: hidden; }
    .fade   { opacity: 0; }
    .scroll { width: 240px; height: 60px; overflow-y: auto; border: 2px solid #0f766e; padding: 6px; margin: 12px 0; }
  </style>
</head>
<body>
  <div class="row">
    <span>A</span><span class="none">B (none)</span><span>C</span>
  </div>
  <p></p>
  <div class="row">
    <span>A</span><span class="hidden">B (hidden)</span><span>C</span>
  </div>
  <p></p>
  <div class="row">
    <span>A</span><span class="fade">B (opacity 0)</span><span>C</span>
  </div>
  <div class="scroll">Vertical scroll only. This text is long enough that the box needs a scrollbar to show it all. Keep reading to see it.</div>
</body>
</html>
```

**Remember**

* Setting `overflow` on a box with `visible` on the other axis may turn it to `auto`.
* `overflow: hidden` can **clip** shadows, dropdowns and sticky children.
* `visibility: hidden` can be reversed on a **child** with `visibility: visible`.
* To hide content visually but keep it for screen readers, use a **visually-hidden** utility, not `display: none`.
* `overflow-x: auto` makes wide **tables** scroll on small screens.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Side-by-side with size | `display: inline-block;` |
| Remove from layout | `display: none;` |
| Hide but keep space | `visibility: hidden;` |
| Anchor for children | `position: relative;` |
| Corner badge | `position: absolute; top: 0; right: 0;` |
| Fixed header | `position: fixed; top: 0; left: 0; width: 100%;` |
| Sticky header | `position: sticky; top: 0;` |
| Bring to front | `position: relative; z-index: 10;` |
| Wrap text around image | `float: left; margin-right: 12px;` |
| Stop wrapping | `clear: both;` |
| Contain floats | `display: flow-root;` |
| Scroll if needed | `overflow: auto;` |
| Clip content | `overflow: hidden;` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `width` ignored on a `span` | Use `inline-block` or `block` |
| `absolute` child jumps to the page corner | Add `position: relative` to the parent |
| `z-index` having no effect | Add a `position` (or use flex/grid) |
| Huge z-index values | Check the stacking context |
| Parent collapsing around floats | Clearfix or `display: flow-root` |
| `sticky` not sticking | Add `top: 0`; remove `overflow` on ancestors |
| Using `display: none` for screen-reader-only text | Use a visually-hidden class |
| Fixed header covering content | Add top padding to the page |
| Using floats for full layouts | Use Flexbox or Grid |
| Gap between inline-blocks | Remove whitespace or use flex |

---

## Last-Minute Checklist

* I know the difference between `block`, `inline` and `inline-block`.
* I can name the five `position` values and how each behaves.
* I can anchor an `absolute` child to a `relative` parent.
* I know `z-index` needs a positioned element and what a stacking context is.
* I can float an image and use `clear`.
* I know the difference between `display: none`, `visibility: hidden` and `opacity: 0`.

---

## Quiz: Rapid Fire

1. Which `display` value makes an element sit inline but accept `width` and `height`?

- [ ] `block`
- [ ] `inline`
- [x] `inline-block`
- [ ] `none`

2. An `absolute` element is positioned relative to which element?

- [ ] The `<body>` always
- [ ] Its previous sibling
- [x] The nearest ancestor that is not `static`
- [ ] The viewport

3. Which `position` value keeps an element in the same spot on screen while scrolling?

- [ ] `relative`
- [x] `fixed`
- [ ] `static`
- [ ] `absolute`

4. What does `clear: both` do?

- [ ] Removes all floats
- [x] Moves the element below any left or right floats
- [ ] Centers the element
- [ ] Hides the element

5. Which option hides an element but keeps its space?

- [ ] `display: none`
- [x] `visibility: hidden`
- [ ] `overflow: hidden`
- [ ] `position: absolute`

6. On which elements does `z-index` normally work?

- [ ] Only inline elements
- [ ] Only floated elements
- [x] Positioned elements (and flex or grid items)
- [ ] Only `div` elements
