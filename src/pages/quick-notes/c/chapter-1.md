# Quick Notes: Chapter 1 - Introduction to C

> **10-minute revision.** Know what C is, how a program becomes an executable, the parts of every C program, and how to compile and run your first one.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 1.1 | What is Programming & C? | Programs are instructions; C is a fast, compiled, general-purpose language |
| 1.2 | Features & Applications | Fast, portable, structured, close to hardware; used for systems and embedded work |
| 1.3 | Setting Up C Environment | Install a compiler (`gcc`) and an editor; compile with `gcc file.c -o name` |
| 1.4 | Structure of a C Program | `#include`, `main()`, statements, `return 0;` |
| 1.5 | Your First C Program | `printf("Hello, World!\n");` |

---

## 1. What is Programming & C? (1.1)

**Core idea:** **Programming** means giving a computer step-by-step instructions. **C** is a language for writing those instructions.

* Created by **Dennis Ritchie** at **Bell Labs** in **1972** to build the **UNIX** operating system.
* C is a **compiled** language: a compiler translates the whole program into machine code.
* Called a **middle-level** language: high-level readability with low-level hardware access.
* Many languages (C++, Java, C#, JavaScript syntax) borrow ideas from C.

**Programming steps**

| Step | Meaning |
| --- | --- |
| Problem | Understand what must be solved |
| Algorithm | Step-by-step plan (in plain words) |
| Flowchart | The plan drawn as a diagram |
| Code | The plan written in C |
| Test and debug | Run it and fix mistakes |

**From source code to a running program**

```text
hello.c ──▶ Preprocessor ──▶ Compiler ──▶ Assembler ──▶ Linker ──▶ hello (executable)
 source      (#include)      (to assembly)  (to object)   (adds libraries)
```

**Remember**

* Source file extension: **`.c`**. Executable: `a.out` (Linux/Mac) or `.exe` (Windows).
* Compile **errors** stop the build; **warnings** do not, but read them.
* C is **case-sensitive**: `main` and `Main` are different.

---

## 2. Features & Applications of C (1.2)

**Core idea:** C is small, fast and powerful. That is why it still powers the software that other software runs on.

| Feature | Meaning |
| --- | --- |
| Fast | Compiles to machine code; very little overhead |
| Portable | The same code compiles on many systems |
| Structured | Programs are divided into functions |
| Low-level access | Pointers and direct memory handling |
| Small and simple | About 32 keywords |
| Rich library | `printf`, `scanf`, math and string functions |
| Extensible | You can add your own functions and libraries |

**Where C is used**

| Area | Examples |
| --- | --- |
| Operating systems | UNIX, Linux kernel, parts of Windows |
| Embedded systems | Microcontrollers, cars, appliances |
| Compilers and tools | Interpreters, text editors |
| Databases | MySQL, PostgreSQL |
| Drivers and hardware | Printers, network cards |
| Games and graphics | Game engines (performance parts) |

**Remember**

* C gives **power and responsibility**: no automatic memory management and few safety checks.
* Learning C makes every other language easier to understand.

---

## 3. Setting Up C Environment (1.3)

**Core idea:** You need a **compiler** (turns code into a program) and an **editor** (to write code).

| Tool | Purpose |
| --- | --- |
| `gcc` (GNU Compiler Collection) | Compiles C programs |
| VS Code / Code::Blocks / Dev-C++ | Editors and IDEs |
| Terminal | Compile and run commands |
| Online compilers | Quick practice with no setup |

**Compile and run (Linux / Mac)**

```text
gcc --version              check the compiler is installed
gcc hello.c -o hello       compile hello.c into a program named hello
./hello                    run it
```

**Compile and run (Windows)**

```text
gcc hello.c -o hello.exe
hello.exe
```

**Useful compiler options**

| Option | Meaning |
| --- | --- |
| `-o name` | Name of the output program |
| `-Wall` | Show all common warnings |
| `-std=c11` | Use the C11 standard |

**Remember**

* Save the file **before** compiling.
* If `gcc` is not found, the compiler is missing or not in the system `PATH`.
* Always compile with `-Wall` while learning.

---

## 4. Structure of a C Program (1.4)

**Core idea:** Every C program has the same basic skeleton.

```c
#include <stdio.h>

int main(void) {
    int a = 5, b = 3;
    int sum = a + b;

    printf("Sum = %d\n", sum);
    return 0;
}
```

```output
Sum = 8
```

| Part | Role |
| --- | --- |
| `#include <stdio.h>` | Preprocessor line: brings in input/output functions |
| `int main(void)` | The **starting point** of every C program |
| `{ }` | Braces mark the body of a block |
| `int a = 5, b = 3;` | Declarations (create variables) |
| `printf(...)` | A statement that prints |
| `return 0;` | Tells the system the program ended successfully |
| `;` | Ends each statement |

**Comments**

```c
#include <stdio.h>

int main(void) {
    // single-line comment
    /* multi-line
       comment */
    printf("Comments are ignored\n");
    return 0;
}
```

```output
Comments are ignored
```

**Remember**

* Execution **always starts at `main()`** and runs **top to bottom**.
* Header files: `stdio.h` (input/output), `math.h` (maths), `string.h` (strings), `stdlib.h` (utilities).
* `<header.h>` is a **system** header; `"file.h"` is **your own** header.
* Indent code inside braces to keep it readable.

---

## 5. Your First C Program (1.5)

**Core idea:** `printf()` prints text on the screen.

```c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    printf("Welcome to C programming\n");
    printf("She said \"Hi\"\n");
    printf("Path: C:\\files\n");
    return 0;
}
```

```output
Hello, World!
Welcome to C programming
She said "Hi"
Path: C:\files
```

**Escape sequences**

| Sequence | Meaning |
| --- | --- |
| `\n` | New line |
| `\t` | Tab |
| `\"` | Double quote |
| `\\` | Backslash |
| `%%` | A percent sign (inside `printf`) |

**Common compile errors**

| Message | Likely cause |
| --- | --- |
| `expected ';' before ...` | Missing semicolon |
| `'printf' undeclared` | Missing `#include <stdio.h>` |
| `undefined reference to 'main'` | No `main` function |
| `unterminated string` | Missing closing quote |

**Remember**

* Text goes inside **double quotes** `" "`.
* `\n` moves to the next line; without it the output stays on one line.
* Read the **first** error message and its line number.

---

## Cheat Sheet

| Need | Code or command |
| --- | --- |
| Basic program | `#include <stdio.h>` + `int main(void) { return 0; }` |
| Print text | `printf("Hello\n");` |
| Single-line comment | `// note` |
| Multi-line comment | `/* note */` |
| Compile | `gcc file.c -o name` |
| Compile with warnings | `gcc -Wall file.c -o name` |
| Run (Linux / Mac) | `./name` |
| Run (Windows) | `name.exe` |
| New line / tab | `\n` / `\t` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Missing `;` at the end of a statement | Add it |
| Forgetting `#include <stdio.h>` | Add it above `main` |
| Writing `Main()` or `PRINTF()` | C is case-sensitive: `main`, `printf` |
| Single quotes for text: `'Hello'` | Use double quotes: `"Hello"` |
| Forgetting `\n` | Add it so the output moves to a new line |
| Running the `.c` file directly | Compile first, then run the executable |
| Ignoring warnings | Compile with `-Wall` and fix them |
| Forgetting to save | Save before compiling |

---

## Last-Minute Checklist

* I know C was created by Dennis Ritchie in 1972.
* I can explain compile, link and run.
* I can list 4 features and 4 uses of C.
* I can compile a file with `gcc` and run it.
* I can write the skeleton: `#include`, `main`, statements, `return 0;`.
* I know `\n`, `\t`, `\"` and `\\`.

---

## Quiz: Rapid Fire

1. Who created the C language?

- [ ] Bjarne Stroustrup
- [x] Dennis Ritchie
- [ ] James Gosling
- [ ] Guido van Rossum

2. Where does execution of a C program begin?

- [ ] The first `#include`
- [ ] The first function written
- [x] The `main()` function
- [ ] The last line

3. Which command compiles `hello.c` into a program called `hello`?

- [ ] `run hello.c`
- [ ] `gcc hello`
- [x] `gcc hello.c -o hello`
- [ ] `compile hello.c hello`

4. What does `#include <stdio.h>` do?

- [x] Brings in the standard input and output functions
- [ ] Starts the program
- [ ] Prints a message
- [ ] Declares a variable

5. Which escape sequence prints a new line?

- [ ] `\t`
- [ ] `\\`
- [x] `\n`
- [ ] `\"`

6. What does `return 0;` in `main` mean?

- [ ] The program has an error
- [ ] The program prints zero
- [x] The program ended successfully
- [ ] The program restarts
