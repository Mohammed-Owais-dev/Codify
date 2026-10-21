# Quick Notes: Chapter 6 - Files, Exceptions & Modules

> **20-minute revision.** Real programs **store data** (files, JSON, CSV), **handle errors** safely (exceptions), and are **split into modules** that use libraries installed with `pip`. Learn the `with open()` pattern, `try / except`, and the `import` styles.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 6.1 | File Handling | `with open()` to read, write and append text files |
| 6.2 | JSON & CSV | `json` for structured data, `csv` for tables |
| 6.3 | Exception Handling | `try / except / else / finally` and `raise` |
| 6.4 | Modules, Packages & import | Reuse code across files with `import` |
| 6.5 | pip & Libraries | Install third-party packages and use virtual environments |

---

## 1. File Handling (6.1)

**Core idea:** Open a file with `open(name, mode)`. Always use the **`with`** statement, which **closes the file automatically**, even if an error happens.

| Mode | Meaning | If the file does not exist |
| --- | --- | --- |
| `"r"` | Read (default) | `FileNotFoundError` |
| `"w"` | Write (**erases** old content) | Creates it |
| `"a"` | Append to the end | Creates it |
| `"x"` | Create only | Error if it already exists |
| `"r+"` | Read and write | `FileNotFoundError` |
| `"rb"`, `"wb"` | Binary read / write | Same as above |

```python
with open("notes.txt", "w") as f:
    f.write("Hello\n")
    f.write("World\n")

with open("notes.txt", "a") as f:
    f.write("Python\n")

with open("notes.txt", "r") as f:
    print(f.read(), end="")
```

```output
Hello
World
Python
```

```python
with open("notes.txt") as f:
    print(repr(f.readline()))
    for line in f:
        print(line.strip())

with open("notes.txt") as f:
    lines = f.readlines()
print(lines, len(lines))

import os
print(os.path.exists("notes.txt"))
os.remove("notes.txt")
print(os.path.exists("notes.txt"))
```

```output
'Hello\n'
World
Python
['Hello\n', 'World\n', 'Python\n']
3
True
False
```

| Method | Returns |
| --- | --- |
| `read()` | The whole file as one string |
| `readline()` | The next single line |
| `readlines()` | A list of all lines |
| `write(text)` | Writes a string (no automatic new line) |
| `writelines(list)` | Writes a list of strings |

**Remember**

* Looping `for line in f:` is the **best** way to read large files.
* `write()` does **not** add `\n`; you must add it yourself.
* `"w"` **erases** the file; use `"a"` to keep existing content.
* Use `line.strip()` to remove the trailing new line.

---

## 2. Working with JSON & CSV (6.2)

**Core idea:** **JSON** stores nested data (dictionaries and lists) as text. **CSV** stores rows and columns. Python has built-in `json` and `csv` modules.

```python
import json

data = {"name": "Asha", "age": 20, "skills": ["Python", "SQL"]}

text = json.dumps(data)
print(text)
print(json.dumps(data, indent=2))
back = json.loads(text)
print(back["skills"][0], type(back))
print(json.dumps({"ok": True, "v": None}))

with open("data.json", "w") as f:
    json.dump(data, f)
with open("data.json") as f:
    print(json.load(f) == data)
```

```output
{"name": "Asha", "age": 20, "skills": ["Python", "SQL"]}
{
  "name": "Asha",
  "age": 20,
  "skills": [
    "Python",
    "SQL"
  ]
}
Python <class 'dict'>
{"ok": true, "v": null}
True
```

| Function | Purpose |
| --- | --- |
| `json.dumps(obj)` | Python object to JSON **string** |
| `json.loads(text)` | JSON string to Python object |
| `json.dump(obj, file)` | Write JSON to a **file** |
| `json.load(file)` | Read JSON from a **file** |

| Python | JSON |
| --- | --- |
| `dict` | object |
| `list`, `tuple` | array |
| `str`, `int`, `float` | string, number |
| `True`, `False`, `None` | `true`, `false`, `null` |

```python
import csv

rows = [["name", "marks"], ["Asha", 90], ["Ravi", 85]]

with open("marks.csv", "w", newline="") as f:
    csv.writer(f).writerows(rows)

with open("marks.csv", newline="") as f:
    for row in csv.reader(f):
        print(row)

with open("marks.csv", newline="") as f:
    for row in csv.DictReader(f):
        print(row["name"], row["marks"])
```

```output
['name', 'marks']
['Asha', '90']
['Ravi', '85']
Asha 90
Ravi 85
```

**Remember**

* The **`s`** in `dumps` / `loads` means **string**; without it, the functions use a **file**.
* All CSV values are read back as **strings**; convert with `int()` or `float()`.
* Always open CSV files with `newline=""`.
* `DictReader` uses the first row as the dictionary keys.

---

## 3. Exception Handling (6.3)

**Core idea:** An **exception** is a run-time error. Wrap risky code in `try`, handle problems in `except`, and the program keeps running.

```python
try:
    n = int("abc")
except ValueError:
    print("Invalid number")

try:
    print(10 / 0)
except ZeroDivisionError as e:
    print("Error:", e)
else:
    print("no error")
finally:
    print("always runs")
```

```output
Invalid number
Error: division by zero
always runs
```

```text
try:
    risky code
except SomeError as e:
    handle it
else:
    runs only if no exception happened
finally:
    always runs (cleanup)
```

**Several handlers, `raise` and custom exceptions**

```python
def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Cannot divide by zero"
    except TypeError:
        return "Numbers only"

print(safe_div(10, 2))
print(safe_div(1, 0))
print(safe_div("a", 2))

class NegativeError(Exception):
    pass

def check(n):
    if n < 0:
        raise NegativeError("negative not allowed")
    return n

try:
    check(-1)
except NegativeError as e:
    print("Caught:", e)

try:
    open("missing.txt")
except FileNotFoundError:
    print("File missing")
```

```output
5.0
Cannot divide by zero
Numbers only
Caught: negative not allowed
File missing
```

| Exception | Typical cause |
| --- | --- |
| `ValueError` | Right type, wrong value: `int("abc")` |
| `TypeError` | Wrong type: `"5" + 3` |
| `ZeroDivisionError` | `10 / 0` |
| `IndexError` | `[1, 2][5]` |
| `KeyError` | `{"a": 1}["b"]` |
| `NameError` | Using a variable that does not exist |
| `FileNotFoundError` | Opening a missing file |
| `AttributeError` | `"abc".push()` |
| `ImportError` | Module not found |

**Remember**

* Put the **most specific** `except` first; `except Exception` catches almost everything.
* Avoid a bare `except:`; it hides real bugs.
* `finally` runs **whether or not** an error occurred, which is ideal for cleanup.
* `raise` creates an exception; a custom exception **inherits from `Exception`**.
* Catch several types together: `except (ValueError, TypeError):`.

---

## 4. Modules, Packages & import (6.4)

**Core idea:** A **module** is a `.py` file whose code you can reuse. A **package** is a **folder** of modules containing an `__init__.py` file.

```python
import math
from math import sqrt, pi
import random as rnd

print(math.sqrt(25), sqrt(16), round(pi, 2), rnd.randint(1, 1))
```

```output
5.0 4.0 3.14 1
```

| Import style | Use |
| --- | --- |
| `import math` | Use as `math.sqrt()` |
| `from math import sqrt` | Use as `sqrt()` directly |
| `import random as rnd` | Short alias: `rnd.randint()` |
| `from math import *` | Imports everything (avoid) |

**Your own module**

```text
# mymath.py
def add(a, b):
    return a + b

if __name__ == "__main__":
    print("running directly")
```

```python
# main.py (same folder)
import mymath

print(mymath.add(2, 3))
print(__name__)
```

```output
5
__main__
```

```text
shop/                  # package
├── __init__.py
├── cart.py
└── utils/
    ├── __init__.py
    └── helpers.py
```

```text
from shop.cart import add_item
from shop.utils.helpers import format_price
```

| Standard module | Used for |
| --- | --- |
| `math` | Mathematical functions |
| `random` | Random numbers |
| `datetime`, `time` | Dates and time |
| `os`, `sys` | Operating system and interpreter |
| `json`, `csv` | Data files |

**Remember**

* `if __name__ == "__main__":` runs code **only when the file is run directly**, not when imported.
* Do not name your file the same as a library (`random.py`, `math.py`).
* Python looks for modules in the current folder, then in `sys.path`.
* `dir(module)` lists names; `help(module)` shows documentation.

---

## 5. pip & Using Python Libraries (6.5)

**Core idea:** **pip** installs third-party packages from **PyPI**. A **virtual environment** keeps each project's packages separate.

```text
pip install requests              # install
pip install pandas==2.0.0         # install a specific version
pip install --upgrade requests    # upgrade
pip uninstall requests            # remove
pip list                          # show installed packages
pip show requests                 # details of one package
pip freeze > requirements.txt     # save the package list
pip install -r requirements.txt   # install everything from the list
```

```text
python -m venv venv               # create a virtual environment
venv\Scripts\activate             # activate on Windows
source venv/bin/activate          # activate on macOS and Linux
deactivate                        # leave the environment
```

```python
# after: pip install numpy
import numpy as np

arr = np.array([1, 2, 3])
print(arr * 2)
print(arr.mean())
```

```output
[2 4 6]
2.0
```

| Library | Purpose |
| --- | --- |
| `requests` | Call web APIs |
| `numpy` | Fast numeric arrays |
| `pandas` | Tables and data analysis |
| `matplotlib` | Charts and graphs |
| `flask`, `django` | Web applications |
| `pytest` | Testing |
| `beautifulsoup4` | Web scraping (`import bs4`) |

**Remember**

* The install name can differ from the import name: `pip install pillow`, then `import PIL`.
* Use `python -m pip install ...` if `pip` is not recognized.
* Create one virtual environment **per project** and share `requirements.txt`.
* Standard library modules (`math`, `json`) need **no** installation.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Read whole file | `with open("a.txt") as f: text = f.read()` |
| Write / append | `open("a.txt", "w")` / `open("a.txt", "a")` |
| Loop over lines | `for line in f:` |
| Check a file exists | `os.path.exists("a.txt")` |
| Object to JSON text | `json.dumps(obj)` |
| JSON file to object | `json.load(f)` |
| Write CSV rows | `csv.writer(f).writerows(rows)` |
| Catch an error | `try: ... except ValueError: ...` |
| Raise an error | `raise ValueError("message")` |
| Import with alias | `import numpy as np` |
| Run only when executed directly | `if __name__ == "__main__":` |
| Install a package | `pip install name` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Opening with `"w"` and losing the data | Use `"a"` to append |
| Forgetting `\n` in `write()` | Add `"\n"` yourself |
| Not closing a file | Use the `with` statement |
| Confusing `json.load` and `json.loads` | `load` = file, `loads` = string |
| Treating CSV numbers as ints | Convert with `int()` or `float()` |
| Bare `except:` | Catch specific exceptions |
| Wrong order of `except` blocks | Specific errors first, general last |
| Naming your file `random.py` | Rename it to avoid import conflicts |
| `ModuleNotFoundError` after `pip install` | Check you installed in the **same** environment |
| JSON keys from integers | JSON object keys become **strings** after saving |

---

## Last-Minute Checklist

* I can read, write and append files with `with open()`.
* I know the file modes `r`, `w`, `a` and `x`.
* I can convert between Python objects and JSON.
* I can read and write CSV rows.
* I can use `try / except / else / finally` and `raise`.
* I can import modules in three styles and use `__name__`.
* I can install a library with `pip` and create a virtual environment.

---

## Quiz: Rapid Fire

1. Which file mode **erases** existing content?

- [ ] `"r"`
- [x] `"w"`
- [ ] `"a"`
- [ ] `"rb"`

2. Which statement closes a file automatically?

- [ ] `try`
- [ ] `import`
- [x] `with`
- [ ] `finally` only

3. What does `json.loads('{"a": 1}')` return?

- [ ] A string
- [x] A dictionary
- [ ] A list
- [ ] A file object

4. Which block always runs, whether or not an error happens?

- [ ] `else`
- [ ] `except`
- [x] `finally`
- [ ] `try`

5. What does `if __name__ == "__main__":` check?

- [ ] Whether the file exists
- [x] Whether the file is being run directly
- [ ] Whether `main()` is defined
- [ ] Whether the module is installed

6. Which command saves installed packages to a file?

- [ ] `pip list > file`
- [ ] `pip save requirements.txt`
- [x] `pip freeze > requirements.txt`
- [ ] `pip export`
