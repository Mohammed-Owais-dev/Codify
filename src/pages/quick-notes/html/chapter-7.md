# Quick Notes: Chapter 7 - HTML Tables & Tabular Data

> **10-minute revision.** Know the table building blocks, the semantic sections, how to merge cells, and the rules that make tables accessible.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 7.1 | Table Basics | `<table>`, `<tr>`, `<th>` and `<td>` build rows and cells |
| 7.2 | Semantic Table Sections | `<caption>`, `<thead>`, `<tbody>` and `<tfoot>` give structure |
| 7.3 | Merging Cells | `colspan` and `rowspan` stretch a cell across columns or rows |
| 7.4 | Accessibility in Tables | Captions, `scope` and real header cells help screen readers |

---

## 1. Table Basics (7.1)

**Core idea:** A table is a grid of **rows** (`<tr>`) that hold **cells**. Use tables only for **data**.

```html
<table border="1">
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>City</th>
  </tr>
  <tr>
    <td>Asha</td>
    <td>20</td>
    <td>Hyderabad</td>
  </tr>
  <tr>
    <td>Ravi</td>
    <td>22</td>
    <td>Chennai</td>
  </tr>
</table>
```

| Tag | Role |
| --- | --- |
| `<table>` | The whole table |
| `<tr>` | **T**able **r**ow |
| `<th>` | **T**able **h**eader cell (bold and centred by default) |
| `<td>` | **T**able **d**ata cell |

**Remember**

* Rows go **across**; the number of cells in each row makes the columns.
* The `border="1"` attribute is only for quick demos. Style borders with CSS: `border`, `border-collapse` and `padding`.
* Every row should have the same number of columns (after merging).

---

## 2. Semantic Table Sections (7.2)

**Core idea:** Split a table into **caption, head, body and foot** so browsers and assistive tools understand it.

```html
<table border="1">
  <caption>Monthly Sales</caption>
  <thead>
    <tr><th>Month</th><th>Sales</th></tr>
  </thead>
  <tbody>
    <tr><td>January</td><td>$100</td></tr>
    <tr><td>February</td><td>$150</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Total</td><td>$250</td></tr>
  </tfoot>
</table>
```

| Tag | Role |
| --- | --- |
| `<caption>` | Title of the table (first child of `<table>`) |
| `<thead>` | Header rows |
| `<tbody>` | Main data rows |
| `<tfoot>` | Summary rows such as totals |
| `<colgroup>` / `<col>` | Style or group whole columns |

**Remember**

* `<caption>` must be the **first** child of `<table>`.
* Long tables can repeat the header when printed if `<thead>` is used.
* A table can have more than one `<tbody>`.

---

## 3. Merging Cells (7.3)

**Core idea:** `colspan` merges cells **across columns**. `rowspan` merges cells **down rows**.

```html
<table border="1">
  <tr>
    <th colspan="2">Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Asha</td>
    <td>Rao</td>
    <td rowspan="2">20</td>
  </tr>
  <tr>
    <td>Ravi</td>
    <td>Kumar</td>
  </tr>
</table>
```

| Attribute | Effect |
| --- | --- |
| `colspan="2"` | The cell takes the width of 2 columns |
| `rowspan="2"` | The cell takes the height of 2 rows |

**Remember**

* When a cell spans, **remove** the cells it covers from the other rows.
* Count the columns: `colspan` cells count as many columns as their value.
* Merge only when it makes the data clearer. Complex merged tables are hard for screen readers.

---

## 4. Accessibility in Tables (7.4)

**Core idea:** Screen readers announce the header for each cell, but only if you **mark the headers**.

```html
<table border="1">
  <caption>Exam Marks</caption>
  <tr>
    <th scope="col">Student</th>
    <th scope="col">Maths</th>
    <th scope="col">Science</th>
  </tr>
  <tr>
    <th scope="row">Asha</th>
    <td>90</td>
    <td>85</td>
  </tr>
  <tr>
    <th scope="row">Ravi</th>
    <td>78</td>
    <td>88</td>
  </tr>
</table>
```

| Technique | Why |
| --- | --- |
| `<caption>` | Describes what the table is about |
| `<th>` for headers | Tells assistive tools these cells are labels |
| `scope="col"` / `scope="row"` | Says whether a header labels a column or a row |
| `headers` and `id` | Link cells to headers in very complex tables |
| Simple structure | Easier for everyone to read |

**Remember**

* **Never** use tables for page layout. Use CSS Flexbox or Grid.
* Wide tables on phones: put the table in a container with `overflow-x: auto`.
* Do not leave header cells empty. Give every column a heading.
* Do not use `<th>` just to make text bold.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Table | `<table>...</table>` |
| Row | `<tr>...</tr>` |
| Header cell | `<th scope="col">Name</th>` |
| Data cell | `<td>Value</td>` |
| Title | `<caption>Title</caption>` |
| Sections | `<thead>`, `<tbody>`, `<tfoot>` |
| Merge columns | `<td colspan="2">` |
| Merge rows | `<td rowspan="2">` |
| Row header | `<th scope="row">Asha</th>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Using a table for page layout | Use CSS Flexbox or Grid |
| Missing `<caption>` | Add a short, clear one |
| Using `<td>` for header cells | Use `<th>` with `scope` |
| Wrong number of cells after `colspan` or `rowspan` | Remove the covered cells and recount |
| `<caption>` placed after the rows | Make it the first child of `<table>` |
| Relying on the `border` attribute | Style with CSS |
| Wide table breaks the mobile layout | Wrap it in a scrollable container |

---

## Last-Minute Checklist

* I can build a table with `<table>`, `<tr>`, `<th>` and `<td>`.
* I can add `<caption>`, `<thead>`, `<tbody>` and `<tfoot>`.
* I can merge cells with `colspan` and `rowspan`.
* I can use `scope` to mark column and row headers.
* I know tables are for data, not for layout.

---

## Quiz: Rapid Fire

1. Which tag defines a table row?

- [ ] `<td>`
- [x] `<tr>`
- [ ] `<th>`
- [ ] `<row>`

2. Which tag defines a header cell?

- [ ] `<head>`
- [ ] `<td>`
- [x] `<th>`
- [ ] `<thead>`

3. What does `colspan="2"` do?

- [ ] Makes the cell 2 pixels wide
- [x] Makes the cell span two columns
- [ ] Makes the cell span two rows
- [ ] Repeats the cell twice

4. Which element gives a table its title?

- [ ] `<title>`
- [ ] `<header>`
- [x] `<caption>`
- [ ] `<legend>`

5. Which attribute tells a screen reader that a header labels a column?

- [ ] `column="true"`
- [ ] `role="col"`
- [ ] `for="col"`
- [x] `scope="col"`

6. Should you use tables to lay out a whole web page?

- [ ] Yes, it is the best method
- [ ] Yes, but only for headers
- [x] No, use CSS for layout
- [ ] Only on mobile

