# Quick Notes: Chapter 7 - Arrays, Strings & Pointers

> ⏱ **15-minute revision.** Know arrays and `vector`, the `std::string` operations, pointers (`&`, `*`, `nullptr`), **references** (aliases), and dynamic memory with `new`/`delete` and **smart pointers**.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 7.1 | Arrays | Fixed-size, same-type collection; index from 0; `vector` grows |
| 7.2 | Strings | `std::string` with `length`, `+`, `substr`, `find`, `replace` |
| 7.3 | Pointers | A variable holding an address; `&` and `*` |
| 7.4 | References | An alias for an existing variable |
| 7.5 | Dynamic Memory | `new` / `delete`; prefer `unique_ptr` and `shared_ptr` |

---

## 1. Arrays (7.1)

**Core idea:** An **array** stores many values of the **same type** in consecutive memory. Indexes start at **0**.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int marks[5] = {80, 65, 90, 75, 85};
    int n = sizeof(marks) / sizeof(marks[0]);
    int sum = 0;

    for (int m : marks) {
        sum += m;
    }
    cout << "n = " << n << ", Sum = " << sum
         << ", Average = " << static_cast<double>(sum) / n << "\n";

    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << grid[i][j] << " ";
        }
        cout << "\n";
    }

    vector<int> v = {1, 2};
    v.push_back(3);
    cout << "size = " << v.size() << ", last = " << v.back() << "\n";
    return 0;
}
```

```output
n = 5, Sum = 395, Average = 79
1 2 3
4 5 6
size = 3, last = 3
```

| Form | Example |
| --- | --- |
| Declare | `int a[5];` |
| Initialize | `int a[3] = {1, 2, 3};` |
| Partial | `int a[5] = {1, 2};` gives `1 2 0 0 0` |
| 2D | `int g[2][3];` accessed as `g[row][col]` |
| Resizable | `vector<int> v;` with `push_back`, `size`, `back` |

**Remember**

* Valid indexes are `0` to `size - 1`; C++ does **not** check bounds.
* Number of elements: `sizeof(a) / sizeof(a[0])`.
* An array passed to a function becomes a **pointer**, so pass the size too.
* Prefer `std::vector` (or `std::array`) in modern C++: they know their size.
* Arrays cannot be copied with `=`; `vector` can.

---

## 2. Strings (7.2)

**Core idea:** `std::string` (from `<string>`) is a safe, growable text type. It replaces C-style `char` arrays in most code.

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>
#include <cstring>
using namespace std;

int main() {
    string s = "Hello";
    s += " World";
    cout << s << " (" << s.length() << ")\n";

    cout << s.substr(0, 5) << " " << s.find("World") << "\n";

    s.replace(0, 5, "Hi");
    cout << s << "\n";
    cout << (s == "Hi World") << " " << s.empty() << "\n";

    string t = "abc";
    reverse(t.begin(), t.end());
    cout << t << "\n";
    for (char &c : t) {
        c = toupper(c);
    }
    cout << t << "\n";

    char word[] = "Hi";
    cout << strlen(word) << "\n";
    return 0;
}
```

```output
Hello World (11)
Hello 6
Hi World
1 0
cba
CBA
2
```

| Operation | Code |
| --- | --- |
| Length | `s.length()` or `s.size()` |
| Join | `a + b`, `s += "x"`, `s.push_back('x')` |
| Part of a string | `s.substr(start, count)` |
| Find | `s.find("sub")` (returns `string::npos` if missing) |
| Replace / erase | `s.replace(pos, len, "new")`, `s.erase(pos, len)` |
| Compare | `==`, `<`, `s.compare(t)` |
| Read a line | `getline(cin, s);` |
| To C string | `s.c_str()` |

**Remember**

* Use `==` to compare `string`s (unlike C, no `strcmp` needed).
* `s[i]` reads a character; `s.at(i)` checks bounds.
* `find` returns `string::npos` when nothing is found.
* A C-string is a `char` array ending with `'\0'`; `strlen` is in `<cstring>`.
* `cin >> s` reads one word; `getline` reads the whole line.

---

## 3. Pointers (7.3)

**Core idea:** A **pointer** stores the **address** of another variable. `&x` gives the address; `*p` gives the value at the address.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int *p = &x;

    cout << *p << "\n";
    *p = 20;
    cout << x << "\n";

    int a[3] = {10, 20, 30};
    int *q = a;
    cout << *q << " " << *(q + 1) << " " << q[2] << "\n";
    q++;
    cout << *q << "\n";

    int *np = nullptr;
    if (np == nullptr) {
        cout << "null pointer\n";
    }
    return 0;
}
```

```output
10
20
10 20 30
20
null pointer
```

| Symbol | Meaning |
| --- | --- |
| `int *p;` | `p` is a pointer to `int` |
| `&x` | Address of `x` |
| `*p` | Value stored at the address in `p` |
| `p + 1` | Address of the **next element** (moves `sizeof(type)` bytes) |
| `nullptr` | "Points to nothing" (C++11, use instead of `NULL`) |

**Remember**

* Initialize every pointer: to an address or to `nullptr`.
* Never dereference `nullptr` or an uninitialized pointer.
* `a[i]` is the same as `*(a + i)`; an array name is the address of its first element.
* A pointer to `int` holds an `int` address, not an `int`.
* `*(p + 1)` reads the next element; `*p + 1` adds 1 to the value.

---

## 4. References (7.4)

**Core idea:** A **reference** is another **name** (alias) for an existing variable. It is not a copy.

```cpp
#include <iostream>
using namespace std;

void addOne(int &n) {
    n++;
}

int main() {
    int x = 10;
    int &r = x;

    r = 20;
    cout << x << "\n";

    x++;
    cout << r << "\n";

    int v = 5;
    addOne(v);
    cout << v << "\n";
    return 0;
}
```

```output
20
21
6
```

| Reference | Pointer |
| --- | --- |
| Must be initialized | May start as `nullptr` |
| Cannot be re-pointed to another variable | Can be changed to point elsewhere |
| No `*` needed to use it | Use `*p` to reach the value |
| Cannot be null | Can be `nullptr` |
| Syntax: `int &r = x;` | Syntax: `int *p = &x;` |

**Remember**

* `&` after a type declares a reference; `&` before a variable takes its address.
* References are the standard way to **pass by reference** and to avoid copies (`const T &`).
* `r = y;` **assigns** the value of `y` to `x`; it does not re-bind `r`.
* Never return a reference to a **local** variable.

---

## 5. Dynamic Memory (7.5)

**Core idea:** `new` allocates memory on the **heap** at run time; `delete` releases it. **Smart pointers** release memory **automatically**.

```cpp
#include <iostream>
#include <memory>
using namespace std;

int main() {
    int *p = new int(5);
    cout << *p << "\n";
    delete p;
    p = nullptr;

    int n = 3;
    int *arr = new int[n];
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << "\n";
    delete[] arr;

    unique_ptr<int> up = make_unique<int>(42);
    cout << *up << "\n";

    auto sp1 = make_shared<int>(7);
    auto sp2 = sp1;
    cout << *sp1 << " shared by " << sp1.use_count() << "\n";
    return 0;
}
```

```output
5
10 20 30
42
7 shared by 2
```

| Tool | Allocate | Release |
| --- | --- | --- |
| Single value | `new int(5)` | `delete p;` |
| Array | `new int[n]` | `delete[] arr;` |
| Unique owner | `make_unique<T>(...)` | Automatic |
| Shared owners | `make_shared<T>(...)` | Automatic when the last owner ends |

**Remember**

* Every `new` needs a matching `delete`; every `new[]` needs `delete[]`.
* Forgetting `delete` is a **memory leak**; deleting twice or using memory after `delete` is a **dangling pointer** bug.
* Set a pointer to `nullptr` after deleting it.
* Prefer `vector` and smart pointers over raw `new` and `delete`.
* `unique_ptr` cannot be copied (one owner); `shared_ptr` counts its owners.
* Smart pointers need `<memory>`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Array size | `sizeof(a) / sizeof(a[0])` |
| Growable array | `vector<int> v; v.push_back(1);` |
| String length / join | `s.length()` / `a + b` |
| Substring / find | `s.substr(0, 3)` / `s.find("x")` |
| Pointer to variable | `int *p = &x;` |
| Value through pointer | `*p = 5;` |
| Null pointer | `int *p = nullptr;` |
| Reference | `int &r = x;` |
| Allocate / free | `new int(5)` / `delete p;` |
| Allocate / free array | `new int[n]` / `delete[] p;` |
| Smart pointer | `auto p = make_unique<int>(5);` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Index out of range | Keep `0 <= i < size` |
| Using `sizeof(arr)` on a pointer parameter | Pass the size separately |
| `if (s.find("x"))` to test existence | Compare with `string::npos` |
| Dereferencing `nullptr` | Check before using |
| Uninitialized pointer | Initialize to `nullptr` or an address |
| `delete` for memory from `new[]` | Use `delete[]` |
| Forgetting `delete` (leak) | Use smart pointers |
| Using a pointer after `delete` | Set it to `nullptr` |
| Returning a reference to a local variable | Return by value |
| Uninitialized reference | `int &r = x;` (initialize at once) |

---

## Last-Minute Checklist

* ✅ I can declare, initialize and loop through arrays and vectors.
* ✅ I can use the main `std::string` operations.
* ✅ I can use `&`, `*` and `nullptr` correctly.
* ✅ I can explain references and how they differ from pointers.
* ✅ I can allocate with `new` and release with `delete` or `delete[]`.
* ✅ I know why smart pointers are safer.

---

## Quiz: Rapid Fire 🧠

1. What is the index of the first element in an array?

- [ ] `1`
- [x] `0`
- [ ] `-1`
- [ ] It depends on the size

2. Which expression gives the address of `x`?

- [ ] `*x`
- [x] `&x`
- [ ] `x&`
- [ ] `@x`

3. Which statement about a reference is true?

- [ ] It can be `nullptr`
- [ ] It can be re-pointed later
- [x] It must be initialized and acts as an alias
- [ ] It stores a copy of the variable

4. How do you free memory allocated with `new int[5]`?

- [ ] `delete p;`
- [x] `delete[] p;`
- [ ] `free(p);`
- [ ] `remove p;`

5. What does `s.find("z")` return when `z` is not in the string?

- [ ] `0`
- [ ] `-1` always
- [x] `string::npos`
- [ ] `nullptr`

6. Which smart pointer allows only one owner?

- [ ] `shared_ptr`
- [x] `unique_ptr`
- [ ] `weak_ptr`
- [ ] `auto_ptr`
