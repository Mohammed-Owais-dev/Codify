# Quick Notes: Chapter 8 - Advanced Python

> **20-minute revision.** Write shorter, faster, more expressive Python with **iterators and generators**, **decorators**, the functional built-ins (`map`, `filter`, `reduce`, `zip`, `enumerate`), **regular expressions** and the **date, time, math and random** modules.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 8.1 | Iterators & Generators | `yield` produces values one at a time, lazily |
| 8.2 | Decorators | Wrap a function to add behavior without editing it |
| 8.3 | `map`, `filter`, `reduce`, `zip`, `enumerate` | Process sequences without explicit loops |
| 8.4 | Regular Expressions | Pattern matching with the `re` module |
| 8.5 | Dates, Time, Math & Random | `datetime`, `time`, `math`, `random` |

---

## 1. Iterators & Generators (8.1)

**Core idea:** An **iterator** gives one item at a time through `next()`. A **generator** is a function that uses **`yield`** to create an iterator easily, producing values **lazily** (only when asked).

```python
nums = [1, 2, 3]
it = iter(nums)
print(next(it), next(it), next(it))

try:
    next(it)
except StopIteration:
    print("Done")

def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(3)))

gen = (x * x for x in range(4))
print(next(gen), sum(gen))
```

```output
1 2 3
Done
[3, 2, 1]
0 14
```

**Custom iterator and infinite generator**

```python
class Upto:
    def __init__(self, n):
        self.n = n
        self.i = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.i >= self.n:
            raise StopIteration
        self.i += 1
        return self.i

print(list(Upto(3)))

def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fib()
print([next(gen) for _ in range(6)])
```

```output
[1, 2, 3]
[0, 1, 1, 2, 3, 5]
```

| Term | Meaning |
| --- | --- |
| Iterable | Can be looped over (`list`, `str`, `dict`, `range`) |
| Iterator | Has `__next__()` and remembers its position |
| Generator | Function with `yield`, an easy way to build an iterator |
| Generator expression | `(x * x for x in data)` with round brackets |

**Remember**

* `for` loops call `iter()` and `next()` for you and stop on `StopIteration`.
* A generator **remembers its state** between `yield` statements.
* A generator can be used **only once**; after it is exhausted, it gives nothing.
* Generators use **very little memory**, which suits large or infinite sequences.
* `yield` pauses the function; `return` ends it.

---

## 2. Decorators (8.2)

**Core idea:** A **decorator** is a function that takes a function and returns a **new, wrapped** function. `@decorator` above a function is shorthand for `func = decorator(func)`.

```python
def shout(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@shout
def greet(name):
    return f"hello, {name}"

print(greet("asha"))
```

```output
HELLO, ASHA
```

**Keep the original name with `functools.wraps`**

```python
from functools import wraps

def log(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}{args}")
        return func(*args, **kwargs)
    return wrapper

@log
def add(a, b):
    return a + b

print(add(2, 3))
print(add.__name__)
```

```output
Calling add(2, 3)
5
add
```

**Decorator with its own arguments**

```python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(2)
def hi():
    print("Hi")

hi()
```

```output
Hi
Hi
```

| Layers | Pattern |
| --- | --- |
| Basic decorator | `decorator(func)` returns `wrapper` |
| Decorator with arguments | `repeat(n)` returns `decorator(func)` returns `wrapper` |

**Remember**

* Use `*args, **kwargs` in the wrapper so it works with any function.
* The wrapper should usually **return** the original function's result.
* `@wraps(func)` keeps the original `__name__` and docstring.
* Common uses: logging, timing, access checks, caching.

---

## 3. map(), filter(), reduce(), zip() & enumerate() (8.3)

**Core idea:** These built-ins process whole sequences without writing a loop. `map`, `filter`, `zip` and `enumerate` return **lazy iterators**, so wrap them in `list()` to see the result.

```python
from functools import reduce

nums = [1, 2, 3, 4]
print(list(map(lambda x: x * 2, nums)))
print(list(filter(lambda x: x % 2 == 0, nums)))
print(reduce(lambda a, b: a + b, nums))
print(reduce(lambda a, b: a * b, nums, 10))
print(list(map(str.upper, ["ab", "cd"])))

names = ["Asha", "Ravi"]
marks = [90, 85]
print(list(zip(names, marks)))
print(dict(zip(names, marks)))
print(list(zip([1, 2, 3], "ab")))

for i, n in enumerate(names, start=1):
    print(i, n)
```

```output
[2, 4, 6, 8]
[2, 4]
10
240
['AB', 'CD']
[('Asha', 90), ('Ravi', 85)]
{'Asha': 90, 'Ravi': 85}
[(1, 'a'), (2, 'b')]
1 Asha
2 Ravi
```

| Function | Purpose | Result |
| --- | --- | --- |
| `map(f, items)` | Apply `f` to every item | Iterator of results |
| `filter(f, items)` | Keep items where `f` is true | Iterator of kept items |
| `reduce(f, items, start)` | Combine items into one value | Single value (import from `functools`) |
| `zip(a, b)` | Pair items by position | Iterator of tuples |
| `enumerate(items, start)` | Add a counter | Iterator of `(index, item)` |

**Remember**

* `reduce` is **not** built in; use `from functools import reduce`.
* `zip` stops at the **shortest** input.
* A list comprehension is often clearer than `map` or `filter` with a lambda.
* `enumerate(items, start=1)` is better than managing an index variable by hand.

---

## 4. Regular Expressions (8.4)

**Core idea:** A **regular expression** (regex) describes a text **pattern**. Use the `re` module and write patterns as **raw strings** (`r"..."`).

```python
import re

text = "Call 98765 or 12345 now"
print(re.findall(r"\d+", text))
print(re.search(r"\d{5}", text).group())
print(re.match(r"Call", text) is not None)
print(re.sub(r"\d", "#", "a1b22"))
print(re.split(r"[,;]", "a,b;c"))

m = re.search(r"(\w+)@(\w+)\.com", "mail asha@example.com now")
print(m.group(1), m.group(2), m.group())
print(bool(re.fullmatch(r"[A-Z][a-z]+", "Python")))
```

```output
['98765', '12345']
98765
True
a#b##
['a', 'b', 'c']
asha example asha@example.com
True
```

| Function | Purpose |
| --- | --- |
| `re.match(p, s)` | Match at the **start** only |
| `re.search(p, s)` | Find the **first** match anywhere |
| `re.fullmatch(p, s)` | The **whole** string must match |
| `re.findall(p, s)` | List of **all** matches |
| `re.sub(p, repl, s)` | Replace matches |
| `re.split(p, s)` | Split at matches |
| `re.compile(p)` | Reuse a pattern many times |

| Pattern | Meaning |
| --- | --- |
| `.` | Any character except a new line |
| `\d` / `\w` / `\s` | Digit / word character / whitespace |
| `^` / `$` | Start / end of the string |
| `*` / `+` / `?` | 0 or more / 1 or more / 0 or 1 |
| `{n}` / `{n,m}` | Exactly n / between n and m |
| `[abc]` / `[a-z]` | Any listed character / range |
| `( )` | Capture group, read with `m.group(1)` |

**Remember**

* `match` checks only the **beginning**; `search` looks **everywhere**.
* `search` and `match` return `None` when nothing matches, so check before using `.group()`.
* Escape special characters with a backslash: `\.` matches a literal dot.
* Use `^pattern$` (or `fullmatch`) for **validation**, such as a 10-digit phone number: `^\d{10}$`.
* The `|` symbol means "or": `cat|dog`.

---

## 5. Dates, Time, Math & Random Modules (8.5)

**Core idea:** Use `datetime` for calendar dates, `time` for pauses and timing, `math` for maths functions, and `random` for random choices.

```python
from datetime import date, datetime, timedelta

d = date(2026, 10, 19)
print(d)
print(d.strftime("%d-%m-%Y"))
print(d.weekday())
print(d + timedelta(days=30))
print((date(2026, 12, 25) - d).days)

dt = datetime(2026, 10, 19, 14, 30)
print(dt.strftime("%I:%M %p"))
print(dt.year, dt.month, dt.day)
print(datetime.strptime("19/10/2026", "%d/%m/%Y").date())
```

```output
2026-10-19
19-10-2026
0
2026-11-18
67
02:30 PM
2026 10 19
2026-10-19
```

| Format code | Meaning |
| --- | --- |
| `%Y` / `%m` / `%d` | Year / month / day |
| `%H` / `%I` / `%M` / `%S` | Hour (24h) / hour (12h) / minute / second |
| `%p` | AM or PM |
| `%A` / `%B` | Weekday name / month name |

```python
import math
import random
import time

print(math.sqrt(16), math.pow(2, 3), math.ceil(4.1), math.floor(4.9))
print(math.factorial(5), math.gcd(12, 18), round(math.pi, 4))
print(math.isclose(0.1 + 0.2, 0.3))

print(1 <= random.randint(1, 6) <= 6)
print(random.choice(["a", "b"]) in ["a", "b"])
items = [1, 2, 3]
random.shuffle(items)
print(sorted(items))
print(len(random.sample(range(10), 3)))
print(0 <= random.random() < 1)

start = time.perf_counter()
time.sleep(0.1)
print(time.perf_counter() - start >= 0.1)
```

```output
4.0 8.0 5 4
120 6 3.1416
True
True
True
[1, 2, 3]
3
True
True
```

| Module | Common functions |
| --- | --- |
| `math` | `sqrt`, `pow`, `ceil`, `floor`, `factorial`, `gcd`, `pi` |
| `random` | `randint(a, b)`, `choice`, `shuffle`, `sample`, `random()`, `seed` |
| `time` | `time()`, `sleep(sec)`, `perf_counter()` |
| `datetime` | `date`, `datetime`, `timedelta`, `strftime`, `strptime` |

**Remember**

* `weekday()` gives Monday as `0` and Sunday as `6`.
* `strftime` turns a date into **text**; `strptime` turns text into a **date**.
* `randint(a, b)` includes **both** ends; `random()` is in `[0, 1)`.
* `random.seed(n)` makes results repeatable (useful for testing).
* Use `math.isclose()` to compare floats, not `==`.
* `date2 - date1` gives a `timedelta`; use `.days`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Get the next item | `next(it)` |
| Generator function | `def f(): yield value` |
| Generator expression | `(x * x for x in data)` |
| Apply a decorator | `@decorator` above `def` |
| Keep function name | `@wraps(func)` |
| Transform / select | `map(f, items)` / `filter(f, items)` |
| Combine to one value | `reduce(f, items, start)` |
| Pair lists | `zip(a, b)` |
| Index and value | `enumerate(items, start=1)` |
| Find all numbers | `re.findall(r"\d+", text)` |
| Replace text | `re.sub(pattern, new, text)` |
| Format a date | `d.strftime("%d-%m-%Y")` |
| Add days | `d + timedelta(days=7)` |
| Random integer | `random.randint(1, 6)` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Reusing an exhausted generator | Create a new generator |
| Using `return` instead of `yield` | `yield` pauses and continues; `return` ends |
| Printing `map(...)` and seeing an object | Wrap it: `list(map(...))` |
| Using `reduce` without importing it | `from functools import reduce` |
| Forgetting `*args, **kwargs` in a wrapper | Add them so any function works |
| Decorator changes the function name | Use `@wraps(func)` |
| Using `re.match` to find text in the middle | Use `re.search` |
| Not using raw strings for patterns | Write `r"\d+"` |
| Calling `.group()` on `None` | Check `if m:` first |
| Confusing `strftime` and `strptime` | `f` = format to text, `p` = parse from text |
| Naming your file `random.py` or `datetime.py` | Rename it to avoid import conflicts |
| Comparing floats with `==` | Use `math.isclose()` |

---

## Last-Minute Checklist

* I can use `iter()`, `next()` and `StopIteration`.
* I can write a generator with `yield` and a generator expression.
* I can write a decorator and use `@wraps`.
* I can use `map`, `filter`, `reduce`, `zip` and `enumerate`.
* I can write simple regex patterns and choose between `match`, `search` and `findall`.
* I can format, parse and calculate with dates.
* I can use `math` and `random` functions.

---

## Quiz: Rapid Fire 🧠

1. Which keyword turns a function into a generator?

- [ ] `return`
- [ ] `lambda`
- [x] `yield`
- [ ] `next`

2. What does `list(zip([1, 2, 3], "ab"))` return?

- [ ] `[(1, 'a'), (2, 'b'), (3, None)]`
- [x] `[(1, 'a'), (2, 'b')]`
- [ ] `[1, 'a', 2, 'b']`
- [ ] An error

3. What does `@decorator` above `def f():` do?

- [ ] Deletes `f`
- [ ] Calls `f` immediately
- [x] Replaces `f` with `decorator(f)`
- [ ] Makes `f` a generator

4. Which `re` function finds **all** matches?

- [ ] `re.match`
- [ ] `re.search`
- [x] `re.findall`
- [ ] `re.fullmatch`

5. What does `date(2026, 10, 19).weekday()` return?

- [x] `0`
- [ ] `1`
- [ ] `19`
- [ ] `7`

6. Which import is required to use `reduce`?

- [ ] `import reduce`
- [ ] `from math import reduce`
- [x] `from functools import reduce`
- [ ] Nothing, it is built in
