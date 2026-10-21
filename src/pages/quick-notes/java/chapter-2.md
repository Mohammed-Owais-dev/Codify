# Quick Notes: Chapter 2 - Java Basics

> **10-minute revision.** Know the structure of a Java program, the primitive data types, how to read input and print output, how type casting works, and the rules for comments and names.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 2.1 | Structure of a Java Program | Class, `main` method and statements; file name matches the public class |
| 2.2 | Variables, Constants and Data Types | Eight primitive types, `String`, and `final` for constants |
| 2.3 | Input and Output | `System.out.printf` to print, `Scanner` to read |
| 2.4 | Type Casting and Type Conversion | Widening is automatic, narrowing needs `(type)` |
| 2.5 | Comments and Naming Rules | `//`, `/* */`, `/** */`; camelCase, PascalCase, UPPER_CASE |

---

## 1. Structure of a Java Program (2.1)

**Core idea:** Every Java program has the same skeleton: a class that holds a `main` method.

```java
// Program to add two numbers
public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = 3;
        int sum = a + b;
        System.out.println("Sum = " + sum);
    }
}
```

```output
Sum = 8
```

**Order of parts in a source file**

```text
package statement        optional, must be first
import statements        optional
class declaration        required
    fields and methods
    main method          the starting point
```

**The `main` method, word by word**

| Word | Meaning |
| --- | --- |
| `public` | The JVM can call it from outside the class |
| `static` | It runs without creating an object |
| `void` | It returns nothing |
| `main` | The name the JVM looks for |
| `String[] args` | Command-line arguments |

**Remember**

* Execution **starts at `main`** and runs **top to bottom**.
* A file can have **only one `public` class**, and the file name must match it.
* Every statement ends with **`;`**. Blocks use **`{ }`**.
* Java is **case-sensitive**: `Main` and `main` are different.

---

## 2. Variables, Constants and Data Types (2.2)

**Core idea:** A **variable** is a named box in memory. Its **type** decides what it can hold.

```java
public class Main {
    public static void main(String[] args) {
        byte b = 100;
        short s = 30000;
        int i = 2000000000;
        long l = 9000000000L;
        float f = 3.14f;
        double d = 3.14159;
        char c = 'A';
        boolean ok = true;
        final double PI = 3.14159;

        System.out.println(b + " " + s + " " + i);
        System.out.println(l);
        System.out.println(f + " " + d);
        System.out.println(c + " " + ok);
        System.out.println("PI = " + PI);
    }
}
```

```output
100 30000 2000000000
9000000000
3.14 3.14159
A true
PI = 3.14159
```

**Primitive types**

| Type | Size | Holds | Example |
| --- | --- | --- | --- |
| `byte` | 1 byte | -128 to 127 | `byte b = 100;` |
| `short` | 2 bytes | -32,768 to 32,767 | `short s = 30000;` |
| `int` | 4 bytes | About -2.1 billion to 2.1 billion | `int i = 25;` |
| `long` | 8 bytes | Very large whole numbers | `long l = 9000000000L;` |
| `float` | 4 bytes | Decimals, about 7 digits | `float f = 3.14f;` |
| `double` | 8 bytes | Decimals, about 15 digits | `double d = 3.14;` |
| `char` | 2 bytes | One character | `char c = 'A';` |
| `boolean` | JVM decides | `true` or `false` | `boolean ok = true;` |

`String` is **not** a primitive. It is a class that holds text: `String name = "Asha";`

**Integer overflow**

```java
public class Main {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;
        System.out.println(max);
        System.out.println(max + 1);
        long big = max + 1L;
        System.out.println(big);
    }
}
```

```output
2147483647
-2147483648
2147483648
```

**Remember**

* Whole numbers default to **`int`**. Decimals default to **`double`**.
* Use **`L`** for `long` literals and **`f`** for `float` literals.
* `char` uses **single quotes**. `String` uses **double quotes**.
* A **local variable** must be given a value before you use it.
* `final` makes a variable a **constant**. Write constants in `UPPER_CASE`.

---

## 3. Input and Output (2.3)

**Core idea:** Print with `System.out`. Read from the keyboard with a `Scanner`.

```java
public class Main {
    public static void main(String[] args) {
        String name = "Asha";
        int age = 20;
        double marks = 87.456;

        System.out.printf("Name: %s%n", name);
        System.out.printf("Age: %d%n", age);
        System.out.printf("Marks: %.2f%n", marks);
        System.out.printf("%5d|%-5d|%05d%n", 42, 42, 42);
    }
}
```

```output
Name: Asha
Age: 20
Marks: 87.46
   42|42   |00042
```

| Specifier | Prints |
| --- | --- |
| `%d` | Integer |
| `%f` / `%.2f` | Decimal / decimal with 2 places |
| `%s` | String |
| `%c` | Character |
| `%b` | Boolean |
| `%n` | New line |

**Reading input with `Scanner`**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        System.out.print("Enter your age: ");
        int age = sc.nextInt();

        System.out.println("Hello " + name + ", you are " + age + " years old.");
        sc.close();
    }
}
```

If the user enters:

```text
Asha
20
```

The output will be:

```output
Enter your name: Asha
Enter your age: 20
Hello Asha, you are 20 years old.
```

| Method | Reads |
| --- | --- |
| `nextInt()` | An `int` |
| `nextDouble()` | A `double` |
| `nextBoolean()` | A `boolean` |
| `next()` | One word (stops at a space) |
| `nextLine()` | A whole line |

**Remember**

* Add **`import java.util.Scanner;`** at the top.
* `Scanner(System.in)` reads from the keyboard.
* After `nextInt()`, the **Enter key stays in the input**. Call `nextLine()` once to clear it before reading a line.
* Entering text where a number is expected throws `InputMismatchException`.

---

## 4. Type Casting and Type Conversion (2.4)

**Core idea:** Moving a value to a bigger type is automatic. Moving to a smaller type needs a **cast**.

```text
byte ──▶ short ──▶ int ──▶ long ──▶ float ──▶ double
          char ──▶ int
```

```java
public class Main {
    public static void main(String[] args) {
        int a = 10;
        double d = a;            // widening: automatic
        double pi = 9.78;
        int n = (int) pi;        // narrowing: manual cast

        System.out.println(d);
        System.out.println(n);
        System.out.println(7 / 2);
        System.out.println(7 / 2.0);
        System.out.println((double) 7 / 2);

        char c = 'A';
        System.out.println(c + 1);
        System.out.println((char) (c + 1));
    }
}
```

```output
10.0
9
3
3.5
3.5
66
B
```

| Kind | Direction | How | Data loss |
| --- | --- | --- | --- |
| Widening (implicit) | Small to large type | Automatic | No |
| Narrowing (explicit) | Large to small type | `(type) value` | Possible |

**Converting text and numbers**

```java
public class Main {
    public static void main(String[] args) {
        int x = Integer.parseInt("123");
        double y = Double.parseDouble("2.5");
        String t = String.valueOf(45);

        System.out.println(x + 1);
        System.out.println(y * 2);
        System.out.println(t + "6");
    }
}
```

```output
124
5.0
456
```

**Remember**

* `int / int` gives an **`int`**. Make one side a `double` to keep the decimals.
* `(int) 3.99` gives **3**. A cast **cuts off** the decimals, it does not round.
* `char + int` gives an **`int`**. Cast back with `(char)`.
* `Integer.parseInt("abc")` throws `NumberFormatException`.

---

## 5. Comments and Naming Rules (2.5)

**Core idea:** Comments are notes for humans. Good names make code readable.

```java
public class Main {
    public static void main(String[] args) {
        // single-line comment
        /* multi-line
           comment */
        int studentAge = 20;        // camelCase variable
        final int MAX_MARKS = 100;  // constant
        System.out.println(studentAge + " / " + MAX_MARKS);
    }
}
```

```output
20 / 100
```

| Comment | Syntax |
| --- | --- |
| Single-line | `// note` |
| Multi-line | `/* note */` |
| Documentation (Javadoc) | `/** note */` |

```text
/**
 * Adds two numbers.
 * @param a first number
 * @param b second number
 * @return the sum
 */
```

**Naming conventions**

| Item | Style | Example |
| --- | --- | --- |
| Class | PascalCase | `StudentRecord` |
| Variable, method | camelCase | `totalMarks`, `calculateTotal()` |
| Constant | UPPER_SNAKE_CASE | `MAX_SIZE` |
| Package | lowercase | `com.example.app` |

**Rules for identifiers**

| Valid | Invalid | Why |
| --- | --- | --- |
| `age` | `2total` | Cannot start with a digit |
| `_count` | `my age` | No spaces |
| `$price` | `total-marks` | No hyphens or symbols |
| `total2` | `class` | Cannot be a keyword |

**Remember**

* Names can contain letters, digits, `_` and `$`.
* Names are **case-sensitive**: `age` and `Age` are different.
* Do not use **keywords** such as `class`, `int`, `if`, `for`, `while`, `public`, `static`, `void`, `new`, `return`.
* Choose **meaningful names**: `totalMarks` is better than `tm`.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Declare and assign | `int age = 20;` |
| Text | `String name = "Asha";` |
| Constant | `final double PI = 3.14159;` |
| Read an int | `int n = sc.nextInt();` |
| Read a line | `String s = sc.nextLine();` |
| Import Scanner | `import java.util.Scanner;` |
| Formatted print | `System.out.printf("%.2f%n", x);` |
| Cast to int | `int n = (int) 9.78;` |
| Text to int | `Integer.parseInt("25")` |
| Number to text | `String.valueOf(25)` |
| Comments | `// one line` and `/* many lines */` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| `float f = 3.14;` gives an error | Write `3.14f` or use `double` |
| `long big = 9000000000;` gives an error | Add `L`: `9000000000L` |
| `int x = 9.5;` gives an error | Cast: `(int) 9.5` or use `double` |
| `7 / 2` expected to be `3.5` | Use `7 / 2.0` |
| Using a variable before giving it a value | Initialize it first |
| `nextLine()` skipped after `nextInt()` | Add an extra `sc.nextLine();` |
| Using `'text'` for a string | Use `"text"` |
| Name starts with a digit or has a space | Follow the identifier rules |

---

## Last-Minute Checklist

* I can write the skeleton: class, `main`, statements.
* I can list the 8 primitive types and their sizes.
* I know `int / int` gives an `int`.
* I can read input with `Scanner` and print with `printf`.
* I can cast between types and parse strings.
* I know the three kinds of comments and the naming styles.

---

## Quiz: Rapid Fire

1. Which method does the JVM call first?

- [ ] `start()`
- [ ] `run()`
- [x] `main()`
- [ ] `init()`

2. Which data type does Java use for `3.14` by default?

- [ ] `float`
- [x] `double`
- [ ] `int`
- [ ] `decimal`

3. What does `7 / 2` print in Java?

- [ ] `3.5`
- [ ] `4`
- [x] `3`
- [ ] `3.0`

4. Which keyword makes a variable a constant?

- [ ] `const`
- [ ] `static`
- [x] `final`
- [ ] `fixed`

5. Which class do you use to read keyboard input?

- [x] `Scanner`
- [ ] `Reader`
- [ ] `Keyboard`
- [ ] `Input`

6. Which is a valid variable name?

- [ ] `2total`
- [ ] `my-total`
- [ ] `class`
- [x] `_total`
