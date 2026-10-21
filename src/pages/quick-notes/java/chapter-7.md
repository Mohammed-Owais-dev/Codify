# Quick Notes: Chapter 7 - Arrays

> **10-minute revision.** Know what an array is, how to create, fill and access it, how to loop through it and read input into it, the common array operations, and how 2D arrays work.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 7.1 | Introduction to Arrays | One variable that stores many values of the same type |
| 7.2 | Creating, Initializing and Accessing Arrays | `new int[5]` or `{1, 2, 3}`; read with `arr[index]` |
| 7.3 | Array Traversal and Input | Loop with `for` or for-each; fill with `Scanner` |
| 7.4 | Basic Array Operations | Sum, max, min, search, reverse, sort, copy |
| 7.5 | 2D Arrays | An array of arrays: rows and columns |

---

## 1. Introduction to Arrays (7.1)

**Core idea:** An **array** stores a **fixed number** of values of the **same type** under one name. Each value has an **index**, starting at `0`.

```java
public class Main {
    public static void main(String[] args) {
        int[] marks = {80, 65, 90, 72};

        System.out.println(marks[0]);
        System.out.println(marks[3]);
        System.out.println(marks.length);
    }
}
```

```output
80
72
4
```

```text
Index:    0    1    2    3
Value:  [ 80 | 65 | 90 | 72 ]
```

**Why use arrays**

* One name for many values instead of `mark1`, `mark2`, `mark3`...
* Easy to process with loops.
* Elements sit next to each other in memory, so access by index is fast.

**Remember**

* An array has a **fixed size**. It cannot grow or shrink once created.
* All elements must have the **same type**.
* Arrays are **objects**: the variable holds a reference to the data.
* The first index is `0`, and the last index is `length - 1`.

---

## 2. Creating, Initializing and Accessing Arrays (7.2)

**Core idea:** Declare the type with `[]`, then either give the size with `new` or list the values in `{ }`.

```java
public class Main {
    public static void main(String[] args) {
        int[] a = new int[3];
        a[0] = 10;
        a[1] = 20;

        String[] names = {"Asha", "Ravi", "Meena"};
        double[] prices = new double[2];
        boolean[] flags = new boolean[2];

        System.out.println(a[0] + " " + a[1] + " " + a[2]);
        System.out.println(names[1]);
        System.out.println(prices[0]);
        System.out.println(flags[0]);

        names[1] = "Kiran";
        System.out.println(names[1]);
    }
}
```

```output
10 20 0
Ravi
0.0
false
Kiran
```

**Default values** (when you use `new` without filling the array)

| Type | Default |
| --- | --- |
| `int`, `long`, `short`, `byte` | `0` |
| `double`, `float` | `0.0` |
| `boolean` | `false` |
| `char` | `'\u0000'` (the null character) |
| `String` and other objects | `null` |

**Ways to create an array**

| Style | Example |
| --- | --- |
| Size only | `int[] a = new int[5];` |
| Values only | `int[] a = {1, 2, 3};` |
| `new` with values | `int[] a = new int[]{1, 2, 3};` |

**Remember**

* Using an index outside `0` to `length - 1` throws **`ArrayIndexOutOfBoundsException`**.
* `length` is a **field** of arrays, written **without** `( )`: `arr.length`. (For a `String` it is `length()`.)
* The short form `{1, 2, 3}` works only **in the declaration line**.
* `int[] a = b;` does **not** copy the array. Both names point to the same data.

---

## 3. Array Traversal and Input (7.3)

**Core idea:** Use a loop to visit every element. A `for` loop gives you the **index**. A for-each loop gives you each **value**.

```java
public class Main {
    public static void main(String[] args) {
        int[] nums = {5, 10, 15, 20};

        for (int i = 0; i < nums.length; i++) {
            System.out.print(nums[i] + " ");
        }
        System.out.println();

        for (int n : nums) {
            System.out.print(n * 2 + " ");
        }
        System.out.println();

        for (int i = nums.length - 1; i >= 0; i--) {
            System.out.print(nums[i] + " ");
        }
        System.out.println();
    }
}
```

```output
5 10 15 20
10 20 30 40
20 15 10 5
```

**Reading array values from the user.** If the user types `10 20 30`:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[3];

        for (int i = 0; i < arr.length; i++) {
            arr[i] = sc.nextInt();
        }

        int sum = 0;
        for (int value : arr) {
            sum += value;
        }
        System.out.println("Sum = " + sum);
        sc.close();
    }
}
```

```output
Sum = 60
```

| Loop | Best for | Limit |
| --- | --- | --- |
| `for (int i = 0; ...)` | Using the index, changing elements, going backwards | More to write |
| `for (int n : arr)` | Reading every element | You cannot change the array through `n`, and you have no index |

**Remember**

* Loop condition: `i < arr.length`, **not** `<=`.
* To **change** elements, use an index: `arr[i] = arr[i] * 2;`.
* Ask the user for the size first, then create the array: `new int[size]`.

---

## 4. Basic Array Operations (7.4)

**Core idea:** Most array problems are a loop that **accumulates**, **compares** or **swaps**.

```java
public class Main {
    public static void main(String[] args) {
        int[] nums = {4, 9, 2, 7};

        int sum = 0;
        int max = nums[0];
        int min = nums[0];

        for (int n : nums) {
            sum += n;
            if (n > max) max = n;
            if (n < min) min = n;
        }

        System.out.println("Sum = " + sum);
        System.out.println("Max = " + max);
        System.out.println("Min = " + min);
        System.out.println("Average = " + (double) sum / nums.length);
    }
}
```

```output
Sum = 22
Max = 9
Min = 2
Average = 5.5
```

**Linear search and reverse in place**

```java
public class Main {
    public static void main(String[] args) {
        int[] nums = {4, 9, 2, 7};
        int target = 2;
        int index = -1;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                index = i;
                break;
            }
        }
        System.out.println("Found at index " + index);

        for (int i = 0; i < nums.length / 2; i++) {
            int temp = nums[i];
            nums[i] = nums[nums.length - 1 - i];
            nums[nums.length - 1 - i] = temp;
        }
        for (int n : nums) {
            System.out.print(n + " ");
        }
        System.out.println();
    }
}
```

```output
Found at index 2
7 2 9 4
```

**Useful `java.util.Arrays` methods**

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] nums = {4, 9, 2, 7};

        System.out.println(Arrays.toString(nums));

        Arrays.sort(nums);
        System.out.println(Arrays.toString(nums));

        int[] copy = Arrays.copyOf(nums, 6);
        System.out.println(Arrays.toString(copy));

        int[] same = nums;
        same[0] = 99;
        System.out.println(nums[0]);

        System.out.println(Arrays.equals(new int[]{1, 2}, new int[]{1, 2}));
    }
}
```

```output
[4, 9, 2, 7]
[2, 4, 7, 9]
[2, 4, 7, 9, 0, 0]
99
true
```

| Method | What it does |
| --- | --- |
| `Arrays.toString(arr)` | Text form such as `[1, 2, 3]` |
| `Arrays.sort(arr)` | Sorts in ascending order, in place |
| `Arrays.copyOf(arr, n)` | New array of length `n` (pads with defaults) |
| `Arrays.fill(arr, v)` | Sets every element to `v` |
| `Arrays.equals(a, b)` | Compares the **contents** of two arrays |

**Remember**

* Start `max` and `min` with `nums[0]`, not `0`, so negative numbers work.
* Cast before dividing for an average: `(double) sum / n`.
* `System.out.println(arr)` prints a code like `[I@1b6d3586`, not the values. Use `Arrays.toString(arr)`.
* `arr1 == arr2` and `arr1.equals(arr2)` compare **references**. Use `Arrays.equals`.

---

## 5. 2D Arrays (7.5)

**Core idea:** A **2D array** is an array of arrays. Think of a table: `arr[row][column]`.

```java
public class Main {
    public static void main(String[] args) {
        int[][] m = {
            {1, 2, 3},
            {4, 5, 6}
        };

        System.out.println(m[1][2]);
        System.out.println("Rows = " + m.length);
        System.out.println("Columns = " + m[0].length);

        int sum = 0;
        for (int r = 0; r < m.length; r++) {
            for (int c = 0; c < m[r].length; c++) {
                System.out.print(m[r][c] + " ");
                sum += m[r][c];
            }
            System.out.println();
        }
        System.out.println("Total = " + sum);
    }
}
```

```output
6
Rows = 2
Columns = 3
1 2 3
4 5 6
Total = 21
```

```text
          col 0  col 1  col 2
row 0  [    1      2      3  ]
row 1  [    4      5      6  ]
```

**Creating 2D arrays**

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[][] grid = new int[2][3];
        grid[0][1] = 7;
        System.out.println(Arrays.deepToString(grid));

        int[][] jagged = new int[3][];
        jagged[0] = new int[]{1};
        jagged[1] = new int[]{1, 2};
        jagged[2] = new int[]{1, 2, 3};
        System.out.println(jagged[2].length);
    }
}
```

```output
[[0, 7, 0], [0, 0, 0]]
3
```

**Remember**

* `m.length` is the number of **rows**. `m[0].length` is the number of **columns**.
* Use **nested loops**: rows outside, columns inside.
* Rows can have **different lengths** (a jagged array), so loop to `m[r].length`.
* Use `Arrays.deepToString(m)` to print a 2D array. `Arrays.toString` is only for 1D.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Create with size | `int[] a = new int[5];` |
| Create with values | `int[] a = {1, 2, 3};` |
| Read an element | `a[0]` |
| Change an element | `a[2] = 50;` |
| Number of elements | `a.length` |
| Last element | `a[a.length - 1]` |
| Loop with index | `for (int i = 0; i < a.length; i++)` |
| Loop over values | `for (int n : a)` |
| Print an array | `Arrays.toString(a)` |
| Sort | `Arrays.sort(a);` |
| 2D array | `int[][] m = new int[3][4];` |
| 2D size | `m.length` rows, `m[0].length` columns |
| Print 2D | `Arrays.deepToString(m)` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `i <= arr.length` in the loop | Use `i < arr.length` |
| `ArrayIndexOutOfBoundsException` | Keep the index between `0` and `length - 1` |
| `arr.length()` with brackets | Arrays use `arr.length`; `String` uses `length()` |
| Printing an array directly | Use `Arrays.toString(arr)` |
| `int[] b = a;` expecting a copy | Use `Arrays.copyOf(a, a.length)` or `a.clone()` |
| Comparing arrays with `==` | Use `Arrays.equals(a, b)` |
| Starting `max` at `0` | Start with the first element |
| Integer division for the average | `(double) sum / n` |
| Changing elements with for-each | Use an index loop |
| Mixing rows and columns in 2D | `m[row][col]` |

---

## Last-Minute Checklist

* I know arrays are fixed-size, same-type and start at index `0`.
* I can create an array with `new` and with `{ }`.
* I know the default value for each type.
* I can loop with an index and with for-each.
* I can find the sum, maximum, minimum and average.
* I can search, reverse, sort and copy an array.
* I can build and print a 2D array with nested loops.

---

## Quiz: Rapid Fire

1. What is the index of the first element of an array?

- [ ] `1`
- [x] `0`
- [ ] `-1`
- [ ] `length`

2. What does `new int[3]` contain?

- [ ] Three `null` values
- [x] Three `0` values
- [ ] Garbage values
- [ ] Nothing

3. How do you get the number of elements in an array `arr`?

- [ ] `arr.length()`
- [ ] `arr.size()`
- [x] `arr.length`
- [ ] `length(arr)`

4. Which exception happens when you use `arr[5]` on an array of length 5?

- [ ] `NullPointerException`
- [x] `ArrayIndexOutOfBoundsException`
- [ ] `ArithmeticException`
- [ ] `NumberFormatException`

5. Which call prints the contents of a 1D array readably?

- [ ] `System.out.println(arr)`
- [ ] `arr.print()`
- [x] `System.out.println(Arrays.toString(arr))`
- [ ] `Arrays.show(arr)`

6. In `int[][] m = new int[2][3];`, what is `m[0].length`?

- [ ] `2`
- [x] `3`
- [ ] `5`
- [ ] `6`
