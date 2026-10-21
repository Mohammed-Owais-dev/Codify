# Quick Notes: Chapter 10 - Structures, Files & Practice

> **15-minute revision.** A **structure** groups different data types under one name. Know the dot `.` and arrow `->` operators, the file functions (`fopen`, `fprintf`, `fscanf`, `fgets`, `fclose`), a simple problem-solving routine and how to debug. Then combine everything in a mini project.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 10.1 | Structures & typedef | Group mixed data; `typedef` gives a short name |
| 10.2 | Array of Structures & Pointers | Many records; `.` for variables, `->` for pointers |
| 10.3 | Introduction to File Handling | `FILE *`, open, read or write, close |
| 10.4 | Problem Solving & Debugging | Plan, code, test; find and fix errors |
| 10.5 | Mini Project | Structures + arrays + functions + files together |

---

## 1. Introduction to Structures & typedef (10.1)

**Core idea:** A **structure** is a user-defined type that holds **members** of different types. Access a member with the **dot operator** `.`.

```text
struct Name {
    type member1;
    type member2;
};
```

```c
#include <stdio.h>
#include <string.h>

struct Student {
    int id;
    char name[20];
    float marks;
};

int main(void) {
    struct Student s1 = {101, "Asha", 88.5f};

    printf("%d %s %.1f\n", s1.id, s1.name, s1.marks);

    strcpy(s1.name, "Ravi");
    printf("%s\n", s1.name);
    return 0;
}
```

```output
101 Asha 88.5
Ravi
```

**`typedef`** creates a short alias, so you can skip the word `struct`.

```c
#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

int main(void) {
    Point p = {3, 4};
    Point q = p;
    q.x = 10;

    printf("p = (%d, %d), q = (%d, %d)\n", p.x, p.y, q.x, q.y);
    return 0;
}
```

```output
p = (3, 4), q = (10, 4)
```

**Remember**

* A structure **definition** ends with `};` (the semicolon is required).
* Members are reached with `variable.member`.
* A string member needs `strcpy` (not `=`); numeric members can use `=`.
* Assigning one structure to another (`q = p;`) **copies every member**.
* Members are stored in order, but padding may make `sizeof` larger than the sum.
* A structure can contain arrays and other structures (nested structures).

---

## 2. Array of Structures & Structure Pointers (10.2)

**Core idea:** An **array of structures** stores many records. A **pointer to a structure** uses the **arrow operator** `->`.

| Access | Operator | Example |
| --- | --- | --- |
| Structure variable | `.` | `list[1].marks` |
| Pointer to structure | `->` | `p->marks` |
| Pointer, long form | `(*p).` | `(*p).marks` (same as `p->marks`) |

```c
#include <stdio.h>

typedef struct {
    int id;
    float marks;
} Student;

void bonus(Student *s) {
    s->marks += 5;
}

int main(void) {
    Student list[3] = {{1, 80.0f}, {2, 90.0f}, {3, 70.0f}};
    float total = 0;

    for (int i = 0; i < 3; i++) {
        total += list[i].marks;
    }
    printf("Average = %.1f\n", total / 3);

    Student *p = &list[1];
    printf("ID = %d, Marks = %.1f\n", p->id, p->marks);

    bonus(&list[2]);
    printf("Updated = %.1f\n", list[2].marks);
    return 0;
}
```

```output
Average = 80.0
ID = 2, Marks = 90.0
Updated = 75.0
```

**Remember**

* Pass a structure by **pointer** to modify it or to avoid copying a large structure.
* A structure passed by value is a **copy**, just like an `int`.
* Loop over the array with an index to read, search or sort records.
* Sorting records: compare one member (for example `marks`) and swap **whole structures**.
* Use `const Student *s` when the function should only read.

---

## 3. Introduction to File Handling (10.3)

**Core idea:** Files store data **permanently**. In C you use a **`FILE *`** pointer: **open** the file, **read or write**, then **close** it.

```text
FILE *fp = fopen("filename", "mode");
fclose(fp);
```

| Mode | Meaning | If the file does not exist |
| --- | --- | --- |
| `"r"` | Read | `fopen` returns `NULL` |
| `"w"` | Write (erases old content) | Created |
| `"a"` | Append (adds at the end) | Created |
| `"r+"` | Read and write | `NULL` |
| `"w+"` / `"a+"` | Write and read | Created |
| `"rb"`, `"wb"` | Binary read, binary write | Same as above |

| Task | Text functions | Notes |
| --- | --- | --- |
| Write formatted | `fprintf(fp, "%d", x)` | Like `printf` |
| Read formatted | `fscanf(fp, "%d", &x)` | Returns the number of items read |
| Write a string | `fputs(s, fp)` | |
| Read a line | `fgets(s, n, fp)` | Returns `NULL` at the end |
| Single character | `fputc(c, fp)` / `fgetc(fp)` | `fgetc` returns `EOF` at the end |
| Binary blocks | `fwrite()` / `fread()` | For structures and raw data |

**Write, then read**

```c
#include <stdio.h>

int main(void) {
    FILE *fp = fopen("data.txt", "w");
    if (fp == NULL) {
        printf("Cannot open file\n");
        return 1;
    }
    fprintf(fp, "Asha 85\nRavi 78\n");
    fclose(fp);

    fp = fopen("data.txt", "r");
    char name[20];
    int marks;
    while (fscanf(fp, "%s %d", name, &marks) == 2) {
        printf("%s scored %d\n", name, marks);
    }
    fclose(fp);
    return 0;
}
```

```output
Asha scored 85
Ravi scored 78
```

**Append, read line by line, and handle a missing file**

```c
#include <stdio.h>

int main(void) {
    FILE *fp = fopen("log.txt", "w");
    fputs("Line 1\n", fp);
    fclose(fp);

    fp = fopen("log.txt", "a");
    fputs("Line 2\n", fp);
    fclose(fp);

    fp = fopen("log.txt", "r");
    char line[50];
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("%s", line);
    }
    fclose(fp);

    fp = fopen("missing.txt", "r");
    if (fp == NULL) {
        printf("Cannot open file\n");
    }
    return 0;
}
```

```output
Line 1
Line 2
Cannot open file
```

**Remember**

* **Always check** `fp == NULL` after `fopen`.
* **Always `fclose`**: unsaved data may stay in the buffer otherwise.
* `"w"` **erases** the old content; use `"a"` to keep it.
* Loop on the **return value** (`fscanf(...) == 2`, `fgets(...) != NULL`), not on `feof`.
* Do not put `&` in front of a string in `fscanf("%s")`.
* Binary files (`fwrite` / `fread`) keep structures exactly as in memory.

---

## 4. C Problem Solving & Debugging (10.4)

**Core idea:** Solve problems in small steps, then **test and debug**.

| Step | What to do |
| --- | --- |
| 1. Understand | Identify the input, the output and the rules |
| 2. Plan | Write the steps in plain words or a flowchart |
| 3. Code | Start with the simplest working version |
| 4. Test | Normal values, **edge cases** (0, 1, negative, empty) |
| 5. Debug | Find the cause, fix it, test again |

```c
#include <stdio.h>

int isPrime(int n) {
    if (n < 2) {
        return 0;
    }
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return 0;
        }
    }
    return 1;
}

int main(void) {
    for (int n = 1; n <= 20; n++) {
        if (isPrime(n)) {
            printf("%d ", n);
        }
    }
    printf("\n");

    printf("5 / 2 = %d\n", 5 / 2);
    printf("5 / 2.0 = %.1f\n", 5 / 2.0);
    return 0;
}
```

```output
2 3 5 7 11 13 17 19
5 / 2 = 2
5 / 2.0 = 2.5
```

| Error type | When | Example |
| --- | --- | --- |
| **Syntax** (compile time) | Compiler rejects the code | Missing `;`, wrong spelling |
| **Runtime** | Program crashes while running | Divide by zero, invalid pointer |
| **Logical** | Runs but gives wrong output | `=` instead of `==`, off-by-one |

Compile with warnings and debug symbols:

```bash
gcc -Wall -Wextra -g program.c -o program
```

| Technique | How |
| --- | --- |
| Read the compiler message | Start at the **first** error and its line number |
| Trace with `printf` | Print variables before and after a suspicious line |
| Use a debugger | `gdb ./program`: set breakpoints and step |
| Check boundaries | First and last index, empty input, `NULL` |
| Simplify | Remove code until the bug disappears |

**Remember**

* **Segmentation fault** = bad memory access: wrong index, `NULL` or uninitialized pointer, use after `free`.
* `5 / 2` is `2` in C: integer division. Make one side `float` to get `2.5`.
* Missing `&` in `scanf("%d", &x)` is a classic crash.
* Fix **one error at a time** and recompile; later errors are often side effects.
* Initialize every variable before use.

---

## 5. Mini Project (10.5)

**Core idea:** Combine **structures**, **arrays**, **functions** and **files** into one working program. Here: a small **student record system** that finds the topper, saves the records to a file and loads them back.

| Phase | Task |
| --- | --- |
| 1. Design | List the data (id, name, marks) and the features |
| 2. Structure | `typedef struct { ... } Student;` |
| 3. Functions | One function per job (print, find topper, save, load) |
| 4. Files | Save to and load from `students.txt` |
| 5. Test | Normal, empty and edge cases |

```c
#include <stdio.h>

typedef struct {
    int id;
    char name[20];
    float marks;
} Student;

void printStudent(const Student *s) {
    printf("%d %-6s %.1f\n", s->id, s->name, s->marks);
}

int findTopper(Student list[], int n) {
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (list[i].marks > list[best].marks) {
            best = i;
        }
    }
    return best;
}

void saveToFile(Student list[], int n) {
    FILE *fp = fopen("students.txt", "w");
    if (fp == NULL) {
        printf("Cannot open file\n");
        return;
    }
    for (int i = 0; i < n; i++) {
        fprintf(fp, "%d %s %.1f\n", list[i].id, list[i].name, list[i].marks);
    }
    fclose(fp);
}

int main(void) {
    Student list[3] = {
        {1, "Asha", 88.5f},
        {2, "Ravi", 72.0f},
        {3, "Meena", 91.0f}
    };

    int top = findTopper(list, 3);
    printf("Topper: %s\n", list[top].name);

    saveToFile(list, 3);

    FILE *fp = fopen("students.txt", "r");
    Student s;
    printf("Loaded from file:\n");
    while (fscanf(fp, "%d %s %f", &s.id, s.name, &s.marks) == 3) {
        printStudent(&s);
    }
    fclose(fp);
    return 0;
}
```

```output
Topper: Meena
Loaded from file:
1 Asha   88.5
2 Ravi   72.0
3 Meena  91.0
```

**Ideas to extend the project**

| Feature | Concept used |
| --- | --- |
| Add a student from the keyboard | `scanf`, `fgets`, arrays |
| Search by id or name | Loops, `strcmp` |
| Sort by marks | Bubble sort on structures |
| Menu with options | `do-while`, `switch` |
| Unlimited students | `malloc` and `realloc` |
| Delete or edit a record | Arrays, files |

**Remember**

* Build **one feature at a time** and test it before adding the next.
* One function = one job; keep `main()` short.
* Check every `fopen` and every `malloc`.
* Use meaningful names and comments.
* Test edge cases: no records, one record, equal marks.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Define a structure | `struct Name { int a; float b; };` |
| Short name | `typedef struct { ... } Name;` |
| Access a member | `s.id` |
| Access through a pointer | `p->id` or `(*p).id` |
| Array of structures | `Student list[10];` |
| Open a file | `FILE *fp = fopen("a.txt", "r");` |
| Check it | `if (fp == NULL) { ... }` |
| Write | `fprintf(fp, "%d\n", x);` |
| Read | `fscanf(fp, "%d", &x);` or `fgets(line, n, fp)` |
| Close | `fclose(fp);` |
| Compile for debugging | `gcc -Wall -Wextra -g file.c -o file` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Missing `;` after `struct { ... }` | `};` |
| `s.name = "Asha";` | `strcpy(s.name, "Asha");` |
| `.` used with a pointer | Use `->` |
| Comparing structures with `==` | Compare member by member |
| Not checking `fopen` | `if (fp == NULL)` |
| Forgetting `fclose` | Close every opened file |
| Using `"w"` and losing old data | Use `"a"` to append |
| Looping with `while (!feof(fp))` | Test the return value of `fscanf` or `fgets` |
| `scanf("%d", x)` without `&` | `scanf("%d", &x);` |
| Integer division (`5 / 2`) | Use `5 / 2.0` or a cast |

---

## Last-Minute Checklist

* I can define a structure and use `typedef`.
* I know `.` is for variables and `->` is for pointers.
* I can create and loop through an array of structures.
* I can open, write, read, append and close a file safely.
* I know the three types of errors.
* I can compile with `-Wall -g` and trace a bug with `printf`.
* I can combine structures, arrays, functions and files in a small project.

---

## Quiz: Rapid Fire

1. Which operator accesses a member through a pointer to a structure?

- [ ] `.`
- [x] `->`
- [ ] `&`
- [ ] `::`

2. What does `typedef` do?

- [ ] Allocates memory
- [x] Creates an alias (new name) for a type
- [ ] Declares a pointer
- [ ] Opens a file

3. Which file mode erases the existing content?

- [ ] `"r"`
- [ ] `"a"`
- [x] `"w"`
- [ ] `"rb"`

4. What does `fopen` return when it fails?

- [ ] `0` as an `int`
- [ ] `EOF`
- [x] `NULL`
- [ ] `-1`

5. Which kind of error is `=` used instead of `==`?

- [ ] Syntax error
- [ ] Runtime error
- [x] Logical error
- [ ] Linker error

6. What is `5 / 2` in C when both are integers?

- [ ] `2.5`
- [x] `2`
- [ ] `3`
- [ ] `2.0`
