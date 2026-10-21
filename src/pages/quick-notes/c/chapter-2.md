# Quick Notes: Chapter 2 - C Basics

> **15-minute revision.** Learn the building blocks: names, variables, data types, `printf`/`scanf` and type conversion. Memorize the format specifier table.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 2.1 | Keywords, Identifiers & Comments | Reserved words, naming rules and comments |
| 2.2 | Variables & Constants | Named memory; `const` and `#define` for fixed values |
| 2.3 | Data Types | `int`, `float`, `double`, `char`, modifiers and `sizeof` |
| 2.4 | Input & Output | `printf` with format specifiers; `scanf` with `&` |
| 2.5 | Type Conversion | Implicit promotion and explicit casting |

---

## 1. Keywords, Identifiers & Comments (2.1)

**Core idea:** **Keywords** are reserved words. **Identifiers** are names you create.

C has **32 keywords** (C89), such as:

| Group | Keywords |
| --- | --- |
| Data types | `int` `float` `double` `char` `void` `short` `long` `signed` `unsigned` |
| Decisions | `if` `else` `switch` `case` `default` |
| Loops | `for` `while` `do` `break` `continue` `goto` |
| Other | `return` `const` `sizeof` `struct` `union` `enum` `typedef` `static` `extern` `auto` `register` `volatile` |

**Identifier rules**

| Rule | Valid | Invalid |
| --- | --- | --- |
| Letters, digits and `_` only | `total_marks`, `age2` | `total-marks`, `age 2` |
| Cannot start with a digit | `_count`, `num1` | `1num` |
| Cannot be a keyword | `value` | `int`, `return` |
| Case-sensitive | `Age` and `age` differ | |

```c
#include <stdio.h>

int main(void) {
    // single-line comment
    int total_marks = 450; /* multi-line style
                              inline comment */
    printf("%d\n", total_marks);
    return 0;
}
```

```output
450
```

**Remember**

* All keywords are **lowercase**.
* Use meaningful names: `total_price`, not `x1`.
* Comments are removed by the compiler and never run.
* C comments do not nest: `/* /* */ */` is an error.

---

## 2. Variables & Constants (2.2)

**Core idea:** A **variable** is a named place in memory. A **constant** never changes.

```c
#include <stdio.h>

#define PI 3.14159

int main(void) {
    int age = 20;
    const int MAX = 100;
    float price = 99.5f;
    char grade = 'A';

    age = age + 1;

    printf("%d %d %.1f %c %.2f\n", age, MAX, price, grade, PI);
    return 0;
}
```

```output
21 100 99.5 A 3.14
```

| Idea | Syntax |
| --- | --- |
| Declare | `int age;` |
| Declare and initialize | `int age = 20;` |
| Several of one type | `int a = 1, b = 2;` |
| Constant (typed) | `const int MAX = 100;` |
| Constant (macro) | `#define PI 3.14159` (no `=` and no `;`) |

| Literal | Example |
| --- | --- |
| Integer | `42`, `-7` |
| Float | `3.14f` |
| Double | `3.14` |
| Character | `'A'` (single quotes) |
| String | `"Hello"` (double quotes) |

**Remember**

* An uninitialized local variable holds a **garbage value**. Always initialize it.
* Variable names must be declared **before** use.
* `const` variables cannot be changed; trying to do so is a compile error.
* `#define` is replaced by the preprocessor before compiling; it has no type.

---

## 3. Data Types (2.3)

**Core idea:** The **data type** decides what a variable can store and how much memory it uses.

| Type | Stores | Typical size | Format |
| --- | --- | --- | --- |
| `char` | One character | 1 byte | `%c` |
| `int` | Whole number | 4 bytes | `%d` |
| `float` | Decimal (about 6 digits) | 4 bytes | `%f` |
| `double` | Decimal (about 15 digits) | 8 bytes | `%lf` (scan), `%f` (print) |
| `short` | Small integer | 2 bytes | `%hd` |
| `long` | Large integer | 4 or 8 bytes | `%ld` |
| `long long` | Very large integer | 8 bytes | `%lld` |
| `unsigned int` | Only 0 and positive | 4 bytes | `%u` |

```c
#include <stdio.h>

int main(void) {
    printf("%zu %zu %zu %zu %zu\n",
           sizeof(char), sizeof(int), sizeof(float), sizeof(double), sizeof(long long));
    return 0;
}
```

```output
1 4 4 8 8
```

* Sizes above are typical for modern 64-bit systems; `sizeof` gives the real size.
* **Modifiers:** `signed`, `unsigned`, `short`, `long` change the range.
* A `char` is stored as a number (its ASCII code): `'A'` is `65`.
* C has no built-in `bool` before C99; use `int` (0 = false) or `<stdbool.h>`.

**Remember**

* Use `float`/`double` for decimals, `int` for counting.
* `double` is more precise than `float`.
* `sizeof` returns a `size_t`; print it with `%zu`.

---

## 4. Input & Output (2.4)

**Core idea:** `printf` shows output. `scanf` reads input. Format specifiers tell them the type.

| Specifier | Type |
| --- | --- |
| `%d` | `int` |
| `%f` | `float` / `double` (print) |
| `%lf` | `double` (**scan**) |
| `%c` | `char` |
| `%s` | String |
| `%u` | `unsigned int` |
| `%ld` / `%lld` | `long` / `long long` |
| `%x` | Hexadecimal |
| `%%` | Prints `%` |

**Formatting output**

```c
#include <stdio.h>

int main(void) {
    printf("%5d|%-5d|%05d|%.3f|%c|%s\n", 42, 42, 42, 3.14159, 'Z', "C");
    return 0;
}
```

```output
   42|42   |00042|3.142|Z|C
```

| Format | Meaning |
| --- | --- |
| `%5d` | Width 5, right-aligned |
| `%-5d` | Width 5, left-aligned |
| `%05d` | Pad with zeros |
| `%.2f` | Two digits after the decimal point |

**Reading input**

```c
#include <stdio.h>

int main(void) {
    int age;
    float height;

    printf("Enter age and height: ");
    scanf("%d %f", &age, &height);

    printf("Age: %d, Height: %.1f\n", age, height);
    return 0;
}
```

If the user enters:

`20 5.6`

```output
Enter age and height: Age: 20, Height: 5.6
```

| Function | Use |
| --- | --- |
| `scanf("%d", &n)` | Read formatted input |
| `getchar()` / `putchar(c)` | Read / print one character |
| `fgets(str, size, stdin)` | Read a full line safely |

**Remember**

* `scanf` needs the **address** of the variable: `&age`. (Not for strings: `scanf("%s", name)`.)
* `scanf("%s")` stops at the first space; use `fgets` for full lines.
* A mismatched specifier gives wrong output (`%d` with a `float`).
* Never use `gets()`; it is unsafe and removed from modern C.

---

## 5. Type Conversion (2.5)

**Core idea:** Converting one type to another. **Implicit** happens automatically; **explicit** (casting) is written by you.

```c
#include <stdio.h>

int main(void) {
    int a = 7, b = 2;

    printf("%d\n", a / b);
    printf("%.2f\n", (float)a / b);
    printf("%.2f\n", (float)(a / b));
    printf("%d %f\n", (int)3.9, (double)5 / 2);
    return 0;
}
```

```output
3
3.50
3.00
3 2.500000
```

**Character arithmetic**

```c
#include <stdio.h>

int main(void) {
    char c = 'A';

    printf("%c %d %c\n", c + 1, c + 1, c + 32);
    return 0;
}
```

```output
B 66 a
```

| Rule | Example |
| --- | --- |
| Smaller types are **promoted** to larger | `char`, `short` to `int` |
| In mixed math, the **larger** type wins | `int + float` gives `float` |
| Order: `int` to `long` to `float` to `double` | |
| Assigning a decimal to an `int` **drops** the fraction | `int x = 3.9;` gives `3` |
| Cast syntax | `(type)expression` |

**Remember**

* `7 / 2` is `3` because both are `int`. Cast **one** operand: `(float)7 / 2`.
* Cast **before** dividing: `(float)(a / b)` is too late.
* Lowercase = uppercase + 32 in ASCII (`'a' - 'A' == 32`).
* Casting does not change the variable itself, only the value in that expression.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Integer | `int n = 10;` |
| Decimal | `float f = 2.5f;` / `double d = 2.5;` |
| Character | `char c = 'A';` |
| Constant | `const int MAX = 5;` / `#define MAX 5` |
| Size of a type | `sizeof(int)` |
| Print 2 decimals | `printf("%.2f", x);` |
| Read an integer | `scanf("%d", &n);` |
| Read a double | `scanf("%lf", &d);` |
| Read a line | `fgets(s, sizeof s, stdin);` |
| Decimal division | `(float)a / b` |
| ASCII value | `printf("%d", 'A');` gives `65` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `scanf("%d", n)` (no `&`) | `scanf("%d", &n)` |
| `7 / 2` gives `3` | `7 / 2.0` or `(float)7 / 2` |
| Using a variable before assigning | Initialize it |
| `%d` for a `float` | Use `%f` |
| `scanf("%f", &d)` for a `double` | Use `%lf` |
| `scanf("%s")` for a sentence | Use `fgets` |
| Using a keyword as a name | Pick another name |
| `'Hello'` for a string | `"Hello"` |
| `#define PI = 3.14;` | `#define PI 3.14` |
| Assuming `int` is always 4 bytes | Check with `sizeof` |

---

## Last-Minute Checklist

* I know the identifier rules and that C has 32 keywords.
* I can declare, initialize and print variables.
* I know `const` vs `#define`.
* I can list `char`, `int`, `float`, `double` with sizes and specifiers.
* I use `&` with `scanf` for numbers and characters.
* I can explain why `7 / 2` is `3` and fix it with a cast.

---

## Quiz: Rapid Fire

1. Which is a valid identifier?

- [ ] `2total`
- [ ] `total-marks`
- [x] `total_marks`
- [ ] `int`

2. Which format specifier prints an `int`?

- [ ] `%f`
- [ ] `%c`
- [x] `%d`
- [ ] `%s`

3. What does `printf("%d", 7 / 2);` print?

- [ ] `3.5`
- [x] `3`
- [ ] `4`
- [ ] `2`

4. Why does `scanf("%d", &n)` use `&`?

- [ ] To print the value
- [ ] To convert it to a float
- [x] It needs the address of the variable to store the value
- [ ] It marks a comment

5. How do you write the constant `PI` as a macro?

- [ ] `#define PI = 3.14;`
- [x] `#define PI 3.14`
- [ ] `define PI 3.14;`
- [ ] `#const PI 3.14`

6. What does `(float)a / b` do?

- [ ] Converts `b` only to an integer
- [ ] Rounds the result
- [x] Converts `a` to float first, so the division keeps decimals
- [ ] Prints a float
