# Quick Notes: Chapter 1 - Introduction to Python

> ⏱ **10-minute revision.** Python is a **high-level, interpreted, dynamically typed** language known for readable code. Know what it is, where it is used, how it differs from C++, how to install it, and how to run a first program.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 1.1 | What is Python? | A readable, interpreted, general-purpose language |
| 1.2 | Features & Applications | Simple, portable, huge libraries, used almost everywhere |
| 1.3 | Python vs C++ | Python is easier and shorter; C++ is faster and lower level |
| 1.4 | Installing Python | Install Python 3, check the version, pick an editor |
| 1.5 | Your First Program | `print()` displays output; save as `.py` and run |

---

## 1. What is Python? (1.1)

**Core idea:** **Python** is a high-level, general-purpose, interpreted language created by **Guido van Rossum** and first released in **1991**. Code is written in `.py` files and run by the **Python interpreter**.

| Fact | Detail |
| --- | --- |
| Creator | Guido van Rossum |
| First release | 1991 |
| Type | High-level, general-purpose, interpreted |
| Typing | Dynamic (no type declaration needed) |
| File extension | `.py` |
| Named after | Monty Python's Flying Circus (not the snake) |

```python
print("Hello, Python!")

x = 10
print(type(x))

x = "ten"
print(type(x))
```

```output
Hello, Python!
<class 'int'>
<class 'str'>
```

**Remember**

* Source code is compiled to **bytecode**, then run by the Python Virtual Machine.
* In **dynamic typing**, the type belongs to the **value**, not the variable.
* Python is **case-sensitive**: `name` and `Name` are different.
* **Indentation** (not braces) defines blocks of code.

---

## 2. Features & Applications (1.2)

**Core idea:** Python is popular because it is **simple, readable and versatile**, with a very large library ecosystem.

| Feature | Meaning |
| --- | --- |
| Easy to read | Close to plain English, short syntax |
| Interpreted | Runs line by line, no separate compile step |
| Dynamically typed | No need to declare variable types |
| Cross-platform | Same code runs on Windows, macOS and Linux |
| Large library | "Batteries included" standard library plus PyPI packages |
| Multi-paradigm | Procedural, object-oriented and functional styles |
| Free and open source | Large community support |

| Application area | Common tools |
| --- | --- |
| Web development | Django, Flask |
| Data science and AI | NumPy, pandas, scikit-learn, TensorFlow |
| Automation and scripting | os, shutil, requests |
| Game development | Pygame |
| Desktop apps | Tkinter |
| Networking and security | socket, scapy |

```python
import math

numbers = [4, 8, 15]
print(sum(numbers))
print(math.sqrt(16))
```

```output
27
4.0
```

**Remember**

* `import` brings in library code, such as the `math` module.
* `math.sqrt()` always returns a **float** (`4.0`, not `4`).
* Python trades some **speed** for **development time**.

---

## 3. Python vs C++ (1.3)

**Core idea:** Python is **interpreted and dynamically typed**; C++ is **compiled and statically typed**. Python needs less code, C++ runs faster.

| Feature | Python | C++ |
| --- | --- | --- |
| Execution | Interpreted | Compiled to machine code |
| Typing | Dynamic | Static (types are declared) |
| Syntax | Short, indentation-based | Longer, braces and semicolons |
| Speed | Slower | Much faster |
| Memory | Automatic (garbage collection) | Manual control (`new`, `delete`, pointers) |
| Best for | Scripting, data, AI, web, quick development | Systems, games, performance-critical software |
| Learning curve | Gentle | Steeper |

**Same program in both languages**

```python
for i in range(1, 4):
    print(i)
```

```output
1
2
3
```

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        cout << i << "\n";
    }
    return 0;
}
```

```output
1
2
3
```

**Remember**

* Python: **no** semicolons, no braces, no type declarations, no `main()` required.
* C++ needs headers, `main()` and a **compile** step before running.
* Many fast Python libraries (such as NumPy) are written in C or C++ underneath.

---

## 4. Installing Python & Setting Up (1.4)

**Core idea:** Install **Python 3** from python.org, tick **Add Python to PATH** on Windows, verify the version in a terminal, and use an editor such as **VS Code**.

| Step | Action |
| --- | --- |
| 1 | Download Python 3 from python.org |
| 2 | Run the installer and tick **Add Python to PATH** (Windows) |
| 3 | Verify the installation in a terminal |
| 4 | Install an editor: VS Code (with the Python extension), PyCharm or IDLE |
| 5 | Create a `.py` file and run it |

```text
python --version
python3 --version      # macOS and Linux
pip --version
python hello.py        # run a script
python                 # open the interactive shell (REPL)
```

```text
>>> 2 + 3
5
>>> print("Hi")
Hi
>>> exit()
```

| Mode | Use |
| --- | --- |
| **Script mode** | Save code in a `.py` file and run it all at once |
| **Interactive mode (REPL)** | Test one line at a time, see results instantly |

**Remember**

* The `>>>` symbol is the REPL prompt; do not type it in a script.
* On macOS and Linux, the command is often `python3`.
* `pip` is the package installer that comes with Python.

---

## 5. Your First Python Program (1.5)

**Core idea:** `print()` displays output. Python runs top to bottom, with no `main()` and no semicolons needed.

```python
# My first program
print("Hello, World!")
print("Python", "is", "fun")
print("A", "B", sep="-")
print("Hi", end=" ")
print("there")
print("Line1\nLine2")
```

```output
Hello, World!
Python is fun
A-B
Hi there
Line1
Line2
```

| `print()` option | Purpose | Default |
| --- | --- | --- |
| `sep` | Text placed between items | A space |
| `end` | Text placed after the output | A new line |

| Escape | Meaning |
| --- | --- |
| `\n` | New line |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double quote |

**Remember**

* Comments start with `#` and are ignored by Python.
* Strings can use single or double quotes: `'Hi'` or `"Hi"`.
* `Print("Hi")` is an error because Python is case-sensitive.
* Run a saved file with `python hello.py`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Check version | `python --version` |
| Run a script | `python hello.py` |
| Print text | `print("Hello")` |
| Print without a new line | `print("Hi", end="")` |
| Custom separator | `print("a", "b", sep="-")` |
| Comment | `# comment` |
| Check a type | `type(x)` |
| Import a module | `import math` |
| Exit the shell | `exit()` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Writing `Print("Hi")` | Python is case-sensitive: use `print` |
| Missing closing quote, `print("Hi)` | Match the quotes to avoid a `SyntaxError` |
| `python` not found in the terminal | Reinstall with **Add to PATH**, or try `python3` |
| Extra spaces at the start of a line | Causes `IndentationError`; align statements |
| Using Python 2 style `print "Hi"` | Use `print("Hi")` |
| Saving the file as `hello.py.txt` | Save with the `.py` extension |
| Naming your file `math.py` or `random.py` | Clashes with built-in modules; choose another name |
| Adding `;` and `{ }` like C++ | Not needed; use new lines and indentation |

---

## Last-Minute Checklist

* ✅ I can say what Python is and who created it.
* ✅ I can list five features and five applications of Python.
* ✅ I can compare Python and C++ on typing, speed and syntax.
* ✅ I can check the installed version and run a `.py` file.
* ✅ I can use `print()` with `sep` and `end`.

---

## Quiz: Rapid Fire 🧠

1. Who created Python?

- [ ] Dennis Ritchie
- [ ] James Gosling
- [x] Guido van Rossum
- [ ] Bjarne Stroustrup

2. Which file extension does a Python script use?

- [ ] `.pt`
- [ ] `.pyt`
- [x] `.py`
- [ ] `.python`

3. What does `print("A", "B", sep="-")` display?

- [ ] `A B`
- [x] `A-B`
- [ ] `AB-`
- [ ] `A,B`

4. Which statement about Python typing is true?

- [ ] Types must be declared before use
- [x] Types are checked at run time (dynamic typing)
- [ ] Variables cannot change type
- [ ] Python has no data types

5. Which language is usually faster?

- [ ] Python
- [x] C++
- [ ] They are always equal
- [ ] It depends only on the editor

6. What is the Python REPL used for?

- [ ] Compiling code to machine code
- [ ] Installing packages
- [x] Running one line at a time and seeing results instantly
- [ ] Saving programs
