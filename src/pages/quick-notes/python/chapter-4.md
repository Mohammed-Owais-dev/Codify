# Quick Notes: Chapter 4 - Strings & Collections

> **20-minute revision.** Python's built-in collections hold your data: **strings** (text), **lists** (ordered, changeable), **tuples** (ordered, fixed), **sets** (unique values) and **dictionaries** (key-value pairs). Finish with **comprehensions** and common programs.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 4.1 | Strings & String Operations | Immutable text; index, slice and use methods |
| 4.2 | Lists & List Methods | Ordered, mutable collection of any values |
| 4.3 | Tuples & Sets | Tuple = fixed list; set = unique, unordered values |
| 4.4 | Dictionaries & Dictionary Methods | Key-value pairs with fast lookup by key |
| 4.5 | Comprehensions & Common Programs | Build collections in one line; solve common tasks |

| Collection | Ordered | Mutable | Duplicates | Syntax |
| --- | --- | --- | --- | --- |
| `str` | Yes | No | Yes | `"abc"` |
| `list` | Yes | **Yes** | Yes | `[1, 2]` |
| `tuple` | Yes | No | Yes | `(1, 2)` |
| `set` | No | **Yes** | **No** | `{1, 2}` |
| `dict` | Yes (by insertion) | **Yes** | Keys: **No** | `{"a": 1}` |

---

## 1. Strings & String Operations (4.1)

**Core idea:** A **string** is an **immutable** sequence of characters. Use **indexing**, **slicing** and **methods** to work with it; methods return a **new** string.

```python
s = "Python"
print(s[0], s[-1], s[0:2], s[2:], s[::-1], len(s))
```

```output
P n Py thon nohtyP 6
```

```python
t = "  Hello, World  "
print(t.strip())
print("hello world".title())
print("a,b,c".split(","))
print("-".join(["a", "b"]))
print("banana".count("a"), "banana".find("n"), "banana".find("z"))
print("cat".replace("c", "b"))
print("Hello".startswith("He"), "abc".isalpha(), "123".isdigit())
print("Ha" * 3, "Py" + "thon")
```

```output
Hello, World
Hello World
['a', 'b', 'c']
a-b
3 2 -1
bat
True True True
HaHaHa Python
```

| Method | Purpose |
| --- | --- |
| `upper()` / `lower()` / `title()` | Change case |
| `strip()` | Remove spaces at both ends |
| `split(sep)` | Break into a list |
| `sep.join(list)` | Join a list into a string |
| `find(x)` | Index of first match, or `-1` |
| `count(x)` | Number of matches |
| `replace(a, b)` | Replace every `a` with `b` |
| `startswith()` / `endswith()` | Check the beginning or end |
| `isalpha()` / `isdigit()` | Check the type of characters |

**Slice syntax:** `s[start:stop:step]` (the `stop` index is **excluded**).

**Remember**

* Strings are **immutable**: `s[0] = "J"` raises a `TypeError`.
* Negative indexes count from the end: `s[-1]` is the last character.
* `s[::-1]` reverses a string.
* Methods do not change the original; store the result.

---

## 2. Lists & List Methods (4.2)

**Core idea:** A **list** is an ordered, **mutable** collection written in square brackets. It can hold mixed types and be changed in place.

```python
nums = [3, 1, 2]
nums.append(4)
print(nums)
nums.insert(0, 9)
print(nums)
nums.remove(1)
print(nums)
last = nums.pop()
print(last, nums)
nums.sort()
print(nums)
nums.reverse()
print(nums)
print(sum(nums), min(nums), max(nums), len(nums))
print(sorted([3, 1, 2], reverse=True))
```

```output
[3, 1, 2, 4]
[9, 3, 1, 2, 4]
[9, 3, 2, 4]
4 [9, 3, 2]
[2, 3, 9]
[9, 3, 2]
14 2 9 3
[3, 2, 1]
```

```python
a = [1, 2]
a.append([3])
print(a)

b = [1, 2]
b.extend([3, 4])
print(b)

x = [1, 2]
y = x
y.append(3)
print(x)

z = x.copy()
z.append(99)
print(x, z)
print(x[1:], x[::-1])
```

```output
[1, 2, [3]]
[1, 2, 3, 4]
[1, 2, 3]
[1, 2, 3] [1, 2, 3, 99]
[2, 3] [3, 2, 1]
```

| Method | Effect |
| --- | --- |
| `append(x)` | Add one item at the end |
| `extend(items)` | Add every item of another list |
| `insert(i, x)` | Insert at index `i` |
| `remove(x)` | Remove the first matching value |
| `pop(i)` | Remove and return the item (last by default) |
| `sort()` / `reverse()` | Change the list **in place** |
| `index(x)` / `count(x)` | Find a position / count matches |
| `copy()` | Make a shallow copy |

**Remember**

* `sort()` changes the list and returns `None`; `sorted()` returns a **new** list.
* `append([3])` adds a list **as one item**; `extend([3])` adds its items.
* `y = x` does **not** copy; use `x.copy()` or `x[:]`.
* `remove` raises `ValueError` if the value is missing.

---

## 3. Tuples & Sets (4.3)

**Core idea:** A **tuple** is an **immutable** ordered collection. A **set** holds **unique** values with no order and supports mathematical operations.

```python
t = (10, 20, 30)
print(t[0], t[-1])
a, b, c = t
print(b)
print(type((5,)), type((5)))
print(t + (40,))
print(len(t), t.count(20), t.index(30))
```

```output
10 30
20
<class 'tuple'> <class 'int'>
(10, 20, 30, 40)
3 1 2
```

```python
s = {1, 2, 2, 3}
print(s)
s.add(4)
s.discard(10)
s.remove(1)
print(s)

a = {1, 2, 3}
b = {3, 4}
print(a | b, a & b, a - b, a ^ b)
print(list(set([3, 1, 3, 2])))
print(type({}), type(set()))
print(2 in a)
```

```output
{1, 2, 3}
{2, 3, 4}
{1, 2, 3, 4} {3} {1, 2} {1, 2, 4}
[1, 2, 3]
<class 'dict'> <class 'set'>
True
```

| Set operation | Operator | Method |
| --- | --- | --- |
| Union | `a \| b` | `a.union(b)` |
| Intersection | `a & b` | `a.intersection(b)` |
| Difference | `a - b` | `a.difference(b)` |
| Symmetric difference | `a ^ b` | `a.symmetric_difference(b)` |

**Remember**

* A single-item tuple needs a comma: `(5,)`. Without it, `(5)` is just `5`.
* Tuples can be **unpacked**: `a, b, c = t`.
* `{}` creates an empty **dictionary**; use `set()` for an empty set.
* `discard()` is safe when the item is missing; `remove()` raises `KeyError`.
* Set items must be **hashable** (no lists inside a set).

---

## 4. Dictionaries & Dictionary Methods (4.4)

**Core idea:** A **dictionary** stores **key-value pairs**. Look up a value by its key. Keys must be unique and immutable.

```python
student = {"name": "Asha", "age": 20}
print(student["name"])
student["city"] = "Pune"
print(student)
print(student.get("email"), student.get("email", "N/A"))
print(student.pop("age"))
print(list(student.keys()), list(student.values()))
for key, value in student.items():
    print(key, value)
print("name" in student, "Asha" in student)
```

```output
Asha
{'name': 'Asha', 'age': 20, 'city': 'Pune'}
None N/A
20
['name', 'city'] ['Asha', 'Pune']
name Asha
city Pune
True False
```

```python
counts = {}
for w in ["a", "b", "a"]:
    counts[w] = counts.get(w, 0) + 1
print(counts)

d = {"x": 1}
d.update({"y": 2, "x": 10})
print(d)

print({"s": {"m": 90}}["s"]["m"])
```

```output
{'a': 2, 'b': 1}
{'x': 10, 'y': 2}
90
```

| Method | Purpose |
| --- | --- |
| `d[key]` | Get a value (`KeyError` if missing) |
| `d.get(key, default)` | Safe get with an optional default |
| `d[key] = value` | Add or update |
| `d.update(other)` | Merge another dictionary |
| `d.pop(key)` | Remove and return the value |
| `del d[key]` | Remove a pair |
| `keys()` / `values()` / `items()` | Views of keys, values, or pairs |

**Remember**

* `in` checks **keys**, not values.
* Looping a dictionary directly gives its **keys**; use `.items()` for pairs.
* Adding an existing key **overwrites** its value.
* `get()` avoids `KeyError`; it returns `None` when the key is absent.

---

## 5. Comprehensions & Common Programs (4.5)

**Core idea:** A **comprehension** builds a list, set or dictionary in a single readable line.

```python
print([x * x for x in range(1, 6)])
print([n for n in range(10) if n % 2 == 0])
print(["even" if n % 2 == 0 else "odd" for n in range(3)])
print({n: n * n for n in range(1, 4)})
print({c for c in "aab"} == {"a", "b"})
print([x for row in [[1, 2], [3, 4]] for x in row])
```

```output
[1, 4, 9, 16, 25]
[0, 2, 4, 6, 8]
['even', 'odd', 'even']
{1: 1, 2: 4, 3: 9}
True
[1, 2, 3, 4]
```

```text
[expression for item in iterable if condition]
{key: value for item in iterable}
{expression for item in iterable}
```

**Common collection programs**

```python
nums = [4, 9, 2, 9, 7]
print(max(nums))
print(sorted(set(nums))[-2])
print(list(dict.fromkeys([1, 2, 2, 3, 1])))

word = "madam"
print(word == word[::-1])
print(sum(1 for c in "education" if c in "aeiou"))

d = {"a": 1, "b": 2}
print({v: k for k, v in d.items()})
print({**d, "c": 3})
```

```output
9
7
[1, 2, 3]
True
5
{1: 'a', 2: 'b'}
{'a': 1, 'b': 2, 'c': 3}
```

| Task | Approach |
| --- | --- |
| Largest value | `max(nums)` |
| Second largest | `sorted(set(nums))[-2]` |
| Remove duplicates, keep order | `list(dict.fromkeys(items))` |
| Palindrome check | `s == s[::-1]` |
| Count vowels | `sum(1 for c in s if c in "aeiou")` |
| Swap keys and values | `{v: k for k, v in d.items()}` |
| Merge dictionaries | `{**a, **b}` |

**Remember**

* Use a comprehension for **simple** transformations; use a loop when the logic is long.
* The `if` filter goes **at the end**; an `if / else` goes **before** the `for`.
* `set(items)` removes duplicates but loses order; `dict.fromkeys()` keeps order.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Reverse a string or list | `x[::-1]` |
| Split / join text | `s.split(",")` / `",".join(items)` |
| Add to a list | `items.append(x)` |
| Sorted copy | `sorted(items)` |
| Sort in place | `items.sort()` |
| Remove duplicates | `list(set(items))` |
| Unpack a tuple | `a, b = pair` |
| Set union / intersection | `a \| b` / `a & b` |
| Safe dictionary lookup | `d.get(key, default)` |
| Loop over key-value pairs | `for k, v in d.items():` |
| Count items | `d[x] = d.get(x, 0) + 1` |
| List comprehension | `[f(x) for x in items if cond]` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Trying `s[0] = "J"` on a string | Strings are immutable; build a new string |
| `y = x` expecting a copy of a list | Use `x.copy()` or `x[:]` |
| Using `append` to add several items | Use `extend` |
| Writing `(5)` for a one-item tuple | Write `(5,)` |
| Creating an empty set with `{}` | Use `set()` |
| `d["missing"]` raising `KeyError` | Use `d.get("missing")` |
| Expecting `x in d` to search values | It checks keys; use `x in d.values()` |
| Assigning `nums = nums.sort()` | `sort()` returns `None`; call it without assigning |
| Modifying a list while looping over it | Loop over a copy or build a new list |
| Mutable item as a dictionary key | Use an immutable key such as a string, number or tuple |

---

## Last-Minute Checklist

* I can index, slice and reverse a string.
* I know the common string methods and that strings are immutable.
* I can add, remove, sort and copy a list correctly.
* I know the difference between a list, tuple and set.
* I can create a dictionary, read it safely and loop over it.
* I can write list and dictionary comprehensions.
* I can solve duplicates, palindrome, vowel-count and frequency tasks.

---

## Quiz: Rapid Fire 🧠

1. What does `"Python"[::-1]` return?

- [ ] `"Python"`
- [x] `"nohtyP"`
- [ ] `"P"`
- [ ] An error

2. Which method adds **one item** to the end of a list?

- [ ] `extend()`
- [ ] `insert()`
- [x] `append()`
- [ ] `add()`

3. What does `type({})` return?

- [ ] `<class 'set'>`
- [x] `<class 'dict'>`
- [ ] `<class 'list'>`
- [ ] `<class 'tuple'>`

4. Which collection stores only unique values?

- [ ] `list`
- [ ] `tuple`
- [x] `set`
- [ ] `str`

5. What does `{"a": 1}.get("b", 0)` return?

- [ ] `None`
- [ ] A `KeyError`
- [x] `0`
- [ ] `1`

6. What does `[n for n in range(6) if n % 2 == 0]` produce?

- [ ] `[1, 3, 5]`
- [x] `[0, 2, 4]`
- [ ] `[0, 1, 2, 3, 4, 5]`
- [ ] `[2, 4, 6]`
