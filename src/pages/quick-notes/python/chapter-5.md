# Quick Notes: Chapter 5 - Functions

> **15-minute revision.** A **function** is a named, reusable block of code. Know how to **define** and **call** one, pass different kinds of **arguments**, understand **scope**, use **lambda**, and write **recursive** functions.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 5.1 | Introduction to Functions | `def` creates a reusable block; call it by name |
| 5.2 | Parameters, Arguments & Return Values | Pass data in, send results out with `return` |
| 5.3 | Default, Keyword & Variable-Length Arguments | `msg="Hi"`, `name=value`, `*args`, `**kwargs` |
| 5.4 | Scope, Lambda & Higher-Order Functions | LEGB rule, anonymous functions, functions as values |
| 5.5 | Recursion & Common Programs | A function that calls itself, with a base case |

---

## 1. Introduction to Functions (5.1)

**Core idea:** A **function** groups code under a name so you can **reuse** it. Define it with `def`, then **call** it with parentheses.

```text
def function_name(parameters):
    """docstring (optional)"""
    body
    return value        # optional
```

```python
def greet():
    print("Hello!")

greet()
greet()

def square(n):
    """Return the square of n."""
    return n * n

print(square(4))
print(square.__doc__)

def nothing():
    pass

print(nothing())
```

```output
Hello!
Hello!
16
Return the square of n.
None
```

| `print()` | `return` |
| --- | --- |
| Shows text on the screen | Sends a value back to the caller |
| The value cannot be reused | The value can be stored and used |
| Function result is `None` | Function result is the returned value |

**Remember**

* A function runs **only when called**; defining it does nothing by itself.
* A function with no `return` gives back `None`.
* Define a function **before** you call it.
* The first string inside a function is its **docstring**.

---

## 2. Parameters, Arguments & Return Values (5.2)

**Core idea:** **Parameters** are the names in the definition; **arguments** are the actual values you pass. `return` sends a result back and **ends** the function.

```python
def add(a, b):
    return a + b

print(add(2, 3))

def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([4, 9, 2])
print(lo, hi)
print(min_max([1, 2]))

def check(n):
    if n < 0:
        return "negative"
    return "non-negative"

print(check(-5), check(5))
```

```output
5
2 9
(1, 2)
negative non-negative
```

| Term | Meaning | Example |
| --- | --- | --- |
| Parameter | Variable in the definition | `def add(a, b)` |
| Argument | Value passed in the call | `add(2, 3)` |
| Return value | Result sent back | `return a + b` |

**Remember**

* Arguments are matched to parameters **by position** unless you use names.
* Calling with too few or too many arguments raises a `TypeError`.
* Returning several values actually returns a **tuple**, which you can unpack.
* Code after `return` does not run.

---

## 3. Default, Keyword & Variable-Length Arguments (5.3)

**Core idea:** Python offers flexible argument styles: **defaults** for optional values, **keyword** arguments to name them, and `*args` / `**kwargs` for any number of values.

```python
def greet(name, msg="Hello"):
    print(f"{msg}, {name}")

greet("Asha")
greet("Ravi", "Hi")
greet(msg="Hey", name="Meena")

def total(*nums):
    return sum(nums)

print(total(1, 2, 3), total())
print(total(*[4, 5]))

def show(**info):
    for k, v in info.items():
        print(k, v)

show(name="Asha", age=20)
```

```output
Hello, Asha
Hi, Ravi
Hey, Meena
6 0
9
name Asha
age 20
```

| Style | Syntax | Collected as |
| --- | --- | --- |
| Default value | `def f(x, y=10)` | Used when the argument is missing |
| Keyword argument | `f(y=5, x=1)` | Matched by name, order does not matter |
| `*args` | `def f(*args)` | A **tuple** of extra positional arguments |
| `**kwargs` | `def f(**kwargs)` | A **dictionary** of extra keyword arguments |

**Parameter order:** normal, then default, then `*args`, then `**kwargs`.

**The mutable default trap**

```python
def bad(x, items=[]):
    items.append(x)
    return items

print(bad(1))
print(bad(2))

def good(x, items=None):
    if items is None:
        items = []
    items.append(x)
    return items

print(good(1))
print(good(2))
```

```output
[1]
[1, 2]
[1]
[2]
```

**Remember**

* Parameters with defaults must come **after** parameters without defaults.
* `*` in a **call** unpacks a list; `*` in a **definition** collects arguments.
* A default list or dictionary is created **once** and shared, so use `None` instead.
* A positional argument cannot come after a keyword argument in a call.

---

## 4. Scope, Lambda & Higher-Order Functions (5.4)

**Core idea:** **Scope** decides where a name is visible. A **lambda** is a small anonymous function. A **higher-order function** takes or returns another function.

```python
x = "global"

def f():
    x = "local"
    print(x)

f()
print(x)

count = 0

def inc():
    global count
    count += 1

inc()
inc()
print(count)
```

```output
local
global
2
```

| LEGB order | Meaning |
| --- | --- |
| **L**ocal | Inside the current function |
| **E**nclosing | Inside an outer function |
| **G**lobal | At the top level of the file |
| **B**uilt-in | Names like `print` and `len` |

```python
square = lambda x: x * x
print(square(5), (lambda a, b: a + b)(2, 3))

def apply(func, value):
    return func(value)

print(apply(lambda n: n + 1, 5))
print(sorted(["pear", "fig", "banana"], key=len))
print(list(map(lambda x: x * 2, [1, 2, 3])))
print(list(filter(lambda x: x > 1, [1, 2, 3])))

def make_multiplier(n):
    def multiply(x):
        return x * n
    return multiply

double = make_multiplier(2)
print(double(5))
```

```output
25 5
6
['fig', 'pear', 'banana']
[2, 4, 6]
[2, 3]
10
```

```text
lambda parameters: expression
```

**Remember**

* Assigning to a name inside a function makes it **local** by default.
* Use `global` to change a global variable (use it sparingly).
* A lambda holds **one expression** and returns its value automatically.
* `map()` transforms, `filter()` selects, and `sorted(key=...)` sorts by a rule.
* A function that returns an inner function creates a **closure** that remembers `n`.

---

## 5. Recursion & Common Function Programs (5.5)

**Core idea:** **Recursion** means a function calls **itself** on a smaller problem. It needs a **base case** (stop) and a **recursive case** (smaller step).

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))

def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print([fib(i) for i in range(8)])

def digit_sum(n):
    if n == 0:
        return 0
    return n % 10 + digit_sum(n // 10)

print(digit_sum(1234))

def rev(s):
    return s if len(s) <= 1 else rev(s[1:]) + s[0]

print(rev("abc"))
```

```output
120
[0, 1, 1, 2, 3, 5, 8, 13]
10
cba
```

**Common function programs**

```python
def is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            return False
    return True

print([n for n in range(1, 20) if is_prime(n)])

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

print(gcd(48, 18))
print(is_prime(7) and gcd(10, 4) == 2)
```

```output
[2, 3, 5, 7, 11, 13, 17, 19]
6
True
```

| Recursion | Loop |
| --- | --- |
| Function calls itself | Repeats using `for` or `while` |
| Needs a base case | Needs a stopping condition |
| Clear for trees and divide-and-conquer | Usually faster and uses less memory |
| Deep recursion causes `RecursionError` | No call-depth limit |

**Remember**

* **No base case = infinite recursion**, ending in a `RecursionError` (the default limit is about 1000 calls).
* Each recursive call must move **closer** to the base case.
* The naive `fib` repeats work and gets slow for large `n`.
* Checking divisors only up to `int(n ** 0.5)` makes `is_prime` faster.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Define a function | `def name(params):` |
| Return a value | `return result` |
| Default parameter | `def f(x, y=0):` |
| Keyword call | `f(y=2, x=1)` |
| Any number of positional args | `def f(*args):` |
| Any number of keyword args | `def f(**kwargs):` |
| Unpack a list into arguments | `f(*items)` |
| Change a global variable | `global name` |
| Lambda | `lambda x: x * 2` |
| Sort by a rule | `sorted(items, key=len)` |
| Transform / filter | `map(f, items)` / `filter(f, items)` |
| Recursive function | Base case, then `return f(smaller)` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Forgetting parentheses: `greet` instead of `greet()` | Call the function with `()` |
| Using `print()` when a value is needed | Use `return` |
| Expecting a result when there is no `return` | The function returns `None` |
| Mutable default argument `items=[]` | Use `items=None` and create the list inside |
| Default parameter before a non-default one | Put required parameters first |
| Changing a global without `global` | Declare `global name` (or return the value instead) |
| `UnboundLocalError` from `count += 1` inside a function | Declare `global count` |
| Missing base case in recursion | Add a stopping condition first |
| Wrong number of arguments | Match the parameters, or use defaults |
| Long, complex lambda | Use a normal `def` for anything beyond one expression |

---

## Last-Minute Checklist

* I can define, call and document a function.
* I know the difference between parameters and arguments.
* I can return one value or several values.
* I can use default, keyword, `*args` and `**kwargs` arguments.
* I know the LEGB rule and when to use `global`.
* I can write a lambda and use `map`, `filter` and `sorted(key=...)`.
* I can write a recursive function with a base case.

---

## Quiz: Rapid Fire 🧠

1. Which keyword defines a function?

- [ ] `func`
- [ ] `function`
- [x] `def`
- [ ] `lambda`

2. What does a function without a `return` statement return?

- [ ] `0`
- [ ] An empty string
- [x] `None`
- [ ] An error

3. In `def f(*args)`, what type is `args`?

- [ ] `list`
- [x] `tuple`
- [ ] `dict`
- [ ] `set`

4. What does `(lambda a, b: a + b)(2, 3)` return?

- [ ] `(2, 3)`
- [ ] `23`
- [x] `5`
- [ ] A `SyntaxError`

5. What must every recursive function have?

- [ ] A `global` variable
- [ ] A loop
- [x] A base case
- [ ] A lambda

6. Which keyword lets a function change a module-level variable?

- [ ] `nonlocal`
- [x] `global`
- [ ] `static`
- [ ] `outer`
