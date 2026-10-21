# Quick Notes: Chapter 9 - Java Basics in More Detail

> **10-minute revision.** Know where a variable can be used (scope), the difference between local, instance and static variables, what `final` does, how wrapper classes work, and how to read and fix common Java errors.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 9.1 | Scope of Variables | A variable lives only inside the `{ }` block where it is declared |
| 9.2 | Local, Instance and Static Variables | Per method, per object, or shared by the whole class |
| 9.3 | final Keyword | Makes a variable a constant (and locks methods and classes) |
| 9.4 | Wrapper Classes | Objects for primitives: `Integer`, `Double`, `Character`... |
| 9.5 | Common Java Errors and Debugging | Read the message, find the line, fix the cause |

---

## 1. Scope of Variables (9.1)

**Core idea:** The **scope** of a variable is the part of the program where it can be used. In Java, it is the **block** `{ }` where the variable is declared, from the declaration line to the closing brace.

```java
public class Main {
    public static void main(String[] args) {
        int x = 10;

        {
            int y = 20;
            System.out.println(x + y);
        }

        for (int i = 0; i < 2; i++) {
            int square = i * i;
            System.out.println("i = " + i + ", square = " + square);
        }
    }
}
```

```output
30
i = 0, square = 0
i = 1, square = 1
```

Using a variable outside its block is a **compile error**:

```text
System.out.println(y);   // error: cannot find symbol
System.out.println(i);   // error: cannot find symbol (i lived only in the for loop)
```

| Where declared | Usable |
| --- | --- |
| Inside a method | Only in that method, after the declaration |
| Inside a loop or `if` block | Only inside that block |
| `for` header (`int i`) | Only in the loop |
| Method parameter | Only in that method |
| Outside all methods, inside the class | In the whole class (instance or static variable) |

**Remember**

* A variable must be **declared before** it is used.
* Java does **not** allow a local variable to reuse the name of another local variable that is still in scope.
* Declare a variable **before** the loop if you need its value **after** the loop.
* Keep scope **small**. It makes bugs easier to find.

---

## 2. Local, Instance and Static Variables (9.2)

**Core idea:** Where a variable is declared decides **how long it lives** and **who owns it**.

```java
public class Main {
    static int count = 0;
    String name;

    Main(String name) {
        this.name = name;
        count++;
    }

    public static void main(String[] args) {
        Main a = new Main("A");
        Main b = new Main("B");

        int local = 5;

        System.out.println(a.name + " " + b.name);
        System.out.println("Objects: " + count);
        System.out.println(local);
    }
}
```

```output
A B
Objects: 2
5
```

| | Local | Instance | Static |
| --- | --- | --- | --- |
| Declared | Inside a method or block | In the class, **without** `static` | In the class, **with** `static` |
| Belongs to | The method call | **Each object** | The **class** (one shared copy) |
| Lives | Until the block ends | As long as the object exists | While the program runs |
| Default value | **None** (must assign) | Yes | Yes |
| Accessed with | Its name | `object.name` | `ClassName.name` |

**Default values for instance and static variables**

```java
class Student {
    int marks;
    String name;
    boolean passed;
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        System.out.println(s.marks + " " + s.name + " " + s.passed);
    }
}
```

```output
0 null false
```

**Remember**

* A **local** variable must be given a value before use, or you get **"variable might not have been initialized"**.
* Every object gets **its own copy** of instance variables.
* A **static** variable is shared by all objects. Changing it in one place changes it for everyone.
* A `static` method cannot use instance variables directly, because it has no object.
* Access static members through the class name: `Main.count`.

---

## 3. final Keyword (9.3)

**Core idea:** `final` means **"cannot be changed after it is set"**.

```java
public class Main {
    static final int MAX_ATTEMPTS = 3;

    public static void main(String[] args) {
        final int DAYS_IN_WEEK = 7;

        for (int i = 1; i <= MAX_ATTEMPTS; i++) {
            System.out.println("Attempt " + i);
        }
        System.out.println("Days = " + DAYS_IN_WEEK);

        // DAYS_IN_WEEK = 8;   // compile error: cannot assign a value to final variable
    }
}
```

```output
Attempt 1
Attempt 2
Attempt 3
Days = 7
```

**`final` on a variable, method and class**

| Used on | Effect |
| --- | --- |
| Variable | Value can be assigned **only once** |
| Method | Cannot be **overridden** in a subclass |
| Class | Cannot be **extended** (for example `String` is final) |

**`final` with arrays and objects**

The **reference** is locked, but the **contents** can still change.

```java
public class Main {
    public static void main(String[] args) {
        final int[] arr = {1, 2, 3};

        arr[0] = 10;
        System.out.println(arr[0]);

        // arr = new int[3];   // compile error: the reference is final
    }
}
```

```output
10
```

**Remember**

* Name constants in `UPPER_SNAKE_CASE`: `MAX_SPEED`, `TAX_RATE`.
* Class-wide constants are written `static final`: one shared, unchangeable copy.
* A `final` variable **must** be assigned exactly once.
* `final` does not make an object immutable. It only fixes the reference.

---

## 4. Wrapper Classes (9.4)

**Core idea:** Every primitive type has a **wrapper class** that turns the value into an object and adds helpful methods.

| Primitive | Wrapper |
| --- | --- |
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | `Integer` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |

```java
public class Main {
    public static void main(String[] args) {
        int a = Integer.parseInt("42");
        double d = Double.parseDouble("3.5");

        Integer boxed = a;
        int back = boxed;

        System.out.println(a + 8);
        System.out.println(d * 2);
        System.out.println(back);
        System.out.println(Integer.MAX_VALUE);
        System.out.println(Integer.MIN_VALUE);
        System.out.println(Integer.toString(99) + 1);
    }
}
```

```output
50
7.0
42
2147483647
-2147483648
991
```

**Autoboxing and unboxing**

| Term | Meaning | Example |
| --- | --- | --- |
| **Autoboxing** | Primitive converted to wrapper automatically | `Integer x = 5;` |
| **Unboxing** | Wrapper converted to primitive automatically | `int y = x;` |

**Handy `Character` methods**

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Character.isDigit('7'));
        System.out.println(Character.isLetter('7'));
        System.out.println(Character.isUpperCase('a'));
        System.out.println(Character.toUpperCase('a'));
    }
}
```

```output
true
false
false
A
```

| Method | Purpose |
| --- | --- |
| `Integer.parseInt(s)` | `String` to `int` |
| `Double.parseDouble(s)` | `String` to `double` |
| `Integer.valueOf(n)` | Primitive or string to `Integer` |
| `Integer.toString(n)` | `int` to `String` |
| `Integer.compare(a, b)` | Negative, `0` or positive |
| `Character.isLetter(c)` | Is it a letter? |

**Remember**

* Wrappers are needed for **collections** such as `ArrayList<Integer>`, which cannot hold primitives.
* A wrapper can be **`null`**. Unboxing a `null` throws a `NullPointerException`.
* Compare wrapper objects with **`equals()`**, not `==`.
* `Integer.parseInt("abc")` throws a **`NumberFormatException`**.

---

## 5. Common Java Errors and Debugging (9.5)

**Core idea:** There are three kinds of problems. Learn to tell them apart.

| Kind | When it appears | Example |
| --- | --- | --- |
| **Compile-time error** | Before the program runs | Missing `;`, wrong type |
| **Runtime exception** | While the program runs | Divide by zero, bad index |
| **Logic error** | Program runs, but the answer is wrong | Wrong formula |

**Common compile-time errors**

| Message | Usual cause |
| --- | --- |
| `';' expected` | Missing semicolon (check the line above too) |
| `cannot find symbol` | Typo, undeclared variable, or out of scope |
| `incompatible types: possible lossy conversion from double to int` | Needs a cast: `(int) value` |
| `missing return statement` | A path in the method never returns |
| `variable might not have been initialized` | A local variable was never assigned |
| `class X is public, should be declared in a file named X.java` | The file name must match the public class |
| `reached end of file while parsing` | A missing `}` |

**Common runtime exceptions**

| Exception | Cause |
| --- | --- |
| `ArithmeticException: / by zero` | Integer division by `0` |
| `ArrayIndexOutOfBoundsException` | Index not between `0` and `length - 1` |
| `StringIndexOutOfBoundsException` | Bad index for `charAt` or `substring` |
| `NullPointerException` | Using a `null` reference |
| `NumberFormatException` | `Integer.parseInt("abc")` |
| `InputMismatchException` | `Scanner.nextInt()` got text |

**Handling exceptions with `try-catch`**

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }

        try {
            int[] a = new int[3];
            a[5] = 1;
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: " + e.getMessage());
        }

        String text = null;
        try {
            System.out.println(text.length());
        } catch (NullPointerException e) {
            System.out.println("text is null");
        } finally {
            System.out.println("Done");
        }
    }
}
```

```output
Error: / by zero
Error: Index 5 out of bounds for length 3
text is null
Done
```

* `try` holds the risky code.
* `catch` runs only if that exception happens.
* `finally` runs **every time**, with or without an exception.

**A logic error: the program runs, but the answer is wrong**

```java
public class Main {
    public static void main(String[] args) {
        int a = 5, b = 2;

        double wrong = (a + b) / 2;
        double right = (a + b) / 2.0;

        System.out.println(wrong);
        System.out.println(right);
    }
}
```

```output
3.0
3.5
```

`(a + b) / 2` is **integer division**, so the `.5` is lost before it is stored in the `double`.

**Debugging steps**

1. **Read** the error message. Note the **line number**.
2. Look at that line **and the line above it**.
3. Read the **stack trace** from the top: the first line shows the exception, the next lines show where.
4. Add `System.out.println` to check values.
5. Use the IDE **debugger**: set a **breakpoint**, run, and step through the code.
6. Fix **one** error at a time, then recompile.

**Remember**

* Java is **case-sensitive**: `String` is not `string`, `main` is not `Main`.
* Fix the **first** compile error first. Later ones are often caused by it.
* Never leave a `catch` block empty. At least print the message.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Constant | `static final double TAX_RATE = 0.18;` |
| Shared counter | `static int count = 0;` |
| Per-object field | `String name;` |
| String to int | `Integer.parseInt("42")` |
| String to double | `Double.parseDouble("3.5")` |
| Int to string | `String.valueOf(42)` |
| Largest int | `Integer.MAX_VALUE` |
| Is it a digit? | `Character.isDigit(c)` |
| Handle an error | `try { ... } catch (Exception e) { ... }` |
| Always run | `finally { ... }` |
| Error message | `e.getMessage()` |
| Cast to avoid lossy error | `int x = (int) 3.9;` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Using a variable outside its block | Declare it in a wider scope |
| Using a local variable before assigning it | Give it a starting value |
| Changing a `final` variable | Assign it only once |
| Assuming `final` arrays cannot change | Only the reference is locked |
| Using `==` on `Integer` objects | Use `equals()` |
| Unboxing a `null` wrapper | Check for `null` first |
| `(a + b) / 2` for an average | Use `2.0` or cast to `double` |
| Public class name differs from the file name | Rename one to match |
| Empty `catch` block | Print or handle the error |
| Fixing the last error first | Start with the **first** error |
| Static method using an instance variable | Create an object, or make the variable `static` |

---

## Last-Minute Checklist

* I know a variable exists only inside its `{ }` block.
* I can tell local, instance and static variables apart.
* I know local variables have no default value.
* I can create constants with `final` and `static final`.
* I can convert between strings, primitives and wrappers.
* I understand autoboxing and unboxing.
* I can read an error message and find the line.
* I can use `try-catch-finally` for a simple exception.

---

## Quiz: Rapid Fire

1. Where is a variable declared inside a `for` loop header usable?

- [ ] In the whole method
- [ ] In the whole class
- [x] Only inside the loop
- [ ] In the whole program

2. Which variable is **shared** by all objects of a class?

- [ ] Local variable
- [ ] Instance variable
- [x] `static` variable
- [ ] Parameter

3. What does the `final` keyword do to a variable?

- [ ] Makes it `static`
- [x] Allows it to be assigned only once
- [ ] Makes it private
- [ ] Deletes it after use

4. What does `Integer.parseInt("25")` return?

- [ ] The `String` `"25"`
- [ ] The `double` `25.0`
- [x] The `int` `25`
- [ ] A `NumberFormatException`

5. Which exception is thrown by `10 / 0` with integers?

- [ ] `NullPointerException`
- [x] `ArithmeticException`
- [ ] `NumberFormatException`
- [ ] `ArrayIndexOutOfBoundsException`

6. When does a `finally` block run?

- [ ] Only if an exception happens
- [ ] Only if there is no exception
- [x] Every time, with or without an exception
- [ ] Never
