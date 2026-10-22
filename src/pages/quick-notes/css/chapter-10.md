# Quick Notes: Chapter 10 - Practical CSS and Best Practices

> **10-minute revision.** Know how CSS variables make styles reusable, how to style forms and buttons, how to organize and name your CSS, how to keep it accessible and maintainable, and how to plan a responsive webpage project.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 10.1 | CSS Variables and Custom Properties | `--color: #333;` and `var(--color)` |
| 10.2 | Styling Forms and Buttons | Clear inputs, focus states and consistent buttons |
| 10.3 | CSS Organization and Reusable Styles | Structure, naming and reusable classes |
| 10.4 | Accessibility and Maintainable CSS | Contrast, focus, motion, readable and simple selectors |
| 10.5 | Final Project: Responsive Webpage | Put everything together in one page |

---

## 1. CSS Variables and Custom Properties (10.1)

**Core idea:** A **custom property** stores a value you can **reuse** anywhere. Define it with `--name` and read it with `var(--name)`.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    :root {
      --primary: #4f46e5;
      --surface: #ffffff;
      --text: #0f172a;
      --radius: 12px;
      --space: 16px;
    }
    body { font-family: Arial, sans-serif; padding: 20px; background: #f1f5f9; color: var(--text); }
    .card { background: var(--surface); padding: var(--space); border-radius: var(--radius);
            border-top: 5px solid var(--primary); width: 240px; margin-bottom: 14px; }
    .btn { background: var(--primary); color: white; border: 0; padding: 8px 16px; border-radius: var(--radius); }

    .card.green { --primary: #16a34a; }   /* override locally */
  </style>
</head>
<body>
  <div class="card">Default card<br><br><button class="btn">Primary</button></div>
  <div class="card green">Green card (the variable was overridden here)<br><br><button class="btn">Primary</button></div>
</body>
</html>
```

| Part | Example |
| --- | --- |
| Define | `--brand: #4f46e5;` |
| Use | `color: var(--brand);` |
| Fallback | `color: var(--brand, #333);` |
| Global scope | `:root { ... }` |
| Local scope | `.card { --space: 8px; }` |

**Dark mode with variables**

```text
:root {
  --bg: #ffffff;
  --text: #0f172a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --text: #f8fafc;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}
```

**With `calc()`**

```text
.box { padding: calc(var(--space) * 2); }
```

**Remember**

* Names **start with two dashes** and are **case-sensitive**: `--Brand` is not `--brand`.
* Variables **inherit** like other properties, so children can use a parent's value.
* Unlike Sass variables, CSS variables are **live**: changing one in the browser (or with JavaScript) updates the page instantly.
* Variables cannot be used in **media query conditions** such as `@media (min-width: var(--x))`.
* Store **design tokens**: colors, spacing, font sizes, radius and shadows.
* Change a variable with JavaScript: `element.style.setProperty("--primary", "#dc2626")`.

---

## 2. Styling Forms and Buttons (10.2)

**Core idea:** Form controls have plain browser defaults. Give them **consistent spacing, clear borders and visible focus styles**.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 20px; }
    form { width: 280px; display: grid; gap: 12px; }
    label { font-weight: 600; font-size: 14px; display: grid; gap: 4px; }
    input, select, textarea {
      font: inherit; padding: 10px 12px; border: 2px solid #cbd5e1; border-radius: 8px; background: white;
    }
    input:focus, select:focus, textarea:focus {
      outline: none; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.25);
    }
    input:invalid:not(:placeholder-shown) { border-color: #dc2626; }
    input:disabled { background: #f1f5f9; cursor: not-allowed; }

    .btn { font: inherit; font-weight: 600; padding: 10px 16px; border: 0; border-radius: 8px;
           background: #4f46e5; color: white; cursor: pointer; transition: background-color .2s, transform .1s; }
    .btn:hover { background: #4338ca; }
    .btn:active { transform: scale(0.97); }
    .btn:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
    .btn[disabled] { opacity: 0.5; cursor: not-allowed; }
    .btn.outline { background: transparent; color: #4f46e5; border: 2px solid #4f46e5; }
  </style>
</head>
<body>
  <form>
    <label>Email <input type="email" placeholder="you@example.com" required></label>
    <label>Course
      <select><option>HTML</option><option>CSS</option></select>
    </label>
    <label>Message <textarea rows="3"></textarea></label>
    <label><span><input type="checkbox"> I agree</span></label>
    <div style="display:flex; gap:8px;">
      <button class="btn" type="submit">Send</button>
      <button class="btn outline" type="button">Cancel</button>
      <button class="btn" disabled>Disabled</button>
    </div>
  </form>
</body>
</html>
```

**States to style**

| Selector | State |
| --- | --- |
| `:hover` | Mouse over |
| `:focus` / `:focus-visible` | Active field or keyboard focus |
| `:active` | Being pressed |
| `:disabled` | Cannot be used |
| `:invalid` / `:valid` | Failing / passing built-in validation |
| `:checked` | Checkbox or radio selected |
| `::placeholder` | Placeholder text |

**Remember**

* Form controls **do not inherit fonts**. Use `font: inherit;`.
* Set `box-sizing: border-box` so `width: 100%` fits.
* **Always keep a visible focus indicator**. If you remove the outline, add a ring with `box-shadow` or `outline`.
* Pair each input with a `<label>`. Do not use the placeholder as a label.
* Make buttons **at least 44px tall** for touch, with `cursor: pointer`.
* Do not rely on color alone to show errors. Add a text message too.

---

## 3. CSS Organization and Reusable Styles (10.3)

**Core idea:** Organized CSS is easier to read, change and share. Group related rules, name things clearly and reuse small building blocks.

**A common file order**

```text
css/
├── style.css        <- imports or contains everything, in this order:
│   1. Variables (:root)
│   2. Reset / base (box-sizing, body, headings, links)
│   3. Layout (container, grid, header, footer)
│   4. Components (button, card, nav, form)
│   5. Utilities (.text-center, .mt-2, .hidden)
│   6. Media queries (near the code they change)
```

**Naming with BEM** (Block, Element, Modifier)

| Part | Pattern | Example |
| --- | --- | --- |
| Block | `.card` | The component |
| Element | `.card__title` | A part of it |
| Modifier | `.card--featured` | A variation |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    :root { --brand: #4f46e5; --gap: 12px; }
    body { font-family: Arial, sans-serif; padding: 20px; display: flex; gap: 16px; flex-wrap: wrap; }

    /* component */
    .card { width: 210px; padding: var(--gap); border: 2px solid #e2e8f0; border-radius: 10px; }
    .card__title { margin: 0 0 6px; font-size: 18px; }
    .card__text { margin: 0; color: #475569; }
    /* modifier */
    .card--featured { border-color: var(--brand); background: #eef2ff; }

    /* utilities */
    .text-center { text-align: center; }
    .mt-2 { margin-top: 16px; }
  </style>
</head>
<body>
  <article class="card">
    <h3 class="card__title">Standard</h3>
    <p class="card__text">A regular card.</p>
  </article>
  <article class="card card--featured text-center">
    <h3 class="card__title">Featured</h3>
    <p class="card__text">Same card with a modifier and a utility.</p>
  </article>
</body>
</html>
```

**Good habits**

| Habit | Why |
| --- | --- |
| Name by **purpose**, not looks (`.alert`, not `.red-box`) | The style can change later |
| Use **classes**, not IDs, for styling | Low, even specificity |
| **Avoid deep selectors** (`.a .b .c .d span`) | Easy to override and understand |
| One rule for **shared** styles | Do not repeat yourself (DRY) |
| Group properties **logically** (layout, box, text, visual) | Quick to scan |
| Comment **sections**, not obvious lines | Easy navigation |
| **Remove** unused CSS | Smaller, faster files |

**Remember**

* Keep specificity **flat**: mostly single class selectors.
* Put **shared tokens** in variables.
* Reusable **utility classes** are good for small one-property helpers.
* Split big files into smaller ones by area (`base.css`, `layout.css`, `components.css`) when a project grows.
* Pick **one naming style** and use it everywhere.

---

## 4. Accessibility and Maintainable CSS (10.4)

**Core idea:** Good CSS works for **everyone**: keyboard users, screen reader users, people with low vision and people sensitive to motion. It is also easy for the next developer to change.

**Accessibility checklist**

| Area | Guideline |
| --- | --- |
| **Contrast** | Text vs background at least **4.5:1** (3:1 for large text) |
| **Focus** | Always keep a **visible focus style** |
| **Text size** | Use `rem`; never block zoom; body text 16px or more |
| **Motion** | Honor `prefers-reduced-motion` |
| **Color** | Do not use color as the **only** signal |
| **Hiding** | `display: none` hides from screen readers too; use a visually-hidden class instead |
| **Touch targets** | At least **44 by 44 px** |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .bad  { background: #fde68a; color: #fef3c7; padding: 10px; margin-bottom: 8px; }
    .good { background: #fde68a; color: #3f2d00; padding: 10px; margin-bottom: 14px; }

    .visually-hidden {
      position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
    }
    .icon-btn { width: 44px; height: 44px; border: 2px solid #334155; border-radius: 50%; background: white; font-size: 18px; }
    .icon-btn:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }
    .status-ok::before { content: "✔ "; }
    .status-ok { color: #166534; font-weight: 600; }
  </style>
</head>
<body>
  <div class="bad">Poor contrast: hard to read</div>
  <div class="good">Good contrast: easy to read</div>

  <button class="icon-btn" type="button">★<span class="visually-hidden">Add to favorites</span></button>
  <p class="status-ok">Saved (icon and text, not only color)</p>
</body>
</html>
```

**Maintainable CSS rules**

| Do | Avoid |
| --- | --- |
| Single-class selectors | Long chains and IDs |
| Variables for repeated values | Copy-pasting `#4f46e5` everywhere |
| `rem` and `em` for sizes | Many fixed `px` font sizes |
| Fix the **cause** of specificity problems | `!important` |
| `gap` for spacing | Margin hacks on every child |
| Mobile-first media queries | Many overriding `max-width` queries |
| Small, named components | Giant "one-off" rules |

**Remember**

* Check contrast with the DevTools color picker or a contrast checker.
* Test with the **keyboard only**: Tab, Shift + Tab, Enter, Space.
* Never write `outline: none` without a replacement.
* **Semantic HTML first**, then CSS. A `<button>` is better than a styled `<div>`.
* Stylelint or Prettier keep a team's CSS consistent.
* Zoom the page to 200% to confirm that nothing breaks.

---

## 5. Final Project: Responsive Webpage (10.5)

**Core idea:** Combine variables, a reset, Flexbox, Grid, media queries, hover effects and accessibility in **one responsive landing page**.

**Plan before coding**

| Step | Question |
| --- | --- |
| 1. Content | Header, hero, features, call to action, footer |
| 2. Design tokens | Colors, spacing, font, radius |
| 3. Mobile layout | One column first |
| 4. Larger layout | Grid columns and a wider hero from `768px` |
| 5. Polish | Hover, focus, transitions, reduced motion |
| 6. Test | 320px, 768px, 1280px, keyboard only |

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    :root { --brand: #4f46e5; --dark: #0f172a; --light: #f8fafc; --radius: 12px; --gap: 16px; }
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, sans-serif; line-height: 1.6; color: var(--dark); background: var(--light); }

    .container { width: min(92%, 1000px); margin-inline: auto; }

    /* Header */
    .header { background: var(--dark); padding: 12px 0; }
    .header .container { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; }
    .logo { color: white; font-weight: bold; margin-right: auto; }
    .header a { color: #cbd5e1; text-decoration: none; padding: 6px 8px; border-radius: 6px; }
    .header a:hover, .header a:focus-visible { background: #1e293b; color: white; }

    /* Hero */
    .hero { background: linear-gradient(135deg, var(--brand), #ec4899); color: white; padding: 48px 0; text-align: center; }
    .hero h1 { margin: 0 0 8px; font-size: clamp(1.8rem, 6vw, 3rem); }
    .btn { display: inline-block; margin-top: 12px; padding: 12px 22px; background: white; color: var(--brand);
           font-weight: bold; text-decoration: none; border-radius: 999px; transition: transform .2s, box-shadow .2s; }
    .btn:hover, .btn:focus-visible { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(0,0,0,.25); }

    /* Features */
    .features { display: grid; gap: var(--gap); padding: 32px 0; }
    .feature { background: white; padding: 20px; border-radius: var(--radius); box-shadow: 0 4px 12px rgba(15,23,42,.08); }
    .feature h3 { margin: 0 0 6px; color: var(--brand); }

    /* Footer */
    .footer { background: var(--dark); color: #94a3b8; text-align: center; padding: 16px 0; font-size: 14px; }

    @media (min-width: 700px) {
      .features { grid-template-columns: repeat(3, 1fr); }
      .hero { padding: 80px 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .btn { transition: none; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="container">
      <span class="logo">Codify</span>
      <a href="#">Home</a><a href="#">Courses</a><a href="#">Contact</a>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Learn CSS the easy way</h1>
      <p>Short lessons, live examples and real projects.</p>
      <a class="btn" href="#">Start learning</a>
    </div>
  </section>

  <main class="container">
    <div class="features">
      <article class="feature"><h3>Flexbox</h3><p>Align and space items with ease.</p></article>
      <article class="feature"><h3>Grid</h3><p>Build real page layouts.</p></article>
      <article class="feature"><h3>Responsive</h3><p>One page for every screen.</p></article>
    </div>
  </main>

  <footer class="footer"><div class="container">Built with CSS</div></footer>
</body>
</html>
```

**Concepts used in the project**

| Concept | Where |
| --- | --- |
| Variables | `:root` tokens |
| Reset | `box-sizing: border-box` |
| Centered container | `width: min(92%, 1000px); margin-inline: auto;` |
| Flexbox | Header navigation |
| Grid | Feature cards (`1` column, then `3`) |
| Gradient | Hero background |
| Media query | `min-width: 700px` |
| Fluid type | `clamp()` heading |
| Hover and focus | Links and button |
| Reduced motion | `prefers-reduced-motion` |

**Remember**

* Build **mobile first**, then add one or two breakpoints.
* Use **semantic tags**: `header`, `nav`, `main`, `section`, `article`, `footer`.
* Add `lang="en"` on `<html>` and a meaningful `alt` on every content image.
* Validate your HTML, and test with the keyboard and at multiple widths.
* Keep the final CSS **organized** in the order from 10.3.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Define a variable | `:root { --brand: #4f46e5; }` |
| Use a variable | `color: var(--brand);` |
| Variable with fallback | `var(--gap, 16px)` |
| Centered container | `width: min(92%, 1000px); margin-inline: auto;` |
| Form font | `font: inherit;` |
| Focus ring | `:focus-visible { outline: 3px solid #f59e0b; }` |
| Invalid field | `input:invalid { border-color: #dc2626; }` |
| BEM names | `.card`, `.card__title`, `.card--featured` |
| Hide visually only | `.visually-hidden { position: absolute; clip: rect(0 0 0 0); ... }` |
| Reduced motion | `@media (prefers-reduced-motion: reduce) { ... }` |
| Dark mode | `@media (prefers-color-scheme: dark) { :root { ... } }` |
| Fluid font size | `font-size: clamp(1rem, 2.5vw, 1.5rem);` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `var(--Brand)` when it is `--brand` | Variable names are case-sensitive |
| Variable defined inside a rule but used elsewhere | Define it on `:root` for global use |
| Inputs ignoring the page font | `font: inherit;` |
| `outline: none` with no replacement | Add a focus ring |
| Placeholder used as the label | Add a real `<label>` |
| Low-contrast text | Test contrast; aim for 4.5:1 |
| Color-only error messages | Add text or an icon |
| Long selector chains | Use single classes |
| `!important` everywhere | Fix specificity instead |
| Repeating the same hex color | Use a variable |
| Desktop-first, then fighting overrides | Go mobile-first |
| Hiding screen reader text with `display: none` | Use a visually-hidden class |

---

## Last-Minute Checklist

* I can define and use CSS variables, and override them locally.
* I can style inputs, buttons and all their states.
* I can organize CSS in a clear order and name classes consistently.
* I know the main accessibility rules: contrast, focus, motion, touch size.
* I can plan and build a responsive page with header, hero, cards and footer.
* I can test my page at several widths and with the keyboard.

---

## Quiz: Rapid Fire

1. How do you define a CSS custom property?

- [ ] `$color: red;`
- [ ] `@color: red;`
- [x] `--color: red;`
- [ ] `var color = red;`

2. Which function reads a custom property?

- [ ] `get(--color)`
- [x] `var(--color)`
- [ ] `use(--color)`
- [ ] `css(--color)`

3. Which declaration makes a form control use the page's font?

- [ ] `font: reset;`
- [ ] `font-family: auto;`
- [x] `font: inherit;`
- [ ] `font: page;`

4. What is the minimum recommended contrast ratio for normal text?

- [ ] 2:1
- [ ] 3:1
- [x] 4.5:1
- [ ] 10:1

5. In BEM, what does `.card--featured` represent?

- [ ] A block
- [ ] An element
- [x] A modifier
- [ ] A utility

6. Which approach is best for keeping CSS maintainable?

- [ ] Using `!important` for every fix
- [ ] Long chains of nested selectors
- [x] Flat, single-class selectors and variables for shared values
- [ ] Inline styles on every element
