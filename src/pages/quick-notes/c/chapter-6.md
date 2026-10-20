# Quick Notes: Chapter 6 - Functions

> **15-minute revision.** A function is a named, reusable block of code. Know the three parts (declaration, definition, call), that C passes arguments **by value**, the four function types, and the two ingredients of recursion.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 6.1 | Introduction to Functions | Reusable named blocks; `main()` is a function too |
| 6.2 | Declaration, Definition & Calling | Prototype tells, definition does, call runs |
| 6.3 | Parameters & Return Values | Arguments are **copied**; `return` sends one value back |
| 6.4 | Types of Functions | With or without arguments, with or without a return value |
| 6.5 | Recursion & Scope of Variables | A function calling itself; local, global and static variables |

---

## 1. Introduction to Functions (6.1)

**Core idea:** A **function** is a block of code with a name. Write it once, call it many times.

| Kind | Meaning | Example |
| --- | --- | --- |
| Library function | Already written for you | `printf()`, `strlen()`, `sqrt()` |
| User-defined function | You write it | `greet()`, `add()` |

```c
#include <stdio.h>

void greet(void) {
    printf("Hello from a function\n");
}

int main(void) {
    greet();
    greet();
    return 0;
}
```

```output
Hello from a function
Hello from a function
```

**Remember**

* Execution **always starts** in `main()`.
* Functions give **reusability**, **modularity** and easier **debugging**.
* One function = one job.
* A function runs only when it is **called**.

---

## 2. Declaration, Definition & Calling (6.2)

**Core idea:** Three parts: the **declaration** (prototype) announces the function, the **definition** contains the code, and the **call** runs it.

```text
return_type function_name(parameter_list);      // declaration (prototype)

return_type function_name(parameter_list) {     // definition
    // body
}

function_name(arguments);                       // call
```

```c
#include <stdio.h>

int add(int a, int b);

int main(void) {
    int r = add(4, 5);
    printf("Sum = %d\n", r);
    return 0;
}

int add(int a, int b) {
    return a + b;
}
```

```output
Sum = 9
```

| Part | Ends with | Has a body? |
| --- | --- | --- |
| Declaration (prototype) | `;` | No |
| Definition | `}` | Yes |
| Call | `;` | No |

**Remember**

* The prototype lets you call a function **before** its definition.
* If you define the function **above** `main()`, no prototype is needed.
* The call must match the prototype: same **number**, **order** and **types** of arguments.
* Parameter names in a prototype are optional: `int add(int, int);`.

---

## 3. Parameters & Return Values (6.3)

**Core idea:** Values you pass are called **arguments** (actual). The variables that receive them are **parameters** (formal). C uses **call by value**: the function works on a **copy**.

```c
#include <stdio.h>

void change(int x) {
    x = 99;
}

int main(void) {
    int n = 5;
    change(n);
    printf("n = %d\n", n);
    return 0;
}
```

```output
n = 5
```

The original `n` is unchanged. A function sends one value back with `return`.

```c
#include <stdio.h>

int max(int a, int b) {
    return (a > b) ? a : b;
}

int main(void) {
    printf("Max = %d\n", max(4, 9));
    return 0;
}
```

```output
Max = 9
```

| Term | Where | Example |
| --- | --- | --- |
| Actual argument | In the **call** | `max(4, 9)` |
| Formal parameter | In the **definition** | `int a, int b` |
| Return type | Before the name | `int`, `float`, `void` |

**Remember**

* `return` **ends** the function immediately.
* A function can return **only one** value (use pointers or arrays for more; see Chapter 9).
* `void` means "returns nothing" (or "takes nothing" in the parameter list).
* To really change the caller's variable, pass its **address** (pointers, Chapter 9).

---

## 4. Types of Functions (6.4)

**Core idea:** Functions fall into four groups, depending on arguments and return value.

| Type | Arguments | Return value | Example |
| --- | --- | --- | --- |
| 1 | No | No | `void hello(void)` |
| 2 | Yes | No | `void square(int n)` |
| 3 | No | Yes | `int readFive(void)` |
| 4 | Yes | Yes | `int cube(int n)` |

```c
#include <stdio.h>

void hello(void) {
    printf("Hello\n");
}

void square(int n) {
    printf("Square = %d\n", n * n);
}

int readFive(void) {
    return 5;
}

int cube(int n) {
    return n * n * n;
}

int main(void) {
    hello();
    square(4);
    int v = readFive();
    printf("Value = %d\n", v);
    printf("Cube = %d\n", cube(3));
    return 0;
}
```

```output
Hello
Square = 16
Value = 5
Cube = 27
```

**Remember**

* Type 4 (arguments **and** return value) is the most useful and the most reusable.
* Functions that only print are harder to reuse than functions that **return** results.
* Library functions need their header: `<stdio.h>`, `<string.h>`, `<math.h>`, `<stdlib.h>`.

---

## 5. Recursion & Scope of Variables (6.5)

**Core idea:** **Recursion** means a function calls **itself**. It needs a **base case** (stops the calls) and a **recursive case** (a smaller version of the problem).

```c
#include <stdio.h>

unsigned long fact(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * fact(n - 1);
}

int main(void) {
    printf("5! = %lu\n", fact(5));
    return 0;
}
```

```output
5! = 120
```

```text
fact(3) = 3 * fact(2)
        = 3 * (2 * fact(1))
        = 3 * (2 * 1) = 6
```

**Scope** decides where a variable can be used. **Storage** decides how long it lives.

| Variable | Declared | Visible in | Lives |
| --- | --- | --- | --- |
| Local | Inside a function or block | That block only | Until the block ends |
| Global | Outside all functions | The whole file | Whole program |
| `static` local | Inside a function with `static` | That function only | Whole program (keeps its value) |

```c
#include <stdio.h>

int g = 10;

void showGlobal(void) {
    printf("global g = %d\n", g);
}

void counter(void) {
    static int c = 0;
    c++;
    printf("c = %d\n", c);
}

int main(void) {
    int g = 5;
    printf("local g = %d\n", g);
    showGlobal();
    counter();
    counter();
    return 0;
}
```

```output
local g = 5
global g = 10
c = 1
c = 2
```

**Remember**

* No base case = infinite recursion = **stack overflow**.
* Every recursive call must move **toward** the base case.
* A local variable **hides** a global with the same name.
* A `static` local is initialized **once** and remembers its value between calls.
* Uninitialized local variables hold **garbage**; globals start at **0**.
* Recursion is elegant but uses more memory than a loop.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Prototype | `int add(int a, int b);` |
| Function with no input and no output | `void show(void) { ... }` |
| Return a value | `return a + b;` |
| Call and store the result | `int r = add(2, 3);` |
| Base case of recursion | `if (n <= 1) return 1;` |
| Recursive factorial | `return n * fact(n - 1);` |
| Keep a value between calls | `static int count = 0;` |
| Global variable | Declare it above all functions |
| Library headers | `<stdio.h>`, `<string.h>`, `<math.h>`, `<stdlib.h>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Calling a function before it is declared | Add a prototype or define it above `main()` |
| Forgetting `;` after a prototype | `int add(int, int);` |
| Adding `;` after a definition header | `int add(int a, int b) { ... }` |
| Expecting `change(n)` to modify `n` | C passes copies; use pointers |
| Missing `return` in a non-void function | Always return a value |
| Missing base case in recursion | Add a stopping condition first |
| Wrong argument order or count | Match the prototype |
| Using a local variable outside its function | Return it or make it global |
| Factorial overflow with `int` | Use `unsigned long` or `long long` |
| Using `void main()` | Write `int main(void)` |

---

## Last-Minute Checklist

* I can write a prototype, a definition and a call.
* I know C uses **call by value**.
* I can name the four types of functions.
* I know `return` ends a function and returns one value.
* I can write a recursive function with a base case.
* I know the difference between local, global and `static` variables.
* I know execution starts at `main()`.

---

## Quiz: Rapid Fire 🧠

1. What does a function prototype end with?

- [ ] A colon
- [ ] A comma
- [x] A semicolon
- [ ] Nothing

2. In C, arguments are passed by:

- [ ] Reference
- [x] Value
- [ ] Name
- [ ] Address only

3. What stops a recursive function?

- [ ] The `break` statement
- [ ] A loop
- [x] The base case
- [ ] The `main()` function

4. Which variable keeps its value between function calls?

- [ ] A local variable
- [ ] A parameter
- [x] A `static` local variable
- [ ] A `register` variable

5. What does `void` as a return type mean?

- [ ] Returns `0`
- [x] Returns nothing
- [ ] Returns any type
- [ ] Returns a string

6. Where does program execution always begin?

- [ ] At the first function defined
- [ ] At the prototype
- [x] At `main()`
- [ ] At `#include`
