# Quick Notes: Chapter 5 - Loops

> **15-minute revision.** Loops repeat code. Know which loop to choose, the three parts of a `for` loop, the **range-based `for`**, and how nested loops build patterns (outer = rows, inner = columns).

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 5.1 | Introduction to Loops | Repeat code; every loop has init, condition and update |
| 5.2 | while Loop | Checks the condition **first**; may run zero times |
| 5.3 | do-while Loop | Checks the condition **last**; runs at least once |
| 5.4 | for Loop | Compact loop when the count is known; range-based `for` |
| 5.5 | Nested Loops & Pattern Programs | A loop inside a loop: rows and columns |

---

## 1. Introduction to Loops (5.1)

**Core idea:** A **loop** repeats a block of code while a condition is true.

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
| Range-based `for` | Entry-controlled | Every item of an array, `string` or `vector` |

**Remember**

* **Entry-controlled:** the condition is tested **before** each round. **Exit-controlled:** **after**.
* A condition that never becomes false is an **infinite loop**.
* `break` leaves a loop; `continue` skips to the next round.

---

## 2. while Loop (5.2)

**Core idea:** Repeat **while** the condition is true. If it is false at the start, the body never runs.

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 1, sum = 0;

    while (i <= 5) {
        sum += i;
        i++;
    }
    cout << "Sum = " << sum << "\n";

    int n = 1234, count = 0, reversed = 0, temp = n;
    while (temp > 0) {
        int digit = temp % 10;
        reversed = reversed * 10 + digit;
        temp /= 10;
        count++;
    }
    cout << "Digits = " << count << ", Reverse = " << reversed << "\n";
    return 0;
}
```

```output
Sum = 15
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
* Last digit: `n % 10`. Remove the last digit: `n / 10`.
* Use `while` when you do not know the number of rounds.

---

## 3. do-while Loop (5.3)

**Core idea:** Run the body **first**, then check the condition. It always runs **at least once**.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 10;
    do {
        cout << "Runs once, n = " << n << "\n";
        n++;
    } while (n < 5);

    int i = 3;
    do {
        cout << i << " ";
        i--;
    } while (i > 0);
    cout << "Liftoff\n";
    return 0;
}
```

```output
Runs once, n = 10
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

---

## 4. for Loop (5.4)

**Core idea:** Initialization, condition and update on **one line**. Order: init (once) → condition → body → update → condition ...

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << "\n";

    for (int i = 10; i >= 2; i -= 4) {
        cout << i << " ";
    }
    cout << "\n";

    long long fact = 1;
    for (int i = 1; i <= 5; i++) {
        fact *= i;
    }
    cout << "5! = " << fact << "\n";

    vector<int> v = {10, 20, 30};
    for (int x : v) {
        cout << x << " ";
    }
    cout << "\n";

    string s = "Hi";
    for (char c : s) {
        cout << c << "-";
    }
    cout << "\n";
    return 0;
}
```

```output
1 2 3 4 5
10 6 2
5! = 120
10 20 30
H-i-
```

```text
for (initialization; condition; update) { body }
for (type item : collection) { body }          // range-based for (C++11)
```

**Remember**

* Use `for` when you **know how many times** to repeat.
* Range-based `for` is the simplest way to visit every element; use `for (auto &x : v)` to **modify** elements.
* `i <= n` vs `i < n` is the most common **off-by-one** mistake.
* `for (;;)` is an infinite loop.
* The loop variable declared in `for (int i ...)` exists only inside the loop.
* Use `long long` for factorials: `int` overflows after `12!`.

---

## 5. Nested Loops & Pattern Programs (5.5)

**Core idea:** The **outer** loop controls **rows**; the **inner** loop controls **columns**. The inner loop runs fully for **every** round of the outer loop.

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int row = 1; row <= 4; row++) {
        for (int col = 1; col <= row; col++) {
            cout << "*";
        }
        cout << "\n";
    }

    int n = 3;
    for (int row = 1; row <= n; row++) {
        for (int space = 1; space <= n - row; space++) {
            cout << " ";
        }
        for (int star = 1; star <= 2 * row - 1; star++) {
            cout << "*";
        }
        cout << "\n";
    }

    for (int i = 1; i <= 2; i++) {
        for (int j = 1; j <= 3; j++) {
            cout << i << " x " << j << " = " << i * j << "\n";
        }
    }
    return 0;
}
```

```output
*
**
***
****
  *
 ***
*****
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
```

| Step | Question |
| --- | --- |
| 1 | How many **rows**? (outer loop) |
| 2 | How many **spaces** in each row? (inner loop) |
| 3 | How many **symbols** in each row? (inner loop) |
| 4 | Where does the **new line** go? (after the inner loops) |

| Pattern | Symbols in row `r` (of `n`) |
| --- | --- |
| Right triangle | `r` |
| Inverted triangle | `n - r + 1` |
| Pyramid | `n - r` spaces, then `2r - 1` symbols |
| Square | `n` |

**Remember**

* Print the new line **after** the inner loop, not inside it.
* Total rounds = outer rounds × inner rounds.
* `break` inside the inner loop leaves **only** the inner loop.
* Use different counter names (`i`, `j`).

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Count 1 to n | `for (int i = 1; i <= n; i++)` |
| Count down | `for (int i = n; i >= 1; i--)` |
| Step by 2 | `for (int i = 0; i <= 10; i += 2)` |
| Visit every item | `for (auto x : container)` |
| Modify every item | `for (auto &x : container)` |
| Repeat while true | `while (cond) { }` |
| Run at least once | `do { } while (cond);` |
| Infinite loop | `for (;;)` or `while (true)` |
| Sum / factorial | `sum += i;` / `fact *= i;` |
| Stop / skip a round | `break;` / `continue;` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Forgetting the update (`i++`) | Add it |
| `for (...);` with an extra `;` | Remove it |
| Missing `;` after `do-while` | `while (cond);` |
| `<=` vs `<` (off by one) | Test the first and last values |
| Using `=` in the condition | Use `==`, `<`, `<=` |
| New line inside the inner loop | Move it after the inner loop |
| Changing the loop variable in the body | Let the `for` header control it |
| Factorial overflow with `int` | Use `long long` |
| Modifying a range-based `for` variable with no `&` | Use `auto &x` |
| Same counter name in nested loops | Use `i` and `j` |

---

## Last-Minute Checklist

* I can name the three parts of a loop.
* I know `while` is entry-controlled and `do-while` is exit-controlled.
* I can write all three loops and the range-based `for`.
* I can sum digits, reverse a number and find a factorial.
* I can print triangle and pyramid patterns.
* I know outer loop = rows and inner loop = columns.

---

## Quiz: Rapid Fire

1. Which loop always runs its body at least once?

- [ ] `for`
- [ ] `while`
- [x] `do-while`
- [ ] Range-based `for`

2. How many times does `for (int i = 1; i <= 3; i++)` run?

- [ ] `2`
- [x] `3`
- [ ] `4`
- [ ] `1`

3. What is required after the condition of a `do-while` loop?

- [ ] A colon
- [ ] Nothing
- [x] A semicolon
- [ ] A comma

4. Which loop visits every item of a `vector` most simply?

- [ ] `while (true)`
- [x] `for (auto x : v)`
- [ ] `do-while`
- [ ] `switch`

5. In a nested loop pattern, what does the outer loop usually control?

- [ ] Columns
- [x] Rows
- [ ] Spaces only
- [ ] Characters

6. How do you modify the items of a `vector` inside a range-based `for`?

- [ ] `for (auto x : v)`
- [x] `for (auto &x : v)`
- [ ] `for (const auto x : v)`
- [ ] You cannot
