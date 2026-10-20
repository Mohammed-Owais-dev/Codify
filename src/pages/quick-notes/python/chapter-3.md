# Quick Notes: Chapter 3 - Conditional Statements & Loops

> ⏱ **15-minute revision.** Control flow decides **which** code runs and **how often**. Know `if / elif / else`, the conditional expression, `for` and `while`, and `break`, `continue`, `pass` with nested loops.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 3.1 | Introduction to Decision Making | Conditions are `True` or `False`; any value can be truthy or falsy |
| 3.2 | `if`, `elif` & `else` | Only the first true branch runs |
| 3.3 | Nested Conditions & Conditional Expressions | `if` inside `if`; one-line `x if cond else y` |
| 3.4 | `for` & `while` Loops | `for` for known sequences, `while` for conditions |
| 3.5 | `break`, `continue`, `pass` & Nested Loops | Stop, skip, placeholder, and loops inside loops |

---

## 1. Introduction to Decision Making (3.1)

**Core idea:** A program makes decisions with a **condition**, an expression that is `True` or `False`. Each decision line ends with a **colon**, and its block is **indented**.

```python
age = 20

if age >= 18:
    print("Adult")

items = []
if items:
    print("Has items")
else:
    print("Empty")
```

```output
Adult
Empty
```

| Decision statement | Use |
| --- | --- |
| `if` | Run a block only when a condition is true |
| `if ... else` | Choose between two paths |
| `if ... elif ... else` | Choose between many paths |
| Nested `if` | A decision inside another decision |
| Conditional expression | One-line choice between two values |

| Condition type | Example |
| --- | --- |
| Comparison | `age >= 18` |
| Logical | `age > 18 and has_id` |
| Membership | `"a" in text` |
| Truthiness | `if items:` (non-empty is true) |

**Remember**

* Falsy values: `0`, `""`, `[]`, `{}`, `None`, `False`. Everything else is truthy.
* Prefer `if items:` over `if len(items) > 0:`.
* The colon and the indentation are **both** required.

---

## 2. `if`, `elif` & `else` (3.2)

**Core idea:** Python checks conditions **top to bottom** and runs only the **first** true branch. `else` runs when nothing matched.

```python
marks = 72

if marks >= 90:
    print("A")
elif marks >= 75:
    print("B")
elif marks >= 50:
    print("C")
else:
    print("F")
```

```output
C
```

**`elif` vs separate `if`**

```python
x = 10

if x > 5:
    print("gt5")
if x > 8:
    print("gt8")

if x > 5:
    print("first")
elif x > 8:
    print("never runs")
```

```output
gt5
gt8
first
```

| Form | Behavior |
| --- | --- |
| Separate `if` statements | Each condition is checked independently |
| `if` / `elif` chain | Stops at the first true condition |

**Remember**

* Put the **most specific** condition first (for example, `>= 90` before `>= 75`).
* `elif` and `else` are optional; `else` never has a condition.
* Use `==` to compare and `=` to assign.

---

## 3. Nested Conditions & Conditional Expressions (3.3)

**Core idea:** You can place an `if` inside another `if`. Often an `and` makes the code flatter. A **conditional expression** picks a value in one line.

```python
age = 25
has_id = True

if age >= 18:
    if has_id:
        print("Entry allowed")
    else:
        print("ID required")
else:
    print("Too young")

if age >= 18 and has_id:
    print("Same result, flatter code")

status = "Adult" if age >= 18 else "Minor"
print(status)

print(18 <= age < 65)
```

```output
Entry allowed
Same result, flatter code
Adult
True
```

```text
value_if_true  if  condition  else  value_if_false
```

**Remember**

* Use nesting only when the inner check depends on the outer one.
* The conditional expression is best for **simple** choices; use a normal `if` for anything long.
* Chained comparison `18 <= age < 65` is valid Python.

---

## 4. `for` & `while` Loops (3.4)

**Core idea:** A `for` loop goes through a **sequence** (a range, list or string). A `while` loop repeats **while a condition is true**.

```python
for i in range(5):
    print(i, end=" ")
print()

for i in range(2, 10, 3):
    print(i, end=" ")
print()

for i in range(5, 0, -1):
    print(i, end=" ")
print()

for ch in "Hi":
    print(ch)
```

```output
0 1 2 3 4 
2 5 8 
5 4 3 2 1 
H
i
```

```python
i = 1
while i <= 3:
    print(i)
    i += 1

total = 0
for n in range(1, 6):
    total += n
print(total)
```

```output
1
2
3
15
```

| `range` call | Produces |
| --- | --- |
| `range(5)` | `0, 1, 2, 3, 4` |
| `range(2, 6)` | `2, 3, 4, 5` |
| `range(2, 10, 3)` | `2, 5, 8` |
| `range(5, 0, -1)` | `5, 4, 3, 2, 1` |

| `for` | `while` |
| --- | --- |
| Known sequence or count | Unknown number of repeats |
| Variable updates automatically | You must update the variable yourself |
| Rarely infinite | Can become infinite by mistake |

**Remember**

* The `range` **stop** value is **excluded**.
* A `while` loop needs a statement that eventually makes the condition false.
* `print(i, end=" ")` keeps output on one line.
* `while True:` creates a loop that runs until `break`.

---

## 5. `break`, `continue`, `pass` & Nested Loops (3.5)

**Core idea:** `break` **stops** a loop, `continue` **skips** to the next round, and `pass` does **nothing** (a placeholder). A loop inside another loop is a **nested loop**.

```python
for n in range(1, 10):
    if n == 4:
        break
    print(n, end=" ")
print()

for n in range(1, 6):
    if n % 2 == 0:
        continue
    print(n, end=" ")
print()

for n in range(3):
    pass
```

```output
1 2 3 
1 3 5 
```

**Loop `else` (runs only if the loop was not stopped by `break`)**

```python
n = 7
for d in range(2, n):
    if n % d == 0:
        print("Not prime")
        break
else:
    print("Prime")
```

```output
Prime
```

**Nested loops**

```python
for i in range(1, 4):
    print("*" * i)

for i in range(1, 4):
    for j in range(1, 4):
        print(i * j, end=" ")
    print()
```

```output
*
**
***
1 2 3 
2 4 6 
3 6 9 
```

| Statement | Effect |
| --- | --- |
| `break` | Exit the **nearest** loop immediately |
| `continue` | Skip the rest of this round and go to the next |
| `pass` | Do nothing; keeps an empty block valid |
| Loop `else` | Runs when the loop finishes **without** `break` |

**Remember**

* In nested loops, the **inner** loop completes fully for each round of the outer loop.
* `break` and `continue` affect only the loop they are written in.
* Use `pass` for code you will write later.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Two-way choice | `if cond:` ... `else:` |
| Many-way choice | `if` ... `elif` ... `else` |
| One-line choice | `x = a if cond else b` |
| Repeat N times | `for i in range(n):` |
| Count down | `for i in range(n, 0, -1):` |
| Loop over a list | `for item in items:` |
| Loop with a condition | `while cond:` |
| Infinite loop with exit | `while True:` ... `break` |
| Stop a loop | `break` |
| Skip one round | `continue` |
| Empty block | `pass` |
| Print on one line | `print(x, end=" ")` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `if x = 5:` | Use `==` to compare |
| Missing colon after `if`, `for` or `while` | Add `:` |
| Wrong or inconsistent indentation | Indent the block with 4 spaces |
| `range(5)` expected to include 5 | The stop value is excluded; use `range(6)` |
| `while` loop never ends | Update the loop variable inside the loop |
| General condition placed before a specific one | Order `elif` branches from specific to general |
| Using separate `if` when only one branch should run | Use `elif` |
| Changing a list while looping over it | Loop over a copy: `for x in items[:]:` |
| Expecting `break` to leave all nested loops | It exits only the innermost loop |
| Empty block without `pass` | Add `pass` to avoid `IndentationError` |

---

## Last-Minute Checklist

* ✅ I can write `if`, `elif` and `else` with correct colons and indentation.
* ✅ I know only the first true branch of an `elif` chain runs.
* ✅ I can write a conditional expression.
* ✅ I can use `range` with start, stop and step.
* ✅ I can choose between `for` and `while`.
* ✅ I know what `break`, `continue`, `pass` and loop `else` do.
* ✅ I can print a star pattern with nested loops.

---

## Quiz: Rapid Fire 🧠

1. What does `range(1, 4)` produce?

- [ ] `1, 2, 3, 4`
- [x] `1, 2, 3`
- [ ] `0, 1, 2, 3`
- [ ] `2, 3, 4`

2. Which keyword skips the rest of the current loop round?

- [ ] `break`
- [x] `continue`
- [ ] `pass`
- [ ] `exit`

3. What does this print: `x = 10` then `if x > 5: print("A")` then `elif x > 8: print("B")`?

- [x] `A`
- [ ] `B`
- [ ] `A` and `B`
- [ ] Nothing

4. When does a loop's `else` block run?

- [ ] Every time the loop repeats
- [ ] Only when `break` is used
- [x] When the loop ends without hitting `break`
- [ ] Only for `while` loops

5. What is the value of `status`: `status = "Adult" if 16 >= 18 else "Minor"`?

- [ ] `"Adult"`
- [x] `"Minor"`
- [ ] `True`
- [ ] `None`

6. What does `pass` do?

- [ ] Stops the program
- [ ] Skips to the next loop round
- [x] Nothing; it is a placeholder statement
- [ ] Returns `None` from a loop
