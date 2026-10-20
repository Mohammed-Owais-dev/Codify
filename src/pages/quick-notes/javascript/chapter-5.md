# Quick Notes: Chapter 5 - Arrays and Strings

> **20-minute revision.** Strings and arrays are used in almost every program. Know which methods **change** the original and which **return a new value**.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 5.1 | Working with Strings | Immutable text; index, length, template literals |
| 5.2 | Common String Methods | `slice`, `trim`, `includes`, `replace`, `split`... |
| 5.3 | Creating and Accessing Arrays | Ordered lists; add, remove, copy, destructure |
| 5.4 | map, filter and reduce | Transform, select and combine items |
| 5.5 | Searching, Sorting, Iterating | `find`, `some`, `sort`, `forEach`, `for...of` |

---

## 1. Working with Strings (5.1)

**Core idea:** A string is text in quotes. Strings are **immutable**: methods never change the original.

```javascript
const s = "JavaScript";

console.log(s.length, s[0], s.at(-1), s.charAt(4));

s[0] = "j";
console.log(s);
```

```output
10 J t S
JavaScript
```

| Syntax | Use |
| --- | --- |
| `"text"` or `'text'` | Normal strings |
| `` `text ${x}` `` | Template literal (variables, multi-line) |
| `\n` | New line |
| `\"` or `\'` | Quote inside a string |
| `\\` | A backslash |

```javascript
const name = "Asha";

console.log("Hello, " + name + "!");
console.log(`Hello, ${name}!`);
console.log("She said \"Hi\"");
```

```output
Hello, Asha!
Hello, Asha!
She said "Hi"
```

**Remember**

* Index starts at **0**; the last index is `length - 1`.
* `at(-1)` gets the last character.
* Comparing strings is **case-sensitive**: `"a" === "A"` is `false`.

---

## 2. Common String Methods (5.2)

**Core idea:** Every string method returns a **new** value.

```javascript
const text = "JavaScript is fun";

console.log(text.toUpperCase());
console.log(text.slice(0, 10));
console.log(text.slice(-3));
console.log(text.substring(4, 10));
console.log(text.indexOf("is"));
console.log(text.includes("fun"), text.startsWith("Java"), text.endsWith("fun"));
```

```output
JAVASCRIPT IS FUN
JavaScript
fun
Script
11
true true true
```

```javascript
const messy = "  Hello, World  ";

console.log(`[${messy.trim()}]`);
console.log("banana".replace("a", "@"));
console.log("banana".replaceAll("a", "@"));
console.log("a-b-c".split("-"));
console.log("7".padStart(5, "0"));
console.log("ab".repeat(3));
```

```output
[Hello, World]
b@nana
b@n@n@
[ 'a', 'b', 'c' ]
00007
ababab
```

| Method | What it does |
| --- | --- |
| `toUpperCase()` / `toLowerCase()` | Change case |
| `trim()` | Remove spaces at both ends |
| `slice(start, end)` | Cut a part; negative index allowed |
| `indexOf(text)` | Position, or `-1` if not found |
| `includes(text)` | `true` or `false` |
| `startsWith()` / `endsWith()` | Check beginning or end |
| `replace()` / `replaceAll()` | Replace first / all matches |
| `split(separator)` | String to array |
| `padStart()` / `padEnd()` | Fill to a length |
| `repeat(n)` | Repeat text |

**Remember**

* `slice(start, end)` excludes the `end` index.
* `replace` changes only the **first** match; use `replaceAll` for every match.
* Use `trim()` on user input before checking it.
* `split` and `join` are opposites.

---

## 3. Creating and Accessing Arrays (5.3)

**Core idea:** An array is an ordered list. Items can be any type, and indexes start at **0**.

```javascript
const fruits = ["apple", "banana"];

fruits.push("mango");
fruits.unshift("kiwi");
console.log(fruits);

fruits.pop();
fruits.shift();
console.log(fruits, fruits.length);
```

```output
[ 'kiwi', 'apple', 'banana', 'mango' ]
[ 'apple', 'banana' ] 2
```

| Method | What it does | Changes original? |
| --- | --- | --- |
| `push(x)` | Add to end | Yes |
| `pop()` | Remove from end | Yes |
| `unshift(x)` | Add to start | Yes |
| `shift()` | Remove from start | Yes |
| `splice(i, n)` | Remove or insert at a position | Yes |
| `slice(a, b)` | Copy a part | No |
| `concat()` / `[...a, ...b]` | Join arrays | No |
| `includes(x)` / `indexOf(x)` | Check or find position | No |

**slice vs splice**

```javascript
const nums = [1, 2, 3, 4, 5];

console.log(nums.slice(1, 3), nums);

const removed = nums.splice(1, 2);
console.log(removed, nums);
```

```output
[ 2, 3 ] [ 1, 2, 3, 4, 5 ]
[ 2, 3 ] [ 1, 4, 5 ]
```

**Copy, join, check and destructure**

```javascript
const [first, , third] = [10, 20, 30];

console.log([...[1, 2], ...[3]]);
console.log(Array.isArray([]), [1, 2, 3].includes(2), [1, 2, 3].indexOf(5));
console.log(first, third);
```

```output
[ 1, 2, 3 ]
true true -1
10 30
```

**Remember**

* `const` arrays can still change (`push`, `pop`); only reassignment is blocked.
* `arr2 = arr1` copies the **reference**; use `[...arr1]` for a real copy.
* The last item is `arr[arr.length - 1]` or `arr.at(-1)`.
* `indexOf` gives `-1` when nothing is found.

---

## 4. Array Methods: map, filter and reduce (5.4)

**Core idea:** Three methods that handle most data work, **without changing the original array**.

| Method | Purpose | Returns |
| --- | --- | --- |
| `map(fn)` | Transform every item | New array, **same length** |
| `filter(fn)` | Keep items that pass a test | New array, **shorter or equal** |
| `reduce(fn, start)` | Combine all items into one value | **Single value** |

```javascript
const nums = [1, 2, 3, 4, 5];

console.log(nums.map(n => n * 2));
console.log(nums.filter(n => n % 2 === 0));
console.log(nums.reduce((sum, n) => sum + n, 0));
```

```output
[ 2, 4, 6, 8, 10 ]
[ 2, 4 ]
15
```

**Chaining**

```javascript
const result = [1, 2, 3, 4, 5]
  .filter(n => n % 2 !== 0)
  .map(n => n * 10);

console.log(result);
```

```output
[ 10, 30, 50 ]
```

**With objects**

```javascript
const cart = [
  { name: "Book", price: 499 },
  { name: "Pen", price: 20 }
];

console.log(cart.map(item => item.name));
console.log(cart.reduce((sum, item) => sum + item.price, 0));
```

```output
[ 'Book', 'Pen' ]
519
```

**Remember**

* `map` and `filter` always **return a new array**.
* Always give `reduce` a **starting value** (the `0` above).
* `map` callback: `(item, index, array)`. `reduce` callback: `(total, item)`.
* Use `forEach` when you do not need a result.

---

## 5. Searching, Sorting and Iterating Arrays (5.5)

**Core idea:** Find items, put them in order and loop through them.

**Searching**

```javascript
const users = [
  { name: "Asha", age: 17 },
  { name: "Ravi", age: 25 },
  { name: "Meena", age: 31 }
];

console.log(users.find(u => u.age > 18));
console.log(users.findIndex(u => u.name === "Meena"));
console.log(users.some(u => u.age < 18), users.every(u => u.age > 18));
```

```output
{ name: 'Ravi', age: 25 }
2
true false
```

| Method | Returns |
| --- | --- |
| `find(fn)` | First matching **item**, or `undefined` |
| `findIndex(fn)` | Index of the first match, or `-1` |
| `some(fn)` | `true` if **at least one** passes |
| `every(fn)` | `true` if **all** pass |
| `includes(x)` | `true` if the value exists |

**Sorting**

```javascript
console.log([30, 5, 100].sort());
console.log([30, 5, 100].sort((a, b) => a - b));
console.log([30, 5, 100].sort((a, b) => b - a));
console.log(["banana", "apple", "cherry"].sort());

const original = [3, 1, 2];
const sorted = [...original].sort();
console.log(original, sorted);
```

```output
[ 100, 30, 5 ]
[ 5, 30, 100 ]
[ 100, 30, 5 ]
[ 'apple', 'banana', 'cherry' ]
[ 3, 1, 2 ] [ 1, 2, 3 ]
```

* `sort()` with no function compares items as **text**.
* `(a, b) => a - b` sorts numbers upward; `b - a` sorts downward.
* `sort()` and `reverse()` **change the original**; copy first with `[...arr]`.

**Iterating**

```javascript
const letters = ["a", "b"];

letters.forEach(letter => console.log("forEach:", letter));

for (const [index, value] of letters.entries()) {
  console.log(index, value);
}

console.log([1, [2, [3]]].flat(Infinity));
console.log(["a", "b", "c"].join("-"));
```

```output
forEach: a
forEach: b
0 a
1 b
[ 1, 2, 3 ]
a-b-c
```

| Tool | Best for |
| --- | --- |
| `for...of` | Looping values, with `break` and `continue` |
| `forEach` | Simple side effects (no result) |
| `map` | Building a new array |
| `for` loop | Need full control of the index |

**Remember**

* `forEach` cannot be stopped with `break`.
* `find` returns the item; `filter` returns an array.
* `join` turns an array into a string; `split` does the opposite.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Length | `text.length`, `arr.length` |
| Last item | `arr.at(-1)` |
| Trim and lowercase | `text.trim().toLowerCase()` |
| Part of a string | `text.slice(0, 5)` |
| Contains text | `text.includes("x")` |
| Replace all | `text.replaceAll("a", "b")` |
| String to array | `text.split(" ")` |
| Array to string | `arr.join(", ")` |
| Add / remove at end | `arr.push(x)` / `arr.pop()` |
| Copy an array | `[...arr]` |
| Double every item | `arr.map(n => n * 2)` |
| Keep matching items | `arr.filter(n => n > 5)` |
| Sum | `arr.reduce((a, b) => a + b, 0)` |
| First match | `arr.find(x => x.id === 3)` |
| Sort numbers | `arr.sort((a, b) => a - b)` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Expecting a string method to change the string | Save the result: `text = text.trim()` |
| `replace` changes only the first match | Use `replaceAll` |
| `sort()` on numbers gives the wrong order | Add `(a, b) => a - b` |
| `sort()` changes the original array | Copy first: `[...arr].sort()` |
| `reduce` with no starting value | Pass a starting value like `0` |
| `arr2 = arr1` is not a copy | Use `[...arr1]` |
| Mixing up `slice` and `splice` | `slice` copies, `splice` changes the array |
| Using `forEach` result | It returns `undefined`; use `map` |
| `find` returns `undefined` | Check before using the result |
| Index off by one | Index starts at `0`; last is `length - 1` |

---

## Last-Minute Checklist

* I know strings are immutable and arrays are changeable.
* I can use `slice`, `trim`, `includes`, `replace` and `split`.
* I know which array methods change the original.
* I can explain `map`, `filter` and `reduce` in one line each.
* I can sort numbers correctly.
* I know `find` vs `filter` and `some` vs `every`.
* I can copy an array with spread.

---

## Quiz: Rapid Fire 🧠

1. What does `"banana".replace("a", "@")` return?

- [ ] `"b@n@n@"`
- [x] `"b@nana"`
- [ ] `"@banana"`
- [ ] `"banana"`

2. Which array method returns a **new array of the same length**?

- [ ] `filter`
- [ ] `reduce`
- [x] `map`
- [ ] `find`

3. What is the correct way to sort `[30, 5, 100]` in ascending order?

- [ ] `.sort()`
- [ ] `.sort((a, b) => b - a)`
- [x] `.sort((a, b) => a - b)`
- [ ] `.sort("asc")`

4. What does `[1, 2, 3].indexOf(5)` return?

- [ ] `0`
- [ ] `undefined`
- [x] `-1`
- [ ] `null`

5. Which method changes the original array?

- [ ] `slice`
- [ ] `map`
- [x] `splice`
- [ ] `concat`

6. What does `[1, 2, 3, 4].reduce((sum, n) => sum + n, 0)` return?

- [ ] `[1, 2, 3, 4]`
- [ ] `4`
- [x] `10`
- [ ] `0`
