# Quick Notes: Chapter 2 - C++ Basics

> **15-minute revision.** Variables store data, each with a **type**. Know the basic types and their sizes, `const`, `cin`/`cout`, implicit and explicit type conversion, and the basic syntax rules.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 2.1 | Variables & Constants | Named storage; `const` makes it read-only |
| 2.2 | Data Types | `int`, `double`, `char`, `bool`, `string` and their sizes |
| 2.3 | Input & Output | `cout <<` and `cin >>`; `getline` for full lines |
| 2.4 | Type Conversion | Implicit promotion and explicit `static_cast` |
| 2.5 | Comments & Basic Syntax | `//`, `/* */`, semicolons, case-sensitivity |

---

## 1. Variables & Constants (2.1)

**Core idea:** A **variable** is a named memory location with a type. A **constant** cannot change after initialization.

```text
type name = value;     // copy initialization
type name{value};      // brace initialization (checks narrowing)
auto name = value;     // the compiler deduces the type
const type NAME = value;
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 20;
    double price = 99.5;
    const double PI = 3.14159;
    auto count = 42;
    int a{5};

    cout << age << " " << price << " " << PI << "\n";
    cout << count << " " << a << "\n";

    age = 21;
    cout << age << "\n";
    return 0;
}
```

```output
20 99.5 3.14159
42 5
21
```

| Rule for names | Valid | Invalid |
| --- | --- | --- |
| Letters, digits, `_` | `total_1`, `_x` | `my-var`, `my var` |
| Cannot start with a digit | `item1` | `1item` |
| Not a keyword | `count` | `int`, `class` |
| Case-sensitive | `Age` and `age` differ | |

**Remember**

* A `const` **must** be initialized when declared.
* Prefer `const` (or `constexpr`) over `#define` for constants.
* Initialize every variable; an uninitialized local variable holds **garbage**.
* Use meaningful names (`totalMarks`, not `tm`).

---

## 2. Data Types (2.2)

**Core idea:** The type decides **what values** a variable can hold and **how much memory** it uses.

| Type | Holds | Typical size |
| --- | --- | --- |
| `bool` | `true` or `false` | 1 byte |
| `char` | One character | 1 byte |
| `short` / `int` | Whole numbers | 2 / 4 bytes |
| `long` / `long long` | Larger whole numbers | 8 / 8 bytes (64-bit Linux) |
| `float` | Decimal, about 7 digits | 4 bytes |
| `double` | Decimal, about 15 digits | 8 bytes |
| `std::string` | Text | Grows as needed |

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "int: " << sizeof(int) << ", double: " << sizeof(double)
         << ", char: " << sizeof(char) << ", bool: " << sizeof(bool) << "\n";

    bool ok = true;
    cout << ok << " " << boolalpha << ok << "\n";

    char c = 'A';
    cout << c << " " << (int)c << " " << (char)(c + 1) << "\n";

    string name = "Asha";
    cout << name << " has " << name.length() << " letters\n";
    return 0;
}
```

```output
int: 4, double: 8, char: 1, bool: 1
1 true
A 65 B
Asha has 4 letters
```

**Remember**

* Sizes depend on the system; use `sizeof(type)` to check.
* `bool` prints `1` or `0` unless you use `boolalpha`.
* A `char` is stored as a number (ASCII): `'A'` is `65`.
* `signed` / `unsigned` change the range: `unsigned int` has no negative values.
* Use `double` instead of `float` unless memory is tight.
* Single quotes `'A'` = character; double quotes `"A"` = string.

---

## 3. Input & Output (2.3)

**Core idea:** `cout << x` **prints**, `cin >> x` **reads**. `getline` reads a **whole line** including spaces.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;

    cout << "Enter name and age: ";
    cin >> name >> age;
    cout << "Hello, " << name << "! Next year you will be " << age + 1 << ".\n";
    return 0;
}
```

If the user enters:

```text
Asha 20
```

The output will be:

```output
Enter name and age: Asha 20
Hello, Asha! Next year you will be 21.
```

**Formatting output** (needs `<iomanip>`)

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double pi = 3.14159;

    cout << pi << "\n";
    cout << fixed << setprecision(2) << pi << "\n";
    cout << setw(6) << 42 << "|" << "\n";
    return 0;
}
```

```output
3.14159
3.14
    42|
```

| Tool | Purpose |
| --- | --- |
| `cin >> x` | Reads one value; stops at whitespace |
| `getline(cin, s)` | Reads a full line into a `string` |
| `cin.ignore()` | Discards the leftover newline after `cin >>` |
| `setprecision(n)` with `fixed` | `n` digits after the decimal point |
| `setw(n)` | Minimum field width |

**Remember**

* `cin >>` uses `>>` (extraction); `cout` uses `<<` (insertion).
* No `&` before the variable in `cin`, unlike `scanf`.
* After `cin >> number`, call `cin.ignore();` before `getline`.
* `\n` and `endl` both start a new line.

---

## 4. Type Conversion (2.4)

**Core idea:** C++ converts types **automatically** (implicit) or when you ask (explicit **cast**).

| Kind | Example | Result |
| --- | --- | --- |
| Implicit (promotion) | `5 + 2.5` | `7.5` (`int` becomes `double`) |
| Implicit (narrowing) | `int x = 3.9;` | `3` (decimal part is lost) |
| Explicit (C++ style) | `static_cast<double>(a)` | Preferred |
| Explicit (C style) | `(double)a` | Works, but avoid |

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int a = 7, b = 2;

    cout << a / b << "\n";
    cout << static_cast<double>(a) / b << "\n";
    cout << 5 + 2.5 << "\n";

    int x = 3.9;
    cout << x << "\n";

    string s = "123";
    int n = stoi(s) + 1;
    cout << n << " " << to_string(45) + "!" << "\n";
    return 0;
}
```

```output
3
3.5
7.5
3
124 45!
```

**Remember**

* Integer ÷ integer is **integer division**: `7 / 2` is `3`.
* Cast **before** dividing: `static_cast<double>(a) / b`.
* Conversion order: `int` → `long` → `float` → `double`.
* `stoi`, `stod` convert text to numbers; `to_string` converts numbers to text.
* Brace initialization `int x{3.9};` is a **compile error** (it blocks narrowing).

---

## 5. Comments & Basic Syntax (2.5)

**Core idea:** Comments are notes for humans; the compiler ignores them. Syntax rules decide whether the compiler accepts your code.

```cpp
#include <iostream>
using namespace std;

// Single-line comment: calculates the area
int main() {
    /* Multi-line comment:
       length and width are in meters */
    int length = 5, width = 4;   // one line, two variables
    cout << "Area = " << length * width << "\n";
    cout << "Tab:\tDone\n";
    cout << "Quote: \"C++\"\n";
    return 0;
}
```

```output
Area = 20
Tab:	Done
Quote: "C++"
```

| Syntax rule | Detail |
| --- | --- |
| Statements | End with `;` |
| Blocks | Grouped with `{ }` |
| Case-sensitive | `Main` is not `main` |
| Whitespace | Extra spaces and blank lines are ignored |
| Strings | Double quotes `"..."` |
| Characters | Single quotes `'a'` |

| Escape | Meaning |
| --- | --- |
| `\n` | New line |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double quote |

**Remember**

* `/* */` comments **cannot be nested**.
* Comment the **why**, not the obvious **what**.
* Keywords (`int`, `class`, `return`) cannot be used as names.
* Indent code inside `{ }` for readability.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Variable | `int age = 20;` |
| Constant | `const double PI = 3.14;` |
| Deduce the type | `auto x = 5;` |
| Size of a type | `sizeof(int)` |
| Read | `cin >> x;` |
| Read a line | `getline(cin, s);` |
| 2 decimals | `cout << fixed << setprecision(2) << x;` |
| Cast | `static_cast<double>(a)` |
| Text to int | `stoi("42")` |
| Number to text | `to_string(42)` |
| Print `true` / `false` | `cout << boolalpha << flag;` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Using an uninitialized variable | Give it a value |
| `7 / 2` expected as `3.5` | `7 / 2.0` or a cast |
| `cin >> n;` then `getline` skips input | Add `cin.ignore();` |
| `"A"` instead of `'A'` for a char | Single quotes for characters |
| Changing a `const` | Remove `const` or do not change it |
| `cin >> &x` | Write `cin >> x` |
| Forgetting `<string>` or `<iomanip>` | Include the header |
| Name starting with a digit | Rename it |
| `int x{3.9};` | Use `static_cast<int>(3.9)` |

---

## Last-Minute Checklist

* I can declare, initialize and print variables.
* I know `const` and `auto`.
* I know the basic types and can use `sizeof`.
* I can read with `cin` and `getline`.
* I can format decimals with `fixed` and `setprecision`.
* I can cast with `static_cast` and avoid integer division mistakes.
* I know the comment styles and syntax rules.

---

## Quiz: Rapid Fire

1. What is `7 / 2` when both are `int`?

- [ ] `3.5`
- [x] `3`
- [ ] `4`
- [ ] `2`

2. Which header is needed for `setprecision`?

- [ ] `<string>`
- [ ] `<cmath>`
- [x] `<iomanip>`
- [ ] `<cstdio>`

3. Which statement reads a full line into a string `s`?

- [ ] `cin >> s;`
- [x] `getline(cin, s);`
- [ ] `cout >> s;`
- [ ] `scanf("%s", s);`

4. What does `auto x = 5.5;` make `x`?

- [ ] `int`
- [ ] `float`
- [x] `double`
- [ ] `string`

5. What is the preferred C++ cast?

- [ ] `(int)x`
- [x] `static_cast<int>(x)`
- [ ] `int(x)` only
- [ ] `cast(x)`

6. What must a `const` variable have?

- [ ] A type of `int`
- [x] An initial value
- [ ] A capital name
- [ ] A pointer
