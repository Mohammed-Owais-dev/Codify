# 3. Text & Headings Hierarchy

## Headings
- Use `<h1>` through `<h6>` to express heading levels, not just text size.
- Keep the hierarchy logical. Do not choose a heading level only for its default appearance.
- A page usually has one clear main heading, followed by appropriately nested sections.

```html
<h1>HTML Notes</h1>
<h2>Text Elements</h2>
<h3>Paragraphs</h3>
<p>This is a paragraph of text.</p>
```

## Paragraphs and line breaks
- `<p>` groups a paragraph of text.
- `<br>` creates a line break within text; do not use repeated breaks to create page spacing.
- Use separate paragraphs for separate ideas.

## Text emphasis and meaning
- `<strong>` marks strong importance; `<em>` adds emphasis.
- `<b>` and `<i>` are primarily stylistic and do not automatically convey the same meaning.
- Prefer semantic elements when meaning matters to assistive technology.

## Preformatted text and code
- `<pre>` preserves whitespace and line breaks.
- `<code>` identifies a code fragment. They are often combined for code blocks.

```html
<pre><code>const total = 10 + 5;
console.log(total);</code></pre>
```

## Quick reminders
- HTML defines structure and meaning; CSS controls visual styling.
- Use headings in a logical order.
- Prefer semantic tags over using elements only to make text look bold or large.
