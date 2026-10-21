# Quick Notes: Chapter 6 - Functions

> **15-minute revision.** A function is a named, reusable block of code. Know declaration, definition and call, **pass by value vs by reference**, default arguments, **function overloading**, recursion and variable scope.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 6.1 | Introduction to Functions | Reusable named blocks; `main()` is a function too |
| 6.2 | Declaration, Definition & Calling | Prototype announces, definition has the code, call runs it |
| 6.3 | Parameters & Return Values | By value, by reference, `const &`, default arguments |
| 6.4 | Function Overloading | Same name, different parameter lists |
| 6.5 | Recursion & Scope | A function calling itself; local, global, `static` |

---

## 1. Introduction to Functions (6.1)

**Core idea:** A **function** is a named block of code. Write it once, call it many times.

| Kind | Example |
| --- | --- |
| Library function | `sqrt()`, `abs()`, `getline()` |
| User-defined function | `greet()`, `add()` |

```cpp
#include <iostream>
using namespace std;

void greet() {
    cout << "Hello from a function\n";
}

int main() {
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

## 2. Function Declaration, Definition & Calling (6.2)

**Core idea:** The **declaration** (prototype) announces the function, the **definition** contains the code, and the **call** runs it.

```text
return_type name(parameters);        // declaration (prototype)
return_type name(parameters) { ... } // definition
name(arguments);                     // call
```

```cpp
#include <iostream>
using namespace std;

int add(int a, int b);

int main() {
    int r = add(4, 5);
    cout << "Sum = " << r << "\n";
    return 0;
}

int add(int a, int b) {
    return a + b;
}
```

```output
Sum = 9
```

**Remember**

* The prototype lets you call a function **before** its definition.
* If you define the function above `main()`, no prototype is needed.
* The call must match: same **number**, **order** and **types** of arguments.
* `void` return type means "returns nothing".
* Prototypes usually go in header files (`.h`), definitions in `.cpp` files.

---

## 3. Parameters & Return Values (6.3)

**Core idea:** C++ can pass arguments **by value** (a copy) or **by reference** (the original). Parameters can have **default values**.

| Style | Syntax | Effect |
| --- | --- | --- |
| By value | `void f(int x)` | Works on a **copy** |
| By reference | `void f(int &x)` | Changes the **original** |
| By `const` reference | `void f(const string &s)` | No copy, no changes |
| Default argument | `int f(int a, int b = 2)` | `b` is optional |

```cpp
#include <iostream>
using namespace std;

void change(int x) {
    x = 99;
}

void swapValues(int &a, int &b) {
    int t = a;
    a = b;
    b = t;
}

int power(int base, int exp = 2) {
    int result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int main() {
    int n = 5;
    change(n);
    cout << "n = " << n << "\n";

    int x = 5, y = 10;
    swapValues(x, y);
    cout << "x = " << x << ", y = " << y << "\n";

    cout << power(5) << " " << power(2, 3) << "\n";
    return 0;
}
```

```output
n = 5
x = 10, y = 5
25 8
```

**Remember**

* By value: the original is **unchanged**. By reference: the original **changes**.
* Use `const &` for large objects (`string`, `vector`) you only read.
* Default arguments go **from the right**: `f(int a, int b = 2)` is valid, `f(int a = 1, int b)` is not.
* Give defaults in the **declaration**, not again in the definition.
* `return` ends the function and sends back one value.

---

## 4. Function Overloading (6.4)

**Core idea:** Several functions can share **one name** if their **parameter lists differ** (number or types). The compiler picks the best match.

```cpp
#include <iostream>
#include <string>
using namespace std;

int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

void show(int n) {
    cout << "int: " << n << "\n";
}

void show(const string &s) {
    cout << "string: " << s << "\n";
}

int main() {
    cout << add(2, 3) << " " << add(1.5, 2.5) << " " << add(1, 2, 3) << "\n";
    show(7);
    show("C++");
    return 0;
}
```

```output
5 4 6
int: 7
string: C++
```

| Allowed | Not allowed |
| --- | --- |
| Different number of parameters | Different **return type only** |
| Different parameter types | Different parameter **names only** |
| Different order of types | |

**Remember**

* Overloading is **compile-time polymorphism**.
* `int f(int)` and `double f(int)` cannot coexist: the return type does not count.
* An ambiguous call (for example `add(1, 2.5)` when several overloads fit) is a **compile error**.
* Overloading plus default arguments can cause ambiguity; avoid mixing carelessly.

---

## 5. Recursion & Scope (6.5)

**Core idea:** **Recursion** means a function calls **itself**. It needs a **base case** (stops) and a **recursive case** (smaller problem). **Scope** decides where a variable is visible.

```cpp
#include <iostream>
using namespace std;

int x = 100;

long long fact(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * fact(n - 1);
}

int fib(int n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

void counter() {
    static int c = 0;
    c++;
    cout << "c = " << c << "\n";
}

int main() {
    cout << "5! = " << fact(5) << "\n";

    for (int i = 0; i < 8; i++) {
        cout << fib(i) << " ";
    }
    cout << "\n";

    int x = 5;
    cout << "local x = " << x << ", global x = " << ::x << "\n";

    counter();
    counter();
    return 0;
}
```

```output
5! = 120
0 1 1 2 3 5 8 13
local x = 5, global x = 100
c = 1
c = 2
```

| Variable | Declared | Visible in | Lives |
| --- | --- | --- | --- |
| Local | Inside a function or block | That block only | Until the block ends |
| Global | Outside all functions | The whole file | Whole program |
| `static` local | Inside a function with `static` | That function only | Whole program |

**Remember**

* No base case = infinite recursion = **stack overflow**.
* Each call must move **toward** the base case.
* `::x` reaches the **global** `x` when a local `x` hides it.
* A `static` local is initialized **once** and keeps its value.
* Simple `fib` is slow for large `n`; use a loop or caching.
* Avoid global variables; pass values through parameters.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Prototype | `int add(int a, int b);` |
| No return value | `void show() { ... }` |
| Pass by reference | `void swap(int &a, int &b)` |
| Read-only, no copy | `void f(const string &s)` |
| Default argument | `int power(int b, int e = 2)` |
| Overload | `int add(int, int);` and `double add(double, double);` |
| Recursive base case | `if (n <= 1) return 1;` |
| Keep a value between calls | `static int count = 0;` |
| Global from a local clash | `::name` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Calling before declaring | Add a prototype or define above `main()` |
| Expecting `change(n)` to modify `n` | Use `int &x` |
| Missing `return` in a non-void function | Always return a value |
| Missing base case | Add the stopping condition first |
| Overloads that differ only in return type | Change the parameters |
| Default argument not at the right end | Put defaults last |
| Defaults repeated in both prototype and definition | Only in the prototype |
| Returning a reference to a local variable | Return by value |
| Ambiguous overloaded call | Cast an argument |
| Factorial overflow with `int` | Use `long long` |

---

## Last-Minute Checklist

* I can write a prototype, definition and call.
* I know by value, by reference and `const &`.
* I can use default arguments.
* I can overload a function and know what is not allowed.
* I can write recursive factorial and Fibonacci.
* I know local, global and `static` variables and `::`.

---

## Quiz: Rapid Fire

1. How do you pass an argument so the function can change the original?

- [ ] `void f(int x)`
- [x] `void f(int &x)`
- [ ] `void f(const int x)`
- [ ] `void f(int *)` only

2. Which pair is a valid overload?

- [ ] `int f(int)` and `double f(int)`
- [x] `int f(int)` and `int f(int, int)`
- [ ] `void f()` and `int f()`
- [ ] `int f(int a)` and `int f(int b)`

3. Where must default arguments appear?

- [ ] On the left of the parameter list
- [x] On the right of the parameter list
- [ ] Only in `main()`
- [ ] Anywhere

4. What stops a recursive function?

- [ ] `continue`
- [ ] A loop
- [x] The base case
- [ ] `main()`

5. What does `::x` mean?

- [ ] A local `x`
- [x] The global `x`
- [ ] A static `x`
- [ ] A reference to `x`

6. Which variable keeps its value between calls?

- [ ] A normal local variable
- [ ] A parameter
- [x] A `static` local variable
- [ ] A reference
