# Quick Notes: Chapter 6 - Objects and Modern JavaScript

> **20-minute revision.** Objects store related data together. Focus on destructuring and spread (used everywhere in modern code), then `Set`, `Map` and modules.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 6.1 | Creating and Using Objects | `{ key: value }`; dot and bracket access; `Object.keys/values/entries` |
| 6.2 | Properties, Methods and this | Functions inside objects; `this` means "the object before the dot" |
| 6.3 | Destructuring and Spread | Unpack values with `{ }` / `[ ]`; copy and merge with `...` |
| 6.4 | Sets, Maps and Built-ins | Unique values, key-value pairs, `Math`, `Date`, `JSON` |
| 6.5 | Modules | Split code into files with `export` and `import` |

---

## 1. Creating and Using Objects (6.1)

**Core idea:** An object is a collection of **key: value** pairs describing one thing.

```javascript
const user = { name: "Asha", age: 20 };

console.log(user.name, user["age"]);

user.email = "asha@example.com";
user.age = 21;
delete user.name;

console.log(user);
```

```output
Asha 20
{ age: 21, email: 'asha@example.com' }
```

| Task | Syntax |
| --- | --- |
| Read | `obj.key` or `obj["key"]` |
| Add or change | `obj.key = value` |
| Delete | `delete obj.key` |
| Key exists? | `"key" in obj` or `Object.hasOwn(obj, "key")` |
| Dynamic key | `obj[variable]` |

```javascript
const user = { name: "Asha", age: 20 };

console.log(Object.keys(user), Object.values(user), Object.entries(user));
console.log("name" in user, Object.hasOwn(user, "email"));

const profile = { address: { city: "Pune" } };
console.log(profile.address?.city, profile.work?.company);
```

```output
[ 'name', 'age' ] [ 'Asha', 20 ] [ [ 'name', 'Asha' ], [ 'age', 20 ] ]
true false
Pune undefined
```

**Remember**

* Use **bracket notation** when the key is in a variable or has spaces: `obj["first name"]`.
* `?.` (optional chaining) stops safely instead of throwing on a missing value.
* Objects are **reference types**: `b = a` shares the same object.
* `const` objects can still have their properties changed.
* `Object.freeze(obj)` blocks changes.

---

## 2. Properties, Methods and this (6.2)

**Core idea:** A **method** is a function stored in an object. Inside it, `this` points to the object that called it.

```javascript
const counter = {
  count: 0,
  increment() {
    this.count++;
    return this;
  },
  show() {
    console.log(this.count);
  }
};

counter.increment().increment().show();
```

```output
2
```

**Shorthand, computed keys and getters**

```javascript
const name = "Asha";
const age = 20;
const key = "city";

const person = {
  name,
  age,
  [key]: "Pune",
  firstName: "Asha",
  lastName: "Rao",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(person);
console.log(person.fullName);
```

```output
{
  name: 'Asha',
  age: 20,
  city: 'Pune',
  firstName: 'Asha',
  lastName: 'Rao',
  fullName: [Getter]
}
Asha Rao
```

| Syntax | Meaning |
| --- | --- |
| `{ name, age }` | Shorthand for `{ name: name, age: age }` |
| `{ [key]: value }` | Key comes from a variable |
| `method() {}` | Method shorthand |
| `get prop() {}` | Computed property read like a value |

**Remember**

* `this` is decided by **how** a function is called, not where it is written.
* **Arrow functions have no own `this`**; do not use them as object methods.
* Copying a method into a variable (`const f = obj.method`) **loses** `this`.
* `return this` allows **method chaining**.

---

## 3. Destructuring and Spread Syntax (6.3)

**Core idea:** **Destructuring** unpacks values into variables. **Spread** (`...`) copies or merges.

```javascript
const { name, age = 18, city: town = "Pune" } = { name: "Asha" };
console.log(name, age, town);

const [a, b = 5, ...rest] = [1, undefined, 3, 4];
console.log(a, b, rest);

let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);
```

```output
Asha 18 Pune
1 5 [ 3, 4 ]
2 1
```

| Pattern | Meaning |
| --- | --- |
| `const { a, b } = obj` | Pull properties by **name** |
| `const { a: newName } = obj` | Rename |
| `const { a = 10 } = obj` | Default value |
| `const [first, second] = arr` | Pull items by **position** |
| `const [, second] = arr` | Skip an item |
| `const { a, ...others } = obj` | Rest: collect the remaining items |

```javascript
function show({ name, age = 18 }) {
  return `${name} (${age})`;
}

console.log(show({ name: "Asha" }));

const { a, ...others } = { a: 1, b: 2, c: 3 };
console.log(others);
```

```output
Asha (18)
{ b: 2, c: 3 }
```

**Spread**

```javascript
const base = { a: 1, b: 2 };
const merged = { ...base, b: 3, c: 4 };
const numbers = [...[1, 2], ...[3, 4]];

console.log(merged, numbers);
console.log(Math.max(...numbers));
```

```output
{ a: 1, b: 3, c: 4 } [ 1, 2, 3, 4 ]
4
```

**Spread makes a shallow copy**

```javascript
const original = { name: "Asha", tags: ["x"] };

const shallow = { ...original };
shallow.tags.push("y");
console.log(original.tags);

const deep = structuredClone(original);
deep.tags.push("z");
console.log(original.tags);
```

```output
[ 'x', 'y' ]
[ 'x', 'y' ]
```

**Remember**

* Later properties **override** earlier ones when spreading: `{ ...a, ...b }`.
* Spread copies only the **first level**; nested objects are still shared.
* Use `structuredClone()` for a **deep** copy.
* The same `...` is **rest** in parameters and destructuring, and **spread** in calls and literals.

---

## 4. Sets, Maps and Useful Built-ins (6.4)

**Core idea:** `Set` stores **unique values**. `Map` stores **key-value pairs with any key type**.

```javascript
const set = new Set([1, 2, 2, 3]);
set.add(4);
set.delete(1);

console.log(set, set.has(2), set.size);
console.log([...new Set([5, 5, 6, 6, 7])]);
```

```output
Set(3) { 2, 3, 4 } true 3
[ 5, 6, 7 ]
```

```javascript
const map = new Map();
map.set("a", 1).set("b", 2);

console.log(map.get("a"), map.size, map.has("z"));

for (const [key, value] of map) {
  console.log(key, value);
}

console.log(Object.fromEntries([["x", 1], ["y", 2]]));
```

```output
1 2 false
a 1
b 2
{ x: 1, y: 2 }
```

| Feature | Object | Map |
| --- | --- | --- |
| Key types | String or Symbol | **Any** type |
| Order | Mostly insertion | Always insertion order |
| Size | `Object.keys(obj).length` | `map.size` |
| Best for | Fixed structured records | Dynamic lookup tables |

**Useful built-ins**

```javascript
console.log(Math.round(4.6), Math.floor(4.9), Math.ceil(4.1), Math.max(1, 5, 3), Math.abs(-3));

const date = new Date(2026, 0, 15);
console.log(date.getFullYear(), date.getMonth(), date.getDate());

const json = JSON.stringify({ id: 1, tags: ["a"] });
console.log(json, JSON.parse(json).tags[0]);
```

```output
5 4 5 5 3
2026 0 15
{"id":1,"tags":["a"]} a
```

**Remember**

* `Math.random()` gives a number from 0 up to (not including) 1.
* `getMonth()` is **zero-based**: January is `0`.
* Use `Set` to remove duplicates: `[...new Set(array)]`.
* `JSON.stringify` / `JSON.parse` convert between objects and text.

---

## 5. JavaScript Modules: import and export (6.5)

**Core idea:** Modules split code into separate files. Each file has **private scope** and shares only what it exports.

```javascript
// utils/math.js
export const PI = 3.14;
export function add(a, b) {
  return a + b;
}
export default function multiply(a, b) {
  return a * b;
}
```

```javascript
// main.js
import multiply, { add, PI as pi } from "./utils/math.js";
import * as MathUtils from "./utils/math.js";

console.log(add(2, 3), multiply(2, 3), pi, MathUtils.add(1, 1));
```

```output
5 6 3.14 2
```

| Syntax | Meaning |
| --- | --- |
| `export const x` | Named export (many per file) |
| `export default x` | Default export (one per file) |
| `import { x } from "./f.js"` | Import a named export |
| `import name from "./f.js"` | Import the default (any name) |
| `import { x as y }` | Rename on import |
| `import * as M from "./f.js"` | Import everything as one object |
| `import("./f.js")` | Dynamic import (returns a Promise) |

**Remember**

* In HTML use `<script type="module" src="main.js"></script>`.
* Paths start with `./` or `../` and include `.js`.
* Modules need a **server** (not `file://`), such as Live Server.
* Imports are **read-only** and modules run **once**.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Read a property | `user.name` / `user["name"]` |
| Safe nested read | `user.address?.city` |
| All keys / values | `Object.keys(o)` / `Object.values(o)` |
| Loop an object | `for (const [k, v] of Object.entries(o)) {}` |
| Pull values out | `const { a, b } = obj;` |
| Copy an object | `{ ...obj }` |
| Deep copy | `structuredClone(obj)` |
| Merge | `{ ...a, ...b }` |
| Remove duplicates | `[...new Set(arr)]` |
| Lookup table | `new Map()` |
| Export / import | `export { x }` / `import { x } from "./f.js"` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `obj2 = obj1` is not a copy | Use `{ ...obj1 }` |
| Spread copy still shares nested data | Use `structuredClone()` |
| Arrow function as an object method | Use method shorthand `name() {}` |
| `this` lost after `const f = obj.method` | Call as `obj.method()` or use `bind` |
| Reading a missing nested property | Use `?.` |
| Month `1` is February | Months start at `0` |
| `import { Thing }` for a default export | Use `import Thing from ...` |
| Missing `.js` or `type="module"` | Add both |

---

## Last-Minute Checklist

* I can create, read, change and delete object properties.
* I know what `this` points to in a method.
* I can destructure objects and arrays with defaults and renaming.
* I know spread is a **shallow** copy.
* I can remove duplicates with a `Set`.
* I know named vs default exports.

---

## Quiz: Rapid Fire 🧠

1. How do you read a property using a key stored in a variable `key`?

- [ ] `obj.key`
- [x] `obj[key]`
- [ ] `obj->key`
- [ ] `obj(key)`

2. What does `const { a, ...others } = { a: 1, b: 2, c: 3 }` store in `others`?

- [ ] `1`
- [ ] `[2, 3]`
- [x] `{ b: 2, c: 3 }`
- [ ] `{ a: 1 }`

3. Why should an arrow function not be used as an object method?

- [ ] It cannot return values
- [x] It has no own `this`
- [ ] It runs twice
- [ ] It is not allowed in objects

4. What is the quickest way to remove duplicates from an array `arr`?

- [ ] `arr.unique()`
- [ ] `arr.filter(Boolean)`
- [x] `[...new Set(arr)]`
- [ ] `new Map(arr)`

5. What does `{ ...a, ...b }` do when both have the same key?

- [ ] Throws an error
- [ ] Keeps the value from `a`
- [x] Keeps the value from `b`
- [ ] Removes the key

6. How many default exports can one module have?

- [ ] None
- [x] One
- [ ] Two
- [ ] Unlimited
