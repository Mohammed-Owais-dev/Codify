# Quick Notes: Chapter 4 - Control Statements

> ⏱ **15-minute revision.** Control statements let a program **choose** what to run. Know `if`, `if-else`, nested `if`, the `else-if` ladder, `switch` (and why `break` matters), `break`, `continue` and the conditional operator.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 4.1 | Introduction to Conditions | A condition is `true` or `false`; non-zero is true |
| 4.2 | if, if-else & Nested if | One or two paths; `if` inside `if` |
| 4.3 | else-if Ladder | Many conditions; the first true one runs |
| 4.4 | switch Statement | One value, many exact cases |
| 4.5 | break, continue & Conditional Operator | Leave a loop or `switch`, skip a round, one-line `if-else` |

---

## 1. Introduction to Conditions (4.1)

**Core idea:** A **condition** is an expression that is **true** or **false**. Control statements use it to decide which code runs.

| Statement | Use |
| --- | --- |
| `if` | Run a block when the condition is true |
| `if-else` | Choose between two blocks |
| `else-if` ladder | Choose among many blocks |
| `switch` | Choose by one value |
| `? :` | One-line choice |

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5;

    cout << boolalpha << (x > 3) << " " << (x == 0) << "\n";

    if (x) {
        cout << "non-zero is true\n";
    }
    if (!0) {
        cout << "zero is false\n";
    }
    return 0;
}
```

```output
true false
non-zero is true
zero is false
```

**Remember**

* `false` and `0` are false; **every other value** is true.
* Relational operators (`< > == !=`) and logical operators (`&& || !`) build conditions.
* Use `==` to compare, `=` to assign.
* Always use braces `{ }`, even for one statement.

---

## 2. if, if-else & Nested if (4.2)

**Core idea:** `if` runs a block when the condition is true; `else` runs when it is false. An `if` inside another `if` is a **nested if**.

```text
if (condition) {
    // true block
} else {
    // false block
}
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 20;
    bool hasId = true;

    if (age >= 18) {
        if (hasId) {
            cout << "Entry allowed\n";
        } else {
            cout << "ID required\n";
        }
    } else {
        cout << "Adults only\n";
    }

    if (int r = age % 2; r == 0) {
        cout << "even age\n";
    } else {
        cout << "odd age\n";
    }
    return 0;
}
```

```output
Entry allowed
even age
```

**Remember**

* The condition goes in `( )` and has **no semicolon** after it.
* `else` belongs to the **nearest** unmatched `if`.
* Nested conditions can often be flattened: `if (age >= 18 && hasId)`.
* C++17 allows an **initializer**: `if (int r = ...; r == 0)`. The variable exists only inside the `if`/`else`.

---

## 3. else-if Ladder (4.3)

**Core idea:** Test conditions **from top to bottom**. The **first true** block runs and the rest are skipped.

```text
if (c1) { ... }
else if (c2) { ... }
else if (c3) { ... }
else { ... }
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int marks = 72;

    if (marks >= 90) {
        cout << "Grade A+\n";
    } else if (marks >= 75) {
        cout << "Grade A\n";
    } else if (marks >= 60) {
        cout << "Grade B\n";
    } else if (marks >= 40) {
        cout << "Grade C\n";
    } else {
        cout << "Fail\n";
    }

    int year = 2024;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        cout << year << " is a leap year\n";
    }

    int a = 12, b = 45, c = 30;
    int largest = a;
    if (b > largest) largest = b;
    if (c > largest) largest = c;
    cout << "Largest = " << largest << "\n";
    return 0;
}
```

```output
Grade B
2024 is a leap year
Largest = 45
```

**Remember**

* Put the **most specific** (highest) condition first.
* Separate `if` statements are **all** checked; an `else-if` chain stops at the first match.
* `else` is optional and goes last.
* Leap year: divisible by 4 **and** not by 100, **or** divisible by 400.

---

## 4. switch Statement (4.4)

**Core idea:** `switch` compares **one value** against several **constant** `case` labels.

```text
switch (value) {
    case 1:  ...; break;
    case 2:  ...; break;
    default: ...;
}
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int day = 3;

    switch (day) {
        case 1: cout << "Monday\n"; break;
        case 2: cout << "Tuesday\n"; break;
        case 3: cout << "Wednesday\n"; break;
        default: cout << "Another day\n";
    }

    int n = 1;
    switch (n) {
        case 1: cout << "One\n";
        case 2: cout << "Two\n"; break;
        case 3: cout << "Three\n";
    }

    char ch = 'e';
    switch (ch) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
            cout << "Vowel\n";
            break;
        default:
            cout << "Consonant\n";
    }
    return 0;
}
```

```output
Wednesday
One
Two
Vowel
```

| `switch` | `if-else if` |
| --- | --- |
| One value, exact matches | Ranges and complex conditions |
| `int`, `char`, `enum` only | Any condition, any type |
| Cleaner for menus | Needed for `&&` / `\|\|` tests |

**Remember**

* Without `break`, execution **falls through** to the next case.
* Stack several `case` labels to share one block.
* `case` values must be **constants**; no ranges, no `double`, no `string`.
* `default` runs when nothing matches (usually last).
* Variables declared inside a `case` need their own `{ }`.

---

## 5. break, continue & Conditional Operator (4.5)

**Core idea:** `break` **leaves** a loop or `switch`. `continue` **skips** the rest of the current round. `? :` is a one-line `if-else`.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    for (int i = 1; i <= 10; i++) {
        if (i == 5) {
            break;
        }
        cout << i << " ";
    }
    cout << "\n";

    for (int i = 1; i <= 5; i++) {
        if (i == 3) {
            continue;
        }
        cout << i << " ";
    }
    cout << "\n";

    int age = 17;
    string status = (age >= 18) ? "Adult" : "Minor";
    cout << status << "\n";

    int score = 68;
    cout << (score >= 75 ? "Distinction" : score >= 60 ? "First Class" : "Pass") << "\n";
    return 0;
}
```

```output
1 2 3 4
1 2 4 5
Minor
First Class
```

| Statement | Effect |
| --- | --- |
| `break;` | Ends the nearest loop or `switch` |
| `continue;` | Jumps to the next iteration |
| `return;` | Leaves the whole function |

**Remember**

* In **nested loops**, `break` exits only the **inner** loop.
* In a `while` loop, update the counter **before** `continue`, or it may loop forever.
* The ternary operator returns a **value**; use it for simple choices only.
* Keep chained ternaries short; use `else-if` when it gets hard to read.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Two paths | `if (c) { } else { }` |
| Many paths | `if (...) { } else if (...) { } else { }` |
| Exact values | `switch (x) { case 1: ... break; default: ... }` |
| Share a block | `case 'a': case 'e': ...` |
| Leave a loop | `break;` |
| Skip a round | `continue;` |
| One-line choice | `x = (a > b) ? a : b;` |
| Even / odd | `n % 2 == 0` |
| Range check | `x >= 1 && x <= 10` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `if (x = 5)` | `if (x == 5)` |
| `if (x > 5);` (extra semicolon) | Remove the `;` |
| Missing `break` in `switch` | Add `break;` unless you want fall-through |
| Wrong order in an `else-if` ladder | Test the most specific first |
| `case 1.5:` or `case "a":` | Cases must be integer or character constants |
| Declaring a variable in a `case` without braces | Wrap that case in `{ }` |
| Writing `else if` without braces and mixing blocks | Always use `{ }` |
| `continue` before updating a `while` counter | Update first |
| Expecting `break` to leave all nested loops | It leaves only the inner one |

---

## Last-Minute Checklist

* ✅ I know any non-zero value is true.
* ✅ I can write `if`, `if-else`, nested `if` and an `else-if` ladder.
* ✅ I can write a `switch` with `break` and `default`.
* ✅ I understand fall-through.
* ✅ I know the difference between `break` and `continue`.
* ✅ I can use the conditional operator.

---

## Quiz: Rapid Fire 🧠

1. In C++, which value counts as false?

- [ ] `1`
- [ ] `-1`
- [x] `0`
- [ ] `"0"`

2. What happens if you forget `break` in a `case`?

- [ ] A compile error
- [x] The next case also runs
- [ ] The program stops
- [ ] Nothing

3. Which of these can be a `case` label?

- [ ] `1.5`
- [ ] `"abc"`
- [x] `'a'`
- [ ] A range like `1..5`

4. What does `continue` do?

- [ ] Ends the loop
- [x] Skips to the next iteration
- [ ] Ends the program
- [ ] Repeats the same iteration

5. Which runs only one block: `if` statements or an `else-if` ladder?

- [ ] Separate `if` statements
- [x] An `else-if` ladder
- [ ] Both
- [ ] Neither

6. What does `(a > b) ? a : b` give?

- [ ] The smaller value
- [x] The larger value
- [ ] `true` only
- [ ] An error
