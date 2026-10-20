# Quick Notes: Chapter 3 - Operators

> **15-minute revision.** Operators build expressions. Know integer vs floating-point division, `%`, the relational and logical operators (with **short-circuit** evaluation), `++`/`--` (prefix vs postfix), bitwise operators, the ternary operator and the **precedence** order.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 3.1 | Arithmetic Operators | `+ - * / %`; integer division truncates |
| 3.2 | Relational & Logical Operators | Produce `true`/`false`; `&&` and `||` short-circuit |
| 3.3 | Assignment & Increment/Decrement | `+=`, `++x` vs `x++` |
| 3.4 | Bitwise & Conditional Operators | `& \| ^ ~ << >>` and `? :` |
| 3.5 | Operator Precedence & Expressions | Order of evaluation; use parentheses |

---

## 1. Arithmetic Operators (3.1)

**Core idea:** Arithmetic operators calculate. The **type of the operands** decides the result type.

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` `-` `*` | Add, subtract, multiply | `6 * 3` | `18` |
| `/` | Divide | `10 / 3` | `3` (integers) |
| `%` | Remainder | `10 % 3` | `1` |

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    cout << 10 / 3 << " " << 10 % 3 << " " << 10 / 3.0 << "\n";
    cout << -7 / 2 << " " << -7 % 3 << "\n";
    cout << pow(2, 3) << " " << sqrt(16) << "\n";
    return 0;
}
```

```output
3 1 3.33333
-3 -1
8 4
```

**Remember**

* `int / int` drops the decimal part (truncates toward zero): `-7 / 2` is `-3`.
* `%` works **only with integers**; for decimals use `fmod()`.
* The sign of `a % b` follows `a`: `-7 % 3` is `-1`.
* Dividing by zero: integers crash; floating-point gives `inf`.
* `pow`, `sqrt`, `abs` need `<cmath>`.
* `n % 2 == 0` tests for an even number; `n % 10` is the last digit.

---

## 2. Relational & Logical Operators (3.2)

**Core idea:** Relational operators **compare** and give `true` (`1`) or `false` (`0`). Logical operators **combine** conditions.

| Relational | Meaning | Logical | Meaning |
| --- | --- | --- | --- |
| `==` | Equal | `&&` | AND: both true |
| `!=` | Not equal | `\|\|` | OR: at least one true |
| `<` `>` | Less / greater | `!` | NOT: reverses |
| `<=` `>=` | Less or equal / greater or equal | | |

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20, x = 0;

    cout << boolalpha;
    cout << (a == b) << " " << (a != b) << " " << (a < b) << "\n";
    cout << (a > 5 && b > 5) << " " << (a > 15 || b > 15) << " " << !(a > 5) << "\n";

    if (false && (++x > 0)) { }
    cout << "x = " << x << "\n";
    return 0;
}
```

```output
false true true
true true false
x = 0
```

**Remember**

* `=` assigns; `==` compares. `if (a = 5)` is a classic bug.
* **Short-circuit:** in `A && B`, if `A` is false, `B` is **not evaluated**. In `A || B`, if `A` is true, `B` is skipped.
* `!` runs first, then `&&`, then `||`.
* Any non-zero value is true; `0` is false.
* Do not write `1 < x < 10`; write `x > 1 && x < 10`.
* Comparing floating-point numbers with `==` is unreliable.

---

## 3. Assignment & Increment/Decrement Operators (3.3)

**Core idea:** Compound assignment updates a variable in one step. `++` and `--` add or subtract 1.

| Operator | Same as | Operator | Same as |
| --- | --- | --- | --- |
| `x += 3` | `x = x + 3` | `x *= 3` | `x = x * 3` |
| `x -= 3` | `x = x - 3` | `x /= 3` | `x = x / 3` |
| `x %= 3` | `x = x % 3` | `x++` / `++x` | add 1 |

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    x += 5;
    x *= 2;
    cout << x << "\n";

    int n = 5;
    int a = n++;
    cout << a << " " << n << "\n";

    int m = 5;
    int b = ++m;
    cout << b << " " << m << "\n";
    return 0;
}
```

```output
30
5 6
6 6
```

| Form | Name | Meaning |
| --- | --- | --- |
| `x++` | Postfix | Use the **old** value, then add 1 |
| `++x` | Prefix | Add 1, then use the **new** value |

**Remember**

* `x++` alone and `++x` alone do the same thing; they differ only inside an expression.
* Do not modify a variable twice in one expression (`x = x++ + ++x` is undefined).
* `a = b = 5;` works: assignment goes **right to left**.
* In loops, `++i` can be slightly faster for class types.

---

## 4. Bitwise & Conditional Operators (3.4)

**Core idea:** **Bitwise** operators work on the **binary digits** of integers. The **conditional (ternary)** operator is a one-line `if-else`.

| Operator | Name | `5` (0101) and `3` (0011) |
| --- | --- | --- |
| `&` | AND | `5 & 3` = `1` |
| `\|` | OR | `5 \| 3` = `7` |
| `^` | XOR | `5 ^ 3` = `6` |
| `~` | NOT | `~5` = `-6` |
| `<<` | Left shift | `5 << 1` = `10` |
| `>>` | Right shift | `5 >> 1` = `2` |

```cpp
#include <iostream>
#include <bitset>
using namespace std;

int main() {
    int a = 5, b = 3;

    cout << (a & b) << " " << (a | b) << " " << (a ^ b) << " " << (~a) << "\n";
    cout << (a << 1) << " " << (a >> 1) << "\n";
    cout << bitset<8>(a) << "\n";

    cout << ((a & 1) ? "odd" : "even") << "\n";
    int max = (a > b) ? a : b;
    cout << "max = " << max << "\n";
    return 0;
}
```

```output
1 7 6 -6
10 2
00000101
odd
max = 5
```

```text
condition ? value_if_true : value_if_false
```

**Remember**

* `x << n` multiplies by `2^n`; `x >> n` divides by `2^n`.
* `n & 1` is `1` for odd numbers.
* `n & (n - 1) == 0` (with `n > 0`) means `n` is a power of two.
* `&` is bitwise; `&&` is logical. Do not mix them up.
* The ternary operator is the only operator with **three** operands.

---

## 5. Operator Precedence & Expressions (3.5)

**Core idea:** **Precedence** decides which operator runs first; **associativity** decides the order for operators of equal precedence. When unsure, use **parentheses**.

| Priority (high to low) | Operators | Associativity |
| --- | --- | --- |
| 1 | `( )` | Left to right |
| 2 | `++ --` (postfix), `! ~`, unary `+ -`, prefix `++ --` | Right to left |
| 3 | `* / %` | Left to right |
| 4 | `+ -` | Left to right |
| 5 | `<< >>` | Left to right |
| 6 | `< <= > >=` | Left to right |
| 7 | `== !=` | Left to right |
| 8 | `&` then `^` then `\|` | Left to right |
| 9 | `&&` then `\|\|` | Left to right |
| 10 | `? :` and assignments `= += -=` | Right to left |

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << 2 + 3 * 4 << " " << (2 + 3) * 4 << "\n";
    cout << 10 - 4 - 3 << "\n";

    int a, b;
    a = b = 5;
    cout << a << " " << b << "\n";

    bool r = !false && false || true;
    cout << r << "\n";

    cout << (5 + 3 * 2 - 8 / 4) << "\n";
    return 0;
}
```

```output
14 20
3
5 5
1
9
```

**Remember**

* `*`, `/`, `%` come before `+`, `-`.
* `10 - 4 - 3` is `(10 - 4) - 3` (left to right).
* `&&` has higher precedence than `||`.
* Comparison runs before `&&` and `||`, so `a > 1 && b < 5` needs no parentheses.
* Bitwise `&` has **lower** precedence than `==`: write `(n & 1) == 0`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Even number | `n % 2 == 0` |
| Last digit / drop it | `n % 10` / `n /= 10` |
| True decimal division | `static_cast<double>(a) / b` |
| Range check | `x >= 1 && x <= 10` |
| Increase by 1 | `x++;` or `x += 1;` |
| Swap using XOR | `a ^= b; b ^= a; a ^= b;` |
| Double a number | `x << 1` |
| Larger of two | `(a > b) ? a : b` |
| Power / square root | `pow(a, b)` / `sqrt(a)` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `if (a = 5)` | `if (a == 5)` |
| Integer division `1 / 2` is `0` | `1.0 / 2` |
| `%` with decimals | Use `fmod()` |
| `1 < x < 10` | `x > 1 && x < 10` |
| Modifying a variable twice in one expression | Split into separate statements |
| Mixing up `&` and `&&` | `&&` for conditions |
| `n & 1 == 0` | `(n & 1) == 0` |
| Relying on side effects in `&&` / `\|\|` | Remember short-circuiting |
| Comparing `double` with `==` | Compare the difference with a small value |
| `x++` vs `++x` confusion | Postfix returns the old value |

---

## Last-Minute Checklist

* I know integer division truncates and `%` gives the remainder.
* I know the result of a comparison is `true` or `false`.
* I understand short-circuit evaluation.
* I can explain `x++` vs `++x`.
* I can use `& | ^ ~ << >>` and the ternary operator.
* I can evaluate an expression using precedence.

---

## Quiz: Rapid Fire 🧠

1. What is `-7 / 2` in C++ with integers?

- [ ] `-4`
- [x] `-3`
- [ ] `-3.5`
- [ ] `3`

2. In `A && B`, when is `B` not evaluated?

- [ ] When `A` is true
- [x] When `A` is false
- [ ] Never
- [ ] When `B` is a constant

3. If `n = 5`, what does `int a = n++;` store in `a`?

- [ ] `6`
- [x] `5`
- [ ] `4`
- [ ] `0`

4. What does `5 << 1` equal?

- [ ] `2`
- [ ] `6`
- [x] `10`
- [ ] `25`

5. Which operator has the highest precedence here: `+`, `*`, `==`, `&&`?

- [ ] `+`
- [x] `*`
- [ ] `==`
- [ ] `&&`

6. What does `(a > b) ? a : b` give?

- [ ] The smaller value
- [x] The larger value
- [ ] `true` or `false`
- [ ] Always `a`
