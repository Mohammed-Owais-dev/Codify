# Quick Notes: Chapter 9 - Pointers & Dynamic Memory

> ⏱ **15-minute revision.** A **pointer** stores the **address** of another variable. Know `&` (address of) and `*` (value at), pointer arithmetic, the link between pointers and arrays, call by reference, and `malloc`/`calloc`/`realloc`/`free`.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 9.1 | Introduction to Pointers | A variable that holds an address |
| 9.2 | Address, Dereference & Arithmetic | `&x`, `*p`, and `p + 1` moves by one element |
| 9.3 | Pointers with Arrays & Strings | `a[i]` is `*(a + i)` |
| 9.4 | Pointers with Functions | Call by reference: `swap(&x, &y)` |
| 9.5 | Dynamic Memory Allocation | Allocate on the heap with `malloc`; release with `free` |

---

## 1. Introduction to Pointers (9.1)

**Core idea:** Every variable lives at an **address** in memory. A **pointer** is a variable that stores such an address.

```text
data_type *pointer_name;
```

| Symbol | Name | Meaning |
| --- | --- | --- |
| `&x` | Address-of | The address of `x` |
| `*p` (in a declaration) | Pointer declaration | `p` holds an address |
| `*p` (in an expression) | Dereference | The value stored at the address in `p` |

```c
#include <stdio.h>

int main(void) {
    int x = 10;
    int *p = &x;

    printf("x = %d\n", x);
    printf("*p = %d\n", *p);

    *p = 20;
    printf("x = %d\n", x);
    return 0;
}
```

```output
x = 10
*p = 10
x = 20
```

**Remember**

* The pointer type must match the variable type: `int *` for `int`, `char *` for `char`.
* An **uninitialized** pointer points to a random place (a *wild pointer*). Initialize it.
* Use `NULL` for "points to nothing", and check before dereferencing: `if (p != NULL)`.
* Print addresses with `%p`.
* `*p = 20;` changes the **original** variable.

---

## 2. Address, Dereference & Pointer Arithmetic (9.2)

**Core idea:** Adding `1` to a pointer moves it by **one element** (`sizeof(type)` bytes), not by one byte.

| Operation | Meaning |
| --- | --- |
| `p++` / `p--` | Move to the next / previous element |
| `p + n` / `p - n` | Move `n` elements forward / back |
| `p2 - p1` | Number of elements between two pointers |
| `p1 < p2`, `p1 == p2` | Compare addresses |

```c
#include <stdio.h>

int main(void) {
    int a[3] = {10, 20, 30};
    int *p = a;

    printf("%d %d %d\n", *p, *(p + 1), *(p + 2));

    p++;
    printf("%d\n", *p);
    return 0;
}
```

```output
10 20 30
20
```

**Pointer to pointer**

```c
#include <stdio.h>

int main(void) {
    int x = 5;
    int *p = &x;
    int **pp = &p;

    printf("%d %d %d\n", x, *p, **pp);
    return 0;
}
```

```output
5 5 5
```

**Remember**

* `*(p + 1)` is **not** `*p + 1`. The first reads the next element; the second adds 1 to the value.
* You can add or subtract integers from a pointer, but **not** add two pointers.
* `int **pp` holds the address of an `int *`.
* A `void *` pointer can hold any address but cannot be dereferenced directly.

---

## 3. Pointers with Arrays & Strings (9.3)

**Core idea:** An array name is the address of its **first element**. So `a[i]` and `*(a + i)` mean the same thing.

```c
#include <stdio.h>

int main(void) {
    int a[4] = {1, 2, 3, 4};
    int *p = a;

    for (int i = 0; i < 4; i++) {
        printf("%d ", *(p + i));
    }
    printf("\n");

    char *s = "Codify";
    int len = 0;
    while (*s != '\0') {
        len++;
        s++;
    }
    printf("Length = %d\n", len);
    return 0;
}
```

```output
1 2 3 4
Length = 6
```

| `char s[] = "Hi";` | `char *s = "Hi";` |
| --- | --- |
| Array **copy** in your memory | Pointer to a **string literal** |
| Characters can be changed | Characters are **read-only** |
| `sizeof(s)` is the array size | `sizeof(s)` is the pointer size |
| `s` cannot be reassigned | `s` can point elsewhere |

```c
#include <stdio.h>

int main(void) {
    char str[] = "hi";

    str[0] = 'H';
    printf("%s\n", str);
    return 0;
}
```

```output
Hi
```

**Remember**

* `a[i]` is `*(a + i)`, and `i[a]` works too (but never write it).
* Modifying a string literal (`char *s = "Hi"; s[0] = 'h';`) is **undefined behavior**.
* A string function loops until `*s == '\0'`.
* Use `const char *s` for read-only strings.

---

## 4. Pointers with Functions (9.4)

**Core idea:** Pass **addresses** to let a function change the caller's variables. This is called **call by reference** (simulated in C).

```c
#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int main(void) {
    int x = 5, y = 10;

    swap(&x, &y);
    printf("x = %d, y = %d\n", x, y);
    return 0;
}
```

```output
x = 10, y = 5
```

**Returning several values through pointers**

```c
#include <stdio.h>

void minMax(int arr[], int n, int *min, int *max) {
    *min = arr[0];
    *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main(void) {
    int a[4] = {5, 3, 9, 7};
    int lo, hi;

    minMax(a, 4, &lo, &hi);
    printf("Min = %d, Max = %d\n", lo, hi);
    return 0;
}
```

```output
Min = 3, Max = 9
```

**Function pointer**

```c
#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main(void) {
    int (*op)(int, int) = add;

    printf("%d\n", op(2, 3));
    return 0;
}
```

```output
5
```

| Call style | Passes | Can change the caller's variable? |
| --- | --- | --- |
| By value | A copy | No |
| By reference (pointer) | The address | **Yes** |

**Remember**

* In the function, use `*a` to reach the value; in the call, pass `&x`.
* Arrays are always passed as **pointers**: `int arr[]` is the same as `int *arr`.
* Never return the address of a **local variable**; it dies when the function ends.
* `int (*op)(int, int)` is a pointer to a function taking two ints and returning an int.

---

## 5. Dynamic Memory Allocation (9.5)

**Core idea:** Normal variables live on the **stack** with a fixed size. **Dynamic memory** is requested at run time from the **heap** with functions from `<stdlib.h>`, and **you must release it**.

| Function | Purpose |
| --- | --- |
| `malloc(bytes)` | Allocate memory (values are **garbage**) |
| `calloc(count, size)` | Allocate and set everything to **0** |
| `realloc(ptr, newBytes)` | Resize an earlier block |
| `free(ptr)` | Release memory |

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 3;
    int *arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    free(arr);
    return 0;
}
```

```output
10 20 30
```

**calloc and realloc**

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *z = (int *)calloc(3, sizeof(int));
    printf("%d %d %d\n", z[0], z[1], z[2]);

    int *a = (int *)malloc(3 * sizeof(int));
    for (int i = 0; i < 3; i++) {
        a[i] = (i + 1) * 10;
    }

    a = (int *)realloc(a, 5 * sizeof(int));
    a[3] = 40;
    a[4] = 50;

    for (int i = 0; i < 5; i++) {
        printf("%d ", a[i]);
    }
    printf("\n");

    free(z);
    free(a);
    return 0;
}
```

```output
0 0 0
10 20 30 40 50
```

| Stack | Heap |
| --- | --- |
| Automatic (local variables) | Manual (`malloc` / `free`) |
| Fixed size | Size chosen at run time |
| Freed when the function ends | Freed only by `free` |
| Fast | Slightly slower |

**Remember**

* **Always check** for `NULL` after `malloc`, `calloc` and `realloc`.
* Every `malloc` needs a matching `free` (otherwise a **memory leak**).
* Never `free` the same pointer **twice** and never use memory **after** freeing it (*dangling pointer*). Set it to `NULL` after `free`.
* Size in bytes: `n * sizeof(int)`, never a hard-coded number.
* `realloc` may move the block, so always use the **returned** pointer.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Declare a pointer | `int *p;` |
| Point to a variable | `p = &x;` |
| Read the value | `*p` |
| Change the value | `*p = 20;` |
| Next element | `p++` or `*(p + 1)` |
| Array and pointer | `a[i]` is `*(a + i)` |
| Swap function | `void swap(int *a, int *b)` and `swap(&x, &y);` |
| Allocate | `p = (int *)malloc(n * sizeof(int));` |
| Allocate zeroed | `p = (int *)calloc(n, sizeof(int));` |
| Resize | `p = (int *)realloc(p, newN * sizeof(int));` |
| Release | `free(p); p = NULL;` |
| Header | `<stdlib.h>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Using an uninitialized pointer | Set it to `&x`, an allocation or `NULL` |
| Dereferencing `NULL` | Check `if (p != NULL)` first |
| Confusing `*p + 1` with `*(p + 1)` | Use parentheses |
| Returning the address of a local variable | Use a `static` variable or `malloc` |
| Forgetting `free` | Free every allocation (memory leak) |
| Using memory after `free` | Set the pointer to `NULL` |
| `free` called twice on one pointer | Free once, then set to `NULL` |
| Wrong size in `malloc` | `n * sizeof(type)` |
| Not checking `malloc` for `NULL` | Always test the result |
| Modifying a string literal | Use `char s[] = "..."` instead |

---

## Last-Minute Checklist

* ✅ I know `&` gives an address and `*` gives the value at an address.
* ✅ I know `p + 1` moves by one element.
* ✅ I know `a[i]` equals `*(a + i)`.
* ✅ I can write `swap` with pointers.
* ✅ I can allocate with `malloc` or `calloc`, resize with `realloc` and release with `free`.
* ✅ I always check for `NULL` and avoid dangling pointers.
* ✅ I know the difference between stack and heap.

---

## Quiz: Rapid Fire 🧠

1. What does the `&` operator give?

- [ ] The value of a variable
- [x] The address of a variable
- [ ] The size of a variable
- [ ] The type of a variable

2. If `p` points to an `int` array element, what does `p + 1` point to?

- [ ] The next byte
- [x] The next element
- [ ] The previous element
- [ ] The same element

3. Which call lets a function change the caller's `x`?

- [ ] `change(x)`
- [x] `change(&x)`
- [ ] `change(*x)`
- [ ] `change(x*)`

4. What does `calloc` do that `malloc` does not?

- [ ] Resizes memory
- [x] Sets the allocated memory to zero
- [ ] Frees memory
- [ ] Checks for `NULL`

5. What happens if you forget to call `free` after `malloc`?

- [ ] A compile error
- [ ] The program stops
- [x] A memory leak
- [ ] The memory is freed twice

6. Which header declares `malloc` and `free`?

- [ ] `<stdio.h>`
- [ ] `<string.h>`
- [x] `<stdlib.h>`
- [ ] `<memory.h>`
