# Quick Notes: Chapter 9 - Transitions, Transforms and Animations

> **10-minute revision.** Know how transitions smooth a change between two states, how 2D transforms move, rotate, scale and skew elements, how `@keyframes` animations work, how to control their timing, and how to respect hover, focus and reduced-motion preferences.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 9.1 | CSS Transitions | Smoothly animate from one style to another, such as on hover |
| 9.2 | 2D Transforms | `translate`, `rotate`, `scale`, `skew` |
| 9.3 | Keyframe Animations | `@keyframes` + `animation` for multi-step motion |
| 9.4 | Animation Timing and Control | Duration, easing, delay, repeat, direction, fill mode |
| 9.5 | Hover, Focus and Motion Preferences | Interaction states and `prefers-reduced-motion` |

---

## 1. CSS Transitions (9.1)

**Core idea:** A **transition** makes a property change **gradually** instead of instantly. You put it on the **base** state; it runs whenever the value changes.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .btn {
      padding: 12px 22px; border: 0; border-radius: 8px; cursor: pointer;
      background: #2563eb; color: white; font-size: 16px;
      transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    }
    .btn:hover {
      background: #1e40af;
      transform: translateY(-3px);
      box-shadow: 0 8px 16px rgba(37, 99, 235, 0.35);
    }
  </style>
</head>
<body>
  <button class="btn">Hover me</button>
</body>
</html>
```

| Property | Meaning | Example |
| --- | --- | --- |
| `transition-property` | Which property to animate | `background-color`, `all` |
| `transition-duration` | How long | `0.3s`, `300ms` |
| `transition-timing-function` | Speed curve | `ease`, `linear`, `ease-in-out` |
| `transition-delay` | Wait before starting | `0.1s` |
| `transition` (shorthand) | All four | `background 0.3s ease 0s` |

**Timing functions**

| Value | Feel |
| --- | --- |
| `ease` (default) | Slow, fast, slow |
| `linear` | Constant speed |
| `ease-in` | Starts slow |
| `ease-out` | Ends slow (good for entering) |
| `ease-in-out` | Slow at both ends |
| `cubic-bezier(...)` | Custom curve |

**Remember**

* Put `transition` on the **normal** state, not only on `:hover`, so the change also animates **back**.
* Only properties with **numeric or color values** can animate. `display` cannot.
* Prefer animating **`transform`** and **`opacity`**. They are smooth and cheap for the browser.
* Avoid `transition: all`. List the properties you need.
* Keep durations short: **150ms to 400ms** for interface feedback.

---

## 2. 2D Transforms (9.2)

**Core idea:** `transform` moves, rotates, scales or skews an element **visually** without changing the layout around it.

| Function | Effect | Example |
| --- | --- | --- |
| `translate(x, y)` | Move | `translate(20px, -10px)` |
| `translateX()` / `translateY()` | Move on one axis | `translateX(50%)` |
| `rotate(angle)` | Rotate clockwise | `rotate(45deg)` |
| `scale(n)` | Resize | `scale(1.2)`, `scale(0.8)` |
| `scale(x, y)` | Resize each axis | `scale(2, 0.5)` |
| `skew(x, y)` | Slant | `skew(15deg, 0)` |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; }
    .row { display: flex; gap: 30px; margin: 20px 0 40px; }
    .box { width: 70px; height: 70px; background: #6366f1; color: white; display: flex;
           align-items: center; justify-content: center; border-radius: 8px; font-size: 12px; }
    .move   { transform: translate(20px, 10px); }
    .turn   { transform: rotate(30deg); }
    .grow   { transform: scale(1.4); }
    .slant  { transform: skew(20deg); }
    .pivot  { transform-origin: top left; transform: rotate(30deg); }
    .combo  { transform: translateX(10px) rotate(15deg) scale(1.1); }
  </style>
</head>
<body>
  <div class="row">
    <div class="box move">translate</div>
    <div class="box turn">rotate</div>
    <div class="box grow">scale</div>
    <div class="box slant">skew</div>
    <div class="box pivot">origin</div>
    <div class="box combo">combo</div>
  </div>
</body>
</html>
```

**`transform-origin`** is the point the transform pivots around. Default: `center`. Try `top left` or `50% 100%`.

**Centering with transform**

```css
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**Remember**

* Transforms **do not move other elements**. The original space stays reserved.
* **Order matters** with several functions. They run **right to left** on the element's coordinates, so `translate rotate` differs from `rotate translate`.
* Percentages in `translate()` refer to the **element's own size**.
* Transforms **do not work on plain inline elements**. Make them `inline-block` or `block`.
* An element with a transform creates a **new stacking context**.
* Individual properties `translate`, `rotate` and `scale` also exist in modern browsers.

---

## 3. Keyframe Animations (9.3)

**Core idea:** `@keyframes` defines **steps** of an animation. The `animation` property plays them. Unlike transitions, animations can run **by themselves** and have **many steps**.

```text
@keyframes name {
  from { ... }        /* or 0%   */
  50%  { ... }
  to   { ... }        /* or 100% */
}
.element { animation: name 1s ease infinite; }
```

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; }
    .row { display: flex; gap: 40px; align-items: flex-end; height: 140px; }
    .dot { width: 50px; height: 50px; border-radius: 50%; background: #ec4899; }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-70px); }
    }
    @keyframes pulse {
      0%   { transform: scale(1);   opacity: 1; }
      50%  { transform: scale(1.3); opacity: 0.6; }
      100% { transform: scale(1);   opacity: 1; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .bounce { animation: bounce 1s ease-in-out infinite; }
    .pulse  { background: #22c55e; animation: pulse 1.5s ease-in-out infinite; }
    .spinner {
      width: 44px; height: 44px; border-radius: 50%;
      border: 5px solid #cbd5e1; border-top-color: #2563eb;
      animation: spin 0.9s linear infinite;
    }
  </style>
</head>
<body>
  <div class="row">
    <div class="dot bounce"></div>
    <div class="dot pulse"></div>
    <div class="spinner"></div>
  </div>
</body>
</html>
```

| | Transition | Animation |
| --- | --- | --- |
| Trigger | A **change** of state (hover, class) | Starts **automatically** |
| Steps | Start and end only | **Any number** (percentages) |
| Repeats | No | Yes (`infinite`) |
| Defined with | `transition` | `@keyframes` + `animation` |
| Best for | Hover and focus feedback | Loaders, attention effects, intros |

**Remember**

* The **name** in `animation` must match the name after `@keyframes`.
* `from` equals `0%`. `to` equals `100%`.
* Use **percentages** for more than two steps.
* If you leave out the first or last step, the element's **current style** is used.
* Use animations to give **meaning** (loading, success), not just decoration.

---

## 4. Animation Timing and Control (9.4)

**Core idea:** Properties of `animation` decide **how long**, **how fast**, **when** and **how often** it plays.

| Property | Common values | Meaning |
| --- | --- | --- |
| `animation-name` | `bounce` | Which `@keyframes` |
| `animation-duration` | `1s`, `500ms` | Length of one cycle |
| `animation-timing-function` | `ease`, `linear`, `steps(5)` | Speed curve |
| `animation-delay` | `0.5s` | Wait before starting |
| `animation-iteration-count` | `1`, `3`, `infinite` | Number of repeats |
| `animation-direction` | `normal`, `reverse`, `alternate` | Direction of each cycle |
| `animation-fill-mode` | `none`, `forwards`, `backwards`, `both` | Style before and after |
| `animation-play-state` | `running`, `paused` | Pause or resume |

**Shorthand order:** `animation: name duration timing-function delay iteration-count direction fill-mode;`

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .track { width: 300px; background: #e2e8f0; border-radius: 999px; padding: 4px; margin-bottom: 14px; }
    .ball { width: 36px; height: 36px; border-radius: 50%; background: #f97316; }

    @keyframes slide {
      from { transform: translateX(0); }
      to   { transform: translateX(256px); }
    }
    .a { animation: slide 2s ease-in-out infinite alternate; }
    .b { animation: slide 2s steps(6) infinite; background: #0ea5e9; }
    .c { animation: slide 1.5s linear 1 forwards; background: #16a34a; }
    .pause:hover .ball { animation-play-state: paused; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .card { padding: 14px; background: #ede9fe; border-radius: 8px; animation: fadeUp 0.6s ease-out 0.3s both; }
  </style>
</head>
<body>
  <div class="track pause"><div class="ball a"></div></div>
  <div class="track"><div class="ball b"></div></div>
  <div class="track"><div class="ball c"></div></div>
  <div class="card">Fades up after a 0.3s delay (fill-mode: both). Hover the orange track to pause it.</div>
</body>
</html>
```

| Value | Result |
| --- | --- |
| `alternate` | Plays forward, then backward, and so on |
| `forwards` | **Keeps** the last keyframe style after the end |
| `backwards` | Applies the first keyframe **during the delay** |
| `both` | Both of the above |
| `steps(n)` | Jumps in `n` discrete steps (sprites, typewriters) |

**Remember**

* Without `forwards`, the element **snaps back** to its original style when the animation ends.
* Use **`both`** when an element starts hidden (`opacity: 0`) and has a delay.
* `infinite` animations on many elements can **drain battery**.
* **Stagger** items by giving each a different `animation-delay`.
* In the shorthand, the first **time** value is the duration and the second is the delay.

---

## 5. Hover, Focus and Motion Preferences (9.5)

**Core idea:** Interactive effects must work for **every** user: mouse, keyboard, touch, and people who are sensitive to motion.

| Selector | When it applies |
| --- | --- |
| `:hover` | Pointer is over the element |
| `:focus` | Element has focus (click or keyboard) |
| `:focus-visible` | Focus **shown for keyboard** use (best for rings) |
| `:focus-within` | The element **or a child** has focus |
| `:active` | While pressed |

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .card {
      display: block; width: 220px; padding: 16px; margin-bottom: 14px; text-decoration: none;
      color: #0f172a; background: white; border: 2px solid #e2e8f0; border-radius: 10px;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .card:hover, .card:focus-visible { transform: translateY(-4px); border-color: #6366f1; box-shadow: 0 10px 20px rgba(0,0,0,.12); }
    .card:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }
    .field { padding: 10px; border: 2px dashed #94a3b8; border-radius: 8px; width: 220px; }
    .field:focus-within { border-style: solid; border-color: #16a34a; background: #f0fdf4; }
    .field input { border: 0; background: transparent; outline: none; width: 100%; }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition-duration: 0.01ms !important; }
    }
  </style>
</head>
<body>
  <a href="#" class="card">Hover or Tab to me</a>
  <div class="field"><input type="text" placeholder="Click here (focus-within)"></div>
</body>
</html>
```

**Respecting motion preferences**

```css
@media (prefers-reduced-motion: reduce) {
  .hero, .card {
    animation: none;
    transition: none;
  }
}
```

**Hover only on devices that can hover**

```css
@media (hover: hover) {
  .card:hover { transform: translateY(-4px); }
}
```

**Remember**

* **Never rely on hover alone.** Touch screens and keyboards cannot hover. Mirror hover styles on `:focus-visible`.
* **Do not remove focus outlines** without a clear replacement.
* Some users get **dizzy or sick** from large movement. `prefers-reduced-motion: reduce` lets them turn it off in system settings.
* Avoid flashing content (more than 3 flashes per second).
* Keep motion **subtle and purposeful**, and short enough not to slow users down.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Smooth hover | `transition: background-color 0.3s ease;` |
| Lift a card | `.card:hover { transform: translateY(-4px); }` |
| Zoom | `transform: scale(1.1);` |
| Rotate | `transform: rotate(45deg);` |
| Pivot point | `transform-origin: top left;` |
| Define animation | `@keyframes fade { from {opacity:0} to {opacity:1} }` |
| Play it | `animation: fade 0.5s ease both;` |
| Loop forever | `animation-iteration-count: infinite;` |
| Back and forth | `animation-direction: alternate;` |
| Keep final style | `animation-fill-mode: forwards;` |
| Pause | `animation-play-state: paused;` |
| Keyboard focus ring | `:focus-visible { outline: 3px solid #f59e0b; }` |
| Reduce motion | `@media (prefers-reduced-motion: reduce) { ... }` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `transition` only on `:hover` | Put it on the base state |
| Transitioning `display` | Use `opacity` and `visibility`, or `transform` |
| Animation name misspelled | Match `@keyframes` exactly |
| Element snaps back after animation | Add `animation-fill-mode: forwards` |
| `transform` on an inline element | Use `inline-block` or `block` |
| Transform order giving odd results | Remember they apply right to left |
| Animating `width`, `top`, `left` | Prefer `transform` and `opacity` |
| Hover-only interactions | Add `:focus-visible` and touch alternatives |
| `outline: none` with nothing else | Provide a visible focus style |
| Ignoring `prefers-reduced-motion` | Add a reduced-motion media query |
| Long, flashy effects | Keep it short, subtle and meaningful |

---

## Last-Minute Checklist

* I can write a transition with a property, duration and easing.
* I can use `translate`, `rotate`, `scale` and `skew`.
* I can write `@keyframes` and attach them with `animation`.
* I know `infinite`, `alternate`, `forwards` and `both`.
* I know to animate `transform` and `opacity` where possible.
* I style `:focus-visible` as well as `:hover`.
* I respect `prefers-reduced-motion`.

---

## Quiz: Rapid Fire

1. Where should the `transition` property usually be written?

- [ ] Only inside `:hover`
- [x] On the normal (base) state
- [ ] Inside `@keyframes`
- [ ] In the HTML

2. Which transform makes an element 20% bigger?

- [ ] `transform: size(1.2)`
- [x] `transform: scale(1.2)`
- [ ] `transform: grow(20%)`
- [ ] `transform: rotate(1.2)`

3. Which rule defines the steps of an animation?

- [ ] `@animation`
- [ ] `@steps`
- [x] `@keyframes`
- [ ] `@motion`

4. Which value keeps the final keyframe style after the animation ends?

- [ ] `animation-fill-mode: none`
- [x] `animation-fill-mode: forwards`
- [ ] `animation-direction: reverse`
- [ ] `animation-play-state: paused`

5. Which media feature respects users who are sensitive to motion?

- [ ] `(hover: none)`
- [ ] `(prefers-color-scheme: dark)`
- [x] `(prefers-reduced-motion: reduce)`
- [ ] `(orientation: portrait)`

6. Which two properties are the best to animate for smooth performance?

- [ ] `width` and `height`
- [ ] `top` and `left`
- [x] `transform` and `opacity`
- [ ] `margin` and `padding`
