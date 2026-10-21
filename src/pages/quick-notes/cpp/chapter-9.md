# Quick Notes: Chapter 9 - Object-Oriented Programming

> **15-minute revision.** OOP organizes code around **objects**. Know the four pillars: **encapsulation** (hide data), **inheritance** (reuse), **polymorphism** (one interface, many forms) and **abstraction** (hide complexity).

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 9.1 | Introduction to OOP | Model real things as objects: data + behavior |
| 9.2 | Encapsulation | Private data, public methods, validated access |
| 9.3 | Inheritance | A derived class reuses and extends a base class |
| 9.4 | Polymorphism | `virtual` functions choose the version at run time |
| 9.5 | Abstraction | Abstract classes with pure virtual functions |

---

## 1. Introduction to OOP (9.1)

**Core idea:** **Object-Oriented Programming** models a program as **objects** that hold **data** and the **functions** that work on it.

| Procedural | Object-oriented |
| --- | --- |
| Functions and data are separate | Data and functions are bundled in classes |
| Focus on **steps** | Focus on **objects** |
| Data is often global | Data is protected inside objects |
| Harder to reuse | Reuse through inheritance |

| Pillar | One-line meaning |
| --- | --- |
| **Encapsulation** | Bundle data with methods; hide the data |
| **Inheritance** | A new class gets the features of an existing class |
| **Polymorphism** | The same call behaves differently for different objects |
| **Abstraction** | Show **what** an object does, hide **how** |

```cpp
#include <iostream>
#include <string>
using namespace std;

class Car {
    string brand;
    int speed;

public:
    Car(string b) : brand(b), speed(0) { }
    void accelerate(int d) {
        speed += d;
    }
    void show() const {
        cout << brand << " at " << speed << " km/h\n";
    }
};

int main() {
    Car c("Tesla");
    c.accelerate(40);
    c.accelerate(20);
    c.show();
    return 0;
}
```

```output
Tesla at 60 km/h
```

**Remember**

* Identify the **nouns** (classes) and **verbs** (methods) of a problem.
* OOP helps with **reuse**, **maintenance** and **security** of data.
* A class is the blueprint; objects are its instances.

---

## 2. Encapsulation (9.2)

**Core idea:** Make data members **`private`** and give controlled access through **`public`** methods that **validate** the input.

```cpp
#include <iostream>
using namespace std;

class BankAccount {
    double balance;

public:
    BankAccount(double b) : balance(b) { }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    double getBalance() const {
        return balance;
    }
};

int main() {
    BankAccount acc(1000);

    cout << boolalpha;
    cout << acc.withdraw(300) << "\n";
    cout << acc.withdraw(900) << "\n";
    cout << "Balance = " << acc.getBalance() << "\n";
    return 0;
}
```

```output
true
false
Balance = 700
```

| Without encapsulation | With encapsulation |
| --- | --- |
| `acc.balance = -5000;` is possible | Only `withdraw()` can change the balance |
| No validation | Rules are enforced in one place |
| Hard to change the internals | Internals can change without breaking users |

**Remember**

* Data `private`, methods `public`: the standard pattern.
* Setters should **validate**; getters should be `const`.
* Encapsulation = **data hiding** + **bundling**.
* Users depend on the **interface**, not the internal details.

---

## 3. Inheritance (9.3)

**Core idea:** A **derived class** (child) inherits members from a **base class** (parent) and can add its own.

```text
class Derived : public Base { ... };
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Animal {
protected:
    string name;

public:
    Animal(string n) : name(n) {
        cout << "Animal constructed\n";
    }
    void eat() {
        cout << name << " eats\n";
    }
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {
        cout << "Dog constructed\n";
    }
    void bark() {
        cout << name << " barks\n";
    }
};

int main() {
    Dog d("Rex");
    d.eat();
    d.bark();
    return 0;
}
```

```output
Animal constructed
Dog constructed
Rex eats
Rex barks
```

| Type | Shape |
| --- | --- |
| Single | `B : A` |
| Multilevel | `C : B`, `B : A` |
| Hierarchical | `B : A`, `C : A` |
| Multiple | `C : A, B` (Chapter 10) |

| Base member is | `public` inheritance | `protected` inheritance | `private` inheritance |
| --- | --- | --- | --- |
| `public` | `public` | `protected` | `private` |
| `protected` | `protected` | `protected` | `private` |
| `private` | Not accessible | Not accessible | Not accessible |

**Remember**

* Use **`public`** inheritance for an "is-a" relationship (a `Dog` **is an** `Animal`).
* The **base constructor runs first**, then the derived one; destruction is the reverse.
* Pass arguments to the base through the initializer list: `Dog(string n) : Animal(n)`.
* `private` base members are never accessible in the derived class; use `protected` or getters.
* A derived function with the same name **hides** the base version.

---

## 4. Polymorphism (9.4)

**Core idea:** **Poly** = many, **morph** = forms. One call, different behavior depending on the object.

| Kind | When decided | How |
| --- | --- | --- |
| **Compile-time** (static) | At compile time | Function and operator **overloading** |
| **Run-time** (dynamic) | While the program runs | **`virtual`** functions + base pointer or reference |

```cpp
#include <iostream>
using namespace std;

class Shape {
public:
    virtual void draw() {
        cout << "Drawing shape\n";
    }
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "Drawing circle\n";
    }
};

class Square : public Shape {
public:
    void draw() override {
        cout << "Drawing square\n";
    }
};

int main() {
    Circle c;
    Square sq;
    Shape *shapes[2] = {&c, &sq};

    for (Shape *s : shapes) {
        s->draw();
    }
    return 0;
}
```

```output
Drawing circle
Drawing square
```

**`virtual` vs non-virtual**

```cpp
#include <iostream>
using namespace std;

class Base {
public:
    void hello() {
        cout << "Base hello\n";
    }
    virtual void greet() {
        cout << "Base greet\n";
    }
};

class Derived : public Base {
public:
    void hello() {
        cout << "Derived hello\n";
    }
    void greet() override {
        cout << "Derived greet\n";
    }
};

int main() {
    Derived d;
    Base *p = &d;

    p->hello();
    p->greet();
    return 0;
}
```

```output
Base hello
Derived greet
```

**Remember**

* Without `virtual`, the call is decided by the **pointer type** (`Base`).
* With `virtual`, it is decided by the **actual object** (`Derived`).
* Use **`override`** in the derived class: the compiler checks that it really overrides.
* Runtime polymorphism needs a **base pointer or reference**.
* **Overloading** = same name, different parameters (same class). **Overriding** = same signature, different class.

---

## 5. Abstraction (9.5)

**Core idea:** **Abstraction** shows **what** an object does and hides **how**. In C++, an **abstract class** has at least one **pure virtual function**.

```text
virtual return_type name(parameters) = 0;    // pure virtual function
```

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() { }
};

class Circle : public Shape {
    double r;

public:
    Circle(double radius) : r(radius) { }
    double area() const override {
        return 3.14159 * r * r;
    }
};

class Rectangle : public Shape {
    double w, h;

public:
    Rectangle(double a, double b) : w(a), h(b) { }
    double area() const override {
        return w * h;
    }
};

int main() {
    Circle c(2);
    Rectangle r(3, 4);
    Shape *list[2] = {&c, &r};

    cout << fixed << setprecision(2);
    for (Shape *s : list) {
        cout << "Area = " << s->area() << "\n";
    }
    return 0;
}
```

```output
Area = 12.57
Area = 12.00
```

| Abstract class | Concrete class |
| --- | --- |
| Has a pure virtual function (`= 0`) | All functions are implemented |
| **Cannot** create objects | Objects can be created |
| Acts as an interface or base | Final, usable class |

| Abstraction | Encapsulation |
| --- | --- |
| Hides **complexity** (design level) | Hides **data** (implementation level) |
| Achieved with abstract classes | Achieved with `private` members |

**Remember**

* `Shape s;` is an **error** if `Shape` has a pure virtual function.
* A derived class **must override** every pure virtual function, or it is abstract too.
* A class with **only** pure virtual functions acts as an **interface**.
* Give abstract base classes a **virtual destructor**.
* You can still declare pointers and references of the abstract type.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Inherit publicly | `class Dog : public Animal { };` |
| Call the base constructor | `Dog(string n) : Animal(n) { }` |
| Hidden from outside, visible to children | `protected:` |
| Virtual function | `virtual void draw();` |
| Override safely | `void draw() override;` |
| Pure virtual (abstract) | `virtual double area() const = 0;` |
| Virtual destructor | `virtual ~Base() { }` |
| Use runtime polymorphism | `Base *p = &derivedObject; p->draw();` |
| Private data, public methods | Encapsulation |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Forgetting `virtual` in the base class | Mark the base function `virtual` |
| Calling through an object, not a pointer or reference | Use `Base *` or `Base &` |
| Creating an object of an abstract class | Create a derived (concrete) object |
| Forgetting to override all pure virtual functions | Implement every one |
| Accessing a `private` base member in a derived class | Use `protected` or a getter |
| Missing `public` in `class D : Base` (it defaults to `private`) | `class D : public Base` |
| Non-virtual destructor in a base class | `virtual ~Base()` |
| Typo in the overriding function's signature | Add `override` so the compiler catches it |
| Forgetting `: Base(args)` for a base with no default constructor | Call it in the initializer list |
| Confusing overloading and overriding | Overload = parameters differ; override = same signature, `virtual` |

---

## Last-Minute Checklist

* I can name and explain the four pillars.
* I can write a class with private data and validated public methods.
* I can write a derived class and call the base constructor.
* I know the order of constructors and destructors in inheritance.
* I can use `virtual` and `override` for runtime polymorphism.
* I can write an abstract class with a pure virtual function.

---

## Quiz: Rapid Fire

1. Which OOP concept hides data inside a class?

- [ ] Inheritance
- [x] Encapsulation
- [ ] Polymorphism
- [ ] Recursion

2. In inheritance, which constructor runs first?

- [ ] The derived class
- [x] The base class
- [ ] Neither
- [ ] Both together

3. Which keyword enables runtime polymorphism?

- [ ] `static`
- [ ] `friend`
- [x] `virtual`
- [ ] `const`

4. What makes a class abstract?

- [ ] A private constructor
- [x] At least one pure virtual function (`= 0`)
- [ ] Having no data members
- [ ] Using `protected`

5. Which kind of polymorphism is function overloading?

- [x] Compile-time
- [ ] Run-time
- [ ] Both
- [ ] Neither

6. Can you create an object of an abstract class?

- [ ] Yes
- [x] No
- [ ] Only with `new`
- [ ] Only inside `main()`
