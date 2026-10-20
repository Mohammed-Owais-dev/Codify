# Quick Notes: Chapter 5 - Loops

> **15-minute revision.** Loops repeat code. Know which loop to choose, the three parts of a `for` loop, and how nested loops build patterns (outer = rows, inner = columns).

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 5.1 | Introduction to Loops | Repeat code; every loop has init, condition and update |
| 5.2 | while Loop | Checks the condition **first**; may run zero times |
| 5.3 | do-while Loop | Checks the condition **last**; runs at least once |
| 5.4 | for Loop | Compact loop when the count is known |
| 5.5 | Nested Loops & Patterns | A loop inside a loop: rows and columns |

---

## 1. Introduction to Loops (5.1)

**Core idea:** A **loop** repeats a block of code while a condition is true, so you do not copy and paste.

Every loop needs three things:

| Part | Purpose | Example |
| --- | --- | --- |
| Initialization | Start value | `int i = 1;` |
| Condition | When to keep going | `i <= 5` |
| Update | Move toward the end | `i++` |

| Loop | Type | Best for |
| --- | --- | --- |
| `for` | Entry-controlled | Known number of rounds |
| `while` | Entry-controlled | Unknown rounds, check first |
| `do-while` | Exit-controlled | Must run at least once |

**Remember**

* **Entry-controlled:** the condition is tested **before** each round.
* **Exit-controlled:** the condition is tested **after** each round.
* If the condition never becomes false, you get an **infinite loop**.
* `break` leaves a loop; `continue` skips to the next round.

---

## 2. while Loop (5.2)

**Core idea:** Repeat **while** the condition is true. If it is false at the start, the body never runs.

```c
#include <stdio.h>

int main(void) {
    int i = 1, sum = 0;

    while (i <= 5) {
        sum += i;
        i++;
    }

    printf("Sum = %d\n", sum);
    return 0;
}
```

```output
Sum = 15
```

**Digit tricks with `%` and `/`**

```c
#include <stdio.h>

int main(void) {
    int n = 1234, count = 0, reversed = 0;
    int temp = n;

    while (temp > 0) {
        int digit = temp % 10;
        reversed = reversed * 10 + digit;
        temp /= 10;
        count++;
    }

    printf("Digits = %d, Reverse = %d\n", count, reversed);
    return 0;
}
```

```output
Digits = 4, Reverse = 4321
```

```text
while (condition) {
    // body
    // update (so the loop can end)
}
```

**Remember**

* Do not forget the **update** (`i++`), or the loop never ends.
* No `;` after `while (...)` in a normal loop.
* Use `while` when you do not know the number of rounds (digits, input until a value).
* Last digit: `n % 10`. Remove the last digit: `n / 10`.

---

## 3. do-while Loop (5.3)

**Core idea:** Run the body **first**, then check the condition. The body always runs **at least once**.

```c
#include <stdio.h>

int main(void) {
    int n = 10;

    do {
        printf("Runs once, n = %d\n", n);
        n++;
    } while (n < 5);

    return 0;
}
```

```output
Runs once, n = 10
```

```c
#include <stdio.h>

int main(void) {
    int i = 3;

    do {
        printf("%d ", i);
        i--;
    } while (i > 0);

    printf("Liftoff\n");
    return 0;
}
```

```output
3 2 1 Liftoff
```

| `while` | `do-while` |
| --- | --- |
| Condition first | Body first |
| May run **0** times | Runs **at least 1** time |
| No `;` after the condition | **`;` required** after `while (...)` |

**Remember**

* Perfect for **menus** and **input validation** ("ask, then check").
* The semicolon after `while (condition);` is **required**.
* The same task can be written with any loop; choose the most natural one.

---

## 4. for Loop (5.4)

**Core idea:** Put initialization, condition and update on **one line**.

```c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n");

    for (int i = 10; i >= 2; i -= 4) {
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
```

```output
1 2 3 4 5
10 6 2
```

```text
for (initialization; condition; update) {
    // body
}
```

**Order of execution:** initialization (once) → condition → body → update → condition → body → update ... until the condition is false.

**Variations**

```c
#include <stdio.h>

int main(void) {
    unsigned long fact = 1;

    for (int i = 0, j = 5; i < j; i++, j--) {
        printf("(%d,%d) ", i, j);
    }
    printf("\n");

    for (int i = 1; i <= 5; i++) {
        fact *= i;
    }
    printf("5! = %lu\n", fact);

    for (int i = 1; i <= 3; i++) {
        printf("3 x %d = %d\n", i, 3 * i);
    }

    for (;;) {
        printf("infinite loop stopped with break\n");
        break;
    }
    return 0;
}
```

```output
(0,5) (1,4) (2,3)
5! = 120
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
infinite loop stopped with break
```

**Remember**

* Use `for` when you **know how many times** to repeat.
* Any of the three parts can be left empty; `for (;;)` is an infinite loop.
* Separate multiple variables or updates with commas.
* Declaring `int i` inside `for` needs C99 or later; the variable exists only in the loop.
* `i <= n` vs `i < n` is the most common **off-by-one** mistake.
* Loop patterns: sum, product (factorial), count, find max or min, print tables.

---

## 5. Nested Loops & Pattern Programs (5.5)

**Core idea:** A loop **inside** a loop. The **outer** loop controls **rows**; the **inner** loop controls **columns**. The inner loop runs fully for **every** round of the outer loop.

**Right triangle**

```c
#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 4; row++) {
        for (int col = 1; col <= row; col++) {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}
```

```output
*
**
***
****
```

**Number triangle**

```c
#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 3; row++) {
        for (int col = 1; col <= row; col++) {
            printf("%d", col);
        }
        printf("\n");
    }
    return 0;
}
```

```output
1
12
123
```

**Pyramid (3 rows)**

```c
#include <stdio.h>

int main(void) {
    int n = 3;

    for (int row = 1; row <= n; row++) {
        for (int space = 1; space <= n - row; space++) {
            printf(" ");
        }
        for (int star = 1; star <= 2 * row - 1; star++) {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}
```

```output
  *
 ***
*****
```

**Multiplication grid**

```c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 2; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("%d x %d = %d\n", i, j, i * j);
        }
    }
    return 0;
}
```

```output
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
```

**How to solve any pattern**

| Step | Question |
| --- | --- |
| 1 | How many **rows**? (outer loop) |
| 2 | In each row, how many **spaces**? (inner loop) |
| 3 | In each row, how many **symbols**? (inner loop) |
| 4 | Where does the **new line** go? (after the inner loops) |

| Pattern | Symbols in row `r` (of `n`) |
| --- | --- |
| Right triangle | `r` |
| Inverted triangle | `n - r + 1` |
| Pyramid | `n - r` spaces, then `2r - 1` symbols |
| Square | `n` |

**Remember**

* `printf("\n")` goes **after** the inner loop, not inside it.
* Total rounds = outer rounds × inner rounds.
* `break` inside the inner loop leaves **only the inner** loop.
* Use different counter names for each loop (`i`, `j`).

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Count 1 to n | `for (int i = 1; i <= n; i++)` |
| Count down | `for (int i = n; i >= 1; i--)` |
| Step by 2 | `for (int i = 0; i <= 10; i += 2)` |
| Repeat while true | `while (cond) { }` |
| Run at least once | `do { } while (cond);` |
| Infinite loop | `for (;;)` or `while (1)` |
| Sum | `sum += i;` |
| Factorial | `fact *= i;` |
| Last digit / drop it | `n % 10` / `n /= 10` |
| Pattern rows and columns | outer loop = rows, inner loop = columns |
| Stop a loop / skip a round | `break;` / `continue;` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Forgetting the update (`i++`) | The loop never ends; add it |
| `for (...);` with an extra `;` | Remove it (the body is empty) |
| Missing `;` after `do-while` | `while (cond);` |
| `<=` vs `<` (off by one) | Test the first and last values |
| Using `=` in the condition | Use `==`, `<`, `<=` |
| `printf("\n")` inside the inner loop | Move it after the inner loop |
| Changing the loop variable inside the body | Let the `for` header control it |
| Factorial overflow with `int` | Use `unsigned long` or `long long` |
| Same counter name in nested loops | Use `i` and `j` |
| Forgetting to initialize `sum` | `int sum = 0;` |

---

## Last-Minute Checklist

* I can name the three parts of a loop.
* I know `while` is entry-controlled and `do-while` is exit-controlled.
* I can write each of the three loops from memory.
* I know the order of execution of a `for` loop.
* I can sum digits, reverse a number and find a factorial.
* I can print triangle, pyramid and number patterns.
* I know outer loop = rows and inner loop = columns.

---

## Quiz: Rapid Fire 🧠

1. Which loop always runs its body at least once?

- [ ] `for`
- [ ] `while`
- [x] `do-while`
- [ ] All of them

2. In `for (int i = 1; i <= 3; i++)`, how many times does the body run?

- [ ] `2`
- [x] `3`
- [ ] `4`
- [ ] `1`

3. What is required after the condition of a `do-while` loop?

- [ ] A colon
- [ ] Nothing
- [x] A semicolon
- [ ] A comma

4. What happens with `for (;;)`?

- [ ] A compile error
- [ ] The body never runs
- [x] An infinite loop unless you `break`
- [ ] It runs once

5. In a nested loop pattern, what does the outer loop usually control?

- [ ] Columns
- [x] Rows
- [ ] Spaces only
- [ ] Characters

6. What does `n % 10` give for `n = 1234`?

- [ ] `123`
- [ ] `1`
- [ ] `1234`
- [x] `4`
