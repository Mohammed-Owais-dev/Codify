# Quick Notes: Chapter 5 - Media & Visual Assets

> **10-minute revision.** Know how to show images with good `alt` text, which image format to pick, and how to add audio and video with the built-in players.

---

## Chapter Map

| # | Topic | One-line summary |
| --- | --- | --- |
| 5.1 | Displaying Images | `<img src alt width height>` shows an image |
| 5.2 | Image Types & Best Practices | Pick the right format, compress, and set sizes |
| 5.3 | Audio Elements | `<audio controls>` adds a sound player |
| 5.4 | Video Elements | `<video controls>` adds a video player |

---

## 1. Displaying Images (5.1)

**Core idea:** `<img>` is an empty element that shows a picture. `src` is the file and `alt` describes it.

```html
<img src="images/cat.jpg" alt="A grey cat sleeping on a sofa" width="400" height="300" loading="lazy">
```

| Attribute | Purpose |
| --- | --- |
| `src` | Path or URL of the image |
| `alt` | Text for screen readers and for when the image fails to load |
| `width` / `height` | Size in pixels; stops the page from jumping while loading |
| `loading="lazy"` | Load the image only when it is near the screen |
| `title` | Optional tooltip |

**Writing good `alt` text**

| Image | Good alt |
| --- | --- |
| Photo of a dog | `alt="Brown dog catching a ball"` |
| Logo link to home | `alt="Pizza Palace home"` |
| Purely decorative image | `alt=""` (empty, on purpose) |

**Remember**

* **Every** `<img>` needs an `alt` attribute.
* Describe what the image **shows or does**. Skip "image of".
* Use `alt=""` for decorative images so screen readers skip them.
* A broken `src` path shows the alt text and a broken-image icon.

---

## 2. Image Types & Best Practices (5.2)

**Core idea:** Choose the format that fits the picture. Smaller files make pages faster.

| Format | Best for | Notes |
| --- | --- | --- |
| JPEG (`.jpg`) | Photos | Small files, loses some quality, no transparency |
| PNG | Screenshots, graphics, transparency | Lossless, larger files |
| GIF | Simple animations | Only 256 colours |
| SVG | Logos and icons | Vector: sharp at any size, tiny files |
| WebP | Almost everything | Small, supports transparency and animation |
| AVIF | Photos | Often smaller than WebP |

**Offer modern formats with a fallback**

```html
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="Mountain at sunrise" width="800" height="500">
</picture>
```

**Best practices**

| Practice | Why |
| --- | --- |
| Compress images | Faster loading |
| Resize before uploading | Do not ship a 4000 px image for a 400 px slot |
| Set `width` and `height` | Prevents layout jumps |
| Use `loading="lazy"` below the fold | Saves data |
| Use meaningful file names | `red-bicycle.jpg`, not `IMG_0042.jpg` |
| Use `srcset` and `sizes` | Different image sizes for different screens |

**Remember**

* `<picture>` lets the browser pick the first format it supports.
* The `<img>` inside `<picture>` is **required** and works as the fallback.

---

## 3. Audio Elements (5.3)

**Core idea:** `<audio>` plays sound without any plugin. Add `controls` to show the player.

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

| Attribute | Purpose |
| --- | --- |
| `controls` | Show play, pause and volume |
| `autoplay` | Start automatically (browsers often block it) |
| `loop` | Repeat forever |
| `muted` | Start silent |
| `preload` | `none`, `metadata` or `auto` |

| Format | Type |
| --- | --- |
| MP3 | `audio/mpeg` |
| OGG | `audio/ogg` |
| WAV | `audio/wav` |

**Remember**

* Without `controls`, the player is invisible.
* Browsers usually **block autoplay with sound**. Let the user press play.
* The text inside `<audio>` is the fallback for very old browsers.
* Offer a **transcript** for spoken content.

---

## 4. Video Elements (5.4)

**Core idea:** `<video>` plays video in the page. Offer more than one format and add captions.

```html
<video controls width="640" poster="thumbnail.jpg">
  <source src="clip.mp4" type="video/mp4">
  <source src="clip.webm" type="video/webm">
  <track kind="subtitles" src="captions-en.vtt" srclang="en" label="English" default>
  Your browser does not support the video element.
</video>
```

| Attribute | Purpose |
| --- | --- |
| `controls` | Show the player controls |
| `width` / `height` | Size of the player |
| `poster` | Image shown before playing |
| `autoplay` | Start automatically; needs `muted` in most browsers |
| `muted` | Start silent |
| `loop` | Repeat |
| `playsinline` | Play inside the page on iPhones |
| `preload` | `none`, `metadata` or `auto` |

**Embed from another site**

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Short description of the video" width="560" height="315" allowfullscreen></iframe>
```

**Remember**

* MP4 (H.264) works almost everywhere. WebM is a good extra option.
* Use `<track>` for subtitles and captions: it helps accessibility.
* Give every `<iframe>` a `title`.
* Autoplay without `muted` is blocked in most browsers.

---

## Cheat Sheet

| Need | Code |
| --- | --- |
| Image | `<img src="a.jpg" alt="Description">` |
| Decorative image | `<img src="line.png" alt="">` |
| Lazy image | `<img ... loading="lazy">` |
| Modern formats | `<picture><source ...><img ...></picture>` |
| Audio player | `<audio controls src="a.mp3"></audio>` |
| Video player | `<video controls src="v.mp4"></video>` |
| Video thumbnail | `<video poster="thumb.jpg">` |
| Subtitles | `<track kind="subtitles" src="en.vtt" srclang="en">` |
| Embedded video | `<iframe src="..." title="..."></iframe>` |

---

## Common Traps

| Trap | Fix |
| --- | --- |
| Missing `alt` | Always add `alt` |
| `alt="image"` or `alt="photo"` | Describe what is in the picture |
| Huge image files | Resize and compress |
| No `width` and `height` | Add them to stop layout jumps |
| Using JPEG for logos | Use SVG or PNG |
| Autoplay with sound | Use `muted`, or let the user press play |
| Forgetting `controls` | Add `controls` so users can play |
| Only one video format | Add MP4 and WebM sources |

---

## Last-Minute Checklist

* I can write an `<img>` with `src`, `alt`, `width` and `height`.
* I can write good `alt` text and know when to use `alt=""`.
* I can choose between JPEG, PNG, GIF, SVG and WebP.
* I can use `<picture>` to give modern formats with a fallback.
* I can add `<audio>` and `<video>` with `controls` and several sources.
* I know why autoplay needs `muted`.

---

## Quiz: Rapid Fire

1. Which attribute gives an image its alternative text?

- [ ] `title`
- [x] `alt`
- [ ] `src`
- [ ] `caption`

2. Which image format is best for a logo that must stay sharp at any size?

- [ ] JPEG
- [ ] GIF
- [x] SVG
- [ ] BMP

3. Which attribute shows the play and pause buttons on an audio player?

- [ ] `play`
- [ ] `buttons`
- [x] `controls`
- [ ] `player`

4. Browsers usually allow video autoplay only when the video is...

- [ ] Very short
- [x] Muted
- [ ] In MP4 format
- [ ] Inside a `<div>`

5. Which attribute makes an image load only when it is near the screen?

- [ ] `loading="eager"`
- [ ] `defer`
- [x] `loading="lazy"`
- [ ] `async`

6. Which element adds subtitles to a video?

- [ ] `<caption>`
- [ ] `<subtitle>`
- [ ] `<source>`
- [x] `<track>`
