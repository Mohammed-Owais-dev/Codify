# Quick Notes: Chapter 1 - Introduction to Web & HTML

> **10-minute revision.** Know how a webpage reaches your screen, what HTML is, which tools you need, and how to build and open your first page.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 1.1 | How the Web Works | A browser (client) requests a page, a server responds, and the browser displays it |
| 1.2 | What is HTML? | The markup language that gives a webpage its structure and meaning |
| 1.3 | Setting Up Your Environment | A code editor, a browser and a project folder are enough to start |
| 1.4 | Your First Webpage | Save an `.html` file and open it in a browser |

---

## 1. How the Web Works (1.1)

**Core idea:** The web is a conversation. Your **browser** (the client) asks for a page, and a **server** sends it back.

* The **Internet** is the global network of computers. The **Web** is the collection of pages that runs on top of it.
* Every page lives at a **URL** such as `https://www.example.com/about.html`.
* **DNS** works like a phone book: it turns a domain name (`example.com`) into an IP address.
* **HTTP** is the set of rules for the conversation. **HTTPS** is HTTP with encryption.

**What happens when you open a page**

```text
URL typed ──▶ DNS finds server IP ──▶ HTTP request ──▶ Server
                                                         │
Browser shows the page ◀── HTML, CSS, JS, images ◀───────┘
```

**Parts of a URL**

| Part | Example | Meaning |
| --- | --- | --- |
| Protocol | `https://` | How to talk to the server |
| Domain | `www.example.com` | Which server |
| Path | `/blog/post.html` | Which file or page |
| Query | `?id=5` | Extra data sent to the server |
| Fragment | `#comments` | A spot inside the page |

**Common status codes**

| Code | Meaning |
| --- | --- |
| `200` | OK, page found |
| `301` | Moved permanently |
| `403` | Forbidden |
| `404` | Not found |
| `500` | Server error |

**The three front-end languages**

| Language | Job |
| --- | --- |
| HTML | Structure and content (the skeleton) |
| CSS | Style and layout (the clothes) |
| JavaScript | Behaviour and interaction (the muscles) |

**Remember**

* **Front end** runs in the browser. **Back end** runs on the server.
* The browser only understands HTML, CSS and JavaScript.
* One page usually needs many requests: one for the HTML, then more for images, CSS and scripts.

---

## 2. What is HTML? (1.2)

**Core idea:** **HTML** (HyperText Markup Language) describes the **structure and meaning** of a webpage using tags.

* **Hypertext** is text with links to other pages. **Markup** means tags that label content.
* Invented by **Tim Berners-Lee** at CERN around 1990 to 1991.
* HTML is **not** a programming language. It describes content and has no logic or loops.
* The current version is **HTML5**, kept up to date as a *living standard* by WHATWG.
* HTML files end with **`.html`**.

```html
<h1>My Page</h1>
<p>HTML labels each piece of content.</p>
<a href="https://example.com">A link</a>
```

| Tag | Tells the browser |
| --- | --- |
| `<h1>` | This is the main heading |
| `<p>` | This is a paragraph |
| `<a>` | This is a link |

**Remember**

* HTML = structure, CSS = looks, JavaScript = behaviour.
* Browsers forgive mistakes, but invalid HTML can look different in different browsers.
* Tag names are not case-sensitive, but **lowercase** is the standard style.

---

## 3. Setting Up Your Environment (1.3)

**Core idea:** You only need a **code editor** to write and a **browser** to view.

| Tool | Purpose |
| --- | --- |
| VS Code (or Sublime, Notepad++) | Write and save code |
| Chrome / Firefox / Edge / Safari | View the page |
| Live Server extension | Refreshes the browser automatically when you save |
| DevTools (`F12`) | Inspect elements and find errors |

**A simple project folder**

```text
my-website/
├── index.html
├── about.html
├── css/
│   └── style.css
└── images/
    └── logo.png
```

**Steps**

| Step | Action |
| --- | --- |
| 1 | Create a folder for the project |
| 2 | Open the folder in your editor |
| 3 | Create a file named `index.html` |
| 4 | Write code and save with `Ctrl + S` |
| 5 | Open the file in a browser (or use Live Server) |

**Remember**

* `index.html` is the default **homepage** name.
* Use **lowercase** file names with hyphens and no spaces: `about-us.html`.
* Show file extensions on Windows, or you may create `page.html.txt` by mistake.
* Save the file **before** you refresh the browser.

---

## 4. Your First Webpage (1.4)

**Core idea:** A webpage is a text file with tags. Save it as `.html` and open it in a browser.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first webpage.</p>
</body>
</html>
```

| Line | Role |
| --- | --- |
| `<!DOCTYPE html>` | Tells the browser this is HTML5 |
| `<html lang="en">` | Root element; language is English |
| `<head>` | Information about the page (not shown) |
| `<title>` | Text on the browser tab |
| `<body>` | Everything visible on the page |
| `<h1>` and `<p>` | A heading and a paragraph |

**Remember**

* Only what is inside `<body>` appears in the page area.
* Change the code, save, then **refresh** to see the update.
* Use `Ctrl + U` in a browser to view a page's source.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Start an HTML5 page | `<!DOCTYPE html>` |
| Root element | `<html lang="en">` |
| Page title (tab) | `<title>Text</title>` |
| Heading | `<h1>Text</h1>` |
| Paragraph | `<p>Text</p>` |
| Link | `<a href="url">Text</a>` |
| Open DevTools | `F12` |
| View source | `Ctrl + U` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Saving as `page.txt` or `page.html.txt` | Save with the `.html` extension |
| Forgetting to save before refresh | Press `Ctrl + S` first |
| Spaces or capitals in file names | Use `my-page.html` |
| Putting visible content in `<head>` | Visible content goes in `<body>` |
| Opening the wrong copy of the file | Check the folder and file name |
| Thinking HTML is a programming language | It is a markup language |

---

## Last-Minute Checklist

* I can explain how a browser and a server talk to each other.
* I know what DNS, HTTP and HTTPS do.
* I can say what HTML, CSS and JavaScript are each used for.
* I can set up an editor, a browser and a project folder.
* I can write, save and open a basic HTML page.

---

## Quiz: Rapid Fire

1. Which language gives a webpage its structure?

- [ ] CSS
- [x] HTML
- [ ] JavaScript
- [ ] SQL

2. What does DNS do?

- [ ] Encrypts the page
- [ ] Draws the page
- [x] Turns a domain name into an IP address
- [ ] Stores your files

3. Which status code means the page was not found?

- [ ] `200`
- [ ] `301`
- [ ] `500`
- [x] `404`

4. What does HTML stand for?

- [x] HyperText Markup Language
- [ ] High Text Machine Language
- [ ] HyperTool Markup Logic
- [ ] Home Tool Markup Language

5. Which file name is normally the homepage of a website?

- [ ] `home.txt`
- [ ] `main.exe`
- [x] `index.html`
- [ ] `first.htm.txt`

6. Is HTML a programming language?

- [ ] Yes, it has loops and functions
- [ ] Yes, it runs on the server
- [x] No, it is a markup language
- [ ] No, it is a database language
