# Quick Notes: Chapter 1 - Introduction to C++

> **15-minute revision.** C++ is a fast, compiled language that adds **objects, references, templates and the STL** to C. Know its history and features, how it differs from C, how to compile with `g++`, and the anatomy of a first program.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 1.1 | What is C++? | Created by Bjarne Stroustrup; "C with Classes" grew into C++ |
| 1.2 | Features of C++ | OOP, speed, STL, templates, memory control |
| 1.3 | C++ vs C | C++ = C + classes, references, overloading, `std::string`, STL |
| 1.4 | Setting Up Your C++ Environment | Compiler (`g++`) + editor; compile, then run |
| 1.5 | Your First C++ Program | `#include <iostream>`, `main()`, `cout` |

---

## 1. What is C++? (1.1)

**Core idea:** C++ is a **general-purpose, compiled** language created by **Bjarne Stroustrup** at Bell Labs. He began in **1979** with "C with Classes" and renamed it **C++** in **1983**.

| Standard | Year | Highlights |
| --- | --- | --- |
| C++98 / C++03 | 1998 / 2003 | First ISO standard, STL |
| C++11 | 2011 | `auto`, lambdas, `nullptr`, smart pointers, range-based `for` |
| C++14 / C++17 | 2014 / 2017 | Refinements, `if` with initializer, structured bindings |
| C++20 | 2020 | Concepts, ranges, modules |
| C++23 | 2023 | Further library and language additions |

```text
source.cpp -> preprocessor -> compiler -> assembler -> linker -> executable
```

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}
```

```output
Hello, C++!
```

**Remember**

* The `++` in the name is the **increment operator**: "one step beyond C".
* C++ is **compiled**: the whole program is translated to machine code before it runs.
* Used for games, operating systems, browsers, databases, embedded systems and finance.
* A new standard appears about every **three years**; this course uses C++17 features.

---

## 2. Features of C++ (1.2)

**Core idea:** C++ combines **high-level** features (objects, templates) with **low-level** control (pointers, memory).

| Feature | Meaning |
| --- | --- |
| Object-oriented | Classes, objects, inheritance, polymorphism, encapsulation |
| Compiled and fast | Runs close to the hardware |
| Multi-paradigm | Procedural, object-oriented and generic programming |
| STL | Ready-made containers (`vector`, `map`) and algorithms (`sort`) |
| Templates | One piece of code works with many types |
| Strongly typed | Types are checked at compile time |
| Memory control | Manual (`new`/`delete`) or automatic (smart pointers) |
| Portable | Runs on Windows, Linux and macOS (recompile for each) |

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 8, 1};
    std::sort(v.begin(), v.end());

    for (int x : v) {
        std::cout << x << " ";
    }
    std::cout << "\n";
    return 0;
}
```

```output
1 2 5 8
```

**Remember**

* The STL saves you from writing sorting and list code yourself.
* "Zero-overhead": you do not pay for features you do not use.
* C++ gives power **and** responsibility (no automatic bounds checks).

---

## 3. C++ vs C (1.3)

**Core idea:** C++ is **almost** a superset of C. It keeps C's speed and adds object-oriented and generic programming.

| Feature | C | C++ |
| --- | --- | --- |
| Paradigm | Procedural | Procedural + object-oriented + generic |
| Output / input | `printf` / `scanf` | `cout` / `cin` |
| Memory | `malloc` / `free` | `new` / `delete`, smart pointers |
| Strings | `char[]` | `std::string` |
| Pass by reference | Pointers only | References (`int &x`) |
| Function overloading | Not allowed | Allowed |
| Classes and objects | No (only `struct`) | Yes |
| Namespaces | No | Yes (`std::`) |
| Boolean type | `_Bool` (C99) | `bool` (built in) |
| Headers | `<stdio.h>` | `<iostream>`, `<cstdio>` |
| File extension | `.c` | `.cpp` |

```cpp
#include <cstdio>
#include <iostream>

int main() {
    printf("C style: %d\n", 10);
    std::cout << "C++ style: " << 10 << "\n";
    return 0;
}
```

```output
C style: 10
C++ style: 10
```

**Remember**

* C code mostly compiles as C++, but not the other way round.
* `cout` needs no format specifiers such as `%d`.
* C++ is **stricter**: for example, it does not convert `void *` to other pointers implicitly.
* Both languages are fast; C++ adds structure for big programs.

---

## 4. Setting Up Your C++ Environment (1.4)

**Core idea:** You need a **compiler** to build the program and an **editor** to write it.

| Tool | Examples |
| --- | --- |
| Compiler | `g++` (GCC), `clang++`, MSVC |
| Editor / IDE | VS Code, Code::Blocks, CLion, Visual Studio |
| Windows | Install MinGW-w64 (or Visual Studio) |
| macOS | `xcode-select --install` |
| Linux | `sudo apt install g++` |

| Compiler option | Meaning |
| --- | --- |
| `-std=c++17` | Use the C++17 standard |
| `-Wall -Wextra` | Show warnings |
| `-g` | Add debug information |
| `-o name` | Name of the output program |

```bash
g++ --version
g++ -std=c++17 -Wall first.cpp -o first
./first
```

```output
Hello, World!
```

**Remember**

* Save files with the **`.cpp`** extension.
* Compile first, then run (`./first` on Linux/macOS, `first.exe` on Windows).
* Read the **first** compiler error first; the rest are often side effects.
* Online compilers work too if you do not want to install anything.

---

## 5. Your First C++ Program (1.5)

**Core idea:** Every program has a `main()` function. Output uses `cout` from `<iostream>`.

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    cout << "Welcome to C++" << '\n';
    cout << "Sum = " << 5 + 3 << "\n";
    return 0;
}
```

```output
Hello, World!
Welcome to C++
Sum = 8
```

| Part | Meaning |
| --- | --- |
| `#include <iostream>` | Loads the input/output library |
| `using namespace std;` | Lets you write `cout` instead of `std::cout` |
| `int main()` | The starting point of every program |
| `cout << ...` | Prints to the screen; `<<` is the insertion operator |
| `endl` or `'\n'` | New line (`endl` also flushes the buffer) |
| `return 0;` | Tells the system the program finished successfully |
| `;` | Ends every statement |

**Remember**

* `<<` chains many values: `cout << "a" << 5 << "\n";`.
* `return 0;` is optional in `main()` (it is assumed), but good practice.
* Prefer `'\n'` for speed; use `endl` when you need to flush.
* In big programs avoid `using namespace std;` and write `std::cout`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Include I/O | `#include <iostream>` |
| Print | `std::cout << "Hi" << std::endl;` |
| Use `std` names directly | `using namespace std;` |
| Entry point | `int main() { ... return 0; }` |
| Compile | `g++ -std=c++17 file.cpp -o file` |
| Run | `./file` |
| Comment | `// line` and `/* block */` |
| New line | `'\n'` or `endl` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `cout` without `std::` or `using` | Write `std::cout` or add `using namespace std;` |
| Forgetting `#include <iostream>` | Add the include |
| Missing `;` | End every statement with `;` |
| `Cout` or `Main` (wrong case) | C++ is case-sensitive: `cout`, `main` |
| Using `>>` with `cout` | Use `<<` for output, `>>` for `cin` |
| Saving as `.c` instead of `.cpp` | Use the `.cpp` extension |
| Running before compiling | Compile first |
| Writing `void main()` | Write `int main()` |

---

## Last-Minute Checklist

* I know who created C++ and what it adds to C.
* I can list five features of C++.
* I can compare C and C++ in a table.
* I can compile and run a program with `g++`.
* I can explain every line of a Hello World program.
* I know `<<` is for `cout`.

---

## Quiz: Rapid Fire 🧠

1. Who created C++?

- [ ] Dennis Ritchie
- [x] Bjarne Stroustrup
- [ ] James Gosling
- [ ] Guido van Rossum

2. What was C++ originally called?

- [ ] C Plus
- [x] C with Classes
- [ ] Object C
- [ ] Simple C

3. Which object prints output in C++?

- [ ] `cin`
- [x] `cout`
- [ ] `printf` only
- [ ] `print`

4. Which feature does C++ have that C does not?

- [ ] Functions
- [ ] Pointers
- [x] Classes and objects
- [ ] Loops

5. Which command compiles `first.cpp` into a program named `first`?

- [ ] `run first.cpp`
- [x] `g++ first.cpp -o first`
- [ ] `cpp first`
- [ ] `compile first`

6. What does `<<` do in `cout << "Hi";`?

- [ ] Shifts bits left
- [x] Inserts data into the output stream
- [ ] Compares values
- [ ] Reads input
