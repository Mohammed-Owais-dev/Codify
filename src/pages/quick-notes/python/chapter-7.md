# Quick Notes: Chapter 7 - Object-Oriented Programming

> ⏱ **20-minute revision.** OOP organizes code around **objects**. Know the four pillars: **encapsulation** (protect data), **inheritance** (reuse), **polymorphism** (one interface, many forms) and **abstraction** (hide complexity).

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 7.1 | Introduction to OOP, Classes & Objects | A class is a blueprint; an object is an instance |
| 7.2 | Constructors, `self` & Class Members | `__init__`, instance vs class variables, `@classmethod` |
| 7.3 | Encapsulation & Access Control | `_protected`, `__private`, `@property` |
| 7.4 | Inheritance & Method Overriding | `class Child(Parent)`, `super()` |
| 7.5 | Polymorphism & Abstraction | Same call, different behavior; `abc` abstract classes |

---

## 1. Introduction to OOP, Classes & Objects (7.1)

**Core idea:** **OOP** models a program as **objects** that hold **data** (attributes) and **behavior** (methods). A **class** is the blueprint; an **object** is one instance of it.

| Procedural | Object-oriented |
| --- | --- |
| Functions and data are separate | Data and functions are bundled in classes |
| Focus on **steps** | Focus on **objects** |
| Data is often shared globally | Data is protected inside objects |
| Harder to reuse | Reuse through inheritance |

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def grade(self):
        return "Pass" if self.marks >= 40 else "Fail"

s1 = Student("Asha", 75)
s2 = Student("Ravi", 30)
print(s1.name, s1.grade())
print(s2.name, s2.grade())
print(type(s1))
print(isinstance(s1, Student))
s1.marks = 20
print(s1.grade(), s2.grade())
```

```output
Asha Pass
Ravi Fail
<class '__main__.Student'>
True
Fail Fail
```

| Pillar | One-line meaning |
| --- | --- |
| **Encapsulation** | Bundle data with methods; protect the data |
| **Inheritance** | A new class gets the features of an existing class |
| **Polymorphism** | The same call behaves differently for different objects |
| **Abstraction** | Show **what** an object does, hide **how** |

**Remember**

* Class names use **PascalCase**: `Student`, `BankAccount`.
* Each object has its **own copy** of the instance attributes.
* Create an object by **calling the class**: `Student("Asha", 75)` (no `new` keyword).
* Identify the **nouns** (classes) and **verbs** (methods) of a problem.

---

## 2. Constructors, `self` & Class Members (7.2)

**Core idea:** `__init__` is the **constructor**; it runs automatically when an object is created. `self` is the object itself. **Class variables** are shared by all objects.

```python
class Counter:
    total = 0

    def __init__(self, name):
        self.name = name
        Counter.total += 1

    def __str__(self):
        return f"Counter({self.name})"

    @classmethod
    def how_many(cls):
        return cls.total

    @staticmethod
    def is_valid(name):
        return len(name) > 0

a = Counter("a")
b = Counter("b")
print(a)
print(Counter.how_many(), Counter.total)
print(Counter.is_valid(""))
print(a.total, b.total)

a.total = 10
print(a.total, Counter.total, b.total)
```

```output
Counter(a)
2 2
False
2 2
10 2 2
```

| Member | Defined | Belongs to | Access |
| --- | --- | --- | --- |
| Instance variable | `self.x = ...` in `__init__` | Each object | `obj.x` |
| Class variable | Directly in the class body | The class (shared) | `Class.x` |
| Instance method | `def f(self)` | Each object | `obj.f()` |
| Class method | `@classmethod`, first parameter `cls` | The class | `Class.f()` |
| Static method | `@staticmethod`, no `self` or `cls` | Utility inside the class | `Class.f()` |

**Remember**

* `self` must be the **first parameter** of every instance method; Python passes it automatically.
* `__str__` controls what `print(obj)` shows.
* Assigning `a.total = 10` creates a new **instance** attribute; it does **not** change the class variable.
* Change a class variable through the class: `Counter.total += 1`.

---

## 3. Encapsulation & Access Control (7.3)

**Core idea:** Protect data by keeping it **non-public** and giving controlled access through methods or **`@property`**. Python uses **naming conventions**, not strict keywords.

| Name | Level | Meaning |
| --- | --- | --- |
| `name` | Public | Free to use anywhere |
| `_name` | Protected (by convention) | For internal use and subclasses |
| `__name` | Private (name mangling) | Stored as `_ClassName__name` |

```python
class Account:
    def __init__(self, balance):
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self.__balance = value

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return True
        return False

acc = Account(1000)
print(acc.withdraw(300), acc.withdraw(900))
print(acc.balance)

try:
    acc.balance = -5
except ValueError as e:
    print("Error:", e)

try:
    print(acc.__balance)
except AttributeError:
    print("Private attribute")

print(acc._Account__balance)
```

```output
True False
700
Error: Balance cannot be negative
Private attribute
700
```

| Without encapsulation | With encapsulation |
| --- | --- |
| `acc.balance = -5000` is possible | Only validated methods change the balance |
| No validation | Rules are enforced in one place |
| Internals are hard to change | Internals can change without breaking users |

**Remember**

* Python **cannot truly hide** data; `__x` only renames it (name mangling).
* `@property` lets you use a method like an attribute: `acc.balance`, no parentheses.
* The `@x.setter` method is where you **validate** new values.
* A property with **no setter** is read-only.

---

## 4. Inheritance & Method Overriding (7.4)

**Core idea:** A **child class** inherits attributes and methods from a **parent class** and can **override** them. Use `super()` to call the parent.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def speak(self):
        return f"{self.name} barks"

class Puppy(Dog):
    pass

d = Dog("Rex", "Lab")
p = Puppy("Tiny", "Pug")
print(Animal("Generic").speak())
print(d.speak())
print(p.speak())
print(isinstance(p, Animal), issubclass(Dog, Animal))
print([c.__name__ for c in Puppy.__mro__])
```

```output
Generic makes a sound
Rex barks
Tiny barks
True True
['Puppy', 'Dog', 'Animal', 'object']
```

**Multiple inheritance and MRO**

```python
class A:
    def hi(self):
        return "A"

class B:
    def hi(self):
        return "B"

class C(A, B):
    pass

print(C().hi())
print([c.__name__ for c in C.__mro__])
```

```output
A
['C', 'A', 'B', 'object']
```

| Type | Shape |
| --- | --- |
| Single | `B(A)` |
| Multilevel | `C(B)`, `B(A)` |
| Hierarchical | `B(A)`, `C(A)` |
| Multiple | `C(A, B)` |

**Remember**

* Use inheritance for an **"is-a"** relationship (a `Dog` **is an** `Animal`).
* `super().__init__(...)` runs the parent constructor; forgetting it leaves parent attributes unset.
* **Overriding** = same method name in the child, new behavior.
* **MRO** (method resolution order) decides which parent method is found first: left to right.
* Every class ultimately inherits from `object`.

---

## 5. Polymorphism & Abstraction (7.5)

**Core idea:** **Polymorphism** means the same call works on different objects. **Abstraction** hides details; an **abstract class** (from the `abc` module) cannot be instantiated and forces subclasses to implement certain methods.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14159 * self.r ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

for shape in [Circle(2), Rectangle(3, 4)]:
    print(f"Area = {shape.area():.2f}")

try:
    Shape()
except TypeError:
    print("Cannot instantiate abstract class")
```

```output
Area = 12.57
Area = 12.00
Cannot instantiate abstract class
```

**Duck typing and operator overloading**

```python
class Duck:
    def speak(self):
        return "Quack"

class Robot:
    def speak(self):
        return "Beep"

for thing in [Duck(), Robot()]:
    print(thing.speak())

print(len("abc"), len([1, 2]))

class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __str__(self):
        return f"({self.x}, {self.y})"

print(Vector(1, 2) + Vector(3, 4))
```

```output
Quack
Beep
3 2
(4, 6)
```

| Magic method | Triggered by |
| --- | --- |
| `__init__` | Creating an object |
| `__str__` | `print(obj)` and `str(obj)` |
| `__len__` | `len(obj)` |
| `__add__` | `obj1 + obj2` |
| `__eq__` | `obj1 == obj2` |

| Abstract class | Concrete class |
| --- | --- |
| Has an `@abstractmethod` | All methods are implemented |
| **Cannot** create objects | Objects can be created |
| Acts as a template or interface | Final, usable class |

**Remember**

* **Duck typing:** "If it has a `speak()` method, we can call it"; the class does not matter.
* A subclass **must override** every abstract method, or it stays abstract.
* Built-ins are polymorphic: `len()` works on strings, lists and your own classes with `__len__`.
* Abstraction hides **complexity**; encapsulation hides **data**.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Define a class | `class Name:` |
| Constructor | `def __init__(self, x):` |
| Instance attribute | `self.x = x` |
| Class variable | `count = 0` (in the class body) |
| Class method | `@classmethod` + `cls` |
| Static method | `@staticmethod` |
| Print format | `def __str__(self):` |
| Private attribute | `self.__x` |
| Getter / setter | `@property` / `@x.setter` |
| Inherit | `class Child(Parent):` |
| Call the parent constructor | `super().__init__(args)` |
| Abstract class | `class Base(ABC):` + `@abstractmethod` |
| Check type / subclass | `isinstance(obj, C)` / `issubclass(A, B)` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Forgetting `self` as the first parameter | `def method(self, ...)` |
| Forgetting `self.` before attributes | `self.name`, not `name` |
| Calling `Student` without parentheses | Create objects with `Student(...)` |
| Forgetting `super().__init__()` in a child | Call it so parent attributes exist |
| Assigning to `obj.count` to change a class variable | Use `ClassName.count` |
| Expecting `__x` to be truly private | It is only name mangling |
| Instantiating an abstract class | Create an object of a concrete subclass |
| Not overriding every abstract method | Implement them all |
| Using mutable class variables as per-object data | Create them in `__init__` with `self.` |
| Misspelling `__init__` (such as `_init_`) | Use two underscores on both sides |

---

## Last-Minute Checklist

* ✅ I can explain class vs object and the four pillars.
* ✅ I can write a class with `__init__`, attributes and methods.
* ✅ I know instance variables, class variables, `@classmethod` and `@staticmethod`.
* ✅ I can use `@property` with validation.
* ✅ I can write a child class and call `super().__init__()`.
* ✅ I can create an abstract class with `abc`.
* ✅ I can show polymorphism with overriding and duck typing.

---

## Quiz: Rapid Fire 🧠

1. What is `self` in a method?

- [ ] The class itself
- [x] The current object
- [ ] A keyword to create objects
- [ ] The parent class

2. Which method runs automatically when an object is created?

- [ ] `__str__`
- [ ] `__new_object__`
- [x] `__init__`
- [ ] `__call__`

3. What does `__balance` inside a class become?

- [ ] A public attribute
- [ ] A constant
- [x] A name-mangled attribute `_ClassName__balance`
- [ ] A deleted attribute

4. Which call runs the parent class constructor?

- [ ] `parent.__init__()`
- [x] `super().__init__()`
- [ ] `base()`
- [ ] `self.parent()`

5. What happens when you create an object of a class with an unimplemented `@abstractmethod`?

- [ ] It works normally
- [ ] It returns `None`
- [x] A `TypeError` is raised
- [ ] The method is called automatically

6. Which magic method controls what `print(obj)` shows?

- [ ] `__init__`
- [ ] `__repr_only__`
- [x] `__str__`
- [ ] `__print__`
