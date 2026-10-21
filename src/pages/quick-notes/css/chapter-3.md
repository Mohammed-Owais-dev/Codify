# Quick Notes: Chapter 3 - Colors, Text and Typography

> **10-minute revision.** Know the CSS color formats, how to choose and size fonts, how to align and space text, how to load web fonts, and how to style links and lists.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 3.1 | CSS Colors and Color Values | Names, HEX, `rgb()`, `hsl()` and transparency |
| 3.2 | Font Families and Font Sizes | `font-family` stacks, `font-size`, weight and style |
| 3.3 | Text Alignment, Spacing and Decoration | `text-align`, `line-height`, `letter-spacing`, `text-decoration` |
| 3.4 | Google Fonts and Web Typography | Load custom fonts and always add fallbacks |
| 3.5 | Styling Links and Lists | Link states (LVHA) and `list-style` |

---

## 1. CSS Colors and Color Values (3.1)

**Core idea:** Colors can be written in several formats. Use `color` for text and `background-color` for backgrounds.

| Format | Example | Notes |
| --- | --- | --- |
| Name | `tomato`, `teal` | About 140 named colors |
| HEX | `#0ea5e9`, `#0af` | `#rrggbb`, or short `#rgb` |
| HEX with alpha | `#0ea5e980` | Last two digits = transparency |
| RGB | `rgb(14, 165, 233)` | 0 to 255 per channel |
| RGBA | `rgba(14, 165, 233, 0.5)` | Fourth value is alpha (0 to 1) |
| HSL | `hsl(199, 89%, 48%)` | Hue (0 to 360), saturation, lightness |
| Modern | `rgb(14 165 233 / 50%)` | Space-separated, with `/` for alpha |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    .swatch { display: inline-block; width: 90px; height: 60px; margin: 4px; border-radius: 8px;
              color: white; font-size: 12px; text-align: center; line-height: 60px; }
    .a { background-color: tomato; }
    .b { background-color: #0ea5e9; }
    .c { background-color: rgb(34, 197, 94); }
    .d { background-color: hsl(270, 70%, 55%); }
    .e { background-color: rgba(0, 0, 0, 0.4); }
  </style>
</head>
<body>
  <span class="swatch a">name</span>
  <span class="swatch b">hex</span>
  <span class="swatch c">rgb</span>
  <span class="swatch d">hsl</span>
  <span class="swatch e">rgba</span>
</body>
</html>
```

**Why HSL is handy**

```text
hsl(hue, saturation, lightness)
hsl(210, 80%, 50%)   base blue
hsl(210, 80%, 35%)   darker (lower lightness)
hsl(210, 80%, 85%)   lighter (higher lightness)
```

**Remember**

* `opacity` fades the **whole element** (text too). `rgba()` or `hsla()` makes only **that color** transparent.
* `currentColor` reuses the element's `color` value, such as for borders.
* Keep enough **contrast** between text and background (aim for 4.5:1).
* Pick a small palette: one main color, one accent, neutral grays.

---

## 2. Font Families and Font Sizes (3.2)

**Core idea:** `font-family` takes a **list** of fonts. The browser uses the first one available.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { padding: 16px; }
    .sans  { font-family: "Segoe UI", Arial, sans-serif; }
    .serif { font-family: Georgia, "Times New Roman", serif; }
    .mono  { font-family: "Courier New", monospace; }
    .big   { font-size: 28px; font-weight: 700; }
    .small { font-size: 0.85rem; font-style: italic; color: #475569; }
  </style>
</head>
<body>
  <p class="sans big">Sans-serif heading</p>
  <p class="serif">Serif paragraph text.</p>
  <p class="mono">Monospace: code looks like this.</p>
  <p class="sans small">Small italic note</p>
</body>
</html>
```

| Property | Common values |
| --- | --- |
| `font-family` | `"Segoe UI", Arial, sans-serif` |
| `font-size` | `16px`, `1rem`, `1.25em`, `120%` |
| `font-weight` | `400` (normal), `700` (bold), or `100` to `900` |
| `font-style` | `normal`, `italic` |
| `line-height` | `1.5` (unitless is best) |

**Generic families (the last fallback)**

| Generic | Looks like |
| --- | --- |
| `serif` | Fonts with small strokes (Georgia) |
| `sans-serif` | Clean fonts (Arial) |
| `monospace` | Equal-width letters (code) |
| `system-ui` | The device's own interface font |

**Shorthand:** `font: italic 700 1rem/1.5 Arial, sans-serif;` sets style, weight, size, line-height and family together.

**Remember**

* Put font names with **spaces in quotes**: `"Times New Roman"`.
* **Always end** the list with a generic family.
* Prefer **`rem`** for font sizes so users' browser settings are respected.
* The default browser font size is `16px`.
* In the `font` shorthand, **size and family are required**.

---

## 3. Text Alignment, Spacing and Decoration (3.3)

**Core idea:** Small changes to alignment, spacing and decoration make text far easier to read.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; max-width: 420px; }
    h3 { text-align: center; text-transform: uppercase; letter-spacing: 3px; }
    p { line-height: 1.7; text-indent: 1.5em; }
    .del { text-decoration: line-through; color: #94a3b8; }
    .under { text-decoration: underline wavy #dc2626; }
    .right { text-align: right; word-spacing: 6px; }
  </style>
</head>
<body>
  <h3>Typography</h3>
  <p>Good line height gives each line room to breathe, which helps long paragraphs feel easier to read.</p>
  <p><span class="del">Old price</span> and <span class="under">a wavy underline</span>.</p>
  <p class="right">Right aligned, wide words</p>
</body>
</html>
```

| Property | Values | Effect |
| --- | --- | --- |
| `text-align` | `left`, `center`, `right`, `justify` | Horizontal alignment |
| `line-height` | `1.5`, `24px` | Space between lines |
| `letter-spacing` | `1px`, `0.05em` | Space between letters |
| `word-spacing` | `4px` | Space between words |
| `text-decoration` | `none`, `underline`, `line-through`, `overline` | Lines on text |
| `text-transform` | `uppercase`, `lowercase`, `capitalize` | Changes the case |
| `text-indent` | `2em` | Indents the first line |
| `white-space` | `normal`, `nowrap`, `pre` | How spaces and wrapping behave |

**Remember**

* `text-align` aligns **content inside** a block. It does not move the block itself.
* A good `line-height` for body text is **1.4 to 1.7**.
* Use a **unitless** `line-height` (`1.5`) so it scales with each element's font size.
* `text-decoration: none` is how you remove the underline from links.
* Keep lines to roughly **45 to 75 characters** (`max-width: 65ch`).

---

## 4. Google Fonts and Web Typography (3.4)

**Core idea:** **Web fonts** are downloaded by the browser, so every visitor sees the same font.

**Step 1: add the link in `<head>`** (copy it from fonts.google.com)

```text
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
      rel="stylesheet">
```

**Step 2: use it with fallbacks in CSS**

```text
body {
  font-family: "Poppins", Arial, sans-serif;
}
h1 {
  font-weight: 600;
}
```

**Your own font files with `@font-face`**

```text
@font-face {
  font-family: "MyFont";
  src: url("fonts/myfont.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { padding: 16px; }
    .stack { font-family: "NotInstalledFont", Georgia, serif; font-size: 22px; }
  </style>
</head>
<body>
  <p class="stack">The first font is missing, so the browser falls back to Georgia.</p>
</body>
</html>
```

| Tip | Why |
| --- | --- |
| Load only the **weights you need** (400 and 700) | Fewer bytes, faster page |
| Add `display=swap` | Text shows immediately in a fallback font |
| Use at most **2 font families** | Cleaner design, faster loading |
| Prefer **WOFF2** files | Smallest, widely supported |
| Always include **fallback fonts** | The page works if the download fails |

**Remember**

* The `<link>` must come **before** your own stylesheet that uses the font.
* Font names in CSS must match the Google Fonts name exactly.
* A common pairing: one font for **headings**, one for **body** text.

---

## 5. Styling Links and Lists (3.5)

**Core idea:** Links have **states** that you can style separately. Lists can change their markers or lose them entirely for menus.

**Link states, in this order (LVHA)**

```text
a:link    { color: #2563eb; }   /* unvisited */
a:visited { color: #7c3aed; }   /* visited */
a:hover   { color: #1e40af; }   /* mouse over */
a:active  { color: #dc2626; }   /* being clicked */
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; color: #1e40af; }
    .menu { list-style: none; padding: 0; display: flex; gap: 14px; }
    .menu a { padding: 6px 12px; border-radius: 6px; background: #e0f2fe; }
    .menu a:hover { background: #bae6fd; text-decoration: none; }
    ul.dots { list-style-type: square; color: #0f766e; }
    ol.roman { list-style-type: upper-roman; }
  </style>
</head>
<body>
  <ul class="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">Courses</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <ul class="dots"><li>Square bullets</li><li>Teal color</li></ul>
  <ol class="roman"><li>Roman one</li><li>Roman two</li></ol>
</body>
</html>
```

| Property | Common values |
| --- | --- |
| `list-style-type` | `disc`, `circle`, `square`, `decimal`, `upper-roman`, `none` |
| `list-style-position` | `outside` (default), `inside` |
| `list-style-image` | `url("icon.svg")` |
| `list-style` | Shorthand: `none` removes markers |

**Remember**

* Order the link rules **L-V-H-A** (link, visited, hover, active), or later rules override earlier ones.
* To build a navigation menu: `list-style: none; padding: 0; margin: 0;`.
* Removing the underline from links still needs another **visual clue** (color, weight or hover).
* Add `:focus-visible` styles so keyboard users can see where they are.
* A list marker is **not** part of the `li` box. Use `::marker` to style it.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Text color | `color: #1e293b;` |
| Background color | `background-color: hsl(210 40% 96%);` |
| Semi-transparent | `background: rgba(0, 0, 0, 0.5);` |
| Font stack | `font-family: "Segoe UI", Arial, sans-serif;` |
| Size | `font-size: 1.125rem;` |
| Bold | `font-weight: 700;` |
| Line spacing | `line-height: 1.6;` |
| Center text | `text-align: center;` |
| Remove underline | `text-decoration: none;` |
| Uppercase | `text-transform: uppercase;` |
| Spaced letters | `letter-spacing: 2px;` |
| Readable width | `max-width: 65ch;` |
| Hide list bullets | `list-style: none;` |
| Link hover | `a:hover { ... }` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Low contrast text | Check contrast; aim for 4.5:1 |
| `font-family` with no fallback | End with `sans-serif` or `serif` |
| Forgetting quotes on names with spaces | `"Open Sans"` |
| Loading five font weights | Load only what you use |
| `line-height: 20px` on text that scales | Use a unitless value like `1.5` |
| Link rules in the wrong order | LVHA |
| Removing link underlines with no other cue | Add color or weight |
| `opacity` when only the background should fade | Use `rgba()` |
| Centering text with `margin: auto` | Use `text-align: center` |
| Font link placed after the CSS that needs it | Put it first in `<head>` |

---

## Last-Minute Checklist

* I can write a color in name, HEX, RGB and HSL.
* I know the difference between `opacity` and `rgba()`.
* I can write a font stack with fallbacks.
* I can set size, weight and line height.
* I can align, space and decorate text.
* I can add a Google Font and use it safely.
* I can style link states in the right order and remove list bullets.

---

## Quiz: Rapid Fire

1. Which format is `#ff0000`?

- [ ] RGB
- [ ] HSL
- [x] HEX
- [ ] Named color

2. Which value gives half-transparent black?

- [ ] `rgb(0, 0, 0)`
- [x] `rgba(0, 0, 0, 0.5)`
- [ ] `hsl(0, 0%, 50%)`
- [ ] `black 50%`

3. What should the last item in a `font-family` list be?

- [ ] A color name
- [ ] A font size
- [x] A generic family such as `sans-serif`
- [ ] A URL

4. Which property removes the underline from a link?

- [ ] `text-style: none`
- [x] `text-decoration: none`
- [ ] `underline: off`
- [ ] `link-style: none`

5. What is the correct order for link state rules?

- [ ] hover, link, visited, active
- [ ] active, hover, link, visited
- [x] link, visited, hover, active
- [ ] visited, link, active, hover

6. Which declaration removes the bullets from a list?

- [ ] `list: none`
- [x] `list-style: none`
- [ ] `bullet: none`
- [ ] `marker: hidden`
