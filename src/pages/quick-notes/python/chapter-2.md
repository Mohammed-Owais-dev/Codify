# Quick Notes: Chapter 2 - Python Basics

> ⏱ **15-minute revision.** Know the building blocks: **indentation and comments**, **variables**, **data types**, **input/output with type conversion**, and **operators**. Almost every later chapter uses these.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 2.1 | Syntax, Indentation & Comments | Indentation defines blocks; `#` starts a comment |
| 2.2 | Variables & Constants | Names that refer to values; constants are by convention |
| 2.3 | Data Types | `int`, `float`, `str`, `bool`, `None`, and collections |
| 2.4 | Input, Output & Type Conversion | `input()` gives text; convert with `int()` and `float()` |
| 2.5 | Operators & Expressions | Arithmetic, comparison, logical, identity, membership |

---

## 1. Syntax, Indentation & Comments (2.1)

**Core idea:** Python uses **indentation** (usually 4 spaces) instead of braces to define a block. Comments start with `#`.

```python
# Single-line comment
age = 20    # inline comment

if age >= 18:
    print("Adult")
    print("Can vote")
print("Done")

"""
A multi-line string,
often used as a docstring or block comment
"""
```

```output
Adult
Can vote
Done
```

**Line continuation**

```python
total = 1 + 2 + \
        3
values = (10 +
          20)
print(total, values)
```

```output
6 30
```

| Rule | Detail |
| --- | --- |
| Indentation | Required; use 4 spaces consistently |
| Colon `:` | Ends `if`, `for`, `while`, `def` and `class` lines |
| Case-sensitive | `Total` and `total` are different |
| One statement per line | Use a backslash or brackets to continue a line |

**Remember**

* Statements in the same block must have the **same indentation**.
* Do not mix tabs and spaces.
* A string in triple quotes placed first in a function is its **docstring**.

---

## 2. Variables & Constants (2.2)

**Core idea:** A **variable** is a name that refers to a value; it is created on the first assignment. Python has **no true constants**: write them in `UPPER_CASE` by convention.

```python
name = "Asha"
age = 20
x, y = 1, 2
x, y = y, x
a = b = 0
PI = 3.14159

print(name, age)
print(x, y)
print(a, b)
print(PI)
```

```output
Asha 20
2 1
0 0
3.14159
```

| Naming rule | Example |
| --- | --- |
| Start with a letter or `_` | `_count`, `age` (not `2age`) |
| Only letters, digits and `_` | `total_1` (not `total-1` or `my var`) |
| Cannot be a keyword | `class_name` is fine, `class` is not |
| Case-sensitive | `Age` and `age` are different variables |

| Style | Used for |
| --- | --- |
| `snake_case` | Variables and functions |
| `UPPER_CASE` | Constants |
| `PascalCase` | Class names |

**Remember**

* `x, y = y, x` swaps two values without a temporary variable.
* Assigning a new value can change the variable's type.
* Use `del x` to remove a variable.
* Constants are only a **naming convention**; Python will not stop you from changing them.

---

## 3. Data Types (2.3)

**Core idea:** Every value has a type. Use `type()` to check it and `isinstance()` to test it.

| Type | Example | Notes |
| --- | --- | --- |
| `int` | `10`, `-3` | Unlimited size |
| `float` | `3.14` | Decimal numbers, about 15 digits of precision |
| `str` | `"Hi"` | Text, immutable |
| `bool` | `True`, `False` | Behaves like `1` and `0` |
| `NoneType` | `None` | Means "no value" |
| `list` | `[1, 2]` | Ordered, mutable |
| `tuple` | `(1, 2)` | Ordered, immutable |
| `set` | `{1, 2}` | Unique values, unordered |
| `dict` | `{"a": 1}` | Key-value pairs |

```python
print(type(10))
print(type(3.14))
print(type("Hi"))
print(type(True))
print(type(None))
print(type([1, 2]))
print(2 ** 100)
print(0.1 + 0.2)
print(True + True)
print(isinstance(5, int))
```

```output
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
<class 'NoneType'>
<class 'list'>
1267650600228229401496703205376
0.30000000000000004
2
True
```

**Truthy and falsy**

```python
print(bool(0), bool(""), bool([]), bool(None), bool("0"))
```

```output
False False False False True
```

**Remember**

* Falsy values: `0`, `0.0`, `""`, `[]`, `()`, `{}`, `set()`, `None`, `False`.
* Everything else is **truthy**, including the string `"0"`.
* Floats have tiny rounding errors (`0.1 + 0.2`).
* **Mutable** types (`list`, `set`, `dict`) can change; **immutable** types (`int`, `str`, `tuple`) cannot.

---

## 4. Input, Output & Type Conversion (2.4)

**Core idea:** `input()` always returns a **string**. Convert it with `int()`, `float()` and similar functions. Use **f-strings** for clean output.

```text
name = input("Name: ")          # always a str
age = int(input("Age: "))       # convert to int
price = float(input("Price: ")) # convert to float
```

```python
s = "25"
print(int(s) + 1)
print(s + "1")
print(float("3.5"))
print(int(3.9))
print(str(10) + "5")
print(int("101", 2))
```

```output
26
251
3.5
3
105
5
```

| Function | Converts to | Example result |
| --- | --- | --- |
| `int("7")` | Whole number | `7` |
| `float("2.5")` | Decimal | `2.5` |
| `str(7)` | Text | `"7"` |
| `bool(0)` | True or False | `False` |
| `list("ab")` | List | `['a', 'b']` |

**f-strings**

```python
name = "Asha"
age = 20
pi = 3.14159

print(f"{name} is {age}")
print(f"{pi:.2f}")
print(f"{age + 1}")
print(f"{1234567:,}")
```

```output
Asha is 20
3.14
21
1,234,567
```

**Remember**

* `int(3.9)` **truncates** to `3`; it does not round.
* `int("abc")` and `int("3.5")` raise a `ValueError`; use `int(float("3.5"))` for the second.
* `{value:.2f}` formats to 2 decimal places; `{value:,}` adds thousands separators.
* Mixing `str` and `int` with `+` raises a `TypeError`.

---

## 5. Operators & Expressions (2.5)

**Core idea:** Operators combine values into **expressions**. Learn the seven arithmetic operators, then comparison, logical, identity and membership.

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | Add | `7 + 2` | `9` |
| `-` | Subtract | `7 - 2` | `5` |
| `*` | Multiply | `7 * 2` | `14` |
| `/` | True division | `7 / 2` | `3.5` |
| `//` | Floor division | `7 // 2` | `3` |
| `%` | Remainder | `7 % 2` | `1` |
| `**` | Power | `2 ** 3` | `8` |

```python
print(7 / 2, 7 // 2, 7 % 2, 2 ** 3)
print(-7 // 2, -7 % 2)
print(divmod(17, 5))
print(round(2.5), round(3.5))
print(1 < 5 < 10)
print(0 or "default", "a" and "b", not 0)
print("a" in "cat", 3 not in [1, 2])
a = [1]
b = [1]
print(a == b, a is b)
x = 5
x += 3
x *= 2
print(x)
print(2 + 3 * 4, (2 + 3) * 4, 2 ** 3 ** 2, -2 ** 2)
```

```output
3.5 3 1 8
-4 1
(3, 2)
2 4
True
default b True
True True
True False
16
14 20 512 -4
```

| Group | Operators |
| --- | --- |
| Comparison | `==`  `!=`  `>`  `<`  `>=`  `<=` |
| Logical | `and`  `or`  `not` |
| Assignment | `=`  `+=`  `-=`  `*=`  `/=`  `//=`  `%=`  `**=` |
| Identity | `is`  `is not` |
| Membership | `in`  `not in` |

**Precedence (high to low):** `()` then `**` then unary `-` then `*  /  //  %` then `+  -` then comparisons then `not` then `and` then `or`.

**Remember**

* `/` always gives a **float**; `//` floors the result (`-7 // 2` is `-4`).
* `round(2.5)` is `2` because Python rounds ties to the **nearest even** number.
* `and` / `or` return one of their **operands**, not just `True` or `False`.
* `==` compares **values**; `is` compares **identity** (the same object).
* `**` is **right-associative**: `2 ** 3 ** 2` is `2 ** 9`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Comment | `# note` |
| Swap two values | `a, b = b, a` |
| Check type | `type(x)`, `isinstance(x, int)` |
| Read a number | `n = int(input("n: "))` |
| Format 2 decimals | `f"{x:.2f}"` |
| Integer division | `a // b` |
| Remainder | `a % b` |
| Quotient and remainder | `divmod(a, b)` |
| Chained comparison | `1 < x < 10` |
| Membership test | `x in items` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Using `input()` result as a number | Convert: `int(input())` |
| `"5" + 3` | `TypeError`; use `int("5") + 3` or `"5" + str(3)` |
| Using `=` instead of `==` in a comparison | `=` assigns, `==` compares |
| Mixing tabs and spaces | Use 4 spaces everywhere |
| Expecting `7 / 2` to equal `3` | Use `//` for floor division |
| Expecting `round(2.5)` to give `3` | Python gives `2` (nearest even) |
| Using `is` to compare numbers or text | Use `==` for values |
| Naming a variable `list` or `str` | Shadows the built-in; choose another name |
| Treating `"0"` as falsy | Only the empty string `""` is falsy |
| Forgetting `:` after `if` or `for` | Add the colon |

---

## Last-Minute Checklist

* ✅ I can indent blocks correctly and write comments.
* ✅ I know the variable naming rules and conventions.
* ✅ I can name the main data types and use `type()`.
* ✅ I know `input()` returns a string and can convert it.
* ✅ I can use f-strings with formatting like `:.2f`.
* ✅ I know `/`, `//`, `%` and `**`, and operator precedence.

---

## Quiz: Rapid Fire 🧠

1. What type does `input()` return?

- [ ] `int`
- [ ] `float`
- [x] `str`
- [ ] It depends on what is typed

2. What is the value of `7 // 2`?

- [ ] `3.5`
- [x] `3`
- [ ] `4`
- [ ] `1`

3. Which is a valid variable name?

- [ ] `2total`
- [ ] `my-var`
- [x] `_total`
- [ ] `class`

4. What does `bool("")` return?

- [ ] `True`
- [x] `False`
- [ ] `None`
- [ ] An error

5. What does `print(-7 // 2)` display?

- [ ] `-3`
- [ ] `-3.5`
- [x] `-4`
- [ ] `3`

6. Which line correctly prints a float with two decimal places?

- [ ] `print(f"{x:2}")`
- [x] `print(f"{x:.2f}")`
- [ ] `print(f"{x.2f}")`
- [ ] `print("{x:.2}")`
