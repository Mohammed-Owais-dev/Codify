# Quick Notes: Chapter 3 - Operators & Expressions

> ⏱ **15-minute revision.** Operators build expressions. Focus on integer division, `&&`/`||` short-circuiting, prefix vs postfix, bitwise operators and the precedence table.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 3.1 | Arithmetic Operators | `+ - * / %`; integer division drops decimals |
| 3.2 | Relational & Logical | `== != > < >= <=` and `&& \|\| !` give `1` or `0` |
| 3.3 | Assignment & Inc/Dec | `=`, `+=`, `++`, `--` (prefix vs postfix) |
| 3.4 | Conditional & Bitwise | `?:` and `& \| ^ ~ << >>` |
| 3.5 | Precedence & Expressions | Which operator runs first; use parentheses |

---

## 1. Arithmetic Operators (3.1)

**Core idea:** Operators perform calculations on **operands**.

| Operator | Name | Example | Result |
| --- | --- | --- | --- |
| `+` | Addition | `17 + 5` | `22` |
| `-` | Subtraction | `17 - 5` | `12` |
| `*` | Multiplication | `17 * 5` | `85` |
| `/` | Division | `17 / 5` | `3` (integers) |
| `%` | Modulus (remainder) | `17 % 5` | `2` |

```c
#include <stdio.h>

int main(void) {
    int a = 17, b = 5;

    printf("%d %d %d %d %d %.2f\n", a + b, a - b, a * b, a / b, a % b, (float)a / b);
    printf("%d %d\n", -7 % 3, 7 % -3);
    return 0;
}
```

```output
22 12 85 3 2 3.40
-1 1
```

**Remember**

* `int / int` gives an `int` (decimal part is **dropped**, not rounded).
* `%` works **only with integers**. For decimals use `fmod()` from `math.h`.
* The sign of `%` follows the **left** operand.
* Dividing by zero is undefined behavior (integers crash the program).
* `%` tricks: `n % 2 == 0` is even; `n % 10` is the last digit; `n / 10` removes it.

---

## 2. Relational & Logical Operators (3.2)

**Core idea:** Relational operators compare. Logical operators combine conditions. Results are **`1` (true)** or **`0` (false)**.

| Relational | Meaning | Logical | Meaning |
| --- | --- | --- | --- |
| `==` | Equal to | `&&` | AND: both true |
| `!=` | Not equal | `\|\|` | OR: at least one true |
| `>` `<` | Greater / less | `!` | NOT: flips the result |
| `>=` `<=` | Greater or equal / less or equal | | |

```c
#include <stdio.h>

int main(void) {
    printf("%d %d %d\n", 5 > 3, 5 == 3, 5 != 3);
    printf("%d %d %d\n", (5 > 3 && 2 > 1), (5 < 3 || 2 > 1), !(5 > 3));
    return 0;
}
```

```output
1 0 1
1 1 0
```

**Short-circuit evaluation**

```c
#include <stdio.h>

int main(void) {
    int x = 0;
    int r = (x != 0 && 10 / x > 1);

    printf("%d\n", r);
    return 0;
}
```

```output
0
```

* `&&` stops at the first **false**; `||` stops at the first **true**.
* Here `10 / x` never runs, so there is no division by zero.

**Truth table**

| A | B | `A && B` | `A \|\| B` |
| --- | --- | --- | --- |
| 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 |
| 0 | 0 | 0 | 0 |

**Remember**

* **Any non-zero value is true; only `0` is false.**
* `=` assigns; `==` compares. `if (x = 5)` is a classic bug.
* Write ranges as `x >= 1 && x <= 10`, **not** `1 <= x <= 10`.

---

## 3. Assignment & Increment/Decrement Operators (3.3)

**Core idea:** Assignment stores a value. Increment and decrement add or subtract 1.

| Operator | Same as |
| --- | --- |
| `x += 5` | `x = x + 5` |
| `x -= 5` | `x = x - 5` |
| `x *= 5` | `x = x * 5` |
| `x /= 5` | `x = x / 5` |
| `x %= 5` | `x = x % 5` |

```c
#include <stdio.h>

int main(void) {
    int x = 10;

    x += 5;
    x -= 3;
    x *= 2;
    x /= 4;
    x %= 4;

    printf("%d\n", x);
    return 0;
}
```

```output
2
```

**Prefix vs postfix**

```c
#include <stdio.h>

int main(void) {
    int a = 5;
    int b = a++;
    int c = ++a;

    printf("%d %d %d\n", a, b, c);
    return 0;
}
```

```output
7 5 7
```

| Form | Meaning |
| --- | --- |
| `b = a++` | **Use** the old value, then add 1 |
| `c = ++a` | Add 1, then **use** the new value |
| `a--` / `--a` | Same idea for subtraction |

**Remember**

* On its own (`i++;`), prefix and postfix do the same thing.
* **Never** change a variable twice in one expression (`i++ + ++i`). The result is undefined.
* Multiple assignment works right to left: `a = b = c = 0;`.

---

## 4. Conditional & Bitwise Operators (3.4)

**Core idea:** The **conditional (ternary) operator** picks one of two values. **Bitwise operators** work on individual bits.

```c
#include <stdio.h>

int main(void) {
    int n = 7, a = 10, b = 20;

    printf("%s\n", n % 2 == 0 ? "Even" : "Odd");
    printf("%d\n", a > b ? a : b);
    return 0;
}
```

```output
Odd
20
```

Syntax: `condition ? value_if_true : value_if_false`

**Bitwise operators** (with `a = 12` is `1100`, `b = 10` is `1010`)

| Operator | Name | Example | Result |
| --- | --- | --- | --- |
| `&` | AND | `12 & 10` | `8` (`1000`) |
| `\|` | OR | `12 \| 10` | `14` (`1110`) |
| `^` | XOR (different bits) | `12 ^ 10` | `6` (`0110`) |
| `~` | NOT (flip all bits) | `~12` | `-13` |
| `<<` | Left shift | `12 << 1` | `24` |
| `>>` | Right shift | `12 >> 2` | `3` |

```c
#include <stdio.h>

int main(void) {
    int a = 12, b = 10;

    printf("%d %d %d %d %d %d\n", a & b, a | b, a ^ b, ~a, a << 1, a >> 2);
    return 0;
}
```

```output
8 14 6 -13 24 3
```

**Remember**

* `x << n` multiplies by `2^n`; `x >> n` divides by `2^n` (integers).
* `x & 1` is `1` for odd numbers, `0` for even.
* `&` and `|` (bitwise) are **not** `&&` and `||` (logical).
* Use the ternary operator for **simple** choices only.

---

## 5. Operator Precedence & Expressions (3.5)

**Core idea:** **Precedence** decides which operator runs first. **Associativity** decides the order for equal precedence.

| Priority (high to low) | Operators | Associativity |
| --- | --- | --- |
| 1 | `()` | Left to right |
| 2 | `!` `~` `++` `--` unary `-` | Right to left |
| 3 | `*` `/` `%` | Left to right |
| 4 | `+` `-` | Left to right |
| 5 | `<<` `>>` | Left to right |
| 6 | `<` `<=` `>` `>=` | Left to right |
| 7 | `==` `!=` | Left to right |
| 8 | `&` then `^` then `\|` | Left to right |
| 9 | `&&` then `\|\|` | Left to right |
| 10 | `?:` | Right to left |
| 11 | `=` `+=` `-=` etc. | Right to left |

```c
#include <stdio.h>

int main(void) {
    int r = 5 + 3 > 7 && 2 * 3 == 6;

    printf("%d %d %d\n", 2 + 3 * 4, (2 + 3) * 4, 10 - 4 - 3);
    printf("%d %d\n", 10 / 4 * 2, 10 / (4 * 2));
    printf("%d\n", r);
    return 0;
}
```

```output
14 20 3
4 1
1
```

**Remember**

* `*`, `/`, `%` run before `+` and `-`.
* Same priority runs **left to right**: `10 - 4 - 3` is `(10 - 4) - 3`.
* `10 / 4 * 2` is `(10 / 4) * 2 = 4`, not `5`.
* **When unsure, add parentheses.** They are free and make code clearer.
* An **expression** produces a value; a **statement** ends with `;`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Remainder | `a % b` |
| Even check | `n % 2 == 0` |
| Last digit / remove last digit | `n % 10` / `n / 10` |
| Decimal division | `(float)a / b` |
| Range check | `x >= 1 && x <= 10` |
| Add and store | `x += 5;` |
| Increase by 1 | `x++;` |
| Pick larger | `a > b ? a : b` |
| Multiply by 2 | `n << 1` |
| Odd check | `n & 1` |
| Swap bits | `a ^ b` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `if (x = 5)` | Use `==` to compare |
| `5 / 2` gives `2` | `5 / 2.0` or `(float)5 / 2` |
| `%` with a `float` | Use integers, or `fmod()` |
| `1 <= x <= 10` | `x >= 1 && x <= 10` |
| `&` instead of `&&` | Use `&&` for logical AND |
| `i++ + ++i` | Do not change a variable twice in one expression |
| Assuming `10 / 4 * 2` is `5` | Division runs first: result is `4` |
| Forgetting that non-zero is true | `if (-1)` is true |
| Missing parentheses | Add them when unsure |

---

## Last-Minute Checklist

* ✅ I know integer division drops the decimals.
* ✅ I can use `%` for even/odd and digits.
* ✅ I know relational and logical operators return `1` or `0`.
* ✅ I understand short-circuit evaluation.
* ✅ I can explain `a++` vs `++a`.
* ✅ I can compute `&`, `|`, `^`, `~`, `<<`, `>>` for small numbers.
* ✅ I can use the ternary operator.
* ✅ I know `* / %` come before `+ -`.

---

## Quiz: Rapid Fire 🧠

1. What is `17 % 5`?

- [ ] `3`
- [x] `2`
- [ ] `3.4`
- [ ] `0`

2. What does `5 > 3` evaluate to in C?

- [ ] `true`
- [ ] `5`
- [x] `1`
- [ ] `0`

3. After `int a = 5; int b = a++;`, what are `a` and `b`?

- [ ] `a = 5`, `b = 5`
- [ ] `a = 6`, `b = 6`
- [ ] `a = 5`, `b = 6`
- [x] `a = 6`, `b = 5`

4. What is `12 & 10`?

- [ ] `14`
- [x] `8`
- [ ] `6`
- [ ] `22`

5. What is `10 / 4 * 2`?

- [ ] `5`
- [ ] `1`
- [x] `4`
- [ ] `5.0`

6. Which expression is the ternary operator?

- [ ] `a && b`
- [ ] `a & b`
- [x] `a > b ? a : b`
- [ ] `a >> b`
