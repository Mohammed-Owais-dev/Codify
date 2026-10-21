# Quick Notes: Chapter 10 - Python Mini Projects

> **20-minute revision.** Each mini project combines earlier chapters. Revise the **core logic** and the **reusable pattern** of each: calculator, guessing game, quiz, student system, contact book, to-do list and a final project. Examples use sample data so you can follow the output.

---

## Chapter Map

| # | Project | Main skills used |
| --- | --- | --- |
| 10.1 | Calculator & Number Guessing Game | Functions, `if / elif`, loops, `random`, input validation |
| 10.2 | Quiz Application | Lists of dictionaries, loops, scoring, percentage |
| 10.3 | Student Management System | Dictionaries, CRUD functions, JSON storage |
| 10.4 | Contact Book & To-Do List | Dictionaries, list of dictionaries, search, update, delete |
| 10.5 | Final Python Project | Project structure, menu loop, error handling, file storage |

**Every project follows the same flow:** store data → write small functions → build a menu loop → validate input → save data (optional).

---

## 1. Calculator & Number Guessing Game (10.1)

**Core idea:** A **calculator** maps an operator to an action. A **guessing game** repeats a loop until the player finds a secret number.

```python
def calculate(a, op, b):
    if op == "+":
        return a + b
    if op == "-":
        return a - b
    if op == "*":
        return a * b
    if op == "/":
        return a / b if b != 0 else "Cannot divide by zero"
    return "Invalid operator"

print(calculate(8, "+", 2), calculate(8, "/", 0), calculate(8, "^", 2))
```

```output
10 Cannot divide by zero Invalid operator
```

**Shorter version with a dictionary of functions**

```python
import operator

ops = {"+": operator.add, "-": operator.sub, "*": operator.mul}
print(ops["*"](6, 7))
```

```output
42
```

**Guessing game logic**

```python
def check_guess(secret, guess):
    if guess < secret:
        return "Too low"
    if guess > secret:
        return "Too high"
    return "Correct!"

secret = 42    # real game: random.randint(1, 100)
attempts = 0

for guess in [50, 25, 42]:
    attempts += 1
    result = check_guess(secret, guess)
    print(guess, result)
    if result == "Correct!":
        break

print(f"Solved in {attempts} attempts")
```

```output
50 Too high
25 Too low
42 Correct!
Solved in 3 attempts
```

```text
import random

secret = random.randint(1, 100)
attempts = 0

while True:
    try:
        guess = int(input("Guess (1-100): "))
    except ValueError:
        print("Enter a whole number")
        continue
    attempts += 1
    result = check_guess(secret, guess)
    print(result)
    if result == "Correct!":
        print(f"You won in {attempts} attempts")
        break
```

**Remember**

* Keep **logic in functions** (`calculate`, `check_guess`) and **input/output outside** them, so you can test them.
* Handle **division by zero** and **invalid operators**.
* Validate input with `try / except ValueError` and `continue`.
* `random.randint(1, 100)` includes both ends.
* A `while True` loop with `break` is the standard game loop.

---

## 2. Quiz Application (10.2)

**Core idea:** Store each question as a **dictionary** inside a **list**, loop through the list, compare answers, and keep a **score**.

```python
questions = [
    {"q": "Capital of France?", "options": ["Paris", "Rome"], "answer": 0},
    {"q": "2 + 2 = ?", "options": ["3", "4"], "answer": 1},
    {"q": "Python is a ...", "options": ["Compiler", "Language"], "answer": 1},
]
user_answers = [0, 1, 0]    # simulated; the real app uses input()

score = 0
for i, item in enumerate(questions):
    correct = user_answers[i] == item["answer"]
    if correct:
        score += 1
    print(f"Q{i + 1}: {'Correct' if correct else 'Wrong'}")

percent = score / len(questions) * 100
print(f"Score: {score}/{len(questions)} ({percent:.0f}%)")
```

```output
Q1: Correct
Q2: Correct
Q3: Wrong
Score: 2/3 (67%)
```

```text
for i, item in enumerate(questions, start=1):
    print(f"Q{i}. {item['q']}")
    for n, option in enumerate(item["options"], start=1):
        print(f"  {n}. {option}")
    choice = int(input("Your answer: ")) - 1
    if choice == item["answer"]:
        score += 1
```

| Part | Pattern |
| --- | --- |
| Question data | List of dictionaries: `{"q": ..., "options": [...], "answer": 0}` |
| Loop | `for i, item in enumerate(questions)` |
| Check | `choice == item["answer"]` |
| Score | Counter plus `score / total * 100` |
| Extras | `random.shuffle(questions)`, load questions from a JSON file |

**Remember**

* Store the answer as an **index** (or the correct text) and compare consistently.
* The user types `1` or `2`, but list indexes start at `0`, so **subtract 1**.
* Use `random.shuffle()` to change the question order each time.
* Show a final message based on the percentage (for example, 80% or more is "Excellent").

---

## 3. Student Management System (10.3)

**Core idea:** A **dictionary of dictionaries** stores records by roll number. Write one function per operation: **C**reate, **R**ead, **U**pdate, **D**elete.

```python
students = {}

def add_student(roll, name, marks):
    students[roll] = {"name": name, "marks": marks}

def average(roll):
    m = students[roll]["marks"]
    return sum(m) / len(m)

add_student(1, "Asha", [90, 80, 70])
add_student(2, "Ravi", [60, 75])
add_student(3, "Meena", [95, 85, 90])

print(len(students))
print(f"{average(1):.1f}")
best = max(students, key=average)
print(students[best]["name"])

del students[2]
print(sorted(students))

for roll, info in students.items():
    print(f"{roll}: {info['name']} - {average(roll):.1f}")
```

```output
3
80.0
Meena
[1, 3]
1: Asha - 80.0
3: Meena - 90.0
```

**Saving to a JSON file**

```python
import json

data = {1: {"name": "Asha"}, 3: {"name": "Meena"}}

with open("students.json", "w") as f:
    json.dump(data, f)

with open("students.json") as f:
    loaded = json.load(f)

print(list(loaded.keys()))
print(loaded["1"]["name"])
```

```output
['1', '3']
Asha
```

| Operation | Code |
| --- | --- |
| Add / update | `students[roll] = {...}` |
| Search | `students.get(roll)` |
| Delete | `del students[roll]` or `students.pop(roll, None)` |
| Topper | `max(students, key=average)` |
| Class average | `sum(averages) / len(averages)` |
| Save / load | `json.dump` / `json.load` |

**Remember**

* Use `students.get(roll)` to avoid a `KeyError` when the roll number is missing.
* JSON turns integer keys into **strings**; convert back with `int(key)` when loading.
* Check for **duplicates** before adding a student.
* Validate marks (for example, between 0 and 100) before saving.

---

## 4. Contact Book & To-Do List (10.4)

**Core idea:** A contact book is a **dictionary** (name → phone). A to-do list is a **list of dictionaries** (title and done flag). Both need add, search, update, delete and display.

```python
contacts = {}

def add(name, phone):
    contacts[name.title()] = phone

def search(term):
    return {n: p for n, p in contacts.items() if term.lower() in n.lower()}

add("asha rao", "98765")
add("ravi kumar", "91234")
add("meena", "99999")

print(search("ra"))
contacts["Meena"] = "88888"
print(contacts.pop("Ravi Kumar"))
print(contacts)
```

```output
{'Asha Rao': '98765', 'Ravi Kumar': '91234'}
91234
{'Asha Rao': '98765', 'Meena': '88888'}
```

```python
tasks = []

def add_task(title):
    tasks.append({"title": title, "done": False})

def complete(index):
    tasks[index]["done"] = True

add_task("Study Python")
add_task("Buy milk")
add_task("Walk")
complete(0)

for i, t in enumerate(tasks, start=1):
    mark = "x" if t["done"] else " "
    print(f"{i}. [{mark}] {t['title']}")

pending = [t["title"] for t in tasks if not t["done"]]
print(pending)
```

```output
1. [x] Study Python
2. [ ] Buy milk
3. [ ] Walk
['Buy milk', 'Walk']
```

| Feature | Contact book | To-do list |
| --- | --- | --- |
| Structure | `{name: phone}` | `[{"title": ..., "done": False}]` |
| Add | `contacts[name] = phone` | `tasks.append({...})` |
| Search | Comprehension with `in` and `.lower()` | Filter by title |
| Update | Assign to the same key | `tasks[i]["done"] = True` |
| Delete | `contacts.pop(name, None)` | `tasks.pop(i)` or `del tasks[i]` |
| Display | Loop over `.items()` | `enumerate(tasks, start=1)` |

**Remember**

* Normalize names with `.title()` and compare with `.lower()` for friendly searching.
* `pop(key, None)` deletes safely without raising an error.
* Users see numbers starting at **1**; the list index starts at **0**.
* Check the index range before using `tasks[index]` (catch `IndexError`).
* Save both projects to a JSON file so data survives after closing the program.

---

## 5. Final Python Project (10.5)

**Core idea:** Combine everything into one organized program: **data**, **functions**, a **menu loop**, **error handling** and **file storage**. This example is an **expense tracker**.

| Step | What to do |
| --- | --- |
| 1. Plan | List features: add, view, report, delete, save |
| 2. Data | Decide the structure (a list of dictionaries) |
| 3. Functions | One small function per feature |
| 4. Menu | `while True` loop with numbered choices and an exit option |
| 5. Safety | Validate input with `try / except` |
| 6. Storage | Save and load with `json` |
| 7. Test | Try normal, empty and wrong inputs |

```python
expenses = []

def add_expense(title, amount, category):
    expenses.append({"title": title, "amount": amount, "category": category})

def total_by_category():
    totals = {}
    for e in expenses:
        totals[e["category"]] = totals.get(e["category"], 0) + e["amount"]
    return totals

add_expense("Lunch", 150, "Food")
add_expense("Bus", 40, "Travel")
add_expense("Dinner", 250, "Food")

totals = total_by_category()
print(totals)
print(sum(totals.values()))

top = max(totals, key=totals.get)
print(f"Highest: {top} ({totals[top]})")

assert sum(totals.values()) == 440
```

```output
{'Food': 400, 'Travel': 40}
440
Highest: Food (400)
```

**Safe number input**

```python
def to_number(text):
    try:
        return float(text)
    except ValueError:
        return None

print(to_number("12.5"), to_number("abc"))
```

```output
12.5 None
```

**Menu loop skeleton**

```text
def main():
    while True:
        print("1. Add  2. View  3. Report  4. Exit")
        choice = input("Choose: ")
        if choice == "1":
            add_expense(...)
        elif choice == "2":
            show_expenses()
        elif choice == "3":
            print(total_by_category())
        elif choice == "4":
            print("Goodbye!")
            break
        else:
            print("Invalid choice")

if __name__ == "__main__":
    main()
```

```text
expense_tracker/
├── main.py          # menu loop
├── storage.py       # load and save JSON
├── tracker.py       # add, report functions
└── data.json        # saved data
```

**Remember**

* Separate **logic** (functions) from **input/output** (menu) so each part is easy to test.
* Use `if __name__ == "__main__":` to start the program.
* `assert condition` is a quick self-test; it raises `AssertionError` if the condition is false.
* Load data at **startup** and save after every change (or on exit).
* Handle a **missing or empty file** with `try / except FileNotFoundError`.
* Write clear function names, short functions and helpful error messages.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Game / menu loop | `while True:` ... `break` |
| Safe integer input | `try: int(input()) except ValueError:` |
| Random number | `random.randint(1, 100)` |
| Operator lookup | `ops = {"+": operator.add}` |
| Record by key | `data[key] = {"name": ...}` |
| Safe lookup | `data.get(key)` |
| Safe delete | `data.pop(key, None)` |
| Best item by a value | `max(data, key=function)` |
| Numbered display | `enumerate(items, start=1)` |
| Count by category | `totals[k] = totals.get(k, 0) + value` |
| Save / load | `json.dump(data, f)` / `json.load(f)` |
| Entry point | `if __name__ == "__main__": main()` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Program crashes on non-numeric input | Wrap `int(input())` in `try / except ValueError` |
| Division by zero in the calculator | Check `b != 0` first |
| Off-by-one between the menu number and the list index | Subtract `1` from the user's choice |
| `KeyError` for a missing record | Use `.get()` or check with `in` |
| Duplicate roll numbers or names | Check before adding |
| Data lost when the program closes | Save to a JSON file |
| JSON keys changed from `int` to `str` | Convert with `int(key)` after loading |
| Everything written in one huge block | Split into small functions |
| Forgetting the exit option in the menu | Add a choice that runs `break` |
| Opening a data file that does not exist yet | Catch `FileNotFoundError` and start with empty data |
| Mutating a list while looping over it | Loop over a copy or build a new list |
| Not testing edge cases | Try empty input, wrong types and large values |

---

## Last-Minute Checklist

* I can build a calculator with functions and error handling.
* I can write a guessing game loop with validation.
* I can store quiz questions as a list of dictionaries and calculate a score.
* I can implement add, search, update and delete for a dictionary.
* I can build a to-do list with a done flag.
* I can save and load data with `json`.
* I can structure a project with a menu loop and `main()`.

---

## Quiz: Rapid Fire

1. Which loop is typical for a menu or game that runs until the user quits?

- [ ] `for i in range(10):`
- [x] `while True:` with `break`
- [ ] `for ... else`
- [ ] A recursive function only

2. How do you safely read an integer from the user?

- [ ] `int(input())` with no checks
- [x] Wrap `int(input())` in `try / except ValueError`
- [ ] `str(input())`
- [ ] `input().isnumeric` without calling it

3. Which expression finds the key with the highest value in a dictionary `d`?

- [ ] `max(d)`
- [ ] `d.max()`
- [x] `max(d, key=d.get)`
- [ ] `sorted(d)[0]`

4. After saving a dictionary with integer keys to JSON and loading it again, the keys are:

- [ ] Still integers
- [x] Strings
- [ ] Floats
- [ ] Removed

5. Which call deletes a dictionary key without raising an error if it is missing?

- [ ] `del d[key]`
- [x] `d.pop(key, None)`
- [ ] `d.remove(key)`
- [ ] `d.delete(key)`

6. What is the purpose of `if __name__ == "__main__":` in a project?

- [ ] To import the main module
- [ ] To declare a constant
- [x] To run `main()` only when the file is executed directly
- [ ] To create a menu
