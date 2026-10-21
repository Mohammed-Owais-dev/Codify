# Quick Notes: Chapter 8 - Forms & User Input Control

> **10-minute revision.** Know how a form sends data, the basic and advanced input types, how to label fields accessibly, and how to validate input with built-in attributes.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 8.1 | The Form Container | `<form action method>` wraps the fields and sends them |
| 8.2 | Basic Inputs | `<input>`, `<textarea>`, `<select>` and `<button>` collect data |
| 8.3 | Accessible Form Design | `<label>`, `<fieldset>` and `<legend>` make forms usable |
| 8.4 | Advanced Inputs | Date, colour, range, file and `datalist` give better controls |
| 8.5 | Native Form Validation | `required`, `pattern`, `min` and `max` check input in the browser |

---

## 1. The Form Container (8.1)

**Core idea:** A `<form>` groups the fields and decides **where** and **how** the data is sent.

```html
<form action="/submit" method="post">
  <input type="text" name="username">
  <button type="submit">Send</button>
</form>
```

| Attribute | Purpose |
| --- | --- |
| `action` | URL that receives the data |
| `method` | `get` or `post` |
| `enctype="multipart/form-data"` | Needed when uploading files |
| `autocomplete` | `on` or `off` for the whole form |
| `novalidate` | Turn off built-in validation |

**GET vs POST**

| | GET | POST |
| --- | --- | --- |
| Data goes | In the URL | In the request body |
| Visible to the user | Yes | No |
| Use for | Searches, filters | Logins, sign-ups, uploads |
| Bookmarkable | Yes | No |

**Remember**

* A field is only sent if it has a **`name`** attribute.
* Never send passwords with GET.
* The submit button sends the form. `type="reset"` clears it. `type="button"` does nothing by itself.

---

## 2. Basic Inputs (8.2)

**Core idea:** The `type` attribute of `<input>` changes what the field is and how it looks.

```html
<form>
  <p><input type="text" name="name" placeholder="Your name"></p>
  <p><input type="password" name="pwd" placeholder="Password"></p>
  <p><input type="email" name="email" placeholder="you@example.com"></p>
  <p><input type="number" name="age" min="1" max="100" placeholder="Age"></p>
  <p>
    <input type="radio" name="gender" value="f"> Female
    <input type="radio" name="gender" value="m"> Male
  </p>
  <p><input type="checkbox" name="agree"> I agree</p>
  <p>
    <select name="city">
      <option value="hyd">Hyderabad</option>
      <option value="del">Delhi</option>
    </select>
  </p>
  <p><textarea name="msg" rows="3" cols="30" placeholder="Message"></textarea></p>
  <button type="submit">Send</button>
</form>
```

| Control | Purpose |
| --- | --- |
| `type="text"` | One line of text |
| `type="password"` | Hidden characters |
| `type="email"` | Email address |
| `type="number"` | A number |
| `type="radio"` | Choose **one** option from a group |
| `type="checkbox"` | Choose **any** options |
| `<select>` + `<option>` | Drop-down list |
| `<textarea>` | Many lines of text |
| `<button>` | Submit, reset or custom action |

**Remember**

* Radio buttons in one group share the **same `name`**.
* `value` is what gets sent, and the text between `<option>` tags is what the user sees.
* `placeholder` is a hint, not a label.
* Add `checked` or `selected` to preselect an option.

---

## 3. Accessible Form Design (8.3)

**Core idea:** Every field needs a **visible label** connected to it.

```html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" autocomplete="email" required>

  <fieldset>
    <legend>Choose a plan</legend>
    <label><input type="radio" name="plan" value="free"> Free</label>
    <label><input type="radio" name="plan" value="pro"> Pro</label>
  </fieldset>

  <button type="submit">Subscribe</button>
</form>
```

| Tool | Purpose |
| --- | --- |
| `<label for="id">` | Connects text to the input with the same `id` |
| Label wrapping the input | Another way to connect them |
| `<fieldset>` | Groups related fields |
| `<legend>` | Title of the group |
| `autocomplete` | Lets the browser fill known values |

**Remember**

* Clicking a connected label focuses the input. This also helps people with small touch targets.
* **Placeholder is not a label.** It disappears as soon as you type.
* Group radio buttons and checkboxes with `<fieldset>` and `<legend>`.
* Mark required fields clearly, not only with colour.

---

## 4. Advanced Inputs (8.4)

**Core idea:** Modern input types give you pickers and the right mobile keyboards for free.

```html
<form>
  <p><label>Birthday <input type="date" name="dob"></label></p>
  <p><label>Colour <input type="color" name="colour" value="#0077ff"></label></p>
  <p><label>Volume <input type="range" name="vol" min="0" max="10" value="5"></label></p>
  <p><label>Photo <input type="file" name="photo" accept="image/*"></label></p>
  <p><label>Browser <input list="browsers" name="browser"></label></p>
  <datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Edge">
  </datalist>
  <p><progress value="70" max="100">70%</progress></p>
</form>
```

| Type or element | Purpose |
| --- | --- |
| `date`, `time`, `datetime-local`, `month`, `week` | Date and time pickers |
| `color` | Colour picker |
| `range` | Slider |
| `file` | File upload (`accept`, `multiple`) |
| `tel`, `url`, `search` | Right keyboard and checks on phones |
| `<datalist>` | Suggestions while typing |
| `<progress>` | Progress of a task |
| `<meter>` | A value in a known range (such as disk space) |

**Remember**

* Use `step` with `number` and `range`: `step="0.5"`.
* File uploads need `method="post"` and `enctype="multipart/form-data"`.
* Unsupported types fall back to a plain text box, so the form still works.

---

## 5. Native Form Validation (8.5)

**Core idea:** The browser can check input **before** the form is sent, using attributes only.

```html
<form>
  <p><label>Username <input type="text" name="user" required minlength="3" maxlength="12"></label></p>
  <p><label>Age <input type="number" name="age" min="18" max="60"></label></p>
  <p><label>PIN <input type="text" name="pin" pattern="[0-9]{4}" title="Enter exactly 4 digits"></label></p>
  <button type="submit">Register</button>
</form>
```

| Attribute | Checks |
| --- | --- |
| `required` | Field must not be empty |
| `minlength` / `maxlength` | Number of characters |
| `min` / `max` | Number or date range |
| `pattern` | Must match a regular expression |
| `type="email"` / `type="url"` | Must look like an email or URL |
| `title` | Message that explains the `pattern` |
| `novalidate` (on `<form>`) | Skip validation |
| `formnovalidate` (on button) | Skip validation for this button |

**Style the result with CSS:** `:valid`, `:invalid`, `:required`

**Remember**

* Browser validation helps users but is **not security**. Always validate again on the server.
* Add `title` to a `pattern` so users know what is expected.
* `required` on a radio group needs it on at least one radio button of that group.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Form | `<form action="/url" method="post">` |
| Text field | `<input type="text" name="n">` |
| Label | `<label for="id">Text</label>` + `id="id"` |
| Radio group | Same `name`, different `value` |
| Drop-down | `<select><option value="1">One</option></select>` |
| Multi-line text | `<textarea name="m"></textarea>` |
| Group fields | `<fieldset><legend>Title</legend>...</fieldset>` |
| Required field | `required` |
| Pattern | `pattern="[0-9]{4}" title="4 digits"` |
| Date picker | `<input type="date">` |
| Submit | `<button type="submit">Send</button>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Input without `name` | Add `name`, or it is not sent |
| Using `placeholder` as the label | Add a real `<label>` |
| Label `for` does not match `id` | Make them identical |
| Radio buttons with different `name` values | Use the same `name` for the group |
| Password sent with GET | Use POST |
| File upload without `enctype` | Add `enctype="multipart/form-data"` |
| Trusting only browser validation | Validate on the server too |
| `pattern` with no `title` | Add a helpful `title` |

---

## Last-Minute Checklist

* I can build a form with `action` and `method`.
* I can use text, email, number, radio, checkbox, select and textarea.
* I can connect every input to a `<label>`.
* I can group fields with `<fieldset>` and `<legend>`.
* I can use date, colour, range, file and `datalist`.
* I can validate with `required`, `min`, `max`, `minlength` and `pattern`.

---

## Quiz: Rapid Fire

1. Which `method` puts the form data in the URL?

- [x] `get`
- [ ] `post`
- [ ] `put`
- [ ] `url`

2. How do you make radio buttons act as one group?

- [ ] Give them the same `id`
- [ ] Put them in a `<div>`
- [x] Give them the same `name`
- [ ] Give them the same `value`

3. What connects a `<label>` to an `<input>`?

- [ ] `label` matching `name`
- [x] The label's `for` matching the input's `id`
- [ ] `class` names that match
- [ ] The order in the HTML

4. Which attribute makes a field mandatory?

- [ ] `mandatory`
- [ ] `needed`
- [ ] `validate`
- [x] `required`

5. Which input type opens a date picker?

- [ ] `type="calendar"`
- [ ] `type="time"`
- [x] `type="date"`
- [ ] `type="day"`

6. Which attribute checks input against a regular expression?

- [ ] `regex`
- [ ] `match`
- [x] `pattern`
- [ ] `format`
