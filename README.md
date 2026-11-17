# 🚀 Codify — Modern Learning Management System (LMS)

Codify is a feature-rich, high-performance web-based Learning Management System designed to deliver seamless course tracking, interactive chapter modules, secure authentication, automated progress matrices, final certifications, and verifiable credential generation.

---

## ✨ Core Features

* **🔐 Secure Authentication:** Powered by Supabase Auth with session persistence, route protection, and dynamic navigation states.
* **🗺️ Course Enrollment Flow:** Dedicated prerequisite and overview pages (`enroll.html`) with real-time status synchronization.
* **📊 Interactive Chapter & Topic Matrix:** Live tracking of completed vs. incomplete lessons stored directly in relational database tables.
* **🎓 Final Certification Assessment:** Multi-question exam modules (`exam.html`) with automatic score grading and instant pass/fail feedback.
* **📜 Verified Multi-Certificate System:** Dynamic certificate generation (`certificate.html`) unlocked *only* upon 100% topic completion and passing the final exam.
* **🎨 Modern UI & Glassmorphism:** Custom dark-theme styling, ambient background lighting, smooth transitions, and responsive design.

---

## 📂 Professional Project Architecture

```text
my-codify-project/
├── .env                  # Environment variables (Supabase URL & Anon Key)
├── .gitignore            # Version control exclusion rules
├── README.md             # Project documentation
├── index.html            # Landing page (Root)
└── src/
    ├── assets/
    │   ├── icons/        # SVG / PNG UI icons
    │   └── logos/        # Brand logos (main-logo.svg)
    ├── css/
    │   └── style.css     # Global theme & layout stylesheet
    ├── js/
    │   ├── script.js     # Global UI interactions
    │   ├── config/
    │   │   └── supabase-client.js  # Supabase SDK initialization
    │   └── auth/
    │       ├── nav-auth.js
    │       └── auth-guard.js
    ├── database/
    │   └── schema.sql    # Relational tables, triggers & RLS policies
    ├── pages/
    │   ├── courses/
    │   │   ├── course.html
    │   │   ├── enroll.html
    │   │   ├── course-index.html
    │   │   └── exam.html
    │   ├── certificates/
    │   │   ├── my-certificates.html
    │   │   └── certificate.html
    │   └── contact.html
    ├── auth/
    │   ├── login.html
    │   └── signup.html
    └── profile/
        ├── profile.html
        └── settings.html

## SEO & maintenance

- `robots.txt` and `sitemap.xml` live in the project root.
- After adding courses, chapters or lessons, regenerate the sitemap and commit it:
  `node scripts/generate-sitemap.mjs`
- `src/js/seo.js` keeps the canonical URL, Open Graph tags and breadcrumb data correct on the course, lesson and quick-notes pages.
- Private pages (login, signup, account, admin, exams) are marked `noindex` in their HTML and in `vercel.json`.
- Supabase: use the public anon key only. Never commit a `service_role` key, and keep Row Level Security enabled on every table.
