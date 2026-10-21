# Quick Notes: Chapter 10 - Basic Java Concepts

> **10-minute revision.** Know how packages and `import` organize code, how to read Java documentation and use the `Math` class, how command-line arguments work, how recursion solves problems, and the basic ideas of object-oriented programming.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 10.1 | Packages and import | Folders for classes; `import` lets you use them by short name |
| 10.2 | Java Documentation and Math Class | Javadoc comments, plus ready-made math methods |
| 10.3 | Command-Line Arguments | Values typed after the program name arrive in `args` |
| 10.4 | Recursion: Basic Introduction | A method that calls itself, with a base case to stop |
| 10.5 | Introduction to Object-Oriented Programming | Model real things as **objects** built from **classes** |

---

## 1. Packages and import (10.1)

**Core idea:** A **package** groups related classes, like a folder. `import` lets you use a class from another package without writing its full name.

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] nums = {3, 1, 2};
        Arrays.sort(nums);
        System.out.println(Arrays.toString(nums));

        System.out.println(java.util.Arrays.toString(new int[]{7, 8}));
        System.out.println(Math.max(4, 9));
    }
}
```

```output
[1, 2, 3]
[7, 8]
9
```

* `Arrays` needed an `import`.
* `java.util.Arrays` is the **fully qualified name**, so it needs no import.
* `Math` is in `java.lang`, which is imported **automatically**.

**Common packages**

| Package | Classes you will use |
| --- | --- |
| `java.lang` | `String`, `Math`, `System`, `Integer` (**auto-imported**) |
| `java.util` | `Scanner`, `Arrays`, `ArrayList`, `Random` |
| `java.io` | `File`, `IOException` |
| `java.time` | `LocalDate`, `LocalTime` |

**Import styles**

| Style | Meaning |
| --- | --- |
| `import java.util.Scanner;` | One specific class |
| `import java.util.*;` | Every class in the package (not sub-packages) |
| `import static java.lang.Math.*;` | Static members, so you can write `sqrt(4)` |

**Creating your own package**

```text
package com.codify.app;        // first line of the file

src/
└── com/
    └── codify/
        └── app/
            └── Main.java
```

**Remember**

* The `package` line must be the **first statement** in the file.
* The folder structure must **match** the package name.
* Package names are written in **lowercase**, such as `com.codify.app`.
* `import` goes **after** `package` and **before** the class.
* Two classes can share a name if they live in different packages, for example `java.util.Date` and `java.sql.Date`.

---

## 2. Java Documentation and Math Class (10.2)

**Core idea:** **Javadoc** comments describe your code. The **`Math`** class gives you common calculations as ready-made static methods.

**Javadoc comments** start with `/**` and use tags.

```java
public class Main {
    /**
     * Returns the area of a circle.
     *
     * @param radius the radius of the circle
     * @return the area of the circle
     */
    static double circleArea(double radius) {
        return Math.PI * radius * radius;
    }

    public static void main(String[] args) {
        System.out.printf("%.2f%n", circleArea(2));
    }
}
```

```output
12.57
```

| Tag | Describes |
| --- | --- |
| `@param name` | A parameter |
| `@return` | The returned value |
| `@throws` | An exception the method may throw |
| `@author` | Who wrote the class |

The `javadoc` tool turns these comments into an HTML documentation page. The official **Java API documentation** on the Oracle website lists every class and method, so look methods up there.

**The `Math` class**

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Math.abs(-7));
        System.out.println(Math.pow(2, 5));
        System.out.println(Math.sqrt(49));
        System.out.println(Math.max(3, 9));
        System.out.println(Math.min(3, 9));
        System.out.println(Math.ceil(4.2));
        System.out.println(Math.floor(4.8));
        System.out.println(Math.round(4.5));
        System.out.println(Math.round(2.4));
        System.out.println(Math.sqrt(Math.pow(3, 2) + Math.pow(4, 2)));
    }
}
```

```output
7
32.0
7.0
9
3
5.0
4.0
5
2
5.0
```

| Method | Returns | Meaning |
| --- | --- | --- |
| `Math.abs(x)` | Same type | Absolute value |
| `Math.pow(a, b)` | `double` | `a` to the power `b` |
| `Math.sqrt(x)` | `double` | Square root |
| `Math.max(a, b)` / `Math.min(a, b)` | Same type | Larger / smaller |
| `Math.ceil(x)` | `double` | Round **up** |
| `Math.floor(x)` | `double` | Round **down** |
| `Math.round(x)` | `long` (or `int` for `float`) | Nearest whole number |
| `Math.random()` | `double` | A number from `0.0` up to, but not including, `1.0` |
| `Math.PI` | `double` | The constant 3.14159... |

**A random number from 1 to 6**

```text
int dice = (int) (Math.random() * 6) + 1;
```

* `Math.random() * 6` gives `0.0` up to (not including) `6.0`.
* `(int)` cuts it to `0` to `5`.
* `+ 1` shifts it to `1` to `6`.

**Remember**

* `Math` methods are **static**: call them as `Math.sqrt(...)`, with no object.
* `Math.pow` and `Math.sqrt` return a **`double`**, so `Math.pow(2, 5)` prints `32.0`.
* `Math.round(x)` rounds halves **up** (`2.5` becomes `3`).
* To get an `int` from `Math.pow`, cast: `(int) Math.pow(2, 5)`.

---

## 3. Command-Line Arguments (10.3)

**Core idea:** Values typed **after the class name** when you run a program are passed to `main` as the `String[] args` array.

Run with: `java Main Asha 21`

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Arguments: " + args.length);
        for (int i = 0; i < args.length; i++) {
            System.out.println("args[" + i + "] = " + args[i]);
        }
    }
}
```

```output
Arguments: 2
args[0] = Asha
args[1] = 21
```

**Convert arguments to numbers.** Run with: `java Main 10 20`

```java
public class Main {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Usage: java Main <a> <b>");
            return;
        }

        int a = Integer.parseInt(args[0]);
        int b = Integer.parseInt(args[1]);
        System.out.println("Sum = " + (a + b));
    }
}
```

```output
Sum = 30
```

If you run it with no arguments, it prints `Usage: java Main <a> <b>`.

| Fact | Detail |
| --- | --- |
| Type | Always `String`, even for numbers |
| Separator | Spaces between arguments |
| Spaces inside one argument | Wrap it in quotes: `java Main "Asha Rao"` |
| Count | `args.length` (can be `0`) |
| First argument | `args[0]` |

**Remember**

* The class name is **not** part of `args`.
* Convert with `Integer.parseInt()` or `Double.parseDouble()`.
* Check `args.length` **before** reading `args[0]`, or you get `ArrayIndexOutOfBoundsException`.
* Bad number text throws a `NumberFormatException`.
* In an IDE, set the arguments in the run configuration instead of the terminal.

---

## 4. Recursion: Basic Introduction (10.4)

**Core idea:** **Recursion** is when a method **calls itself** to solve a smaller version of the same problem. Every recursive method needs a **base case** (when to stop) and a **recursive case** (the call that gets closer to the base case).

```java
public class Main {
    static long factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    static int sum(int n) {
        if (n == 0) {
            return 0;
        }
        return n + sum(n - 1);
    }

    static void countdown(int n) {
        if (n == 0) {
            System.out.println("Go!");
            return;
        }
        System.out.println(n);
        countdown(n - 1);
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
        System.out.println("Sum 1 to 4 = " + sum(4));
        countdown(3);
    }
}
```

```output
5! = 120
Sum 1 to 4 = 10
3
2
1
Go!
```

**How `factorial(3)` unfolds**

```text
factorial(3) = 3 * factorial(2)
             = 3 * (2 * factorial(1))
             = 3 * (2 * 1)
             = 6
```

Each call waits on the **call stack** until the one below it returns.

**Fibonacci and power**

```java
public class Main {
    static int fib(int n) {
        if (n <= 1) {
            return n;
        }
        return fib(n - 1) + fib(n - 2);
    }

    static int power(int base, int exp) {
        if (exp == 0) {
            return 1;
        }
        return base * power(base, exp - 1);
    }

    public static void main(String[] args) {
        for (int i = 0; i <= 6; i++) {
            System.out.print(fib(i) + " ");
        }
        System.out.println();
        System.out.println(power(2, 5));
    }
}
```

```output
0 1 1 2 3 5 8
32
```

| | Recursion | Loop |
| --- | --- | --- |
| Repeats by | The method calling itself | `for` / `while` |
| Stops at | The **base case** | The loop condition |
| Memory | Uses stack space for each call | Uses little extra memory |
| Best for | Naturally recursive problems (trees, divide and conquer) | Simple repetition |

**Remember**

* **No base case** (or one that is never reached) causes a **`StackOverflowError`**.
* Each recursive call must move **closer** to the base case: `n - 1`, not `n + 1`.
* `fib` as written is simple but slow for large `n`, because it repeats work.
* Use **`long`** for factorials. `int` overflows after `12!`.
* Anything recursive can also be written with a loop.

---

## 5. Introduction to Object-Oriented Programming (10.5)

**Core idea:** **Object-Oriented Programming (OOP)** builds a program from **objects**: things that have **data** (fields) and **actions** (methods). A **class** is the blueprint. An **object** is one thing built from it.

```java
class Car {
    String brand;
    int speed;

    Car(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
    }

    void show() {
        System.out.println(brand + " runs at " + speed + " km/h");
    }

    void speedUp(int by) {
        speed += by;
    }
}

public class Main {
    public static void main(String[] args) {
        Car c1 = new Car("Tata", 60);
        c1.show();
        c1.speedUp(20);
        c1.show();

        Car c2 = new Car("Honda", 80);
        c2.show();
    }
}
```

```output
Tata runs at 60 km/h
Tata runs at 80 km/h
Honda runs at 80 km/h
```

| Term | Meaning | In the example |
| --- | --- | --- |
| **Class** | Blueprint | `Car` |
| **Object** | One instance of a class | `c1`, `c2` |
| **Field** | Data stored in an object | `brand`, `speed` |
| **Method** | An action the object can do | `show()`, `speedUp()` |
| **Constructor** | Special method that sets up a new object | `Car(String, int)` |
| `this` | The current object | `this.brand = brand;` |
| `new` | Creates an object | `new Car("Tata", 60)` |

**Encapsulation: protect the data**

```java
class Account {
    private double balance;

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account();
        acc.deposit(500);
        acc.deposit(-100);
        System.out.println(acc.getBalance());
    }
}
```

```output
500.0
```

`private` hides the field. Outside code must use the methods, so the rules (no negative deposits) are always applied.

**A first look at inheritance**

```java
class Animal {
    void sound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Woof");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound();
    }
}
```

```output
Woof
```

**The four pillars of OOP**

| Pillar | Idea |
| --- | --- |
| **Encapsulation** | Keep data `private`, expose it through methods |
| **Inheritance** | A class reuses another with `extends` |
| **Polymorphism** | One call, different behavior depending on the object |
| **Abstraction** | Show *what* something does, hide *how* |

**Remember**

* A class has the **same name as its constructor**, and a constructor has **no return type**.
* If you write no constructor, Java supplies an empty **default constructor**.
* Each object has **its own copy** of the instance fields.
* Use the **dot** to reach members: `c1.show()`.
* Class names start with a **capital letter**: `Car`, `BankAccount`.
* Only **one public class** per file, and the file name must match it.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Import one class | `import java.util.Scanner;` |
| Declare a package | `package com.codify.app;` |
| Square root | `Math.sqrt(25)` |
| Power | `Math.pow(2, 3)` |
| Round to nearest | `Math.round(4.6)` |
| Random from 1 to 6 | `(int) (Math.random() * 6) + 1` |
| Read an argument | `args[0]` |
| Argument to `int` | `Integer.parseInt(args[0])` |
| Recursion skeleton | `if (base) return x; return f(smaller);` |
| Create a class | `class Car { ... }` |
| Create an object | `Car c = new Car();` |
| Call a method | `c.show();` |
| Hide a field | `private int speed;` |
| Inherit | `class Dog extends Animal` |
| Javadoc comment | `/** ... */` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Forgetting `import java.util.Scanner;` | Add the import |
| `package` line not first | Put it at the very top |
| Folder names not matching the package | Match them exactly |
| `Math.pow` result assigned to `int` | Cast: `(int) Math.pow(2, 3)` |
| `Math.random()` expected to include `1.0` | It ranges from `0.0` up to, but not including, `1.0` |
| Reading `args[0]` with no arguments | Check `args.length` first |
| Treating arguments as numbers | They are `String`; parse them |
| Recursion with no base case | Add one, and move toward it |
| `int` factorial overflow | Use `long` |
| Using a field without `this` when names clash | Write `this.name = name;` |
| Calling an instance method without an object | Create the object with `new` first |
| Making every field `public` | Make fields `private` and use methods |

---

## Last-Minute Checklist

* I can explain what a package is and use `import`.
* I know `java.lang` is imported automatically.
* I can write a Javadoc comment with `@param` and `@return`.
* I can use `Math.pow`, `sqrt`, `round`, `max`, `min` and `random`.
* I can read and convert command-line arguments safely.
* I can write a recursive method with a base case.
* I can create a class, a constructor and objects.
* I can name the four pillars of OOP.

---

## Quiz: Rapid Fire

1. Which package is imported automatically in every Java program?

- [ ] `java.util`
- [x] `java.lang`
- [ ] `java.io`
- [ ] `java.time`

2. What does `Math.pow(2, 3)` return?

- [ ] `8`
- [x] `8.0`
- [ ] `6`
- [ ] `9.0`

3. In `java Main Asha 21`, what is `args[1]`?

- [ ] `Main`
- [ ] `Asha`
- [x] `"21"` (a `String`)
- [ ] `21` (an `int`)

4. What must every recursive method have to avoid a `StackOverflowError`?

- [ ] A loop
- [x] A base case
- [ ] A `static` keyword
- [ ] A `void` return type

5. What is an object in Java?

- [ ] A blueprint for a class
- [ ] A kind of package
- [x] An instance created from a class
- [ ] A comment style

6. Which keyword creates a new object?

- [ ] `create`
- [ ] `make`
- [x] `new`
- [ ] `this`
