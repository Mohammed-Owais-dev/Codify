# Quick Notes: Chapter 7 - Flexbox and CSS Grid

> **10-minute revision.** Know how Flexbox lays out items in one direction, how to align, space, wrap and size flex items, and how CSS Grid builds two-dimensional layouts with tracks, gaps and named areas.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 7.1 | Introduction to Flexbox | `display: flex` turns children into flex items |
| 7.2 | Flex Direction, Alignment and Spacing | `flex-direction`, `justify-content`, `align-items`, `gap` |
| 7.3 | Flex Wrapping, Order and Sizing | `flex-wrap`, `order`, `flex: 1`, `flex-basis` |
| 7.4 | Introduction to CSS Grid | Rows and columns with `grid-template-columns` |
| 7.5 | Grid Tracks, Gaps and Areas | `repeat()`, `minmax()`, `gap`, `grid-template-areas` |

---

## 1. Introduction to Flexbox (7.1)

**Core idea:** **Flexbox** arranges items in **one dimension**: a row or a column. Put `display: flex` on the **parent (container)**, and its direct children become **flex items**.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .container { display: flex; gap: 10px; background: #f1f5f9; padding: 10px; border-radius: 8px; }
    .item { background: #6366f1; color: white; padding: 16px 22px; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>
</body>
</html>
```

```text
Main axis  ──────────────────────►   (row: left to right)
┌────────┐ ┌────────┐ ┌────────┐   │ Cross axis
│ item 1 │ │ item 2 │ │ item 3 │   ▼ (top to bottom)
└────────┘ └────────┘ └────────┘
```

| Term | Meaning |
| --- | --- |
| Flex container | The parent with `display: flex` |
| Flex items | The **direct children** |
| Main axis | The direction items flow (row by default) |
| Cross axis | The perpendicular direction |

**Remember**

* Flex only affects **direct children**, not grandchildren.
* By default, items sit in a **row**, shrink to fit and stretch to equal height.
* Flexbox is best for **components**: navbars, card rows, centering, toolbars.
* `display: inline-flex` makes the container behave like an inline element.
* `float`, `clear` and `vertical-align` have **no effect** on flex items.

---

## 2. Flex Direction, Alignment and Spacing (7.2)

**Core idea:** Pick the direction with `flex-direction`. Then use `justify-content` (main axis) and `align-items` (cross axis).

| Property | Values | Controls |
| --- | --- | --- |
| `flex-direction` | `row`, `row-reverse`, `column`, `column-reverse` | Main axis direction |
| `justify-content` | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` | Spacing along the **main** axis |
| `align-items` | `stretch`, `flex-start`, `center`, `flex-end`, `baseline` | Alignment on the **cross** axis |
| `align-self` | same as `align-items` | **One item** only |
| `gap` | `10px`, `1rem 2rem` | Space between items |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .row { display: flex; height: 70px; background: #e2e8f0; margin-bottom: 10px; padding: 6px; border-radius: 8px; }
    .row span { background: #0ea5e9; color: white; padding: 6px 14px; border-radius: 6px; }
    .between { justify-content: space-between; align-items: center; }
    .center  { justify-content: center; align-items: center; gap: 10px; }
    .end     { justify-content: flex-end; align-items: flex-end; }
    .col     { flex-direction: column; height: 130px; gap: 6px; }
  </style>
</head>
<body>
  <div class="row between"><span>Logo</span><span>Menu</span></div>
  <div class="row center"><span>A</span><span>B</span></div>
  <div class="row end"><span>Bottom right</span></div>
  <div class="row col"><span>Column 1</span><span>Column 2</span></div>
</body>
</html>
```

**Perfect centering**

```text
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

**Remember**

* `justify-content` = **main** axis. `align-items` = **cross** axis.
* With `flex-direction: column`, the axes **swap**: `justify-content` becomes vertical.
* `align-items` and `justify-content` have no effect on a container with **no extra space**.
* Prefer **`gap`** over margins for spacing between items.
* `margin-left: auto` on one item **pushes it** (and later items) to the far end.

---

## 3. Flex Wrapping, Order and Sizing (7.3)

**Core idea:** Allow items to wrap with `flex-wrap`, and control how they grow and shrink with `flex`.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .wrap { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
    .wrap div { flex: 1 1 140px; background: #a78bfa; color: white; padding: 14px; border-radius: 6px; }
    .layout { display: flex; gap: 10px; }
    .side { flex: 0 0 90px; background: #fda4af; padding: 10px; }
    .main { flex: 1; background: #86efac; padding: 10px; }
    .order { display: flex; gap: 8px; margin-top: 12px; }
    .order div { background: #fcd34d; padding: 10px 16px; }
    .order .first { order: -1; background: #f97316; color: white; }
  </style>
</head>
<body>
  <div class="wrap">
    <div>Card 1</div><div>Card 2</div><div>Card 3</div><div>Card 4</div>
  </div>
  <div class="layout">
    <div class="side">Fixed 90px</div>
    <div class="main">Takes all the remaining space</div>
  </div>
  <div class="order">
    <div>HTML 1</div><div>HTML 2</div><div class="first">HTML 3 (order -1)</div>
  </div>
</body>
</html>
```

**The `flex` shorthand:** `flex: grow shrink basis;`

| Property | Meaning | Default |
| --- | --- | --- |
| `flex-grow` | Share of **extra** space to take | `0` |
| `flex-shrink` | Share of **missing** space to give up | `1` |
| `flex-basis` | Starting size before growing or shrinking | `auto` |
| `order` | Visual order (lower first) | `0` |

| Shorthand | Meaning |
| --- | --- |
| `flex: 1` | Grow equally, start from 0: **equal-width columns** |
| `flex: 0 0 200px` | Fixed 200px, never grows or shrinks |
| `flex: 1 1 250px` | Start at 250px, grow and shrink: **responsive cards** |
| `flex: none` | Do not flex at all |

| `flex-wrap` | Behavior |
| --- | --- |
| `nowrap` (default) | Items squeeze onto one line |
| `wrap` | Items move to a new line when needed |
| `wrap-reverse` | New lines go above |

**Remember**

* Without `flex-wrap: wrap`, items **shrink** (and may overflow) instead of wrapping.
* `flex: 1` on every item makes them all **equal width**.
* `order` changes only the **visual** order. Keyboard and screen reader order stay in the HTML order.
* Use **`min-width: 0`** on a flex item if long text refuses to shrink.
* `align-content` spaces **multiple lines** of wrapped items.

---

## 4. Introduction to CSS Grid (7.4)

**Core idea:** **CSS Grid** lays out items in **rows and columns at the same time** (two dimensions). Set `display: grid` on the container and define tracks.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    .grid div { background: #14b8a6; color: white; padding: 18px; text-align: center; border-radius: 8px; }
    .wide { grid-column: span 2; background: #0f766e !important; }
  </style>
</head>
<body>
  <div class="grid">
    <div>1</div><div>2</div><div>3</div>
    <div class="wide">4 (spans 2 columns)</div><div>5</div>
    <div>6</div><div>7</div><div>8</div>
  </div>
</body>
</html>
```

| Property | Example | Meaning |
| --- | --- | --- |
| `display: grid` | | Makes a grid container |
| `grid-template-columns` | `200px 1fr 1fr` | Defines the column tracks |
| `grid-template-rows` | `80px auto` | Defines the row tracks |
| `gap` | `16px` | Space between rows and columns |
| `grid-column` | `1 / 3`, `span 2` | Where an item sits horizontally |
| `grid-row` | `1 / 3`, `span 2` | Where an item sits vertically |

**The `fr` unit** = a **fraction of the free space**.

```text
grid-template-columns: 1fr 2fr 1fr;     /* middle column twice as wide */
grid-template-columns: 200px 1fr;       /* fixed sidebar + flexible content */
grid-template-columns: repeat(3, 1fr);  /* three equal columns */
```

| | Flexbox | Grid |
| --- | --- | --- |
| Dimensions | **One** (row or column) | **Two** (rows and columns) |
| Starts from | The **content** | The **layout** |
| Best for | Components, alignment | Page layouts, galleries |

**Remember**

* Only **direct children** become grid items.
* Items fill cells **automatically**, row by row.
* Grid lines are numbered **from 1**: `grid-column: 1 / 3` means from line 1 to line 3 (two columns).
* `justify-items` and `align-items` align items **inside their cells**. `justify-content` and `align-content` place the whole grid.
* You can combine them: a **Grid** page layout with **Flexbox** components inside.

---

## 5. Grid Tracks, Gaps and Areas (7.5)

**Core idea:** Build flexible grids with `repeat()` and `minmax()`, and design page layouts visually with `grid-template-areas`.

**Responsive grid without media queries**

```text
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}
```

Each column is **at least 160px** and shares the leftover space. The browser fits as many columns as it can.

| Function | Meaning |
| --- | --- |
| `repeat(3, 1fr)` | Three equal columns |
| `minmax(150px, 1fr)` | Not smaller than 150px, grows up to `1fr` |
| `auto-fit` | Fit as many columns as possible; collapse empty ones |
| `auto-fill` | Fit as many columns as possible; keep empty ones |
| `grid-auto-rows: 100px` | Size of rows created automatically |

**Named areas**

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 12px; }
    .page {
      display: grid;
      grid-template-columns: 110px 1fr;
      grid-template-rows: 50px 110px 40px;
      grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
      gap: 8px;
    }
    .page > div { padding: 10px; color: white; border-radius: 6px; }
    .header  { grid-area: header;  background: #4f46e5; }
    .sidebar { grid-area: sidebar; background: #db2777; }
    .main    { grid-area: main;    background: #0d9488; }
    .footer  { grid-area: footer;  background: #475569; }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">Header</div>
    <div class="sidebar">Sidebar</div>
    <div class="main">Main content</div>
    <div class="footer">Footer</div>
  </div>
</body>
</html>
```

| Property | Purpose |
| --- | --- |
| `grid-template-areas` | Draw the layout with names |
| `grid-area: name` | Place an item in a named area |
| `gap`, `row-gap`, `column-gap` | Space between tracks |
| `justify-items` / `align-items` | Align items in their cells |
| `place-items: center` | Center in both directions |

**Remember**

* In `grid-template-areas`, every row must have the **same number of names**, and each area must be a **rectangle**.
* Use a **dot** `.` for an empty cell.
* `gap` adds space **between** tracks only, not around the outside.
* Changing `grid-template-areas` inside a **media query** reshapes the whole layout.
* `repeat(auto-fit, minmax(...))` is the shortest way to build responsive card grids.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Row of items | `display: flex;` |
| Space between items | `gap: 16px;` |
| Center both ways | `display: flex; justify-content: center; align-items: center;` |
| Push to the ends | `justify-content: space-between;` |
| Stack vertically | `flex-direction: column;` |
| Wrap items | `flex-wrap: wrap;` |
| Equal-width items | `flex: 1;` |
| Fixed sidebar item | `flex: 0 0 240px;` |
| Push one item right | `margin-left: auto;` |
| Three equal columns | `display: grid; grid-template-columns: repeat(3, 1fr);` |
| Responsive cards | `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));` |
| Sidebar layout | `grid-template-columns: 240px 1fr;` |
| Span columns | `grid-column: span 2;` |
| Center in grid | `place-items: center;` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Putting `display: flex` on the **child** | Put it on the **parent** |
| Mixing up `justify-content` and `align-items` | Main axis vs cross axis |
| Items overflowing instead of wrapping | Add `flex-wrap: wrap` |
| Long text not shrinking | `min-width: 0` on the flex item |
| `align-items` seems to do nothing | The container needs extra height |
| Using `order` for important reading order | Reorder the HTML instead |
| Grid line numbers off by one | Lines start at 1; 3 columns = 4 lines |
| Uneven `grid-template-areas` rows | Same number of names per row |
| Using `gap` and margins together | Choose one approach |
| Nesting flex/grid on grandchildren | Only direct children are items |

---

## Last-Minute Checklist

* I can build a row or column with Flexbox.
* I know `justify-content` is the main axis and `align-items` is the cross axis.
* I can center an element in both directions.
* I can wrap items and use `flex: 1`.
* I can create columns with `fr`, `repeat()` and `minmax()`.
* I can place items with `grid-column` and `grid-template-areas`.
* I know when to choose Flexbox and when to choose Grid.

---

## Quiz: Rapid Fire

1. On which element do you write `display: flex`?

- [ ] On each item
- [x] On the parent container
- [ ] On the `<body>` only
- [ ] On a grandchild

2. Which property aligns items along the **main** axis?

- [ ] `align-items`
- [x] `justify-content`
- [ ] `align-content`
- [ ] `flex-wrap`

3. What does `flex: 1` do for every item in a row?

- [ ] Makes them all 1px wide
- [x] Makes them share the space equally
- [ ] Hides all but one
- [ ] Stops them from shrinking

4. What does `1fr` mean in Grid?

- [ ] One fixed pixel
- [ ] One full row
- [x] One fraction of the available space
- [ ] One font size

5. Which creates three equal columns?

- [ ] `grid-columns: 3`
- [x] `grid-template-columns: repeat(3, 1fr)`
- [ ] `columns: 3fr`
- [ ] `grid: 3 columns`

6. Which layout system handles rows **and** columns at the same time?

- [ ] Flexbox
- [ ] Float
- [x] Grid
- [ ] Inline-block
