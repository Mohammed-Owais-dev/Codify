# Quick Notes: Chapter 8 - Strings

> **15-minute revision.** A C string is a `char` array that ends with the null character `'\0'`. Know how to read and print strings, the `<string.h>` functions (`strlen`, `strcpy`, `strcat`, `strcmp`, `strchr`, `strstr`) and the classic problems: reverse, palindrome and counting.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 8.1 | Introduction to Strings | `char` array ending with `'\0'` |
| 8.2 | Reading, Printing & Length | `scanf`, `fgets`, `printf`, `strlen` |
| 8.3 | Copying & Concatenating | `strcpy`, `strcat`; never use `=` or `+` |
| 8.4 | Comparing & Searching | `strcmp`, `strchr`, `strstr`; never use `==` |
| 8.5 | Common String Problems | Reverse, palindrome, vowels, case change |

---

## 1. Introduction to Strings (8.1)

**Core idea:** C has no string type. A **string** is an array of `char` whose last element is the **null terminator** `'\0'`.

| Declaration | Meaning |
| --- | --- |
| `char s[] = "Hello";` | Size 6: `H e l l o \0` |
| `char s[10] = "Hi";` | Size 10, the rest is `\0` |
| `char s[6] = {'H','e','l','l','o','\0'};` | Same as the first line |
| `char s[20];` | Empty space for up to 19 characters + `\0` |

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char name[] = "Hello";

    printf("%s\n", name);
    printf("Size = %zu, Length = %zu\n", sizeof(name), strlen(name));
    return 0;
}
```

```output
Hello
Size = 6, Length = 5
```

| `'A'` | `"A"` |
| --- | --- |
| A single **character** (1 byte) | A **string** (`'A'` and `'\0'`, 2 bytes) |
| Single quotes | Double quotes |
| Format `%c` | Format `%s` |

**Remember**

* Always leave **one extra byte** for `'\0'`.
* `sizeof` counts the null character; `strlen` does **not**.
* Strings use `%s`; a single character uses `%c`.
* Functions in `<string.h>` rely on the `'\0'` to know where a string ends.

---

## 2. Reading, Printing & String Length (8.2)

**Core idea:** `scanf("%s")` reads **one word**. `fgets` reads a **whole line**. `strlen` (or a loop) gives the length.

| Function | Reads | Notes |
| --- | --- | --- |
| `scanf("%s", s)` | One word | Stops at a space; **no `&`** needed for arrays |
| `fgets(s, size, stdin)` | A whole line | Keeps the `\n` at the end; safe |
| `gets(s)` | A line | **Removed from C11. Never use.** |
| `printf("%s", s)` | Prints a string | |
| `puts(s)` | Prints a string + newline | |

```c
#include <stdio.h>

int main(void) {
    char name[30];

    printf("Enter name: ");
    scanf("%s", name);
    printf("Hello, %s\n", name);
    return 0;
}
```

If the user enters:

```text
Asha
```

The output will be:

```output
Enter name: Asha
Hello, Asha
```

**Length without `strlen`, and character-by-character printing**

```c
#include <stdio.h>

int main(void) {
    char s[] = "Codify";
    int len = 0;

    while (s[len] != '\0') {
        len++;
    }
    printf("Length = %d\n", len);

    for (int i = 0; i < len; i++) {
        printf("%c ", s[i]);
    }
    printf("\n");
    return 0;
}
```

```output
Length = 6
C o d i f y
```

**Remember**

* `scanf("%s")` stops at the first space: "Asha Reddy" reads only `Asha`.
* Use `fgets(s, sizeof(s), stdin)` for sentences, then remove the newline: `s[strcspn(s, "\n")] = '\0';`.
* Limit input to avoid overflow: `scanf("%29s", name);` for `char name[30]`.
* Loop until `'\0'`, not until a fixed number.

---

## 3. Copying & Concatenating Strings (8.3)

**Core idea:** You **cannot** copy or join strings with `=` or `+`. Use `strcpy` and `strcat`.

| Function | Purpose |
| --- | --- |
| `strcpy(dest, src)` | Copy `src` into `dest` |
| `strncpy(dest, src, n)` | Copy at most `n` characters |
| `strcat(dest, src)` | Append `src` to the end of `dest` |
| `strncat(dest, src, n)` | Append at most `n` characters |
| `strlen(s)` | Length (without `'\0'`) |

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char src[] = "Hello";
    char dest[20];

    strcpy(dest, src);
    strcat(dest, " World");

    printf("%s\n", dest);
    printf("Length = %zu\n", strlen(dest));
    return 0;
}
```

```output
Hello World
Length = 11
```

**Copy manually**

```c
#include <stdio.h>

int main(void) {
    char src[] = "Code";
    char dest[10];
    int i = 0;

    while (src[i] != '\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\0';

    printf("%s\n", dest);
    return 0;
}
```

```output
Code
```

**Remember**

* `dest` must be **large enough** for the result, including `'\0'`.
* `dest = src;` and `a + b` do **not** work on arrays.
* `strcat` needs `dest` to be a valid string already (with `'\0'`).
* In a manual copy, **add `'\0'`** at the end yourself.

---

## 4. Comparing & Searching Strings (8.4)

**Core idea:** Compare with `strcmp`, never with `==` (which compares **addresses**).

| `strcmp(a, b)` returns | Meaning |
| --- | --- |
| `0` | Strings are **equal** |
| Negative | `a` comes **before** `b` |
| Positive | `a` comes **after** `b` |

| Search function | Finds |
| --- | --- |
| `strchr(s, 'c')` | First occurrence of a character |
| `strrchr(s, 'c')` | Last occurrence of a character |
| `strstr(s, "sub")` | First occurrence of a substring |

These return a pointer to the match or `NULL` if not found (pointers are covered in Chapter 9).

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char text[] = "Welcome to Codify";

    printf("Equal: %d\n", strcmp("apple", "apple") == 0);
    printf("apple before banana: %d\n", strcmp("apple", "banana") < 0);

    if (strstr(text, "Codify") != NULL) {
        printf("Codify found\n");
    }
    if (strchr(text, 'z') == NULL) {
        printf("z not found\n");
    }

    int count = 0;
    for (int i = 0; text[i] != '\0'; i++) {
        if (text[i] == 'o') {
            count++;
        }
    }
    printf("o appears %d times\n", count);
    return 0;
}
```

```output
Equal: 1
apple before banana: 1
Codify found
z not found
o appears 3 times
```

**Remember**

* `strcmp` is **case-sensitive**: `"Apple"` and `"apple"` are different.
* `strcmp` is `0` when the strings are **equal**, so test `strcmp(a, b) == 0`.
* Comparison goes character by character using ASCII values.
* `strcasecmp` (POSIX) ignores case; otherwise convert both to lowercase first.

---

## 5. Common String Problems (8.5)

**Core idea:** Most string programs are a **loop to `'\0'`** plus a small decision. Use `<ctype.h>` for `toupper`, `tolower`, `isalpha`, `isdigit`.

**Reverse and palindrome**

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "madam";
    int n = strlen(s);
    int isPal = 1;

    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - 1 - i]) {
            isPal = 0;
            break;
        }
    }
    printf("%s is %sa palindrome\n", s, isPal ? "" : "not ");

    char w[] = "code";
    int len = strlen(w);
    for (int i = 0; i < len / 2; i++) {
        char t = w[i];
        w[i] = w[len - 1 - i];
        w[len - 1 - i] = t;
    }
    printf("Reversed: %s\n", w);
    return 0;
}
```

```output
madam is a palindrome
Reversed: edoc
```

**Count vowels and change case**

```c
#include <stdio.h>
#include <ctype.h>

int main(void) {
    char s[] = "Programming";
    int vowels = 0;

    for (int i = 0; s[i] != '\0'; i++) {
        char c = tolower(s[i]);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            vowels++;
        }
    }
    printf("Vowels = %d\n", vowels);

    char t[] = "codify";
    for (int i = 0; t[i] != '\0'; i++) {
        t[i] = toupper(t[i]);
    }
    printf("%s\n", t);
    return 0;
}
```

```output
Vowels = 3
CODIFY
```

| Problem | Idea |
| --- | --- |
| Length | Count until `'\0'` |
| Reverse | Swap `s[i]` with `s[n - 1 - i]` for `i < n / 2` |
| Palindrome | Compare `s[i]` with `s[n - 1 - i]` |
| Count vowels | Check each character against `a e i o u` after `tolower` |
| Uppercase | `toupper(s[i])` for every character |
| Count words | Count spaces + 1 (single spaces) |

**Remember**

* Include `<ctype.h>` for `toupper`, `tolower`, `isalpha`, `isdigit`, `isspace`.
* A lowercase letter minus `32` gives its uppercase (ASCII), but `toupper` is clearer.
* Always loop to `n / 2` when swapping or comparing from both ends.
* Convert to one case first for case-insensitive checks.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Declare | `char s[20];` or `char s[] = "Hi";` |
| Length | `strlen(s)` |
| Read a word | `scanf("%s", s);` |
| Read a line | `fgets(s, sizeof(s), stdin);` |
| Remove the newline | `s[strcspn(s, "\n")] = '\0';` |
| Copy | `strcpy(dest, src);` |
| Join | `strcat(dest, src);` |
| Compare equal | `strcmp(a, b) == 0` |
| Find a character | `strchr(s, 'c')` |
| Find a substring | `strstr(s, "sub")` |
| Convert case | `toupper(c)` / `tolower(c)` |
| Headers | `<string.h>`, `<ctype.h>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| No room for `'\0'` | Make the array one byte bigger |
| `s1 == s2` to compare | `strcmp(s1, s2) == 0` |
| `dest = src;` to copy | `strcpy(dest, src);` |
| `scanf("%s", &name)` | `scanf("%s", name)` (no `&`) |
| Using `gets()` | Use `fgets()` |
| `scanf("%s")` reading only one word | Use `fgets` for a full line |
| Destination too small in `strcpy` or `strcat` | Size it for the full result |
| Forgetting `'\0'` after a manual copy | `dest[i] = '\0';` |
| `"A"` instead of `'A'` | Single quotes for one character |
| Forgetting `<string.h>` | Add the include |

---

## Last-Minute Checklist

* I know a string is a `char` array ending with `'\0'`.
* I know `sizeof` counts `'\0'` and `strlen` does not.
* I can read a word with `scanf` and a line with `fgets`.
* I can copy and join strings with `strcpy` and `strcat`.
* I compare strings with `strcmp`, not `==`.
* I can reverse a string and check a palindrome.
* I can count vowels and change case.

---

## Quiz: Rapid Fire 🧠

1. Which character ends every C string?

- [ ] `'\n'`
- [x] `'\0'`
- [ ] `' '`
- [ ] `'0'`

2. Which function correctly compares two strings for equality?

- [ ] `s1 == s2`
- [x] `strcmp(s1, s2) == 0`
- [ ] `strcpy(s1, s2)`
- [ ] `s1.equals(s2)`

3. What is `strlen("Hello")`?

- [ ] `6`
- [x] `5`
- [ ] `4`
- [ ] `7`

4. Which function reads a whole line safely?

- [ ] `gets()`
- [ ] `scanf("%s")`
- [x] `fgets()`
- [ ] `getchar()`

5. What does `strcat(a, b)` do?

- [ ] Copies `a` into `b`
- [x] Appends `b` to the end of `a`
- [ ] Compares `a` and `b`
- [ ] Reverses both

6. How many bytes does `char s[] = "Hi";` occupy?

- [ ] `2`
- [x] `3`
- [ ] `4`
- [ ] `1`
