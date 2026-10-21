# Quick Notes: Chapter 5 - Loops

> **10-minute revision.** Know why loops exist, how `for`, `while` and `do-while` work, how `break`, `continue` and nested loops control the flow, and how to solve common loop problems.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 5.1 | Introduction to Loops | Repeat code without copying it; every loop needs a start, a test and an update |
| 5.2 | for Loop | Best when you know how many times to repeat |
| 5.3 | while and do-while | Repeat while a condition holds; `do-while` runs at least once |
| 5.4 | break, continue and Nested Loops | Exit early, skip one round, or loop inside a loop |
| 5.5 | Loop Practice | Primes, Fibonacci, palindromes and sums |

---

## 1. Introduction to Loops (5.1)

**Core idea:** A **loop** repeats a block of code while a condition is true.

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("Hello " + i);
        }
    }
}
```

```output
Hello 1
Hello 2
Hello 3
```

**The four parts of a loop**

| Part | Role | In the example |
| --- | --- | --- |
| Initialization | Set the starting value | `int i = 1` |
| Condition | Keep looping while true | `i <= 3` |
| Body | The code that repeats | `System.out.println(...)` |
| Update | Move towards the end | `i++` |

**Kinds of loops**

| Loop | Checks the condition | Use when |
| --- | --- | --- |
| `for` | **Before** each round | You know the number of rounds |
| `while` | **Before** each round | You repeat until something changes |
| `do-while` | **After** each round | The body must run **at least once** |
| for-each | Over every item | Visiting each item of an array (Chapter 7) |

**Remember**

* If the condition never becomes false, you get an **infinite loop**: `while (true)` or `for (;;)`.
* Always make sure the **update** moves towards ending the loop.
* Stop a runaway program in the terminal with `Ctrl + C`.

---

## 2. for Loop (5.2)

**Core idea:** `for (start; condition; update)` puts all three loop parts on one line.

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        for (int i = 10; i >= 0; i -= 5) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
```

```output
1 2 3 4 5
10 5 0
```

**Sum, table and factorial**

```java
public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("Sum = " + sum);

        for (int i = 1; i <= 5; i++) {
            System.out.println("5 x " + i + " = " + (5 * i));
        }

        long fact = 1;
        for (int i = 1; i <= 5; i++) {
            fact *= i;
        }
        System.out.println("5! = " + fact);
    }
}
```

```output
Sum = 55
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5! = 120
```

**Remember**

* The loop variable declared in the `for` header exists **only inside the loop**.
* Count down with `i--` or `i -= 2`. Count in steps with `i += 2`.
* Use `<=` to include the last number, `<` to stop before it.
* Start accumulators at the right value: sum starts at `0`, product starts at `1`.

---

## 3. while and do-while (5.3)

**Core idea:** `while` tests first. `do-while` runs the body first, then tests.

```java
public class Main {
    public static void main(String[] args) {
        int i = 1;
        while (i <= 3) {
            System.out.println("i = " + i);
            i++;
        }

        int n = 10;
        do {
            System.out.println("do-while runs once, n = " + n);
            n++;
        } while (n < 5);
    }
}
```

```output
i = 1
i = 2
i = 3
do-while runs once, n = 10
```

**Sum and reverse the digits of a number**

```java
public class Main {
    public static void main(String[] args) {
        int num = 1234;
        int sum = 0;
        int rev = 0;

        while (num > 0) {
            int digit = num % 10;
            sum += digit;
            rev = rev * 10 + digit;
            num /= 10;
        }
        System.out.println("Sum of digits = " + sum);
        System.out.println("Reversed = " + rev);
    }
}
```

```output
Sum of digits = 10
Reversed = 4321
```

| | `while` | `do-while` |
| --- | --- | --- |
| Condition checked | Before the body | After the body |
| Minimum runs | 0 | 1 |
| Ends with | `}` | `} while (condition);` |

**Remember**

* Update the variable inside the loop, or the loop never ends.
* `do-while` needs a **semicolon** after the condition.
* `num % 10` gives the **last digit**. `num / 10` removes it.

---

## 4. break, continue and Nested Loops (5.4)

**Core idea:** `break` leaves the loop. `continue` skips to the next round. A loop inside a loop is a **nested loop**.

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break;
            }
            System.out.print(i + " ");
        }
        System.out.println();

        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                continue;
            }
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
```

```output
1 2 3 4
1 2 4 5
```

**Nested loop: a star triangle**

```java
public class Main {
    public static void main(String[] args) {
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= row; col++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

```output
*
* *
* * *
```

**Labeled break leaves both loops**

```java
public class Main {
    public static void main(String[] args) {
        outer:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i * j == 4) {
                    System.out.println("Found " + i + " x " + j);
                    break outer;
                }
            }
        }
    }
}
```

```output
Found 2 x 2
```

| Keyword | Effect |
| --- | --- |
| `break` | Leaves the **nearest** loop (or a `switch`) |
| `continue` | Skips the rest of this round |
| `break label` | Leaves the loop that has that label |

**Remember**

* In nested loops, the **inner loop runs fully** for each round of the outer loop.
* A plain `break` only leaves the **inner** loop.
* In a `while` loop, put the update **before** `continue`, or you may loop forever.

---

## 5. Loop Practice (5.5)

**Core idea:** Most loop questions reuse the same few ideas: count, accumulate, test divisors, and swap values.

```java
public class Main {
    public static void main(String[] args) {
        int n = 29;
        boolean prime = n > 1;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                prime = false;
                break;
            }
        }
        System.out.println(n + (prime ? " is prime" : " is not prime"));

        int a = 0, b = 1;
        for (int i = 1; i <= 8; i++) {
            System.out.print(a + " ");
            int next = a + b;
            a = b;
            b = next;
        }
        System.out.println();
    }
}
```

```output
29 is prime
0 1 1 2 3 5 8 13
```

**Palindrome number and sum of even numbers**

```java
public class Main {
    public static void main(String[] args) {
        int original = 121;
        int num = original;
        int rev = 0;
        while (num > 0) {
            rev = rev * 10 + num % 10;
            num /= 10;
        }
        System.out.println(original + (rev == original ? " is a palindrome" : " is not a palindrome"));

        int sum = 0;
        for (int i = 2; i <= 20; i += 2) {
            sum += i;
        }
        System.out.println("Sum of even numbers 1 to 20 = " + sum);
    }
}
```

```output
121 is a palindrome
Sum of even numbers 1 to 20 = 110
```

**Practice list**

| Problem | Idea |
| --- | --- |
| Prime check | Test divisors up to the square root, then `break` |
| Fibonacci | Keep two values, add them, shift forward |
| Palindrome | Reverse the digits and compare |
| Sum of digits | `% 10` and `/ 10` |
| Factorial | Multiply from 1 up to `n` |
| Multiplication table | One `for` loop |
| Star patterns | Nested loops: rows outside, columns inside |

**Remember**

* Check `n > 1` for primes: `0` and `1` are not prime.
* Use **`long`** for large factorials. `int` overflows after 12!.
* Keep a copy of the original number before you change it in a loop.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Count 1 to n | `for (int i = 1; i <= n; i++)` |
| Count down | `for (int i = n; i >= 1; i--)` |
| Step by 2 | `for (int i = 0; i < n; i += 2)` |
| Repeat while | `while (condition) { ... }` |
| Run at least once | `do { ... } while (condition);` |
| Leave the loop | `break;` |
| Skip one round | `continue;` |
| Infinite loop | `while (true) { ... }` |
| Last digit | `n % 10` |
| Remove last digit | `n / 10` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Missing update, so the loop never ends | Change the variable inside the loop |
| `for (...);` with a semicolon | Remove it; the body would be empty |
| Off by one: `<` vs `<=` | Test the first and last values |
| Forgetting `;` after `do-while` | `} while (condition);` |
| Sum starts at 1, product starts at 0 | Sum starts at `0`, product at `1` |
| `i` used after the `for` loop | Declare it before the loop if you need it later |
| `continue` skipping the update in `while` | Update before `continue` |
| `int` factorial overflow | Use `long` |

---

## Last-Minute Checklist

* I can name the four parts of a loop.
* I can write `for`, `while` and `do-while` loops.
* I know which loop runs at least once.
* I can use `break`, `continue` and a labeled `break`.
* I can print patterns with nested loops.
* I can solve prime, Fibonacci, palindrome and digit problems.

---

## Quiz: Rapid Fire

1. Which loop always runs its body at least once?

- [ ] `for`
- [ ] `while`
- [x] `do-while`
- [ ] for-each

2. What are the three parts in a `for` header, in order?

- [ ] Condition, update, start
- [x] Initialization, condition, update
- [ ] Update, start, condition
- [ ] Start, update, condition

3. What does `break` do inside a loop?

- [ ] Skips to the next round
- [x] Leaves the loop immediately
- [ ] Restarts the loop
- [ ] Ends the program

4. What does `continue` do?

- [x] Skips the rest of the current round
- [ ] Leaves the loop
- [ ] Repeats the same round
- [ ] Ends the program

5. How many times does `for (int i = 0; i < 5; i++)` run?

- [ ] `4`
- [ ] `6`
- [ ] `0`
- [x] `5`

6. Which loop is infinite?

- [ ] `while (false)`
- [ ] `for (int i = 0; i < 3; i++)`
- [x] `while (true)`
- [ ] `do { } while (false);`
