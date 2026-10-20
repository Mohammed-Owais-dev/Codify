# Quick Notes: Chapter 7 - Arrays

> ⏱ **15-minute revision.** An array stores many values of the **same type** in one block of memory. Indexes start at **0**. Know declaration, traversal, searching, min and max, bubble sort, reversing and 2D arrays.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 7.1 | Introduction to Arrays | Fixed-size collection of one type; index from 0 |
| 7.2 | One-Dimensional Arrays | Traverse with a loop; sum and average |
| 7.3 | Searching & Min/Max | Linear search, binary search, largest and smallest |
| 7.4 | Sorting & Reversing | Bubble sort and swapping ends |
| 7.5 | 2D Arrays & Matrices | Rows and columns; transpose and addition |

---

## 1. Introduction to Arrays (7.1)

**Core idea:** An **array** is a collection of elements of the **same data type**, stored side by side in memory and accessed by an **index**.

```text
data_type name[size];
data_type name[size] = {v1, v2, ...};
```

| Form | Example | Result |
| --- | --- | --- |
| Declare | `int a[5];` | 5 ints, values unknown (garbage) |
| Initialize | `int a[5] = {1, 2, 3, 4, 5};` | All values set |
| Partial | `int a[5] = {1, 2};` | `1 2 0 0 0` (rest become 0) |
| Size from list | `int a[] = {7, 8, 9};` | Size is 3 |

```c
#include <stdio.h>

int main(void) {
    int marks[5] = {80, 65, 90, 75, 85};
    int part[5] = {1, 2};

    printf("First = %d, Last = %d\n", marks[0], marks[4]);
    printf("Elements = %zu\n", sizeof(marks) / sizeof(marks[0]));

    for (int i = 0; i < 5; i++) {
        printf("%d ", part[i]);
    }
    printf("\n");
    return 0;
}
```

```output
First = 80, Last = 85
Elements = 5
1 2 0 0 0
```

**Remember**

* Valid indexes are `0` to `size - 1`.
* C does **not** check bounds: `a[5]` in a 5-element array is a silent bug.
* Number of elements = `sizeof(arr) / sizeof(arr[0])`.
* You cannot copy arrays with `b = a;`. Copy element by element.

---

## 2. One-Dimensional Arrays (7.2)

**Core idea:** Use a **`for` loop** to visit every element: read, print, sum, count.

```c
#include <stdio.h>

int main(void) {
    int a[5] = {10, 20, 30, 40, 50};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += a[i];
    }

    printf("Sum = %d, Average = %.1f\n", sum, (float)sum / 5);
    return 0;
}
```

```output
Sum = 150, Average = 30.0
```

**Passing an array to a function** (the function works on the original array):

```c
#include <stdio.h>

int total(int arr[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) {
        s += arr[i];
    }
    return s;
}

void doubleAll(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        arr[i] *= 2;
    }
}

int main(void) {
    int a[3] = {1, 2, 3};

    printf("Total = %d\n", total(a, 3));
    doubleAll(a, 3);
    printf("After doubling: %d %d %d\n", a[0], a[1], a[2]);
    return 0;
}
```

```output
Total = 6
After doubling: 2 4 6
```

**Remember**

* Always pass the **size** along with the array: `f(arr, n)`.
* An array parameter receives the **address**, so changes affect the original.
* Cast to `float` before dividing: `(float)sum / n`.
* Initialize counters and sums to `0`.

---

## 3. Searching & Finding Maximum/Minimum (7.3)

**Core idea:** **Linear search** checks one by one. **Binary search** halves a **sorted** array each step.

| Search | Works on | Speed |
| --- | --- | --- |
| Linear | Any array | Slow for big data (n steps) |
| Binary | **Sorted** array only | Fast (about log n steps) |

```c
#include <stdio.h>

int main(void) {
    int a[6] = {12, 45, 7, 32, 45, 9};
    int key = 32, found = -1;

    for (int i = 0; i < 6; i++) {
        if (a[i] == key) {
            found = i;
            break;
        }
    }
    printf("%d found at index %d\n", key, found);

    int max = a[0], min = a[0];
    for (int i = 1; i < 6; i++) {
        if (a[i] > max) max = a[i];
        if (a[i] < min) min = a[i];
    }
    printf("Max = %d, Min = %d\n", max, min);
    return 0;
}
```

```output
32 found at index 3
Max = 45, Min = 7
```

**Binary search**

```c
#include <stdio.h>

int main(void) {
    int a[6] = {5, 12, 19, 27, 33, 41};
    int key = 27, low = 0, high = 5, pos = -1;

    while (low <= high) {
        int mid = (low + high) / 2;
        if (a[mid] == key) {
            pos = mid;
            break;
        } else if (a[mid] < key) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    printf("%d found at index %d\n", key, pos);
    return 0;
}
```

```output
27 found at index 3
```

**Remember**

* Start `max` and `min` with `a[0]`, **not** with `0`.
* Use `-1` as the "not found" index.
* Binary search on an **unsorted** array gives wrong answers.
* To find the **position** of the max, keep the index, not just the value.

---

## 4. Sorting & Reversing Arrays (7.4)

**Core idea:** **Bubble sort** compares neighbors and swaps them if they are out of order. **Reversing** swaps the first element with the last, the second with the second last, and so on.

```c
#include <stdio.h>

int main(void) {
    int a[5] = {64, 25, 12, 22, 11};
    int n = 5;

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                int temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }

    for (int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }
    printf("\n");
    return 0;
}
```

```output
11 12 22 25 64
```

```c
#include <stdio.h>

int main(void) {
    int a[5] = {1, 2, 3, 4, 5};
    int n = 5;

    for (int i = 0; i < n / 2; i++) {
        int temp = a[i];
        a[i] = a[n - 1 - i];
        a[n - 1 - i] = temp;
    }

    for (int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }
    printf("\n");
    return 0;
}
```

```output
5 4 3 2 1
```

| Sort | Idea |
| --- | --- |
| Bubble | Swap adjacent items that are out of order |
| Selection | Find the smallest, put it first, repeat |
| Insertion | Insert each item into its place in the sorted part |

**Remember**

* Bubble sort needs `n - 1` passes; each pass places the largest item at the end.
* Swapping needs a **temp** variable.
* For descending order, change `>` to `<`.
* To reverse, loop only to `n / 2`. Going to `n` reverses it **twice** (no change).

---

## 5. Two-Dimensional Arrays & Matrices (7.5)

**Core idea:** A **2D array** is a table with **rows** and **columns**. Access with `a[row][col]`. Use **two nested loops**.

```text
data_type name[rows][cols];
```

```c
#include <stdio.h>

int main(void) {
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", a[i][j]);
        }
        printf("\n");
    }
    return 0;
}
```

```output
1 2 3
4 5 6
```

**Transpose** (rows become columns)

```c
#include <stdio.h>

int main(void) {
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int t[3][2];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            t[j][i] = a[i][j];
        }
    }

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", t[i][j]);
        }
        printf("\n");
    }
    return 0;
}
```

```output
1 4
2 5
3 6
```

**Matrix addition**

```c
#include <stdio.h>

int main(void) {
    int a[2][2] = {{1, 2}, {3, 4}};
    int b[2][2] = {{5, 6}, {7, 8}};

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", a[i][j] + b[i][j]);
        }
        printf("\n");
    }
    return 0;
}
```

```output
6 8
10 12
```

| Operation | Rule |
| --- | --- |
| Addition | `c[i][j] = a[i][j] + b[i][j]` (same size) |
| Transpose | `t[j][i] = a[i][j]` |
| Multiplication | `c[i][j] += a[i][k] * b[k][j]` (three loops) |
| Diagonal | Elements where `i == j` |

**Remember**

* Outer loop = **rows**, inner loop = **columns**.
* Memory is stored **row by row** (row-major).
* When passing a 2D array to a function, the **column size** is required: `int a[][3]`.
* Multiplication needs `columns of A == rows of B`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Declare | `int a[10];` |
| Initialize | `int a[3] = {1, 2, 3};` |
| Number of elements | `sizeof(a) / sizeof(a[0])` |
| Traverse | `for (int i = 0; i < n; i++)` |
| Sum | `sum += a[i];` |
| Max start value | `int max = a[0];` |
| Swap two items | `t = a[i]; a[i] = a[j]; a[j] = t;` |
| Reverse (half loop) | `i < n / 2` and swap with `a[n - 1 - i]` |
| 2D element | `a[row][col]` |
| Transpose | `t[j][i] = a[i][j];` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Index out of range (`a[n]`) | Use `i < n` |
| Starting the max with `0` | Start with `a[0]` |
| Not initializing `sum` | `int sum = 0;` |
| Copying with `b = a;` | Copy in a loop |
| Binary search on unsorted data | Sort first |
| Integer division for average | Cast: `(float)sum / n` |
| Reversing up to `n` | Loop only to `n / 2` |
| Sorting inner loop `j < n` | Use `j < n - 1 - i` |
| Missing column size in 2D parameter | `int a[][COLS]` |
| Swapping rows and columns in loops | Outer = rows, inner = columns |

---

## Last-Minute Checklist

* ✅ I know array indexes start at `0` and end at `size - 1`.
* ✅ I can find the number of elements with `sizeof`.
* ✅ I can traverse, sum and average an array.
* ✅ I can write linear search and explain binary search.
* ✅ I can write bubble sort and reverse an array.
* ✅ I can print, add and transpose a 2D array.
* ✅ I know arrays are passed to functions by address.

---

## Quiz: Rapid Fire 🧠

1. What is the index of the first element of an array?

- [ ] `1`
- [x] `0`
- [ ] `-1`
- [ ] Depends on the type

2. What does `int a[5] = {1, 2};` store in `a[4]`?

- [ ] Garbage
- [ ] `2`
- [x] `0`
- [ ] An error

3. Binary search requires the array to be:

- [ ] Reversed
- [ ] Of even size
- [x] Sorted
- [ ] Two-dimensional

4. How many passes does bubble sort need for `n` elements?

- [ ] `n`
- [x] `n - 1`
- [ ] `n + 1`
- [ ] `2n`

5. How do you access row 1, column 2 of a 2D array `a`?

- [ ] `a[2][1]`
- [x] `a[1][2]`
- [ ] `a(1, 2)`
- [ ] `a[1, 2]`

6. When an array is passed to a function:

- [ ] A full copy is made
- [x] The function receives its address and can change the original
- [ ] It becomes read-only
- [ ] Its size is passed automatically
