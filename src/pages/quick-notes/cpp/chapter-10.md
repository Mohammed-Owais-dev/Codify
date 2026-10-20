# Quick Notes: Chapter 10 - Advanced OOP & C++ Features

> **15-minute revision.** Know **operator overloading**, **virtual functions** and the **virtual destructor**, **multiple inheritance** and the diamond problem, **static** members and **friend** functions, and how to combine everything in a mini project.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 10.1 | Function & Operator Overloading | Give `+`, `==`, `<<` meaning for your own classes |
| 10.2 | Virtual Functions & Runtime Polymorphism | `virtual`, `override`, virtual destructor |
| 10.3 | Multiple Inheritance | One class, several bases; the diamond problem |
| 10.4 | Static Members & Friend Functions | Shared by all objects; trusted outsiders |
| 10.5 | Mini Project | Classes + inheritance + polymorphism + smart pointers |

---

## 1. Function & Operator Overloading (10.1)

**Core idea:** **Function overloading** = same name, different parameters. **Operator overloading** = give an operator a meaning for **your own class**, by writing a function named `operator+`, `operator==` and so on.

```text
return_type operator symbol (parameters) { ... }
```

```cpp
#include <iostream>
using namespace std;

class Point {
    int x, y;

public:
    Point(int a = 0, int b = 0) : x(a), y(b) { }

    Point operator+(const Point &o) const {
        return Point(x + o.x, y + o.y);
    }

    bool operator==(const Point &o) const {
        return x == o.x && y == o.y;
    }

    friend ostream &operator<<(ostream &os, const Point &p) {
        return os << "(" << p.x << ", " << p.y << ")";
    }
};

int main() {
    Point a(1, 2), b(3, 4);
    Point c = a + b;

    cout << c << "\n";
    cout << boolalpha << (a == b) << " " << (a == Point(1, 2)) << "\n";
    return 0;
}
```

```output
(4, 6)
false true
```

| Cannot be overloaded | Examples |
| --- | --- |
| Scope resolution | `::` |
| Member access | `.` and `.*` |
| Conditional | `? :` |
| Size | `sizeof` |

| Rule | Detail |
| --- | --- |
| Keep the meaning natural | `+` should add, not subtract |
| Binary operator as a member | Left operand is `*this`, right operand is the parameter |
| `<<` and `>>` for streams | Must be **non-member** (often `friend`) |
| Cannot create new operators | Only existing ones |
| Cannot change precedence or the number of operands | |

**Remember**

* Operator overloading is **compile-time polymorphism** and just syntax sugar for a function call.
* `a + b` means `a.operator+(b)`.
* Return `ostream &` from `operator<<` so calls can be chained.
* Take the argument by `const &` and mark read-only operators `const`.
* Do not overload operators in surprising ways.

---

## 2. Virtual Functions & Runtime Polymorphism (10.2)

**Core idea:** A **virtual function** is chosen at **run time** by the **real type** of the object. The compiler uses a hidden table (the **vtable**) of function addresses for each class.

```cpp
#include <iostream>
#include <memory>
#include <vector>
using namespace std;

class Employee {
public:
    virtual double pay() const = 0;
    virtual ~Employee() { }
};

class Developer : public Employee {
public:
    double pay() const override {
        return 50000;
    }
};

class Manager : public Employee {
public:
    double pay() const override {
        return 70000 + 10000;
    }
};

int main() {
    vector<unique_ptr<Employee>> staff;
    staff.push_back(make_unique<Developer>());
    staff.push_back(make_unique<Manager>());

    double total = 0;
    for (const auto &e : staff) {
        total += e->pay();
    }
    cout << "Total payroll = " << total << "\n";
    return 0;
}
```

```output
Total payroll = 130000
```

**The virtual destructor**

```cpp
#include <iostream>
using namespace std;

class Base {
public:
    virtual ~Base() {
        cout << "Base destroyed\n";
    }
};

class Derived : public Base {
public:
    ~Derived() {
        cout << "Derived destroyed\n";
    }
};

int main() {
    Base *p = new Derived;
    delete p;
    return 0;
}
```

```output
Derived destroyed
Base destroyed
```

| Keyword | Meaning |
| --- | --- |
| `virtual` | Choose the version at run time |
| `override` | Compiler checks it really overrides a virtual function |
| `final` | Cannot be overridden (or inherited) any further |
| `= 0` | Pure virtual: makes the class abstract |

**Remember**

* Without a **virtual destructor**, `delete basePointer;` skips the derived destructor (**resource leak**).
* Rule: if a class has any `virtual` function, give it a `virtual` destructor.
* Dynamic dispatch needs a **pointer or reference** to the base.
* Virtual calls cost a tiny bit extra (one table lookup).
* Constructors **cannot** be virtual.

---

## 3. Multiple Inheritance (10.3)

**Core idea:** A class can inherit from **more than one** base class.

```text
class C : public A, public B { ... };
```

```cpp
#include <iostream>
using namespace std;

class Flyer {
public:
    void fly() { cout << "Can fly\n"; }
    void info() { cout << "Flyer info\n"; }
};

class Swimmer {
public:
    void swim() { cout << "Can swim\n"; }
    void info() { cout << "Swimmer info\n"; }
};

class Duck : public Flyer, public Swimmer { };

int main() {
    Duck d;
    d.fly();
    d.swim();
    d.Flyer::info();
    d.Swimmer::info();
    return 0;
}
```

```output
Can fly
Can swim
Flyer info
Swimmer info
```

**The diamond problem**

```text
        Animal
        /    \
   Mammal    Bird
        \    /
         Bat
```

Without care, `Bat` contains **two** copies of `Animal`. **Virtual inheritance** gives it just one.

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    int age = 5;
};

class Mammal : virtual public Animal { };
class Bird : virtual public Animal { };
class Bat : public Mammal, public Bird { };

int main() {
    Bat b;
    cout << b.age << "\n";
    return 0;
}
```

```output
5
```

**Remember**

* Same member name in two bases: the call is **ambiguous**; resolve it with `Base::name`.
* Base constructors run in the **order of the base list**, not the initializer list.
* The diamond problem: use **`virtual`** inheritance on the middle classes.
* Prefer **interfaces** (abstract classes with only pure virtual functions) for multiple inheritance.
* Without `virtual`, `b.age` in the diamond would be ambiguous.

---

## 4. Static Members & Friend Functions (10.4)

**Core idea:** A **static** member belongs to the **class**, shared by every object. A **friend** function is a non-member that is allowed to see `private` members.

```cpp
#include <iostream>
using namespace std;

class Student {
    static int count;
    int id;

public:
    Student() {
        count++;
        id = count;
    }
    static int getCount() {
        return count;
    }
    friend void showId(const Student &s);
};

int Student::count = 0;

void showId(const Student &s) {
    cout << "ID = " << s.id << "\n";
}

int main() {
    Student a, b, c;

    cout << "Students = " << Student::getCount() << "\n";
    showId(b);
    return 0;
}
```

```output
Students = 3
ID = 2
```

| Static member | Friend |
| --- | --- |
| One copy shared by **all** objects | Not a member of the class |
| Defined outside the class: `int Student::count = 0;` | Declared inside with `friend` |
| Static functions have **no `this`** | Can access `private` and `protected` members |
| Call with `ClassName::name()` | Called like a normal function |

**Remember**

* A static **data member** needs a definition **outside** the class (or `inline static` in C++17).
* A static **function** can use only static members.
* Friendship is **not inherited** and **not mutual**.
* A **friend class** (`friend class Other;`) can access all private members.
* Use friends sparingly: they weaken encapsulation. `operator<<` is the classic good use.

---

## 5. Mini Project (10.5)

**Core idea:** Combine **inheritance**, **polymorphism**, **abstraction**, **operator overloading**, **static members** and **smart pointers**. Here: a small **bank account system**.

| Phase | Task |
| --- | --- |
| 1. Design | Find the classes: `Account` (abstract), `Savings`, `Current` |
| 2. Interface | Virtual functions: `withdraw`, `type` |
| 3. Behavior | Interest for savings, overdraft for current |
| 4. Output | `operator<<` to print any account |
| 5. Test | Normal, failing and edge cases |

```cpp
#include <iostream>
#include <iomanip>
#include <memory>
#include <string>
#include <utility>
#include <vector>
using namespace std;

class Account {
protected:
    string owner;
    double balance;
    static int count;

public:
    Account(string o, double b) : owner(o), balance(b) {
        count++;
    }
    virtual ~Account() { }

    void deposit(double amt) {
        if (amt > 0) {
            balance += amt;
        }
    }
    virtual bool withdraw(double amt) {
        if (amt > 0 && amt <= balance) {
            balance -= amt;
            return true;
        }
        return false;
    }
    virtual string type() const = 0;

    friend ostream &operator<<(ostream &os, const Account &a) {
        return os << a.type() << " | " << a.owner << " | "
                  << fixed << setprecision(2) << a.balance;
    }
    static int getCount() {
        return count;
    }
};

int Account::count = 0;

class Savings : public Account {
    double rate;

public:
    Savings(string o, double b, double r) : Account(o, b), rate(r) { }
    string type() const override {
        return "Savings";
    }
    void addInterest() {
        balance += balance * rate / 100;
    }
};

class Current : public Account {
    double overdraft;

public:
    Current(string o, double b, double od) : Account(o, b), overdraft(od) { }
    string type() const override {
        return "Current";
    }
    bool withdraw(double amt) override {
        if (amt > 0 && amt <= balance + overdraft) {
            balance -= amt;
            return true;
        }
        return false;
    }
};

int main() {
    vector<unique_ptr<Account>> accounts;

    auto s = make_unique<Savings>("Asha", 1000, 5);
    s->deposit(500);
    s->addInterest();
    accounts.push_back(move(s));
    accounts.push_back(make_unique<Current>("Ravi", 500, 200));

    cout << (accounts[1]->withdraw(650) ? "Withdraw OK" : "Withdraw failed") << "\n";
    cout << (accounts[1]->withdraw(100) ? "Withdraw OK" : "Withdraw failed") << "\n";

    for (const auto &a : accounts) {
        cout << *a << "\n";
    }
    cout << "Total accounts: " << Account::getCount() << "\n";
    return 0;
}
```

```output
Withdraw OK
Withdraw failed
Savings | Asha | 1575.00
Current | Ravi | -150.00
Total accounts: 2
```

| Concept | Where it appears |
| --- | --- |
| Abstraction | `Account` has a pure virtual `type()` |
| Inheritance | `Savings` and `Current` derive from `Account` |
| Polymorphism | `withdraw()` differs for `Current` |
| Encapsulation | `balance` is `protected`, changed only through methods |
| Operator overloading | `operator<<` prints any account |
| Static member | `count` tracks the number of accounts |
| Smart pointers | `unique_ptr` owns each account |

**Remember**

* Build **one feature at a time** and test it.
* Keep the base class small; put special behavior in the derived classes.
* Always give a polymorphic base class a **virtual destructor**.
* Store polymorphic objects as **pointers** (`unique_ptr<Base>`), never by value.
* Test failing cases, such as a withdrawal above the limit.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Overload `+` | `Point operator+(const Point &o) const { ... }` |
| Print an object with `cout` | `friend ostream &operator<<(ostream &os, const T &t)` |
| Virtual function | `virtual void f();` |
| Override / forbid overriding | `void f() override;` / `void f() final;` |
| Virtual destructor | `virtual ~Base() { }` |
| Multiple inheritance | `class C : public A, public B { };` |
| Resolve ambiguity | `obj.A::name();` |
| Diamond fix | `class B : virtual public A { };` |
| Static member | `static int count;` and `int T::count = 0;` |
| Static function call | `T::getCount()` |
| Friend function | `friend void show(const T &t);` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Overloading `<<` as a member function | Make it a `friend` or free function |
| Operator that does something unexpected | Keep the natural meaning |
| Forgetting `virtual` on the base destructor | `virtual ~Base()` |
| Calling a virtual function on an object, not a pointer or reference | Use `Base *` or `Base &` |
| Ambiguous call with multiple inheritance | `obj.A::name()` |
| Diamond problem | Use `virtual` inheritance |
| Forgetting the definition of a static data member | `int T::count = 0;` outside the class |
| Using `this` inside a static function | Static functions have no `this` |
| Assuming friendship is inherited or mutual | It is neither |
| Storing derived objects in `vector<Base>` (slicing) | Use `vector<unique_ptr<Base>>` |

---

## Last-Minute Checklist

* I can overload `+`, `==` and `<<` for a class.
* I know which operators cannot be overloaded.
* I can explain `virtual`, `override` and the virtual destructor.
* I can write a class with two bases and resolve ambiguity.
* I can explain the diamond problem and virtual inheritance.
* I can write static members and a friend function.
* I can combine all OOP ideas in a small project.

---

## Quiz: Rapid Fire 🧠

1. Which operator cannot be overloaded?

- [ ] `+`
- [ ] `==`
- [x] `::`
- [ ] `<<`

2. Why should a base class have a virtual destructor?

- [ ] To make the class abstract
- [x] So deleting through a base pointer also runs the derived destructor
- [ ] To speed up the program
- [ ] To allow multiple inheritance

3. How is the diamond problem solved?

- [ ] With `friend` classes
- [ ] With `static` members
- [x] With virtual inheritance
- [ ] With `const` functions

4. How do you call a static function `getCount()` of class `Student`?

- [ ] `Student.getCount()`
- [x] `Student::getCount()`
- [ ] `Student->getCount()`
- [ ] `getCount(Student)`

5. What can a friend function access?

- [ ] Only public members
- [x] Private and protected members of the class
- [ ] Only static members
- [ ] Nothing special

6. What does `a + b` mean for objects when `operator+` is overloaded as a member?

- [ ] `operator+(a)`
- [x] `a.operator+(b)`
- [ ] `b.operator+(a)`
- [ ] `operator(a, b)`
