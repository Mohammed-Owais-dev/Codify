# Quick Notes: Chapter 8 - Classes & Objects

> **15-minute revision.** A **class** is a blueprint; an **object** is a real thing built from it. Know members, **access specifiers**, the three kinds of **constructors**, the **destructor** and the **`this` pointer**.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 8.1 | Introduction to Classes & Objects | Class = blueprint, object = instance |
| 8.2 | Class Members & Access Specifiers | `public`, `private`, `protected`; getters and setters |
| 8.3 | Constructors | Run when an object is created: default, parameterized, copy |
| 8.4 | Destructors | `~ClassName()` runs when an object is destroyed |
| 8.5 | this Pointer | Points to the current object; enables chaining |

---

## 1. Introduction to Classes & Objects (8.1)

**Core idea:** A **class** groups **data** (member variables) and **functions** (member functions) in one unit. An **object** is a variable of that class.

```text
class ClassName {
public:
    // members
};     // <- semicolon is required
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int marks;

    void show() {
        cout << name << " scored " << marks << "\n";
    }
};

int main() {
    Student s1;
    s1.name = "Asha";
    s1.marks = 85;

    Student s2;
    s2.name = "Ravi";
    s2.marks = 72;

    s1.show();
    s2.show();

    Student *p = &s1;
    cout << p->name << "\n";
    return 0;
}
```

```output
Asha scored 85
Ravi scored 72
Asha
```

| Term | Meaning |
| --- | --- |
| Class | Blueprint (no memory used until you create objects) |
| Object | A real instance of the class |
| Data member | A variable inside the class |
| Member function (method) | A function inside the class |
| `.` operator | Access a member through an object |
| `->` operator | Access a member through a pointer |

**Remember**

* The class definition ends with `};`.
* Each object has **its own copy** of the data members.
* Member functions can use the object's data directly.
* Class names usually start with a **capital letter**.

---

## 2. Class Members & Access Specifiers (8.2)

**Core idea:** **Access specifiers** control who can use a member. Keep data `private` and expose it through `public` functions.

| Specifier | Accessible from |
| --- | --- |
| `public` | Anywhere |
| `private` | Only inside the class (**default** for `class`) |
| `protected` | Inside the class and its **derived** classes |

```cpp
#include <iostream>
using namespace std;

class Account {
private:
    double balance = 0;

public:
    void setBalance(double b) {
        if (b >= 0) {
            balance = b;
        }
    }
    double getBalance() const {
        return balance;
    }
    void deposit(double amount);
};

void Account::deposit(double amount) {
    if (amount > 0) {
        balance += amount;
    }
}

int main() {
    Account a;
    a.deposit(500);
    a.deposit(-50);
    cout << "Balance = " << a.getBalance() << "\n";

    a.setBalance(1000);
    cout << "Balance = " << a.getBalance() << "\n";
    return 0;
}
```

```output
Balance = 500
Balance = 1000
```

**Remember**

* `a.balance = 5;` from `main()` is a **compile error** because `balance` is `private`.
* A **getter** reads a private member; a **setter** changes it (and can validate the value).
* A member function can be defined **outside** the class with the scope resolution operator: `void Account::deposit(...)`.
* Mark functions that do not change the object as `const`: `double getBalance() const`.
* `struct` is the same as `class`, but members are `public` by default.

---

## 3. Constructors (8.3)

**Core idea:** A **constructor** has the **same name as the class**, **no return type**, and runs **automatically** when an object is created.

| Kind | Syntax | Runs when |
| --- | --- | --- |
| Default | `Box()` | `Box a;` |
| Parameterized | `Box(int a, int b)` | `Box b(3, 4);` |
| Copy | `Box(const Box &o)` | `Box c = b;` |

```cpp
#include <iostream>
using namespace std;

class Box {
    int w, h;

public:
    Box() : w(1), h(1) {
        cout << "Default\n";
    }
    Box(int a, int b) : w(a), h(b) {
        cout << "Parameterized\n";
    }
    Box(const Box &o) : w(o.w), h(o.h) {
        cout << "Copy\n";
    }
    int area() const {
        return w * h;
    }
};

int main() {
    Box a;
    Box b(3, 4);
    Box c = b;

    cout << a.area() << " " << b.area() << " " << c.area() << "\n";
    return 0;
}
```

```output
Default
Parameterized
Copy
1 12 12
```

```text
ClassName(parameters) : member1(value1), member2(value2) { }   // initializer list
```

**Remember**

* Constructors can be **overloaded** (several versions).
* The **initializer list** (after the `:`) sets members before the body runs; it is required for `const` and reference members.
* If you write **no** constructor, the compiler creates a default one.
* If you write **any** constructor, the compiler no longer creates the default one.
* The default copy constructor copies members one by one (a **shallow copy**); write your own when the class owns memory.

---

## 4. Destructors (8.4)

**Core idea:** A **destructor** (`~ClassName()`) runs **automatically** when an object is destroyed. Use it to release resources.

```cpp
#include <iostream>
#include <string>
using namespace std;

class Demo {
    string name;

public:
    Demo(string n) : name(n) {
        cout << name << " created\n";
    }
    ~Demo() {
        cout << name << " destroyed\n";
    }
};

int main() {
    Demo a("A");
    {
        Demo b("B");
        cout << "inside block\n";
    }
    Demo c("C");
    cout << "end of main\n";
    return 0;
}
```

```output
A created
B created
inside block
B destroyed
C created
end of main
C destroyed
A destroyed
```

| Constructor | Destructor |
| --- | --- |
| Name: `ClassName()` | Name: `~ClassName()` |
| Can take parameters; can be overloaded | **No** parameters; **only one** |
| Called when the object is created | Called when the object goes out of scope or is deleted |
| Objects are built in order | Objects are destroyed in **reverse order** |

**Remember**

* Destructors are called **automatically**; you rarely call them yourself.
* Objects are destroyed in the **reverse order** of creation.
* If a class uses `new`, the destructor should `delete` it (or use smart pointers).
* A destructor has no return type and no arguments.
* For base classes used polymorphically, make the destructor `virtual` (Chapter 10).

---

## 5. this Pointer (8.5)

**Core idea:** `this` is a **hidden pointer** inside every member function. It points to the **object that called the function**.

```cpp
#include <iostream>
using namespace std;

class Point {
    int x;

public:
    void setX(int x) {
        this->x = x;
    }
    int getX() const {
        return x;
    }
};

class Counter {
    int total;

public:
    Counter() : total(0) { }
    Counter &add(int n) {
        this->total += n;
        return *this;
    }
    int get() const {
        return total;
    }
};

int main() {
    Point p;
    p.setX(7);
    cout << p.getX() << "\n";

    Counter c;
    c.add(5).add(10).add(2);
    cout << c.get() << "\n";
    return 0;
}
```

```output
7
17
```

| Use | Example |
| --- | --- |
| Separate a member from a parameter with the same name | `this->x = x;` |
| Return the current object (method chaining) | `return *this;` |
| Get the object's address | `this` |

**Remember**

* `this` is a **pointer**: use `this->member`, and `*this` for the object itself.
* `this` exists only in **non-static** member functions.
* To allow chaining, return a **reference**: `Counter &add(int n)`.
* In `const` member functions, `this` points to a `const` object.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Define a class | `class Name { ... };` |
| Create an object | `Name obj;` or `Name obj(args);` |
| Access a member | `obj.member` / `ptr->member` |
| Private data, public access | `private:` data, `public:` getters and setters |
| Define outside the class | `void Name::func() { ... }` |
| Default constructor | `Name() { ... }` |
| Initializer list | `Name(int a) : x(a) { }` |
| Copy constructor | `Name(const Name &o) { ... }` |
| Destructor | `~Name() { ... }` |
| Current object | `this`, `*this`, `this->x` |
| Read-only method | `int get() const { ... }` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Missing `;` after the class `}` | `};` |
| Accessing a `private` member from `main()` | Add a public getter or setter |
| Giving a constructor a return type | Remove it (not even `void`) |
| `Box b();` to create an object | `Box b;` (the first line declares a function) |
| Constructor parameter hides a member | Use `this->x = x;` or an initializer list |
| Losing the default constructor after writing another | Add `Name() = default;` |
| Forgetting to release memory in the destructor | `delete` what you `new` |
| Shallow copy of a class that owns memory | Write a copy constructor |
| Expecting destruction in creation order | It is **reverse** order |
| Chaining that returns by value | Return `Counter &` |

---

## Last-Minute Checklist

* I can define a class, create objects and call methods.
* I know `public`, `private` and `protected`.
* I can write default, parameterized and copy constructors.
* I can use an initializer list.
* I know when a destructor runs and in what order.
* I can use `this` and chain calls with `*this`.

---

## Quiz: Rapid Fire

1. What is the default access of members in a `class`?

- [ ] `public`
- [x] `private`
- [ ] `protected`
- [ ] No access

2. What is special about a constructor?

- [ ] It returns `void`
- [x] It has the class name and no return type
- [ ] It must be `private`
- [ ] It cannot take parameters

3. In what order are objects destroyed?

- [ ] In creation order
- [x] In reverse order of creation
- [ ] Randomly
- [ ] Alphabetically

4. What does `this` point to?

- [ ] The class
- [x] The current object
- [ ] The base class
- [ ] The first object created

5. How many destructors can a class have?

- [ ] Any number
- [ ] Two
- [x] Exactly one
- [ ] None

6. Which operator accesses a member through a pointer to an object?

- [ ] `.`
- [x] `->`
- [ ] `::`
- [ ] `&`
