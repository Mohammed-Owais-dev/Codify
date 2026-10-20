# Quick Notes: Chapter 4 - Decision Making

> **15-minute revision.** Decision statements choose which code runs. Remember: **0 is false, everything else is true**, and `switch` needs `break`.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 4.1 | Introduction to Conditions | A condition is an expression that is true (non-zero) or false (`0`) |
| 4.2 | if, if-else & Nested if | One or two paths; `if` inside `if` |
| 4.3 | else-if Ladder | Many exclusive conditions; first true one runs |
| 4.4 | switch Statement | Choose by exact `int` or `char` value |
| 4.5 | break, continue & ?: | Jump statements and the short if-else |

---

## 1. Introduction to Conditions (4.1)

**Core idea:** A **condition** decides whether a block runs. In C there is no separate true/false type for this: **`0` is false, any other value is true.**

```c
#include <stdio.h>

int main(void) {
    if (5)  printf("5 is true\n");
    if (-1) printf("-1 is true\n");

    if (0) {
        printf("never prints\n");
    } else {
        printf("0 is false\n");
    }
    return 0;
}
```

```output
5 is true
-1 is true
0 is false
```

| Tool | Use |
| --- | --- |
| Relational `== != > < >= <=` | Compare values |
| Logical `&& \|\| !` | Combine conditions |
| `!x` | True when `x` is `0` |

**Types of decision statements**

| Statement | Use when |
| --- | --- |
| `if` | Run code **only if** a condition is true |
| `if-else` | Two paths |
| `else-if` ladder | Many paths with ranges |
| `switch` | Many paths with exact values |
| `?:` | Quick two-way value choice |

**Remember**

* `=` assigns, `==` compares. `if (x = 5)` is always true and changes `x`.
* Do not put `;` right after `if (...)`. It ends the statement and the block runs always.
* Always use `{ }` braces, even for one line.

---

## 2. if, if-else & Nested if (4.2)

**Core idea:** `if` runs a block when the condition is true. `else` runs when it is false.

```c
#include <stdio.h>

int main(void) {
    int marks = 72;

    if (marks >= 40) {
        printf("Pass\n");

        if (marks >= 70) {
            printf("With distinction\n");
        }
    } else {
        printf("Fail\n");
    }
    return 0;
}
```

```output
Pass
With distinction
```

```text
if (condition) {
    // runs when true
} else {
    // runs when false
}
```

**Remember**

* A **nested if** is an `if` inside another `if`; the inner one runs only when the outer is true.
* Combine conditions with `&&` to avoid deep nesting: `if (age >= 18 && has_id)`.
* An `else` always belongs to the **nearest unmatched** `if` (the "dangling else"). Braces remove doubt.
* Use `%` for even/odd: `if (n % 2 == 0)`.

---

## 3. else-if Ladder (4.3)

**Core idea:** Test several conditions **top to bottom**. The **first** true one runs and the rest are skipped.

```c
#include <stdio.h>

int main(void) {
    int marks = 85;

    if (marks >= 90) {
        printf("Grade A\n");
    } else if (marks >= 75) {
        printf("Grade B\n");
    } else if (marks >= 60) {
        printf("Grade C\n");
    } else if (marks >= 40) {
        printf("Grade D\n");
    } else {
        printf("Fail\n");
    }
    return 0;
}
```

```output
Grade B
```

| Part | Rule |
| --- | --- |
| `if` | Required, first |
| `else if` | As many as needed |
| `else` | Optional; runs when nothing matched |

**Remember**

* Order matters: put the **most specific** (highest) condition first.
* Only **one** block of the ladder ever runs.
* A ladder works for **ranges**; `switch` does not.
* Always end with an `else` to catch unexpected values.

---

## 4. switch Statement (4.4)

**Core idea:** Compare one value against many **exact constants**.

```c
#include <stdio.h>

int main(void) {
    int a = 10, b = 5;
    char op = '*';

    switch (op) {
        case '+': printf("%d\n", a + b); break;
        case '-': printf("%d\n", a - b); break;
        case '*': printf("%d\n", a * b); break;
        case '/': printf("%d\n", a / b); break;
        default:  printf("Invalid operator\n");
    }
    return 0;
}
```

```output
50
```

**Grouped cases and fall-through**

```c
#include <stdio.h>

int main(void) {
    int month = 6;

    switch (month) {
        case 4:
        case 6:
        case 9:
        case 11:
            printf("30 days\n");
            break;
        case 2:
            printf("28 or 29 days\n");
            break;
        default:
            printf("31 days\n");
    }

    switch (2) {
        case 1: printf("one\n");
        case 2: printf("two\n");
        case 3: printf("three\n"); break;
        default: printf("other\n");
    }
    return 0;
}
```

```output
30 days
two
three
```

| Rule | Detail |
| --- | --- |
| Works with | `int` and `char` only (not `float` or strings) |
| Case labels | Must be **constants**, and unique |
| `break` | Leaves the `switch`; without it execution **falls through** |
| `default` | Runs when nothing matches; optional, often last |

| Use `if-else` | Use `switch` |
| --- | --- |
| Ranges: `marks >= 40` | Exact values: `choice == 3` |
| Float or complex conditions | Menus and calculators |

**Remember**

* Forgetting `break` is the number one `switch` bug.
* Use `'a'` single quotes for `char` cases, not `"a"`.
* Grouped cases share one block by leaving out `break` on purpose.

---

## 5. break, continue & Conditional Operator (4.5)

**Core idea:** `break` and `continue` change the flow inside loops. `?:` is a short `if-else`.

```c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 6; i++) {
        if (i == 3) continue;
        if (i == 5) break;
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
```

```output
1 2 4
```

| Statement | What it does |
| --- | --- |
| `break` | Leaves the nearest loop or `switch` completely |
| `continue` | Skips the rest of this round and goes to the next |
| `goto label;` | Jumps to a label (avoid) |
| `return` | Leaves the whole function |

**Conditional (ternary) operator**

```c
#include <stdio.h>

int main(void) {
    int a = 10, b = 20, n = -4;

    int max = a > b ? a : b;
    printf("%d\n", max);
    printf("%s\n", n > 0 ? "Positive" : n < 0 ? "Negative" : "Zero");
    return 0;
}
```

```output
20
Negative
```

Syntax: `condition ? value_if_true : value_if_false`

**Remember**

* `break` inside a **nested loop** leaves only the **inner** loop.
* `continue` in a `for` loop still runs the update part (`i++`).
* Use `?:` for simple choices; use `if-else` when there is more to do.
* Nested ternary works, but use it sparingly because it hurts readability.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Two paths | `if (c) { } else { }` |
| Many ranges | `if (c1) { } else if (c2) { } else { }` |
| Exact choices | `switch (x) { case 1: ... break; default: ... }` |
| Both must be true | `if (a && b)` |
| Either is true | `if (a \|\| b)` |
| Even number | `if (n % 2 == 0)` |
| Leave a loop | `break;` |
| Skip one round | `continue;` |
| Short choice | `max = a > b ? a : b;` |
| Leap year | `(y % 4 == 0 && y % 100 != 0) \|\| y % 400 == 0` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `if (x = 5)` | `if (x == 5)` |
| `if (x > 5);` (extra semicolon) | Remove the `;` |
| Missing `break` in `switch` | Add `break` unless fall-through is intended |
| `switch` on a float or string | Use `int` or `char`, or an `if-else` ladder |
| Wrong ladder order (`>= 40` first) | Check the highest range first |
| `case "a":` | `case 'a':` |
| Duplicate `case` values | Each label must be unique |
| Dangling `else` | Use braces `{ }` |
| Using `break` outside a loop or `switch` | Compile error; use `return` |
| Long nested ternary | Use `if-else` |

---

## Last-Minute Checklist

* I know `0` is false and any non-zero value is true.
* I can write `if`, `if-else`, nested `if` and an `else-if` ladder.
* I know the ladder stops at the first true condition.
* I can write a `switch` with `break` and `default`.
* I know `switch` works only with `int` and `char`.
* I can explain `break` vs `continue`.
* I can write a ternary expression.

---

## Quiz: Rapid Fire 🧠

1. In C, which value is treated as **false**?

- [ ] `-1`
- [ ] `1`
- [x] `0`
- [ ] `"false"`

2. What happens in a `switch` case that has no `break`?

- [ ] A compile error
- [x] Execution continues into the next case
- [ ] The program stops
- [ ] The default case runs

3. Which data type can be used in a `switch` expression?

- [ ] `float`
- [ ] `double`
- [x] `char`
- [ ] `string`

4. What does `continue` do inside a loop?

- [ ] Ends the loop
- [x] Skips the rest of the current round
- [ ] Ends the program
- [ ] Restarts the loop from the beginning

5. In an else-if ladder, how many blocks can run?

- [ ] All true ones
- [ ] At least two
- [ ] None
- [x] Only one: the first true condition

6. What does `int m = 4 > 9 ? 4 : 9;` store in `m`?

- [ ] `4`
- [ ] `0`
- [ ] `1`
- [x] `9`
