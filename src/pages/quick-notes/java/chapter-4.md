# Quick Notes: Chapter 4 - Conditional Statements

> **10-minute revision.** Know how a program makes decisions with `if`, `if-else`, `else if`, nested `if` and `switch`, and how to practise them with small programs.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 4.1 | if Statement | Run a block only when a `boolean` condition is true |
| 4.2 | if-else and else-if | Choose between two paths, or many paths in a ladder |
| 4.3 | Nested if | An `if` inside another `if` for step-by-step checks |
| 4.4 | switch Statement | Pick one case by value; `break` stops fall-through |
| 4.5 | Conditional Practice | Leap year, largest number, vowel check and a calculator |

---

## 1. if Statement (4.1)

**Core idea:** An `if` statement runs its block **only when** the condition is `true`.

```text
if (condition) {
    // runs when the condition is true
}
```

```java
public class Main {
    public static void main(String[] args) {
        int marks = 65;

        if (marks >= 40) {
            System.out.println("Pass");
        }
        System.out.println("Done");
    }
}
```

```output
Pass
Done
```

**Combining conditions**

```java
public class Main {
    public static void main(String[] args) {
        int age = 20;
        boolean hasLicense = true;

        if (age >= 18 && hasLicense) {
            System.out.println("You can drive");
        }
    }
}
```

```output
You can drive
```

**Remember**

* The condition **must be a `boolean`**. `if (x = 5)` and `if (x)` with an `int` give a compile error.
* Always use **braces `{ }`**, even for one statement.
* Do not put `;` after the condition: `if (x > 5);` ends the `if`, so the next block **always runs**.
* Without a match, Java skips the block and continues.

---

## 2. if-else and else-if (4.2)

**Core idea:** `else` runs when the `if` condition is false. `else if` adds more choices. **Only the first true branch runs.**

```text
if (condition1) {
    ...
} else if (condition2) {
    ...
} else {
    ...
}
```

```java
public class Main {
    public static void main(String[] args) {
        int number = 7;
        if (number % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }

        int marks = 72;
        if (marks >= 90) {
            System.out.println("Grade A");
        } else if (marks >= 75) {
            System.out.println("Grade B");
        } else if (marks >= 60) {
            System.out.println("Grade C");
        } else if (marks >= 40) {
            System.out.println("Grade D");
        } else {
            System.out.println("Fail");
        }
    }
}
```

```output
Odd
Grade C
```

| Form | Use |
| --- | --- |
| `if` | One optional action |
| `if-else` | Exactly one of **two** actions |
| `if - else if - else` | Exactly one of **many** actions |

**Remember**

* Write the **most specific** condition first in a ladder.
* The `else` has **no condition**.
* The keyword is **`else if`** (two words), not `elif` or `elseif`.
* Once one branch runs, **all the others are skipped**.

---

## 3. Nested if (4.3)

**Core idea:** Put an `if` inside another `if` when the second check only makes sense after the first one passes.

```java
public class Main {
    public static void main(String[] args) {
        int age = 25;
        boolean hasTicket = true;

        if (age >= 18) {
            if (hasTicket) {
                System.out.println("Entry allowed");
            } else {
                System.out.println("Buy a ticket first");
            }
        } else {
            System.out.println("Adults only");
        }
    }
}
```

```output
Entry allowed
```

**Largest of three numbers**

```java
public class Main {
    public static void main(String[] args) {
        int a = 12, b = 45, c = 30;
        int largest;

        if (a >= b) {
            if (a >= c) {
                largest = a;
            } else {
                largest = c;
            }
        } else {
            if (b >= c) {
                largest = b;
            } else {
                largest = c;
            }
        }
        System.out.println("Largest = " + largest);
    }
}
```

```output
Largest = 45
```

**Flatten with `&&`** when there is no `else` for the inner check:

```text
if (age >= 18) {                  if (age >= 18 && hasTicket) {
    if (hasTicket) {         =        ...
        ...                       }
    }
}
```

**Remember**

* Each `else` belongs to the **nearest unmatched `if`**.
* Indent every level so you can see the structure.
* Too many levels are hard to read. Combine conditions with `&&` or use `else if`.

---

## 4. switch Statement (4.4)

**Core idea:** `switch` compares one value with many `case` labels. Use `break` to stop after a match.

```java
public class Main {
    public static void main(String[] args) {
        int day = 3;

        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Other day");
        }
    }
}
```

```output
Wednesday
```

**Fall-through: what happens without `break`**

```java
public class Main {
    public static void main(String[] args) {
        int n = 2;

        switch (n) {
            case 1:
                System.out.println("One");
            case 2:
                System.out.println("Two");
            case 3:
                System.out.println("Three");
                break;
            default:
                System.out.println("Other");
        }
    }
}
```

```output
Two
Three
```

**Grouping cases on purpose**

```java
public class Main {
    public static void main(String[] args) {
        char ch = 'e';

        switch (ch) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                System.out.println("Vowel");
                break;
            default:
                System.out.println("Consonant");
        }
    }
}
```

```output
Vowel
```

**Modern arrow form (Java 14 and later)** has no fall-through and can give a value:

```java
public class Main {
    public static void main(String[] args) {
        int day = 6;

        String type = switch (day) {
            case 6, 7 -> "Weekend";
            default -> "Weekday";
        };
        System.out.println(type);
    }
}
```

```output
Weekend
```

| Rule | Detail |
| --- | --- |
| Allowed types | `byte`, `short`, `char`, `int`, `String`, `enum` (and their wrappers) |
| Not allowed | `long`, `float`, `double`, `boolean` |
| `case` values | Must be **constants** and **unique** |
| `default` | Optional; runs when no case matches |

**Remember**

* Forgetting `break` causes **fall-through**: the next cases also run.
* `switch` checks **equality only**. For ranges, use `if-else if`.
* The arrow form `->` does **not** need `break`.

---

## 5. Conditional Practice (4.5)

**Core idea:** Practise the same few patterns until they feel natural.

```java
public class Main {
    public static void main(String[] args) {
        int year = 2024;
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            System.out.println(year + " is a leap year");
        } else {
            System.out.println(year + " is not a leap year");
        }

        int a = 12, b = 4;
        char op = '/';
        switch (op) {
            case '+':
                System.out.println(a + " + " + b + " = " + (a + b));
                break;
            case '-':
                System.out.println(a + " - " + b + " = " + (a - b));
                break;
            case '*':
                System.out.println(a + " * " + b + " = " + (a * b));
                break;
            case '/':
                if (b != 0) {
                    System.out.println(a + " / " + b + " = " + (a / b));
                } else {
                    System.out.println("Cannot divide by zero");
                }
                break;
            default:
                System.out.println("Unknown operator");
        }
    }
}
```

```output
2024 is a leap year
12 / 4 = 3
```

**Practice list**

| Problem | Idea |
| --- | --- |
| Positive, negative or zero | `if`, `else if`, `else` |
| Even or odd | `n % 2 == 0` |
| Largest of three | Nested `if` or `&&` |
| Leap year | Divisible by 4 and not 100, or divisible by 400 |
| Vowel or consonant | `switch` with grouped cases |
| Grade from marks | `else if` ladder |
| Calculator | `switch` on a `char` operator |
| Valid triangle | Each side less than the sum of the other two |

**Remember**

* Test the **boundary values**: exactly 40, exactly 90, zero, negative.
* Check for **division by zero** before dividing.
* Choose `switch` for exact matches and `if-else` for ranges.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| One check | `if (x > 0) { ... }` |
| Two paths | `if (...) { ... } else { ... }` |
| Many paths | `if (...) { } else if (...) { } else { }` |
| Both conditions | `if (a > 0 && b > 0)` |
| Nested check | `if (a) { if (b) { ... } }` |
| Switch | `switch (x) { case 1: ... break; default: ... }` |
| Arrow switch | `case 6, 7 -> "Weekend";` |
| Even test | `n % 2 == 0` |
| Leap year | `(y % 4 == 0 && y % 100 != 0) \|\| y % 400 == 0` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `if (x = 5)` | Use `==` |
| `if (x > 5);` | Remove the semicolon |
| Missing `break` in `switch` | Add `break` unless fall-through is wanted |
| Using `elif` or `elseif` | Write `else if` |
| `switch` on a `double` | Use `if-else` or convert to `int` |
| Duplicate `case` values | Every `case` must be unique |
| `else` matched to the wrong `if` | Use braces and indentation |
| Comparing strings with `==` | Use `.equals()` |

---

## Last-Minute Checklist

* I can write `if`, `if-else` and an `else if` ladder.
* I know the condition must be a `boolean`.
* I can nest `if` statements and flatten them with `&&`.
* I can write a `switch` with `break` and `default`.
* I know what fall-through is and can use the arrow form.
* I can solve leap year, largest number and calculator problems.

---

## Quiz: Rapid Fire

1. What type must the condition of an `if` statement be?

- [ ] `int`
- [ ] `String`
- [x] `boolean`
- [ ] `char`

2. Which label in a `switch` runs when no `case` matches?

- [ ] `else`
- [ ] `otherwise`
- [x] `default`
- [ ] `none`

3. What happens if you forget `break` in a classic `switch` case?

- [ ] The program stops
- [ ] A compile error occurs
- [x] Execution continues into the next case
- [ ] The `default` is skipped

4. How do you write an extra branch in an `if` ladder?

- [ ] `elif (condition)`
- [ ] `elseif (condition)`
- [x] `else if (condition)`
- [ ] `else-if (condition)`

5. Which type can NOT be used in a classic `switch`?

- [ ] `int`
- [ ] `String`
- [ ] `char`
- [x] `double`

6. What is the problem with `if (x > 5);`?

- [ ] Nothing, it is correct
- [x] The semicolon ends the `if`, so the next block always runs
- [ ] It must use `==`
- [ ] It needs `then`
