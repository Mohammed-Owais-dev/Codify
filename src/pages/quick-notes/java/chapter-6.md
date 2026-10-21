# Quick Notes: Chapter 6 - Methods

> **10-minute revision.** Know what a method is, how to create and call one, how parameters and return values work, when to use `void`, and how method overloading lets one name do several jobs.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 6.1 | What are Methods? | A named block of code you write once and run many times |
| 6.2 | Creating and Calling Methods | Define the method, then call it by name with `()` |
| 6.3 | Parameters and Arguments | Pass data into a method; Java passes **copies** of values |
| 6.4 | Return Values and void | `return` sends a result back; `void` sends nothing |
| 6.5 | Method Overloading | Same name, different parameter lists |

---

## 1. What are Methods? (6.1)

**Core idea:** A **method** is a named block of code that performs one task. Write it once, call it as many times as you like.

```java
public class Main {
    static void greet() {
        System.out.println("Hello from a method!");
    }

    public static void main(String[] args) {
        greet();
        greet();
    }
}
```

```output
Hello from a method!
Hello from a method!
```

**Anatomy of a method**

```text
static  int  add  (int a, int b)  { return a + b; }
  |      |    |        |                 |
modifier return name  parameters        body
         type
```

| Part | Role |
| --- | --- |
| Modifier | Access and kind of method, such as `public` or `static` |
| Return type | The type of value sent back, or `void` for nothing |
| Name | Use `camelCase` and a verb, such as `calculateTotal` |
| Parameters | Inputs the method needs, in `( )` |
| Body | The code inside `{ }` |

**Why use methods**

* **Reuse:** write once, call many times.
* **Clarity:** a long program becomes small, named steps.
* **Easy fixes:** change the logic in one place.

**Remember**

* `main` is itself a method: the starting point of every Java program.
* Methods in Java must be written **inside a class**.
* Java also has **built-in methods** such as `System.out.println()` and `Math.sqrt()`.

---

## 2. Creating and Calling Methods (6.2)

**Core idea:** A method does nothing until it is **called**. Call it by writing its name followed by `( )`.

```java
public class Main {
    static void line() {
        System.out.println("--------");
    }

    static void header() {
        line();
        System.out.println("  CODIFY");
        line();
    }

    public static void main(String[] args) {
        System.out.println("Start");
        header();
        System.out.println("End");
    }
}
```

```output
Start
--------
  CODIFY
--------
End
```

**Syntax**

```text
static returnType methodName(parameters) {
    // body
}
```

**Remember**

* Execution **always starts in `main`**. Methods run only when called.
* The order in which you write methods in the file does **not** matter.
* A method can call another method, as `header()` calls `line()`.
* From `main` (which is `static`), you can call other methods directly only if they are also `static`. Methods without `static` need an **object** (Chapter 10).
* Methods **cannot** be written inside other methods.

---

## 3. Parameters and Arguments (6.3)

**Core idea:** **Parameters** are the variables in the method definition. **Arguments** are the actual values you pass when calling.

```java
public class Main {
    static void greet(String name, int age) {
        System.out.println(name + " is " + age + " years old");
    }

    public static void main(String[] args) {
        greet("Asha", 21);
        greet("Ravi", 25);
    }
}
```

```output
Asha is 21 years old
Ravi is 25 years old
```

```text
static void greet(String name, int age)   <- parameters
greet("Asha", 21);                        <- arguments
```

**Java passes by value**

For primitive types, the method gets a **copy**. Changing the copy does not change the original.

```java
public class Main {
    static void changeValue(int x) {
        x = 100;
    }

    static void setFirst(int[] arr) {
        arr[0] = 99;
    }

    public static void main(String[] args) {
        int n = 5;
        changeValue(n);
        System.out.println("n = " + n);

        int[] numbers = {1, 2, 3};
        setFirst(numbers);
        System.out.println("numbers[0] = " + numbers[0]);
    }
}
```

```output
n = 5
numbers[0] = 99
```

For arrays and other objects, the method gets a copy of the **reference** (the address). Both point to the **same array**, so changing its elements **does** affect the original.

| Passed | What the method receives | Can it change the original? |
| --- | --- | --- |
| `int`, `double`, `boolean`, `char` | A copy of the value | No |
| Array or object | A copy of the reference | Yes, its contents |

**Remember**

* The number, **order** and **types** of arguments must match the parameters.
* Parameter names and argument names do not need to match.
* Parameters exist only **inside** their method.

---

## 4. Return Values and void (6.4)

**Core idea:** `return` sends a value back to the caller. A `void` method returns nothing.

```java
public class Main {
    static int square(int n) {
        return n * n;
    }

    static boolean isEven(int n) {
        return n % 2 == 0;
    }

    static int max(int a, int b) {
        if (a > b) {
            return a;
        }
        return b;
    }

    public static void main(String[] args) {
        int result = square(6);
        System.out.println(result);
        System.out.println(isEven(7));
        System.out.println(square(3) + square(4));
        System.out.println(max(8, 12));
    }
}
```

```output
36
false
25
12
```

**Using `return` in a `void` method to stop early**

```java
public class Main {
    static void check(int age) {
        if (age < 18) {
            System.out.println("Too young");
            return;
        }
        System.out.println("Allowed");
    }

    public static void main(String[] args) {
        check(15);
        check(20);
    }
}
```

```output
Too young
Allowed
```

| Return type | Must `return`? | Example |
| --- | --- | --- |
| `int`, `double`, `String`, ... | Yes, a matching value | `return n * n;` |
| `boolean` | Yes, `true` or `false` | `return n > 0;` |
| `void` | No (a plain `return;` stops early) | `System.out.println(...)` |

**Remember**

* A method can return **only one** value (use an array or object to return more).
* Every path through a non-`void` method must end in a `return`, or you get **"missing return statement"**.
* Code written **after** `return` is unreachable and causes a compile error.
* The returned value can be stored in a variable, printed or used in an expression.
* Calling a `void` method inside `System.out.println(...)` is an error.

---

## 5. Method Overloading (6.5)

**Core idea:** **Overloading** means several methods with the **same name** but **different parameter lists** in the same class.

```java
public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }

    static int add(int a, int b, int c) {
        return a + b + c;
    }

    static void print(String s) {
        System.out.println("String: " + s);
    }

    static void print(int n) {
        System.out.println("int: " + n);
    }

    public static void main(String[] args) {
        System.out.println(add(2, 3));
        System.out.println(add(2.5, 3.5));
        System.out.println(add(1, 2, 3));
        print("Hi");
        print(7);
    }
}
```

```output
5
6.0
6
String: Hi
int: 7
```

**What makes two methods different**

| Different in | Valid overload? |
| --- | --- |
| Number of parameters | Yes |
| Types of parameters | Yes |
| Order of parameter types | Yes, for example `(int, String)` and `(String, int)` |
| Return type only | **No**, a compile error |
| Parameter names only | **No** |

**Remember**

* Java picks the version that **best matches** the argument types at compile time.
* `add(2, 3.5)` calls the `double` version, because `2` is widened to `2.0`.
* `System.out.println()` itself is overloaded: it accepts `int`, `double`, `String`, `char` and more.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Method with no result | `static void show() { ... }` |
| Method with a result | `static int add(int a, int b) { return a + b; }` |
| Call a method | `show();` |
| Use the result | `int total = add(2, 3);` |
| Pass several arguments | `greet("Asha", 21);` |
| Stop a `void` method early | `return;` |
| Overload a method | Same name, different parameters |
| Method that tests something | `static boolean isEven(int n) { return n % 2 == 0; }` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Calling a method without `( )` | Write `show();`, not `show;` |
| "missing return statement" | Make sure every path returns a value |
| Wrong argument order or count | Match the parameter list exactly |
| Using the result of a `void` method | `void` returns nothing; give it a return type |
| Expecting a changed `int` after a call | Java passes a copy; `return` the new value instead |
| Overloading by return type only | Change the parameter list |
| Calling a non-static method from `main` | Make it `static`, or create an object |
| Code after `return` | Remove it; it never runs |
| Defining a method inside another method | Define methods side by side inside the class |

---

## Last-Minute Checklist

* I can name the parts of a method: modifier, return type, name, parameters, body.
* I can write and call a method with and without parameters.
* I know the difference between a **parameter** and an **argument**.
* I know that Java passes primitives by value.
* I can write methods that return `int`, `boolean` and `double`.
* I can use `return;` to leave a `void` method early.
* I can overload a method correctly.

---

## Quiz: Rapid Fire

1. What is the return type of a method that returns nothing?

- [ ] `null`
- [ ] `empty`
- [x] `void`
- [ ] `none`

2. What are the values passed when a method is called named?

- [ ] Parameters
- [x] Arguments
- [ ] Variables
- [ ] Returns

3. A method has the header `static void change(int x)` and its body is `x = 50;`. After `int n = 10; change(n);`, what does `System.out.println(n);` print?

- [ ] `50`
- [x] `10`
- [ ] `0`
- [ ] Compile error

4. Which change makes a valid overload of `int add(int a, int b)`?

- [ ] `double add(int a, int b)`
- [x] `int add(int a, int b, int c)`
- [ ] `int add(int x, int y)`
- [ ] `void add(int a, int b)`

5. How many values can a Java method return directly?

- [ ] None
- [x] One
- [ ] Two
- [ ] Any number

6. Where does program execution always begin?

- [ ] The first method in the file
- [ ] The method with the longest name
- [x] The `main` method
- [ ] Any `static` method
