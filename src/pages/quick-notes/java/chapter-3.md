# Quick Notes: Chapter 3 - Operators

> **10-minute revision.** Know the arithmetic, assignment, relational and logical operators, how `++` and `--` behave, how to write a ternary expression, and which operator runs first.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 3.1 | Arithmetic and Assignment Operators | `+ - * / %` calculate; `=` and `+=` style operators store |
| 3.2 | Relational and Logical Operators | Compare with `== != > <`; combine with `&&`, `\|\|` and `!` |
| 3.3 | Increment and Decrement Operators | `++` and `--` change a value by 1; prefix vs postfix |
| 3.4 | Ternary Operator | `condition ? valueIfTrue : valueIfFalse` |
| 3.5 | Operator Precedence | Which operator runs first, and left-to-right vs right-to-left |

---

## 1. Arithmetic and Assignment Operators (3.1)

**Core idea:** Arithmetic operators calculate. Assignment operators store the result in a variable.

```java
public class Main {
    public static void main(String[] args) {
        int a = 17, b = 5;
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);
        System.out.println(a % b);
        System.out.println((double) a / b);
    }
}
```

```output
22
12
85
3
2
3.4
```

| Operator | Name | Example | Result |
| --- | --- | --- | --- |
| `+` | Addition | `17 + 5` | `22` |
| `-` | Subtraction | `17 - 5` | `12` |
| `*` | Multiplication | `17 * 5` | `85` |
| `/` | Division | `17 / 5` | `3` (both are `int`) |
| `%` | Remainder | `17 % 5` | `2` |

**Compound assignment**

```java
public class Main {
    public static void main(String[] args) {
        int x = 10;
        x += 5;
        System.out.println(x);
        x -= 3;
        System.out.println(x);
        x *= 2;
        System.out.println(x);
        x /= 4;
        System.out.println(x);
        x %= 4;
        System.out.println(x);
    }
}
```

```output
15
12
24
6
2
```

| Operator | Same as |
| --- | --- |
| `x += 5` | `x = x + 5` |
| `x -= 5` | `x = x - 5` |
| `x *= 5` | `x = x * 5` |
| `x /= 5` | `x = x / 5` |
| `x %= 5` | `x = x % 5` |

**Special cases**

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(5.0 / 0);
        System.out.println(0.0 / 0);
        System.out.println(-7 % 3);
        System.out.println(7 % -3);
    }
}
```

```output
Infinity
NaN
-1
1
```

**Remember**

* `int / int` gives an **`int`** (decimals are dropped).
* `%` takes the **sign of the left number**: `-7 % 3` is `-1`.
* `5 / 0` with `int` throws **`ArithmeticException: / by zero`**. With `double` you get `Infinity`.
* `+` with a `String` joins text: `"Age: " + 20` gives `Age: 20`.

---

## 2. Relational and Logical Operators (3.2)

**Core idea:** Relational operators compare two values. Logical operators combine conditions. Both give a `boolean`.

```java
public class Main {
    public static void main(String[] args) {
        int age = 22;
        boolean hasId = true;

        System.out.println(age > 18);
        System.out.println(age == 30);
        System.out.println(age != 30);
        System.out.println(age >= 18 && hasId);
        System.out.println(age < 18 || hasId);
        System.out.println(!hasId);
    }
}
```

```output
true
false
true
true
true
false
```

| Operator | Meaning |
| --- | --- |
| `==` | Equal to |
| `!=` | Not equal to |
| `>` `<` | Greater than, less than |
| `>=` `<=` | Greater or equal, less or equal |
| `&&` | AND: true only if **both** are true |
| `\|\|` | OR: true if **at least one** is true |
| `!` | NOT: reverses the value |

**Short-circuit evaluation**

```java
public class Main {
    public static void main(String[] args) {
        int a = 10, b = 0;
        if (b != 0 && a / b > 1) {
            System.out.println("Big");
        } else {
            System.out.println("Safe: no division by zero");
        }
    }
}
```

```output
Safe: no division by zero
```

With `&&`, if the left side is `false`, Java **skips** the right side. With `||`, if the left side is `true`, Java skips the right side.

**Comparing strings**

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = new String("Java");
        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
    }
}
```

```output
false
true
```

**Remember**

* `=` assigns. `==` compares.
* Use **`.equals()`** to compare strings, not `==`.
* You cannot chain comparisons: write `x > 1 && x < 10`, not `1 < x < 10`.
* `&&` and `||` use short-circuit evaluation. Java has no `and` or `or` keywords.

---

## 3. Increment and Decrement Operators (3.3)

**Core idea:** `++` adds 1 and `--` subtracts 1. **Prefix** changes first. **Postfix** uses the old value first.

```java
public class Main {
    public static void main(String[] args) {
        int x = 5;
        int a = x++;
        System.out.println("a = " + a + ", x = " + x);
        int b = ++x;
        System.out.println("b = " + b + ", x = " + x);
    }
}
```

```output
a = 5, x = 6
b = 7, x = 7
```

| Form | Name | What happens |
| --- | --- | --- |
| `x++` | Post-increment | Use `x`, **then** add 1 |
| `++x` | Pre-increment | Add 1, **then** use `x` |
| `x--` | Post-decrement | Use `x`, **then** subtract 1 |
| `--x` | Pre-decrement | Subtract 1, **then** use `x` |

**A tricky expression**

```java
public class Main {
    public static void main(String[] args) {
        int i = 5;
        int r = i++ + ++i;
        System.out.println("r = " + r + ", i = " + i);
    }
}
```

```output
r = 12, i = 7
```

Step by step: `i++` gives 5 (then `i` becomes 6), `++i` makes `i` 7 and gives 7, so `5 + 7 = 12`.

**Remember**

* On its own line, `i++;` and `++i;` do the same thing.
* The difference only shows when the value is **used** in the same statement.
* Avoid mixing several `++` in one expression. It is hard to read.

---

## 4. Ternary Operator (3.4)

**Core idea:** The ternary operator is a short `if-else` that gives a value.

```text
result = condition ? valueIfTrue : valueIfFalse;
```

```java
public class Main {
    public static void main(String[] args) {
        int a = 15, b = 9;
        int max = (a > b) ? a : b;
        System.out.println("Max = " + max);

        int n = 7;
        String type = (n % 2 == 0) ? "Even" : "Odd";
        System.out.println(n + " is " + type);

        int marks = 72;
        String grade = marks >= 90 ? "A" : marks >= 60 ? "B" : "C";
        System.out.println("Grade: " + grade);
    }
}
```

```output
Max = 15
7 is Odd
Grade: B
```

| `if-else` | Ternary |
| --- | --- |
| `if (a > b) max = a; else max = b;` | `max = (a > b) ? a : b;` |

**Remember**

* It is the only Java operator with **three operands**.
* Both result values should be compatible types.
* Nesting works, but more than one level is hard to read. Use `if-else` instead.
* The ternary expression **gives a value**, so use it on the right side of `=` or inside `println`.

---

## 5. Operator Precedence (3.5)

**Core idea:** When an expression has many operators, Java follows a fixed order. Brackets override it.

| Priority | Operators | Direction |
| --- | --- | --- |
| 1 (highest) | `( )` `[ ]` `.` | Left to right |
| 2 | Postfix `x++` `x--` | Left to right |
| 3 | Prefix `++x` `--x`, unary `+` `-`, `!` | Right to left |
| 4 | `*` `/` `%` | Left to right |
| 5 | `+` `-` | Left to right |
| 6 | `<` `<=` `>` `>=` | Left to right |
| 7 | `==` `!=` | Left to right |
| 8 | `&&` | Left to right |
| 9 | `\|\|` | Left to right |
| 10 | `? :` | Right to left |
| 11 (lowest) | `=` `+=` `-=` `*=` `/=` `%=` | Right to left |

Shift and bitwise operators sit between `+ -` and `&&`.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(2 + 3 * 4);
        System.out.println((2 + 3) * 4);
        System.out.println(10 - 4 - 3);
        System.out.println(10 / 3 * 3);
        System.out.println(true || false && false);
        System.out.println(1 + 2 + "3");
        System.out.println("1" + 2 + 3);
        int p, q;
        p = q = 5;
        System.out.println(p + q);
    }
}
```

```output
14
20
3
9
true
33
123
10
```

**Remember**

* `*` `/` `%` run before `+` `-`. `&&` runs before `||`.
* Same priority: **left to right**, except assignment, ternary and prefix operators.
* In `1 + 2 + "3"` the numbers add first (`3`), then join with the text: `"33"`.
* When unsure, **use brackets**. They also make code easier to read.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Remainder | `a % b` |
| Keep the decimals | `(double) a / b` |
| Add and store | `x += 5;` |
| Add 1 | `x++;` |
| Even check | `n % 2 == 0` |
| Both true | `a > 1 && b > 1` |
| Either true | `a > 1 \|\| b > 1` |
| Opposite | `!flag` |
| Pick a value | `(a > b) ? a : b` |
| Compare strings | `s1.equals(s2)` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `if (x = 5)` | Use `==` to compare |
| `7 / 2` expected as `3.5` | Use `7 / 2.0` or cast |
| Comparing strings with `==` | Use `.equals()` |
| `1 < x < 10` | Write `x > 1 && x < 10` |
| Mixing `++` in a bigger expression | Put `x++;` on its own line |
| `1 + 2 + "3"` not giving `123` | Numbers add first; use brackets or text first |
| `/ by zero` crash with `int` | Check the divisor before dividing |
| Expecting `x++` to return the new value | Use `++x` when you need the new value |

---

## Last-Minute Checklist

* I can use `+ - * / %` and know what `int / int` gives.
* I can write `+=`, `-=`, `*=`, `/=` and `%=`.
* I can combine conditions with `&&`, `||` and `!`.
* I know the difference between `x++` and `++x`.
* I can write a ternary expression.
* I can read an expression using the precedence table.

---

## Quiz: Rapid Fire

1. What is the value of `17 % 5`?

- [ ] `3`
- [ ] `3.4`
- [x] `2`
- [ ] `5`

2. Which operator checks if two numbers are equal?

- [ ] `=`
- [x] `==`
- [ ] `:=`
- [ ] `equals`

3. What is `x` after `int x = 5; x++;`?

- [ ] `5`
- [x] `6`
- [ ] `4`
- [ ] `55`

4. What does `b` hold after `int a = 5; int b = a++;`?

- [x] `5`
- [ ] `6`
- [ ] `4`
- [ ] `10`

5. What does `2 + 3 * 4` evaluate to?

- [ ] `20`
- [ ] `24`
- [x] `14`
- [ ] `10`

6. Which expression is the ternary operator?

- [ ] `a > b`
- [ ] `a++ + b`
- [x] `a > b ? a : b`
- [ ] `a && b`
