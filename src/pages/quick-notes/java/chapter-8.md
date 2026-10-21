# Quick Notes: Chapter 8 - Strings

> **10-minute revision.** Know what a `String` is, how to create one and read it from the keyboard, how to measure, index and join strings, how to compare and modify them, and the common `String` methods.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 8.1 | Introduction to Strings | A `String` is an **object** holding text, and it is **immutable** |
| 8.2 | Creating and Taking String Input | Literals, `new String`, and `next()` vs `nextLine()` |
| 8.3 | String Length, Characters and Concatenation | `length()`, `charAt()` and `+` |
| 8.4 | Comparing and Modifying Strings | Use `equals`, not `==`; modifying makes a **new** string |
| 8.5 | Common String Methods | `substring`, `indexOf`, `replace`, `split` and more |

---

## 1. Introduction to Strings (8.1)

**Core idea:** A **`String`** is a sequence of characters. It is a class, so every string is an **object** with its own methods.

```java
public class Main {
    public static void main(String[] args) {
        String name = "Codify";
        char first = 'C';

        System.out.println(name);
        System.out.println(first);
        System.out.println(name.length());
    }
}
```

```output
Codify
C
6
```

| | `String` | `char` |
| --- | --- | --- |
| Quotes | Double: `"A"` | Single: `'A'` |
| Holds | Any number of characters | Exactly one character |
| Type | Class (object) | Primitive |
| Methods | Yes, such as `name.length()` | No |

**Strings are immutable**

Once a `String` is created, its characters **cannot be changed**. Methods that seem to change it return a **new** string.

**The string pool**

String literals are stored in a shared **string pool**, so identical literals reuse one object.

```text
String a = "Java";      ->  pool: "Java"  <- a, b both point here
String b = "Java";
String c = new String("Java");  ->  a separate object in the heap
```

**Remember**

* `String` starts with a **capital S**.
* A string can be empty (`""`), which is different from `null` (no object at all).
* Special characters use an escape: `\n` new line, `\t` tab, `\"` quote, `\\` backslash.

---

## 2. Creating and Taking String Input (8.2)

**Core idea:** Create strings with a literal (usual) or with `new`. Read them with `Scanner`.

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = new String("Hello");
        char[] letters = {'J', 'a', 'v', 'a'};
        String s3 = new String(letters);
        String s4 = String.valueOf(2026);

        System.out.println(s1 + " " + s2 + " " + s3 + " " + s4);
        System.out.println("Line1\nLine2");
        System.out.println("She said \"Hi\"");
    }
}
```

```output
Hello Hello Java 2026
Line1
Line2
She said "Hi"
```

**Reading strings.** If the user types `Asha Rao` and then presses Enter:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String word = sc.next();
        String rest = sc.nextLine();

        System.out.println("word = [" + word + "]");
        System.out.println("rest = [" + rest + "]");
        sc.close();
    }
}
```

```output
word = [Asha]
rest = [ Rao]
```

| Method | Reads |
| --- | --- |
| `sc.next()` | One word (stops at whitespace) |
| `sc.nextLine()` | A whole line, including spaces |
| `sc.nextInt()` | An integer, and leaves the Enter key in the buffer |

**The `nextLine()` trap**

After `nextInt()`, the Enter key is still waiting. The next `nextLine()` reads that leftover and returns an empty string.

```text
int age = sc.nextInt();
sc.nextLine();                 // consume the leftover Enter
String name = sc.nextLine();   // now reads the real line
```

**Remember**

* Use **`nextLine()`** for names with spaces.
* `Scanner` has **no** `nextChar()`. Use `sc.next().charAt(0)`.
* Import it: `import java.util.Scanner;`.

---

## 3. String Length, Characters and Concatenation (8.3)

**Core idea:** `length()` counts the characters, `charAt(i)` reads one, and `+` joins strings.

```java
public class Main {
    public static void main(String[] args) {
        String s = "Java";

        System.out.println(s.length());
        System.out.println(s.charAt(0));
        System.out.println(s.charAt(s.length() - 1));

        for (int i = 0; i < s.length(); i++) {
            System.out.print(s.charAt(i) + "-");
        }
        System.out.println();

        String full = "Co" + "dify";
        String joined = full.concat(" Notes");
        System.out.println(joined);
    }
}
```

```output
4
J
a
J-a-v-a-
Codify Notes
```

**How `+` behaves**

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Age: " + 20 + 5);
        System.out.println("Age: " + (20 + 5));
        System.out.println(1 + 2 + "A");
        System.out.println("A" + 1 + 2);
        System.out.println('a' + 1);
        System.out.println("" + 'a' + 1);
    }
}
```

```output
Age: 205
Age: 25
3A
A12
98
a1
```

* `+` works **left to right**. Once a `String` appears, everything after it is joined as text.
* `'a' + 1` is **number** addition (`97 + 1`) because neither side is a `String`.

**Counting characters**

```java
public class Main {
    public static void main(String[] args) {
        String text = "education";
        int vowels = 0;

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                vowels++;
            }
        }
        System.out.println("Vowels = " + vowels);
    }
}
```

```output
Vowels = 5
```

**Remember**

* `length()` has **brackets** for strings. Arrays use `length` without them.
* Valid indexes are `0` to `length() - 1`. Anything else throws **`StringIndexOutOfBoundsException`**.
* For many joins inside a loop, use **`StringBuilder`**. It is faster than repeated `+`.

---

## 4. Comparing and Modifying Strings (8.4)

**Core idea:** Compare **contents** with `equals()`. Never use `==` for text. Strings never change, so every "modification" gives a **new** string.

```java
public class Main {
    public static void main(String[] args) {
        String a = "Java";
        String b = new String("Java");
        String c = "Java";

        System.out.println(a == b);
        System.out.println(a.equals(b));
        System.out.println(a == c);
        System.out.println("java".equals(a));
        System.out.println("java".equalsIgnoreCase(a));
    }
}
```

```output
false
true
true
false
true
```

| Method | Compares |
| --- | --- |
| `==` | **References**: are they the same object? |
| `equals()` | The **characters**, with case |
| `equalsIgnoreCase()` | The characters, ignoring case |
| `compareTo()` | Alphabetical order (see below) |

**Alphabetical order with `compareTo()`**

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("apple".compareTo("banana"));
        System.out.println("banana".compareTo("apple"));
        System.out.println("apple".compareTo("apple"));
    }
}
```

```output
-1
1
0
```

* Negative: the first string comes **before** the second.
* `0`: the strings are equal.
* Positive: the first string comes **after** the second.

**Strings are immutable**

```java
public class Main {
    public static void main(String[] args) {
        String s = "java";

        s.toUpperCase();
        System.out.println(s);

        s = s.toUpperCase();
        System.out.println(s);

        String t = "  hi  ";
        System.out.println("[" + t.trim() + "]");
        System.out.println("hello".replace('l', 'L'));
    }
}
```

```output
java
JAVA
[hi]
heLLo
```

**Remember**

* `s.toUpperCase();` alone does nothing useful. **Store the result**: `s = s.toUpperCase();`.
* `==` can seem to work for literals (same pool object) and then fail for input or `new String`. Always use `equals()`.
* To compare while ignoring case, use `equalsIgnoreCase()`.
* Put the literal first, `"yes".equals(input)`, to avoid a `NullPointerException` when `input` is `null`.

---

## 5. Common String Methods (8.5)

**Core idea:** The `String` class has ready-made methods for searching, cutting, replacing and splitting text.

```java
public class Main {
    public static void main(String[] args) {
        String s = "Hello, Java";

        System.out.println(s.length());
        System.out.println(s.substring(7));
        System.out.println(s.substring(0, 5));
        System.out.println(s.indexOf("Java"));
        System.out.println(s.indexOf('z'));
        System.out.println(s.contains("Java"));
        System.out.println(s.startsWith("Hello"));
        System.out.println(s.endsWith("va"));
        System.out.println(s.replace("Java", "World"));
        System.out.println(s.toUpperCase());
        System.out.println(s.toLowerCase());
        System.out.println(s.isEmpty());
    }
}
```

```output
11
Java
Hello
7
-1
true
true
true
Hello, World
HELLO, JAVA
hello, java
false
```

**Splitting, joining and converting**

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        String csv = "red,green,blue";
        String[] parts = csv.split(",");

        System.out.println(parts.length);
        System.out.println(Arrays.toString(parts));
        System.out.println(String.join(" | ", parts));

        char[] chars = "abc".toCharArray();
        System.out.println(chars.length);

        String number = String.valueOf(45);
        System.out.println(number + 1);
        System.out.println(Integer.parseInt("45") + 1);
    }
}
```

```output
3
[red, green, blue]
red | green | blue
3
451
46
```

**Palindrome check with `StringBuilder`**

```java
public class Main {
    public static void main(String[] args) {
        String word = "madam";
        String reversed = new StringBuilder(word).reverse().toString();

        System.out.println(reversed);
        System.out.println(word.equals(reversed) ? "Palindrome" : "Not a palindrome");
    }
}
```

```output
madam
Palindrome
```

| Method | Purpose | Example result |
| --- | --- | --- |
| `length()` | Number of characters | `"Java".length()` gives `4` |
| `charAt(i)` | Character at index | `"Java".charAt(1)` gives `'a'` |
| `substring(a)` | From `a` to the end | `"Hello".substring(2)` gives `"llo"` |
| `substring(a, b)` | From `a` up to **before** `b` | `"Hello".substring(1, 3)` gives `"el"` |
| `indexOf(x)` | First position, or `-1` | `"Java".indexOf("v")` gives `2` |
| `lastIndexOf(x)` | Last position, or `-1` | `"banana".lastIndexOf("a")` gives `5` |
| `contains(x)` | Is it inside? | `true` or `false` |
| `replace(a, b)` | Replace every `a` with `b` | `"aab".replace("a","x")` gives `"xxb"` |
| `trim()` | Remove outer spaces | `"  hi ".trim()` gives `"hi"` |
| `split(sep)` | Break into a `String[]` | `"a,b".split(",")` gives `["a", "b"]` |
| `isEmpty()` | Length is `0`? | `"".isEmpty()` gives `true` |
| `isBlank()` | Empty or only spaces? | `"  ".isBlank()` gives `true` |

**Remember**

* In `substring(a, b)`, the end index `b` is **excluded**.
* `indexOf` returns `-1` when nothing is found. Always check it before using it as an index.
* `split` takes a **regular expression**. To split on a dot or a pipe, escape it: `split("\\.")`.
* None of these methods change the original string.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Create | `String s = "Hello";` |
| Length | `s.length()` |
| First / last character | `s.charAt(0)` / `s.charAt(s.length() - 1)` |
| Join | `a + b` or `a.concat(b)` |
| Compare text | `a.equals(b)` |
| Compare ignoring case | `a.equalsIgnoreCase(b)` |
| Alphabetical order | `a.compareTo(b)` |
| Part of a string | `s.substring(start, end)` |
| Find | `s.indexOf("x")` |
| Contains | `s.contains("x")` |
| Replace | `s.replace("a", "b")` |
| Change case | `s.toUpperCase()` / `s.toLowerCase()` |
| Remove outer spaces | `s.trim()` |
| Split | `s.split(",")` |
| Reverse | `new StringBuilder(s).reverse().toString()` |
| Read a line | `sc.nextLine()` |
| Number to string | `String.valueOf(n)` |
| String to number | `Integer.parseInt(s)` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Comparing strings with `==` | Use `equals()` |
| `s.toUpperCase();` with no assignment | `s = s.toUpperCase();` |
| `s.length` without brackets | `s.length()` |
| `nextLine()` right after `nextInt()` | Add an extra `sc.nextLine()` |
| `charAt(s.length())` | The last index is `length() - 1` |
| Forgetting `substring` excludes the end | `substring(0, 3)` gives 3 characters |
| `"Age: " + 20 + 5` giving `205` | Use brackets: `"Age: " + (20 + 5)` |
| `'a' + 1` giving `98` | Join with a string: `"" + 'a' + 1` |
| Calling a method on `null` | Check for `null` first |
| Splitting on `"."` or `"|"` | Escape: `"\\."` and `"\\|"` |
| Treating `"A"` and `'A'` as the same | Double quotes are `String`, single quotes are `char` |

---

## Last-Minute Checklist

* I know a `String` is an immutable object.
* I can create strings and read a full line with `nextLine()`.
* I can use `length()`, `charAt()` and `+`.
* I always compare strings with `equals()`.
* I remember that string methods return a **new** string.
* I can use `substring`, `indexOf`, `replace`, `split` and `trim`.
* I can reverse a string and check for a palindrome.

---

## Quiz: Rapid Fire

1. Which method should you use to compare the contents of two strings?

- [ ] `==`
- [x] `equals()`
- [ ] `compare()`
- [ ] `same()`

2. What does `"Hello".charAt(1)` return?

- [ ] `'H'`
- [x] `'e'`
- [ ] `'l'`
- [ ] `"e"`

3. What does `System.out.println("Hello".substring(1, 3));` print?

- [ ] `Hel`
- [x] `el`
- [ ] `ell`
- [ ] `ello`

4. What does `1 + 2 + "A"` evaluate to?

- [ ] `"12A"`
- [x] `"3A"`
- [ ] `"A12"`
- [ ] A compile error

5. Which statement is true about strings in Java?

- [ ] They are primitive types
- [ ] They can be changed in place
- [x] They are immutable objects
- [ ] They are written in single quotes

6. What does `"banana".indexOf("z")` return?

- [ ] `0`
- [ ] `null`
- [x] `-1`
- [ ] An exception
