# Quick Notes: Chapter 9 - Python Problem Solving

> **25-minute revision.** This chapter is a **pattern bank**. Learn the standard approach for each problem type: **number programs**, **string tricks**, **collection operations**, **searching and sorting**, and **patterns, recursion and interview questions**.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 9.1 | Number & Mathematical Programs | Digits, primes, GCD, Fibonacci, Armstrong, leap year |
| 9.2 | String & Character Problems | Reverse, palindrome, vowels, anagram, frequency |
| 9.3 | List, Tuple & Dictionary Problems | Max/min, second largest, rotate, merge, sort a dictionary |
| 9.4 | Searching, Sorting & Frequency | Linear and binary search, bubble sort, counting |
| 9.5 | Pattern, Recursion & Interview Problems | Pyramids, FizzBuzz, two-sum, balanced brackets |

**Problem-solving steps:** understand the input and output, try a small example by hand, pick the pattern, write the code, test edge cases (empty, one item, negatives, duplicates).

---

## 1. Number & Mathematical Programs (9.1)

**Core idea:** Most number problems use `%` and `//` to work with **digits**, loops to **test divisors**, and `math` helpers.

```python
n = 153
print("Even" if n % 2 == 0 else "Odd")
print(sum(int(d) for d in str(n)))
print(int(str(n)[::-1]))
print(n == sum(int(d) ** len(str(n)) for d in str(n)))
print(str(121) == str(121)[::-1])
```

```output
Odd
9
351
True
True
```

```python
import math

def is_prime(n):
    return n > 1 and all(n % d for d in range(2, int(n ** 0.5) + 1))

print([n for n in range(2, 30) if is_prime(n)])
print(math.gcd(12, 18), 12 * 18 // math.gcd(12, 18))

a, b = 0, 1
fib = []
for _ in range(8):
    fib.append(a)
    a, b = b, a + b
print(fib)

print(math.factorial(5), sum(range(1, 101)))

def leap(y):
    return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

print(leap(2000), leap(1900), leap(2024))
print(bin(10)[2:], int("1010", 2))
```

```output
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
6 36
[0, 1, 1, 2, 3, 5, 8, 13]
120 5050
True False True
1010 10
```

| Problem | Key idea |
| --- | --- |
| Even or odd | `n % 2 == 0` |
| Sum of digits | Loop with `n % 10` and `n //= 10`, or `sum(int(d) for d in str(n))` |
| Reverse a number | `int(str(n)[::-1])` |
| Palindrome number | Number equals its reverse |
| Armstrong number | Sum of each digit raised to the **number of digits** equals the number |
| Prime | No divisor from `2` to `√n` |
| GCD / LCM | `math.gcd(a, b)`; `lcm = a * b // gcd` |
| Fibonacci | `a, b = b, a + b` |
| Leap year | Divisible by 4, and not by 100 unless also by 400 |
| Decimal to binary | `bin(n)[2:]`; back with `int(s, 2)` |

**Remember**

* Check divisors only up to `int(n ** 0.5)`.
* `0` and `1` are **not** prime; `2` is the only even prime.
* `sum(range(1, n + 1))` or `n * (n + 1) // 2` gives the sum of the first `n` numbers.
* `x % y` of negative numbers follows Python's floor rule (`-7 % 2` is `1`).

---

## 2. String & Character Problems (9.2)

**Core idea:** Strings are sequences, so **slicing**, **loops**, **sets** and **Counter** solve most problems.

```python
s = "Hello World"
print(s[::-1])
print(sum(c in "aeiouAEIOU" for c in s))
print(s.swapcase())
print(" ".join(w.capitalize() for w in "learn python fast".split()))
print(sorted("listen") == sorted("silent"))
print("".join(dict.fromkeys("programming")))
print(max("I love programming".split(), key=len))
print(s.replace(" ", ""))
print(len(s.split()))
```

```output
dlroW olleH
3
hELLO wORLD
Learn Python Fast
True
progamin
programming
HelloWorld
2
```

```python
from collections import Counter

freq = Counter("banana")
print(freq)
print(freq.most_common(1))
print(next(c for c in "swiss" if "swiss".count(c) == 1))
print("Madam".lower() == "Madam".lower()[::-1])
print("".join(c for c in "a1b2c3" if c.isdigit()))
```

```output
Counter({'a': 3, 'n': 2, 'b': 1})
[('a', 3)]
w
True
123
```

| Problem | Key idea |
| --- | --- |
| Reverse a string | `s[::-1]` |
| Palindrome | `s == s[::-1]` (ignore case with `lower()`) |
| Count vowels | `sum(c in "aeiou" for c in s.lower())` |
| Anagram | `sorted(a) == sorted(b)` |
| Remove duplicates, keep order | `"".join(dict.fromkeys(s))` |
| Character frequency | `Counter(s)` or a dictionary with `get` |
| First non-repeating character | First `c` where `s.count(c) == 1` |
| Capitalize each word | `w.capitalize()` inside a join |
| Longest word | `max(words, key=len)` |
| Count words | `len(s.split())` |

**Remember**

* Convert to the same case before comparing letters.
* `split()` with no argument handles **any amount of whitespace**.
* `Counter` comes from `collections`; `most_common(n)` returns the top `n` pairs.
* Strings are immutable, so build the result with `join` or a list.

---

## 3. List, Tuple & Dictionary Problems (9.3)

**Core idea:** Combine built-ins (`max`, `min`, `sum`, `sorted`), **slicing**, **sets** and **comprehensions** for fast solutions.

```python
nums = [4, 9, 2, 9, 7]
print(max(nums), min(nums), sum(nums) / len(nums))
print(sorted(set(nums))[-2])
print(nums[::-1])
print(nums[2:] + nums[:2])
print([x for row in [[1, 2], [3, 4]] for x in row])
```

```output
9 2 6.2
7
[7, 9, 2, 9, 4]
[2, 9, 7, 4, 9]
[1, 2, 3, 4]
```

```python
scores = {"Asha": 90, "Ravi": 72, "Meena": 85}
print(max(scores, key=scores.get))
print(sorted(scores.items(), key=lambda kv: kv[1], reverse=True))
print({k: v for k, v in scores.items() if v >= 80})
print(f"{sum(scores.values()) / len(scores):.2f}")

a = [1, 3, 5]
b = [2, 4]
print(sorted(a + b))
print(sorted(set(a) & {3, 5, 7}))
print(dict(zip("abc", range(3))))
```

```output
Asha
[('Asha', 90), ('Meena', 85), ('Ravi', 72)]
{'Asha': 90, 'Meena': 85}
82.33
[1, 2, 3, 4, 5]
[3, 5]
{'a': 0, 'b': 1, 'c': 2}
```

| Problem | Key idea |
| --- | --- |
| Largest / smallest | `max(items)` / `min(items)` |
| Second largest | `sorted(set(items))[-2]` |
| Average | `sum(items) / len(items)` |
| Rotate left by `k` | `items[k:] + items[:k]` |
| Flatten a 2D list | `[x for row in rows for x in row]` |
| Merge and sort | `sorted(a + b)` |
| Common elements | `set(a) & set(b)` |
| Key with the highest value | `max(d, key=d.get)` |
| Sort a dictionary by value | `sorted(d.items(), key=lambda kv: kv[1])` |
| Filter a dictionary | `{k: v for k, v in d.items() if cond}` |
| Build a dictionary from two lists | `dict(zip(keys, values))` |

**Remember**

* `set(items)` removes duplicates but **loses order**.
* A dictionary is looped by **keys**; use `.items()` for pairs.
* `sorted()` returns a new list; a **dictionary itself cannot be sorted**, so sort its `items()`.
* Tuples are immutable; to "change" one, build a new tuple.

---

## 4. Searching, Sorting & Frequency Problems (9.4)

**Core idea:** **Linear search** checks every item. **Binary search** halves a **sorted** list each step. **Sorting** arranges data; **frequency** problems count occurrences.

```python
def linear_search(items, target):
    for i, v in enumerate(items):
        if v == target:
            return i
    return -1

def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

data = [2, 5, 8, 12, 16, 23]
print(linear_search(data, 12), linear_search(data, 99))
print(binary_search(data, 23), binary_search(data, 7))
```

```output
3 -1
5 -1
```

```python
def bubble_sort(arr):
    arr = arr[:]
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

print(bubble_sort([5, 1, 4, 2, 8]))

words = ["pear", "fig", "banana"]
print(sorted(words, key=len), sorted(words, reverse=True))

text = "to be or not to be"
freq = {}
for w in text.split():
    freq[w] = freq.get(w, 0) + 1

print(freq)
print(max(freq, key=freq.get))
print(sorted(freq.items(), key=lambda kv: (-kv[1], kv[0])))
```

```output
[1, 2, 4, 5, 8]
['fig', 'pear', 'banana'] ['pear', 'fig', 'banana']
{'to': 2, 'be': 2, 'or': 1, 'not': 1}
to
[('be', 2), ('to', 2), ('not', 1), ('or', 1)]
```

| Algorithm | Needs sorted data? | Time (worst case) |
| --- | --- | --- |
| Linear search | No | O(n) |
| Binary search | **Yes** | O(log n) |
| Bubble sort | No | O(n²) |
| `sorted()` / `list.sort()` | No | O(n log n) |
| Counting with a dictionary | No | O(n) |

**Remember**

* Binary search works **only on sorted data**.
* Bubble sort compares neighbors and pushes the largest item to the end each pass.
* In practice, use the built-in `sorted()`; write bubble sort only to **show the logic**.
* Sort by several rules with a tuple key: `key=lambda kv: (-kv[1], kv[0])` (count descending, then name).
* `max(d, key=d.get)` returns the **first** key when there is a tie.

---

## 5. Pattern, Recursion & Interview Problems (9.5)

**Core idea:** **Patterns** use nested loops (rows, then columns or spaces and stars). **Recursion** needs a base case. **Interview** questions reuse a few tools: dictionary, stack, two pointers.

```python
n = 4
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))

for i in range(1, 4):
    print(" ".join(str(j) for j in range(1, i + 1)))
```

```output
   *
  ***
 *****
*******
1
1 2
1 2 3
```

```python
for i in range(1, 16):
    if i % 15 == 0:
        print("FizzBuzz", end=" ")
    elif i % 3 == 0:
        print("Fizz", end=" ")
    elif i % 5 == 0:
        print("Buzz", end=" ")
    else:
        print(i, end=" ")
print()
```

```output
1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 
```

```python
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))

def balanced(s):
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack

print(balanced("{[()]}"), balanced("([)]"))

def power(b, e):
    return 1 if e == 0 else b * power(b, e - 1)

def to_binary(n):
    return str(n) if n < 2 else to_binary(n // 2) + str(n % 2)

print(power(2, 10), to_binary(10))

a, b = 3, 5
a, b = b, a
print(a, b)
print(" ".join("Learn Python Fast".split()[::-1]))
```

```output
[0, 1]
True False
1024 1010
5 3
Fast Python Learn
```

| Problem | Key idea |
| --- | --- |
| Right triangle | Row `i` prints `i` stars |
| Pyramid | `" " * (n - i) + "*" * (2 * i - 1)` |
| Number triangle | Row `i` prints `1` to `i` |
| FizzBuzz | Check **15** first, then 3, then 5 |
| Two-sum | Dictionary of values already seen |
| Balanced brackets | **Stack**: push openers, pop and match on closers |
| Power / binary (recursion) | Base case plus a smaller call |
| Swap values | `a, b = b, a` |
| Reverse the words | `" ".join(s.split()[::-1])` |

**Remember**

* For patterns: the **outer loop** is the row, the **inner part** builds the columns.
* In FizzBuzz, the `% 15` check **must come first**.
* A **stack** (a list with `append` and `pop`) matches nested brackets.
* Dictionary lookups take about O(1), which turns an O(n²) two-sum into O(n).
* Always test edge cases: empty input, one item, duplicates, negatives.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Digit sum | `sum(int(d) for d in str(n))` |
| Reverse number or text | `s[::-1]` |
| Prime test | `all(n % d for d in range(2, int(n ** 0.5) + 1))` |
| GCD | `math.gcd(a, b)` |
| Palindrome | `s == s[::-1]` |
| Anagram | `sorted(a) == sorted(b)` |
| Count characters | `Counter(s)` |
| Remove duplicates in order | `list(dict.fromkeys(items))` |
| Second largest | `sorted(set(nums))[-2]` |
| Sort by a rule | `sorted(items, key=...)` |
| Max by value | `max(d, key=d.get)` |
| Binary search midpoint | `mid = (lo + hi) // 2` |
| Space and stars | `" " * (n - i) + "*" * (2 * i - 1)` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Treating `1` as a prime number | Primes start at `2` |
| Testing divisors up to `n` | Stop at `int(n ** 0.5)` |
| Comparing letters without matching case | Use `.lower()` on both |
| Using binary search on unsorted data | Sort first |
| Wrong binary search bounds (`<` instead of `<=`) | Use `while lo <= hi` |
| `lo = mid` instead of `mid + 1` | Move past `mid` to avoid an infinite loop |
| Sorting a list in place when the original is needed | Use `sorted()` |
| FizzBuzz with the `% 3` check first | Check `% 15` first |
| Expecting a set to keep order | Use `dict.fromkeys()` |
| Forgetting the empty-input case | Test with `[]` and `""` |
| Recursion without a base case | Add the stopping condition first |
| Off-by-one in `range` | Remember the stop value is excluded |

---

## Last-Minute Checklist

* I can solve digit, prime, GCD, Fibonacci and Armstrong problems.
* I can reverse, compare and count characters in a string.
* I can find the second largest, rotate and merge lists.
* I can sort and filter a dictionary by value.
* I can write linear search, binary search and bubble sort.
* I can print a pyramid and a number triangle.
* I can solve FizzBuzz, two-sum and balanced brackets.

---

## Quiz: Rapid Fire

1. Up to which value do you need to test divisors to check if `n` is prime?

- [ ] `n`
- [ ] `n // 2` only
- [x] `√n`
- [ ] `n - 1` only

2. What does `sorted("listen") == sorted("silent")` check?

- [ ] Palindrome
- [x] Anagram
- [ ] Prime
- [ ] Reverse

3. Binary search requires the data to be:

- [ ] Unique
- [ ] Numeric only
- [x] Sorted
- [ ] In a dictionary

4. Which data structure is best for checking balanced brackets?

- [ ] Set
- [ ] Dictionary only
- [x] Stack
- [ ] Tuple

5. In FizzBuzz, which check must come first?

- [ ] Divisible by 3
- [ ] Divisible by 5
- [x] Divisible by 15
- [ ] Any order works

6. What does `max(d, key=d.get)` return?

- [ ] The largest value
- [x] The key with the largest value
- [ ] The largest key
- [ ] A sorted dictionary
