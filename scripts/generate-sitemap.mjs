// Generates sitemap.xml from the syllabus files in src/data.
// Run:  node scripts/generate-sitemap.mjs
// Re-run (and commit sitemap.xml) whenever you add courses, chapters or lessons.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SITE = 'https://learn-codify.vercel.app';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'data');
const today = new Date().toISOString().slice(0, 10);

const urls = [];
const add = (path, priority, changefreq = 'monthly') =>
  urls.push({ loc: SITE + path, priority, changefreq });

// Public static pages
add('/', '1.0', 'weekly');
add('/courses', '0.9', 'weekly');
add('/quick-notes', '0.8', 'weekly');
add('/certificate', '0.5');
add('/about', '0.6');
add('/contact', '0.4', 'yearly');
add('/privacy', '0.2', 'yearly');
add('/terms', '0.2', 'yearly');

// Courses, lessons and quick notes (from the syllabus JSON)
const files = readdirSync(dataDir).filter(f => f.endsWith('-syllabus.json')).sort();
for (const file of files) {
  const slug = file.replace('-syllabus.json', '');
  const raw = readFileSync(join(dataDir, file), 'utf8').replace(/^\uFEFF/, '');
  const course = JSON.parse(raw);

  add(`/courses/${slug}`, '0.8');
  add(`/quick-notes/${slug}`, '0.6');

  for (const ch of course.chapters || []) {
    add(`/quick-notes/${slug}/${ch.chapter_number}`, '0.5');
    for (const t of ch.topics || []) {
      const id = t.id || t.file.split('/').pop().split('-')[0];
      add(`/courses/${slug}/${id}`, '0.7');
    }
  }
}

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u =>
    `  <url>\n    <loc>${esc(u.loc)}</loc>\n    <lastmod>${today}</lastmod>\n` +
    `    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  ).join('\n') +
  '\n</urlset>\n';

writeFileSync(join(root, 'sitemap.xml'), xml);
console.log(`sitemap.xml written with ${urls.length} URLs`);
