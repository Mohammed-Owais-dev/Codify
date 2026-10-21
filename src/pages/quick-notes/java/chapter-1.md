# Quick Notes: Chapter 1 - Introduction to Java

> **10-minute revision.** Know what Java is, why it runs on many systems, how the JDK, JRE and JVM differ, how to set up your tools, and how to compile and run your first program.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 1.1 | What is Java? | An object-oriented language that compiles to bytecode and runs on the JVM |
| 1.2 | Features and Uses of Java | Platform independent, secure, robust and used almost everywhere |
| 1.3 | JDK, JRE and JVM | JDK builds programs, JRE runs them, JVM executes bytecode |
| 1.4 | Setting Up Java and VS Code | Install a JDK, add the Java extension pack, check with `java -version` |
| 1.5 | Your First Java Program | `System.out.println("Hello, World!");` inside `main` |

---

## 1. What is Java? (1.1)

**Core idea:** **Java** is a general-purpose, object-oriented language built on the idea **"Write Once, Run Anywhere"**.

* Created by **James Gosling** and his team at **Sun Microsystems**. First released in **1995** (the early name was *Oak*).
* **Oracle** bought Sun Microsystems in 2010 and now looks after Java.
* A Java program is **compiled** to **bytecode**, then the **JVM** runs that bytecode.
* Java is **strongly typed** and **case-sensitive**.
* New versions arrive every 6 months. **LTS** (long-term support) versions include 8, 11, 17, 21 and 25.

**From source code to a running program**

```text
Main.java ──▶ javac (compiler) ──▶ Main.class (bytecode) ──▶ JVM ──▶ runs on Windows / Mac / Linux
 source code                        same file on every OS      one JVM for each OS
```

**Remember**

* Source file extension: **`.java`**. Compiled file: **`.class`**.
* The **same `.class` file** runs on any system that has a JVM. That is platform independence.
* Java and JavaScript are **different languages**.

---

## 2. Features and Uses of Java (1.2)

**Core idea:** Java is reliable and portable, so big companies use it for software that must run for years.

| Feature | Meaning |
| --- | --- |
| Simple | Clean syntax; no pointers or manual memory handling |
| Object-oriented | Programs are built from classes and objects |
| Platform independent | Bytecode runs on any JVM |
| Secure | Bytecode is checked before it runs; no direct memory access |
| Robust | Strong type checking, exception handling, garbage collection |
| Multithreaded | Many tasks can run at the same time |
| High performance | The JIT compiler turns hot bytecode into fast machine code |

**Where Java is used**

| Area | Examples |
| --- | --- |
| Android apps | Many apps and the Android libraries |
| Web and enterprise back ends | Spring, Jakarta EE |
| Banking and finance | Trading and payment systems |
| Big data | Hadoop and related tools |
| Games | Minecraft: Java Edition |
| Desktop apps | IDEs such as IntelliJ IDEA |

**Remember**

* The **garbage collector** frees unused memory automatically.
* Java is **compiled and interpreted**: `javac` compiles, the JVM runs.
* Java is one of the most common languages for jobs and interviews.

---

## 3. JDK, JRE and JVM (1.3)

**Core idea:** The three names are layers. Each one contains the one inside it.

```text
┌────────────────── JDK (Java Development Kit) ──────────────────┐
│  Tools: javac, java, javadoc, jar, debugger                    │
│  ┌──────────── JRE (Java Runtime Environment) ──────────────┐  │
│  │  Class libraries: java.lang, java.util, java.io ...      │  │
│  │  ┌────────── JVM (Java Virtual Machine) ──────────────┐  │  │
│  │  │  Loads, checks and runs bytecode                   │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

| Part | Job | Who needs it |
| --- | --- | --- |
| **JVM** | Runs bytecode; manages memory; JIT compiles | Everyone, built in |
| **JRE** | JVM plus the standard class libraries | Users who only run programs |
| **JDK** | JRE plus the compiler and developer tools | **Programmers** |

**Remember**

* To write and compile programs, install the **JDK**.
* The **JVM is different for each operating system**, but **bytecode is the same**.
* `javac` is the compiler. `java` is the launcher that starts the JVM.

---

## 4. Setting Up Java and VS Code (1.4)

**Core idea:** Install a JDK, install VS Code with the Java extension, and check that the tools work.

| Tool | Purpose |
| --- | --- |
| JDK (OpenJDK, Temurin or Oracle JDK) | Compiler, runtime and libraries |
| VS Code | Code editor |
| Extension Pack for Java (Microsoft) | Run, debug and code help inside VS Code |
| Terminal | Compile and run from the command line |

**Steps**

| Step | Action |
| --- | --- |
| 1 | Download and install a JDK |
| 2 | Open a terminal and check the install |
| 3 | Install VS Code |
| 4 | Install **Extension Pack for Java** from the Extensions panel |
| 5 | Create a folder and a file named `Main.java` |

**Check the install**

```text
java -version       shows the runtime version
javac -version      shows the compiler version
```

**Compile and run**

```text
javac Main.java     compile: creates Main.class
java Main           run: use the class name, not Main.java or Main.class
```

**Remember**

* If `javac` is not found, add the JDK `bin` folder to the **`PATH`**, or reinstall a **JDK** (not only a JRE).
* `JAVA_HOME` is an environment variable that points to the JDK folder. Some tools need it.
* In VS Code, the **Run** button above `main` compiles and runs the file for you.

---

## 5. Your First Java Program (1.5)

**Core idea:** Every Java program lives inside a class. The program starts at the `main` method.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```output
Hello, World!
```

| Line | Meaning |
| --- | --- |
| `public class Main` | Declares a class named `Main` |
| `public static void main(String[] args)` | The **starting point** of the program |
| `System.out.println(...)` | Prints text and moves to a new line |
| `{ }` | Start and end of a block |
| `;` | Ends a statement |

**print, println, printf and escape sequences**

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Hello ");
        System.out.println("Java");
        System.out.println("Welcome to Java programming");
        System.out.println("She said \"Hi\"");
        System.out.println("Path: C:\\files");
        System.out.printf("Age: %d%n", 20);
    }
}
```

```output
Hello Java
Welcome to Java programming
She said "Hi"
Path: C:\files
Age: 20
```

| Sequence | Meaning |
| --- | --- |
| `\n` | New line |
| `\t` | Tab |
| `\"` | Double quote |
| `\\` | Backslash |
| `%n` | New line inside `printf` |

**Common compile errors**

| Message | Likely cause |
| --- | --- |
| `error: ';' expected` | Missing semicolon |
| `error: cannot find symbol` | A typo such as `system.out` or `Println` |
| `error: class Hello is public, should be declared in a file named Hello.java` | File name does not match the public class |
| `error: Could not find or load main class Main` (from `java`) | Wrong class name, or `.class` file not compiled |

**Remember**

* The file name must match the **public class**: `Main` goes in `Main.java`.
* `print` stays on the same line. `println` moves to the next line.
* Text goes in **double quotes** `"..."`. A single character uses single quotes `'A'`.
* Java is **case-sensitive**: `System` works, `system` does not.

---

## Cheat Sheet

| Need | Code or command |
| --- | --- |
| Smallest program | `public class Main { public static void main(String[] args) { } }` |
| Print and go to next line | `System.out.println("Hello");` |
| Print on the same line | `System.out.print("Hello");` |
| Formatted print | `System.out.printf("Age: %d%n", 20);` |
| Comment | `// note` or `/* note */` |
| Compile | `javac Main.java` |
| Run | `java Main` |
| Check versions | `java -version` and `javac -version` |
| New line / tab | `\n` / `\t` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| File name differs from the public class name | Rename so they match exactly, including capitals |
| Missing `;` at the end of a statement | Add it |
| Writing `system.out.println` | Use `System` with a capital S |
| Running `java Main.java` after compiling | Run `java Main` |
| Single quotes for text: `'Hello'` | Use double quotes: `"Hello"` |
| Installing only a JRE | Install a JDK to get `javac` |
| Forgetting to save before compiling | Save the file first |
| Mismatched braces `{ }` | Count and indent your braces |

---

## Last-Minute Checklist

* I know Java was created by James Gosling and first released in 1995.
* I can explain source code, bytecode and the JVM.
* I can explain the difference between JDK, JRE and JVM.
* I can check my install with `java -version` and `javac -version`.
* I can write, compile and run a Hello World program.
* I know `print`, `println` and `printf`.

---

## Quiz: Rapid Fire

1. Who created Java?

- [ ] Dennis Ritchie
- [ ] Bjarne Stroustrup
- [x] James Gosling
- [ ] Guido van Rossum

2. Which file does the Java compiler create from `Main.java`?

- [ ] `Main.exe`
- [ ] `Main.obj`
- [x] `Main.class`
- [ ] `Main.bytecode.java`

3. What does the JVM run?

- [ ] Source code
- [x] Bytecode
- [ ] Only machine code for Windows
- [ ] HTML

4. Which command compiles `Main.java`?

- [ ] `java Main.java`
- [ ] `run Main`
- [x] `javac Main.java`
- [ ] `compile Main`

5. Which one do you install to write and compile Java programs?

- [ ] JRE only
- [ ] JVM only
- [x] JDK
- [ ] A browser plugin

6. Which statement prints text and then moves to a new line?

- [ ] `System.out.print()`
- [x] `System.out.println()`
- [ ] `Console.write()`
- [ ] `printf.line()`
