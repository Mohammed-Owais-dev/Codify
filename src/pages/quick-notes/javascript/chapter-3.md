# Quick Notes: Chapter 3 - Operators and Control Flow

> **15-minute revision.** Operators build expressions; control flow decides **which** code runs and **how many times**. Master the logical operators and loop keywords first.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 3.1 | Arithmetic and Assignment | `+ - * / % **`, `++ --`, `+= -=` |
| 3.2 | Comparison and Logical | `=== !== > <`, `&& \|\| ! ??`, ternary |
| 3.3 | if, else if, else | Choose one path based on conditions |
| 3.4 | switch | Choose one path based on exact values |
| 3.5 | Loops | `for`, `while`, `do...while`, `break`, `continue` |

---

## 1. Arithmetic and Assignment Operators (3.1)

**Core idea:** Operators perform calculations and store results.

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | Add or join text | `10 + 3` | `13` |
| `-` | Subtract | `10 - 3` | `7` |
| `*` | Multiply | `10 * 3` | `30` |
| `/` | Divide | `10 / 4` | `2.5` |
| `%` | Remainder | `10 % 3` | `1` |
| `**` | Power | `2 ** 3` | `8` |

```javascript
console.log(10 + 3, 10 - 3, 10 * 3, 10 / 3, 10 % 3, 2 ** 3);
```

```output
13 7 30 3.3333333333333335 1 8
```

**Increment and decrement**

```javascript
let n = 5;
console.log(n++, n, ++n);
```

```output
5 6 7
```

* `n++` (postfix) returns the **old** value, then adds 1.
* `++n` (prefix) adds 1, then returns the **new** value.

**Assignment operators**

| Operator | Same as |
| --- | --- |
| `x += 5` | `x = x + 5` |
| `x -= 5` | `x = x - 5` |
| `x *= 5` | `x = x * 5` |
| `x /= 5` | `x = x / 5` |
| `x %= 5` | `x = x % 5` |
| `x **= 2` | `x = x ** 2` |

```javascript
let total = 10;
total += 5;
total *= 2;
console.log(total);
```

```output
30
```

**Remember**

* `%` is perfect for **even/odd** checks: `n % 2 === 0`.
* `/` always gives decimals; there is no integer division operator. Use `Math.floor(a / b)`.
* Operator precedence: `**`, then `* / %`, then `+ -`. Use parentheses to be clear.

---

## 2. Comparison and Logical Operators (3.2)

**Core idea:** Comparisons give `true` or `false`; logical operators combine them.

| Operator | Meaning |
| --- | --- |
| `===` / `!==` | Strict equal / not equal (**use these**) |
| `==` / `!=` | Loose equal / not equal (converts types) |
| `>` `<` `>=` `<=` | Greater / less comparisons |

```javascript
console.log(5 > 3, 5 <= 5, "5" == 5, "5" === 5, 5 !== "5");
console.log("apple" < "banana", "10" < "9", 10 < 9);
```

```output
true true true false true
true true false
```

Strings are compared **letter by letter**, so `"10" < "9"` is `true`.

**Logical operators**

| Operator | Name | Result |
| --- | --- | --- |
| `&&` | AND | `true` only if **both** are true |
| `\|\|` | OR | `true` if **at least one** is true |
| `!` | NOT | Flips true and false |
| `??` | Nullish | Right side only if left is `null` or `undefined` |

```javascript
console.log(true && false, true || false, !true);
console.log(0 || "default", "hi" && "yes", null ?? "fallback", 0 ?? "fallback");
```

```output
false true false
default yes fallback 0
```

* `&&` and `||` return **one of the values**, not just `true` or `false`.
* `||` replaces **any falsy** value; `??` replaces only `null` or `undefined`.

**Ternary operator**

```javascript
const age = 20;
const message = age >= 18 ? "Adult" : "Minor";
console.log(message);
```

```output
Adult
```

---

## 3. if, else if and else (3.3)

**Core idea:** Run code only when a condition is true. Conditions are checked **top to bottom**, and only the **first match** runs.

```javascript
const score = 72;

if (score >= 90) {
  console.log("A");
} else if (score >= 75) {
  console.log("B");
} else if (score >= 60) {
  console.log("C");
} else {
  console.log("Fail");
}
```

```output
C
```

**Structure**

| Part | Rule |
| --- | --- |
| `if` | Required; first condition |
| `else if` | Optional; as many as needed |
| `else` | Optional; runs when nothing matched |

**Remember**

* Order matters: put the **most specific** condition first.
* Conditions can be any value; JavaScript uses truthy and falsy rules.
* Use `===`, not `=`. A single `=` assigns instead of comparing.
* Use a ternary only for simple two-way choices.

---

## 4. switch Statements (3.4)

**Core idea:** Compare one value against many exact options.

```javascript
const day = 6;

switch (day) {
  case 6:
  case 7:
    console.log("Weekend");
    break;
  case 1:
    console.log("Monday");
    break;
  default:
    console.log("Weekday");
}
```

```output
Weekend
```

**Fall-through happens when `break` is missing.**

```javascript
switch (2) {
  case 1:
    console.log("one");
  case 2:
    console.log("two");
  case 3:
    console.log("three");
    break;
  default:
    console.log("other");
}
```

```output
two
three
```

| Use `if...else` when | Use `switch` when |
| --- | --- |
| Ranges: `score >= 60` | Exact values: `day === 3` |
| Complex conditions | One variable, many choices |
| Two or three branches | Many cases |

**Remember**

* `switch` uses **strict equality** (`===`).
* Add `break` after each case unless you want fall-through.
* `default` runs when no case matches; it is optional.
* Grouped cases (`case 6: case 7:`) share one block.

---

## 5. Loops: for, while and do...while (3.5)

**Core idea:** Repeat code without copying it.

| Loop | Use when |
| --- | --- |
| `for` | You know how many times |
| `while` | Repeat while a condition is true |
| `do...while` | Run at least once, then check |
| `for...of` | Loop over **values** (arrays, strings) |
| `for...in` | Loop over **keys** of an object |

```javascript
for (let i = 1; i <= 3; i++) {
  console.log("for:", i);
}

let count = 3;
while (count > 0) {
  console.log("while:", count);
  count--;
}
```

```output
for: 1
for: 2
for: 3
while: 3
while: 2
while: 1
```

**do...while runs once even when the condition is false.**

```javascript
let k = 10;

do {
  console.log("runs once");
  k++;
} while (k < 5);
```

```output
runs once
```

**break and continue**

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 2) continue;
  if (i === 5) break;
  console.log(i);
}
```

```output
1
3
4
```

* `break` leaves the loop completely.
* `continue` skips to the next round.

**for...of and for...in**

```javascript
for (const letter of "JS") {
  console.log(letter);
}

const person = { name: "Asha", age: 20 };
for (const key in person) {
  console.log(key, person[key]);
}
```

```output
J
S
name Asha
age 20
```

**Nested loops**

```javascript
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}
```

```output
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
```

**Remember**

* A `for` loop has three parts: `init; condition; update`.
* Forgetting to change the condition variable creates an **infinite loop**.
* Use `for...of` for arrays; avoid `for...in` for arrays.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Even number | `n % 2 === 0` |
| Increase by 1 | `n++` or `n += 1` |
| Default value | `value ?? "default"` |
| Either condition | `a \|\| b` |
| Both conditions | `a && b` |
| Short if/else | `cond ? x : y` |
| Count 1 to 5 | `for (let i = 1; i <= 5; i++) {}` |
| Loop array values | `for (const item of items) {}` |
| Loop object keys | `for (const key in obj) {}` |
| Stop a loop | `break` |
| Skip one round | `continue` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `if (x = 5)` assigns | Use `===` |
| Missing `break` in `switch` | Add `break` unless fall-through is intended |
| Infinite loop | Make sure the loop variable changes |
| Off by one (`<=` vs `<`) | Check the first and last values |
| `"10" < "9"` is `true` | Convert strings to numbers first |
| `\|\|` hides valid `0` or `""` | Use `??` |
| `for...in` on arrays | Use `for...of` |
| Wrong condition order | Put the most specific one first |

---

## Last-Minute Checklist

* I know the difference between `n++` and `++n`.
* I can explain `&&`, `||`, `!` and `??`.
* I can write a ternary expression.
* I know `else if` stops at the first match.
* I know why `break` matters in `switch`.
* I can choose between `for`, `while` and `do...while`.
* I know `break` vs `continue`.

---

## Quiz: Rapid Fire

1. What does `10 % 3` return?

- [ ] `3`
- [x] `1`
- [ ] `0`
- [ ] `3.33`

2. What does `null ?? "fallback"` return?

- [ ] `null`
- [x] `"fallback"`
- [ ] `undefined`
- [ ] `false`

3. What happens in a `switch` case without `break`?

- [ ] An error occurs
- [ ] The program stops
- [x] Execution falls through into the next case
- [ ] The default case is skipped

4. Which loop always runs at least once?

- [ ] `for`
- [ ] `while`
- [x] `do...while`
- [ ] `for...of`

5. What does `continue` do?

- [ ] Leaves the loop
- [x] Skips the rest of the current round
- [ ] Restarts the program
- [ ] Ends the function

6. What does `let n = 5; console.log(n++);` print?

- [x] `5`
- [ ] `6`
- [ ] `7`
- [ ] `undefined`
