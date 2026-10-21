# Quick Notes: Chapter 2 - JavaScript Fundamentals

> **15-minute revision.** Focus on the tables: `let` vs `const` vs `var`, the data types, and the conversion rules. These are the most tested ideas in the chapter.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 2.1 | Syntax and Comments | Case-sensitive, statements, identifiers, `//` and `/* */` |
| 2.2 | Variables | `const` by default, `let` when it changes, avoid `var` |
| 2.3 | Data Types | 7 primitives plus objects; `typeof` checks the type |
| 2.4 | Conversion and Coercion | Explicit (`Number()`) vs automatic (`"5" + 2`) |
| 2.5 | Input, Output, Template Literals | `console.log`, `prompt`, `` `${value}` `` |

---

## 1. Syntax and Comments (2.1)


**Core idea:** Follow a few simple rules and your code stays readable and error-free.

* JavaScript is **case-sensitive**: `age` and `Age` are different.
* Each instruction is a **statement**, usually ended with `;`.
* Whitespace and blank lines are ignored.
* Use `camelCase` for names: `userName`, `totalPrice`.

**Valid identifier rules**

| Rule | Valid | Invalid |
| --- | --- | --- |
| Start with a letter, `_` or `$` | `name`, `_id`, `$price` | `1name` |
| No spaces or hyphens | `first_name` | `first-name` |
| Not a reserved word | `userClass` | `class`, `let`, `if` |

```javascript
// Single-line comment
let price = 100; // explains this line

/*
  Multi-line comment
  for longer notes
*/
console.log(price);
```

```output
100
```

---

## 2. Variables: let, const and var (2.2)

**Core idea:** A variable is a named container for a value.

| Feature | `const` | `let` | `var` |
| --- | --- | --- | --- |
| Reassign | No | Yes | Yes |
| Redeclare in same scope | No | No | Yes |
| Scope | Block | Block | Function |
| Hoisting | Yes, in TDZ | Yes, in TDZ | Yes, value `undefined` |
| Must have a value at declaration | Yes | No | No |
| Use today | **Default** | When value changes | Avoid |

```javascript
const PI = 3.14;
let score = 0;
score = score + 10;

console.log(PI, score);
```

```output
3.14 10
```

**Block scope vs function scope**

```javascript
if (true) {
  let a = 1;
  var b = 2;
}

console.log(typeof a);
console.log(b);
```

```output
undefined
2
```

**Hoisting and the Temporal Dead Zone (TDZ)**

```javascript
console.log(v);
var v = 5;

try {
  console.log(l);
  let l = 5;
} catch (error) {
  console.log(error.name);
}
```

```output
undefined
ReferenceError
```

**Remember**

* `const` does not make objects frozen. You can still change an object's properties.
* Use `const` first; switch to `let` only if you must reassign.
* Never use a `let` or `const` variable before its declaration line.

---

## 3. Data Types (2.3)

**Core idea:** Every value has a type. JavaScript has **7 primitive types** and **objects**.

| Type | Example | Notes |
| --- | --- | --- |
| `string` | `"hello"` | Text |
| `number` | `42`, `3.14` | Integers and decimals |
| `bigint` | `123n` | Very large integers |
| `boolean` | `true`, `false` | Yes or no |
| `undefined` | `undefined` | Declared but no value |
| `null` | `null` | Intentionally empty |
| `symbol` | `Symbol("id")` | Unique identifier |
| `object` | `{}`, `[]` | Objects, arrays, functions, dates |

```javascript
console.log(typeof "hi", typeof 42, typeof 10n, typeof true);
console.log(typeof undefined, typeof null, typeof Symbol("id"));
console.log(typeof {}, typeof [], typeof function () {});
```

```output
string number bigint boolean
undefined object symbol
object object function
```

**Special number values**

```javascript
console.log(0.1 + 0.2);
console.log(10 / 0);
console.log("abc" * 2);
console.log(NaN === NaN);
console.log(Number.isNaN(NaN));
```

```output
0.30000000000000004
Infinity
NaN
false
true
```

**Remember**

* `typeof null` is `"object"`. This is a famous old bug.
* `typeof []` is `"object"`; use `Array.isArray()` to detect arrays.
* `NaN` means "not a number" and never equals itself; use `Number.isNaN()`.
* Primitives are copied by **value**; objects are copied by **reference**.

---

## 4. Type Conversion and Coercion (2.4)

**Core idea:** Conversion changes a value's type. It is **explicit** when you do it and **implicit (coercion)** when JavaScript does it for you.

**Explicit conversion**

```javascript
console.log(Number("42"), Number(""), Number("abc"), Number(true), Number(null), Number(undefined));
console.log(parseInt("42px"), parseFloat("3.14abc"), parseInt("abc"));
console.log(String(123), (255).toString(2));
```

```output
42 0 NaN 1 0 NaN
42 3.14 NaN
123 11111111
```

**Truthy and falsy**

The only **falsy** values are: `false`, `0`, `""`, `null`, `undefined`, `NaN` (and `0n`). Everything else is **truthy**.

```javascript
console.log(Boolean(0), Boolean(""), Boolean("0"), Boolean([]), Boolean(null));
```

```output
false false true true false
```

**Implicit coercion**

```javascript
console.log("5" + 2);
console.log("5" - 2);
console.log("5" * "2");
console.log(true + 1);
console.log(null + 1);
```

```output
52
3
10
2
1
```

**Equality**

```javascript
console.log(0 == "", "5" == 5, null == undefined);
console.log(0 === "", "5" === 5, null === undefined);
```

```output
true true true
false false false
```

**Remember**

* `+` joins strings if either side is a string; `- * /` convert to numbers.
* Always use `===` and `!==`.
* `parseInt` reads digits until it meets a non-digit; `Number` is strict.

---

## 5. Input, Output and Template Literals (2.5)

**Core idea:** Show information to users, take input from them and build text cleanly.

**Output**

| Method | Use |
| --- | --- |
| `console.log()` | Developer output |
| `alert()` | Popup message |
| `element.textContent` | Show text on the page (safe) |

**Input**

| Method | Returns |
| --- | --- |
| `prompt("Question")` | A **string** or `null` if cancelled |
| `confirm("Sure?")` | `true` or `false` |
| `input.value` | A **string** from a form field |

**Template literals** use backticks and `${}`.

```javascript
const name = "Asha";
const age = 20;

console.log(`Name: ${name}, next year: ${age + 1}`);
console.log(`Line 1
Line 2`);
```

```output
Name: Asha, next year: 21
Line 1
Line 2
```

Press **Run** to read two numbers from inputs and show the sum on the page.

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <input id="a" type="number" value="4">
  <input id="b" type="number" value="6">
  <button id="addBtn">Add</button>
  <p id="out"></p>

  <script>
    document.getElementById("addBtn").addEventListener("click", () => {
      const a = Number(document.getElementById("a").value);
      const b = Number(document.getElementById("b").value);
      document.getElementById("out").textContent = `${a} + ${b} = ${a + b}`;
    });
  </script>
</body>
</html>
```

**Remember**

* Input is **always a string**; convert it with `Number()`.
* Template literals allow multi-line text and expressions.
* Prefer `textContent` to show user data safely.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Constant | `const TAX = 0.18;` |
| Changing value | `let count = 0;` |
| Check type | `typeof value` |
| String to number | `Number("42")`, `parseInt("42px")` |
| Number to string | `String(5)`, `(5).toString()` |
| To boolean | `Boolean(value)`, `!!value` |
| Is it NaN? | `Number.isNaN(value)` |
| Is it an array? | `Array.isArray(value)` |
| Strict equality | `a === b` |
| Template literal | `` `Hi ${name}` `` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `"5" + 2` gives `"52"` | Convert first: `Number("5") + 2` |
| Using `var` | Use `let` or `const` |
| Using a variable before `let`/`const` | Declare first (TDZ error) |
| `typeof null` is `"object"` | Check with `value === null` |
| `NaN === NaN` is `false` | Use `Number.isNaN()` |
| `0.1 + 0.2` is not `0.3` | Round with `toFixed()` when displaying |
| `prompt` returns text | Wrap with `Number()` |
| Using `==` | Use `===` |

---

## Last-Minute Checklist

* ✅ I know `const` is the default and `let` is for values that change.
* ✅ I can list the 7 primitive types.
* ✅ I know the 6 falsy values.
* ✅ I can predict `"5" + 2` and `"5" - 2`.
* ✅ I know input values are strings.
* ✅ I can write a template literal with `${}`.

---

## Quiz: Rapid Fire

1. Which keyword should you use by default for a value that never changes?

- [ ] `var`
- [ ] `let`
- [x] `const`
- [ ] `static`

2. What is `typeof null`?

- [ ] `"null"`
- [ ] `"undefined"`
- [x] `"object"`
- [ ] `"number"`

3. What does `"5" + 2` return?

- [ ] `7`
- [x] `"52"`
- [ ] `NaN`
- [ ] `"7"`

4. Which of these is falsy?

- [ ] `"0"`
- [ ] `[]`
- [x] `NaN`
- [ ] `"false"`

5. What does `prompt()` return?

- [ ] A number
- [ ] A boolean
- [x] A string (or `null`)
- [ ] An array

6. Which is a valid template literal?

- [ ] `"Hello ${name}"`
- [ ] `'Hello ${name}'`
- [x] `` `Hello ${name}` ``
- [ ] `Hello {name}`
